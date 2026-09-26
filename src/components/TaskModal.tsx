import { useState, useEffect, useRef } from 'react';
import {
  X, Check, ImagePlus, Pencil, Plus, Trash2, ChevronDown,
} from 'lucide-react';
import { useBoardStore } from '../store/useBoardStore';
import { AvaStackedData } from '../utils/AvaStackedData';
import type { Task, LabelColor, Priority } from '../types/Task';

// ─── Constants ────────────────────────────────────────────────────────────────

const LABEL_OPTIONS: { value: LabelColor; label: string; css: string }[] = [
  { value: 'red', label: 'Bug', css: 'label--red' },
  { value: 'blue', label: 'Feature', css: 'label--blue' },
  { value: 'yellow', label: 'Issue', css: 'label--yellow' },
  { value: 'green', label: 'Enhancement', css: 'label--green' },
  { value: 'transparent', label: 'Misc', css: 'label--transparent' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

// ─── Types ─────────────────────────────────────────────────────────────────

interface ModalFormState {
  title: string;
  description: string;
  columnId: string;
  labels: LabelColor[];
  assigneeIds: number[];
  dueDate: string;
  priority: Priority;
  coverImage: string;
  subtaskInput: string;
  completed: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

function TaskModal() {
  const {
    isModalOpen, modalMode, activeTaskId, activeColumnId,
    tasks, columns, closeModal, addTask, updateTask,
    addSubtask, toggleSubtask, deleteSubtask, deleteTask,
  } = useBoardStore();

  const activeTask = tasks.find((t) => t.id === activeTaskId) ?? null;

  const [form, setForm] = useState<ModalFormState>({
    title: 'New Task',
    description: '',
    columnId: activeColumnId ?? columns[0]?.id ?? '',
    labels: [],
    assigneeIds: [],
    dueDate: '',
    priority: 'medium',
    coverImage: '',
    subtaskInput: '',
    completed: false,
  });

  const [isDirty, setIsDirty] = useState(false);
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const [showLabelPicker, setShowLabelPicker] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const subtaskRef = useRef<HTMLInputElement>(null);

  // Sync form when modal opens
  useEffect(() => {
    if (!isModalOpen) return;

    if (modalMode === 'edit' && activeTask) {
      setForm({
        title: activeTask.title,
        description: activeTask.description,
        columnId: activeTask.columnId,
        labels: [...activeTask.labels],
        assigneeIds: [...activeTask.assigneeIds],
        dueDate: activeTask.dueDate ?? '',
        priority: activeTask.priority,
        coverImage: activeTask.coverImage ?? '',
        subtaskInput: '',
        completed: activeTask.completed,
      });
    } else {
      setForm({
        title: 'New Task',
        description: '',
        columnId: activeColumnId ?? columns[0]?.id ?? '',
        labels: [],
        assigneeIds: [],
        dueDate: '',
        priority: 'medium',
        coverImage: '',
        subtaskInput: '',
        completed: false,
      });
    }
    setIsDirty(false);
    setShowAssigneePicker(false);
    setShowLabelPicker(false);

    setTimeout(() => {
      titleRef.current?.select();
      autoResizeTextarea(titleRef.current);
    }, 50);
  }, [isModalOpen, modalMode, activeTaskId]);

  if (!isModalOpen) return null;

  const set = (patch: Partial<ModalFormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setIsDirty(true);
  };

  const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  // ── Cover Image ─────────────────────────────────────────────────
  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set({ coverImage: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  // ── Attachment upload ────────────────────────────────────────────
  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (!activeTask) return;
        const newAtt = {
          id: crypto.randomUUID?.() ?? `${Date.now()}`,
          name: file.name,
          base64: ev.target?.result as string,
          type: file.type,
        };
        updateTask(activeTask.id, {
          attachments: [...activeTask.attachments, newAtt],
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // ── Toggle label ─────────────────────────────────────────────────
  const toggleLabel = (label: LabelColor) => {
    const next = form.labels.includes(label)
      ? form.labels.filter((l) => l !== label)
      : [...form.labels, label];
    set({ labels: next });
  };

  // ── Toggle assignee ───────────────────────────────────────────────
  const toggleAssignee = (id: number) => {
    const next = form.assigneeIds.includes(id)
      ? form.assigneeIds.filter((a) => a !== id)
      : [...form.assigneeIds, id];
    set({ assigneeIds: next });
  };

  // ── Add subtask (inline, only for edit mode) ─────────────────────
  const handleAddSubtask = () => {
    if (!activeTask || !form.subtaskInput.trim()) return;
    addSubtask(activeTask.id, form.subtaskInput.trim());
    setForm((prev) => ({ ...prev, subtaskInput: '' }));
    subtaskRef.current?.focus();
  };

  // ── Save / Create ─────────────────────────────────────────────────
  const handleSave = () => {
    if (!form.title.trim()) return;

    const payload: Partial<Task> = {
      title: form.title.trim(),
      description: form.description.trim(),
      columnId: form.columnId,
      labels: form.labels,
      assigneeIds: form.assigneeIds,
      dueDate: form.dueDate || undefined,
      priority: form.priority,
      coverImage: form.coverImage || undefined,
      completed: form.completed,
    };

    if (modalMode === 'create') {
      addTask(form.columnId, payload);
    } else if (activeTask) {
      updateTask(activeTask.id, payload);
    }

    closeModal();
  };

  const handleDiscard = () => {
    if (isDirty && !window.confirm('Discard unsaved changes?')) return;
    closeModal();
  };

  const handleDeleteTask = () => {
    if (!activeTask) return;
    if (window.confirm('Delete this task permanently?')) {
      deleteTask(activeTask.id);
      closeModal();
    }
  };

  // Subtask progress
  const subtasks = modalMode === 'edit' && activeTask ? activeTask.subtasks : [];
  const totalSubs = subtasks.length;
  const doneSubs = subtasks.filter((s) => s.completed).length;
  const subPct = totalSubs === 0 ? 0 : Math.round((doneSubs / totalSubs) * 100);

  return (
    <>
      <div className="modal-wrapper" onClick={(e) => e.target === e.currentTarget && handleDiscard()}>
        <div className="modal" role="dialog" aria-modal="true" aria-label="Task details">
          <div className="modal-content">

            {/* ─── LEFT PANEL ─────────────────────────────────────── */}
            <div className="modal-content__left">
              {/* Header row */}
              <div className="modal-content__left-header px-14">
                <div>
                  <label className="btn-complete">
                    <input
                      type="checkbox"
                      className="toggle-complete"
                      checked={form.completed}
                      onChange={(e) => set({ completed: e.target.checked })}
                    />
                    <Check />
                    <span className="btn-text">
                      {form.completed ? 'Completed' : 'Mark Complete'}
                    </span>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {modalMode === 'edit' && activeTask && (
                    <button
                      className="btn-close btn btn--gray btn--danger-icon"
                      type="button"
                      onClick={handleDeleteTask}
                      title="Delete task"
                      aria-label="Delete task"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                  <button
                    className="btn-close btn btn--gray"
                    type="button"
                    onClick={handleDiscard}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Cover Image */}
              <div className="modal-cover">
                {form.coverImage ? (
                  <div className="modal-cover__preview">
                    <img src={form.coverImage} alt="Cover" />
                    <button
                      type="button"
                      className="modal-cover__remove"
                      onClick={() => set({ coverImage: '' })}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="btn-cover" htmlFor="modal-cover-input">
                    <ImagePlus size={50} />
                    <input
                      type="file"
                      id="modal-cover-input"
                      accept="image/*"
                      onChange={handleCoverImage}
                    />
                    <span className="btn-text">Add Cover Image</span>
                  </label>
                )}
              </div>

              {/* Title */}
              <div className="modal-title">
                <label htmlFor="modal-title-input">
                  <textarea
                    ref={titleRef}
                    name="title"
                    id="modal-title-input"
                    rows={1}
                    value={form.title}
                    onChange={(e) => {
                      set({ title: e.target.value });
                      autoResizeTextarea(e.target);
                    }}
                    placeholder="Task title…"
                  />
                  <span><Pencil size={20} /></span>
                </label>
              </div>

              {/* Metadata fields */}
              <div className="modal-column">
                {/* Assignee */}
                <div className="modal-row">
                  <h4>Assignee</h4>
                  <div className="assignee-picker-wrapper">
                    <button
                      type="button"
                      className="assignee-picker-toggle"
                      onClick={() => {
                        setShowAssigneePicker((p) => !p);
                        setShowLabelPicker(false);
                      }}
                    >
                      {form.assigneeIds.length > 0 ? (
                        <div className="assignee-chips">
                          {AvaStackedData.filter((a) => form.assigneeIds.includes(a.id)).map((a) => (
                            <img key={a.id} src={a.avaimg} alt="assignee" className="assignee-chip-img" />
                          ))}
                        </div>
                      ) : (
                        <span className="picker-placeholder">Select assignees…</span>
                      )}
                      <ChevronDown size={14} />
                    </button>
                    {showAssigneePicker && (
                      <div className="picker-dropdown">
                        {AvaStackedData.map((a) => (
                          <label key={a.id} className="picker-option">
                            <input
                              type="checkbox"
                              checked={form.assigneeIds.includes(a.id)}
                              onChange={() => toggleAssignee(a.id)}
                            />
                            <img src={a.avaimg} alt={`User ${a.id}`} className="picker-avatar" />
                            <span>User {a.id}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Due Date */}
                <div className="modal-row">
                  <label htmlFor="modal-due-date-input">
                    <h4>Due Date</h4>
                  </label>
                  <input
                    type="date"
                    className="select w-full"
                    id="modal-due-date-input"
                    value={form.dueDate}
                    onChange={(e) => set({ dueDate: e.target.value })}
                  />
                </div>

                {/* Column */}
                <div className="modal-row">
                  <label htmlFor="modal-column-select">
                    <h4>Column</h4>
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <select
                      id="modal-column-select"
                      className="select w-full"
                      value={form.columnId}
                      onChange={(e) => set({ columnId: e.target.value })}
                      style={{ paddingRight: '2.25rem', appearance: 'none', WebkitAppearance: 'none' }}
                    >
                      {columns.sort((a, b) => a.order - b.order).map((col) => (
                        <option key={col.id} value={col.id}>{col.title}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={13}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        pointerEvents: 'none',
                        color: '#94a3b8'
                      }}
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="modal-row">
                  <h4>Label</h4>
                  <div className="assignee-picker-wrapper">
                    <button
                      type="button"
                      className="assignee-picker-toggle assignee-picker-toggle--label"
                      onClick={() => {
                        setShowLabelPicker((p) => !p);
                        setShowAssigneePicker(false);
                      }}
                    >
                      {form.labels.length > 0 ? (
                        <div className="label-chips">
                          {form.labels.map((l) => {
                            const opt = LABEL_OPTIONS.find((o) => o.value === l);
                            return (
                              <span key={l} className={`label-chip ${opt?.css ?? ''}`}>
                                {opt?.label ?? l}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="picker-placeholder">Select labels…</span>
                      )}
                      <ChevronDown size={14} />
                    </button>
                    {showLabelPicker && (
                      <div className="picker-dropdown">
                        {LABEL_OPTIONS.map((opt) => (
                          <label key={opt.value} className="picker-option">
                            <input
                              type="checkbox"
                              checked={form.labels.includes(opt.value)}
                              onChange={() => toggleLabel(opt.value)}
                            />
                            <span className={`label label-sm ${opt.css}`}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Priority */}
                <div className="modal-row">
                  <label htmlFor="modal-priority-select">
                    <h4>Priority</h4>
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <select
                      id="modal-priority-select"
                      className="select w-full"
                      value={form.priority}
                      onChange={(e) => set({ priority: e.target.value as Priority })}
                    >
                      {PRIORITY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={13}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        pointerEvents: 'none',
                        color: '#94a3b8'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ─── RIGHT PANEL ────────────────────────────────────── */}
            <div className="modal-content__right">

              {/* Description */}
              <div className="modal-description px-14">
                <h2>Description</h2>
                <label htmlFor="modal-description-input">
                  <textarea
                    name="modal-description-input"
                    id="modal-description-input"
                    className="textarea w-full"
                    value={form.description}
                    onChange={(e) => {
                      set({ description: e.target.value });
                      autoResizeTextarea(e.target);
                    }}
                    placeholder="Add a description…"
                  />
                  <span><Pencil size={20} /></span>
                </label>
              </div>

              <hr className="my-34" />

              {/* Attachments */}
              <div className="modal-attachment px-14">
                <h2>Attachments</h2>
                {modalMode === 'edit' && activeTask && activeTask.attachments.length > 0 && (
                  <ul className="attachment-list">
                    {activeTask.attachments.map((att) => (
                      <li key={att.id} className="attachment-item">
                        <span className="attachment-name">{att.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateTask(activeTask.id, {
                              attachments: activeTask.attachments.filter((a) => a.id !== att.id),
                            })
                          }
                          aria-label="Remove attachment"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <label className="btn-attachment" htmlFor="modal-attachment-input">
                  <ImagePlus size={20} />
                  <input
                    type="file"
                    id="modal-attachment-input"
                    multiple
                    onChange={handleAttachment}
                  />
                  <span className="btn-text">
                    Drag &amp; Drop files here <span>or</span>
                  </span>
                  <span className="btn-text-browse">browse from device</span>
                </label>
              </div>

              <hr className="my-34" />

              {/* Checklist */}
              <div className="modal-checklist px-14">
                <h2>Check List</h2>
                <span className="modal-checklistt__count">{doneSubs} / {totalSubs}</span>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${subPct}%` }} />
                </div>

                <div className="modal-checklist__add-checklist">
                  {/* Existing subtasks — only in edit mode */}
                  {subtasks.length > 0 && (
                    <div className="checklists">
                      <ul>
                        {subtasks.map((st) => (
                          <li key={st.id}>
                            <label htmlFor={`st-${st.id}`}>
                              <input
                                type="checkbox"
                                id={`st-${st.id}`}
                                className="checkbox"
                                checked={st.completed}
                                onChange={() => activeTask && toggleSubtask(activeTask.id, st.id)}
                              />
                              <span className={`checklist-text${st.completed ? ' done' : ''}`}>
                                {st.text}
                              </span>
                            </label>
                            <button
                              className="self-center"
                              type="button"
                              onClick={() => activeTask && deleteSubtask(activeTask.id, st.id)}
                              aria-label="Delete subtask"
                            >
                              <X size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Add subtask input */}
                  {modalMode === 'edit' ? (
                    <div className="subtask-add-row">
                      <input
                        ref={subtaskRef}
                        type="text"
                        className="input w-full"
                        placeholder="Add a subtask…"
                        value={form.subtaskInput}
                        onChange={(e) => setForm((prev) => ({ ...prev, subtaskInput: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { e.preventDefault(); handleAddSubtask(); }
                        }}
                      />
                      <button
                        className="btn btn--light-blue"
                        type="button"
                        onClick={handleAddSubtask}
                        disabled={!form.subtaskInput.trim()}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ) : (
                    <p className="hint-text">Save the task first, then add subtasks.</p>
                  )}
                </div>
              </div>

              <hr className="my-34" />

              {/* Actions */}
              <div className="modal-bottom">
                <button className="btn btn--gray" type="button" onClick={handleDiscard}>
                  Discard
                </button>
                <button
                  className="btn btn--blue"
                  type="button"
                  onClick={handleSave}
                  disabled={!form.title.trim()}
                >
                  {modalMode === 'create' ? 'Create Task' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="backdrop" onClick={handleDiscard} />
    </>
  );
}

export { TaskModal };
