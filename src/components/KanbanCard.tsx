import { useState, useRef } from 'react';
import { Timer, SquareCheck, Paperclip, Trash2 } from 'lucide-react';
import { useBoardStore } from '../store/useBoardStore';
import { AvaStacked } from './AvaStacked';
import { getDueDateStatus, formatDueDate } from '../utils/date';
import type { Task } from '../types/Task';

const LABEL_CLASS_MAP: Record<string, string> = {
  red: 'label--red',
  blue: 'label--blue',
  yellow: 'label--yellow',
  green: 'label--green',
  transparent: 'label--transparent',
};

const LABEL_DISPLAY: Record<string, string> = {
  red: 'Bug',
  blue: 'Feature',
  yellow: 'Issue',
  green: 'Enhancement',
  transparent: 'Misc',
};

interface KanbanCardProps {
  task: Task;
}

function KanbanCard({ task }: KanbanCardProps) {
  const { openEditModal, deleteTask, moveTask } = useBoardStore();
  const [isDragging, setIsDragging] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const total = task.subtasks.length;
  const done = task.subtasks.filter((s) => s.completed).length;
  const progressPct = total === 0 ? 0 : Math.round((done / total) * 100);
  const dueDateStatus = getDueDateStatus(task.dueDate);
  const formattedDate = formatDueDate(task.dueDate);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('fromColumnId', task.columnId);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    // Small timeout so the drag image doesn't show the dimmed card
    setTimeout(() => {
      if (cardRef.current) cardRef.current.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (cardRef.current) cardRef.current.style.opacity = '1';
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showConfirm) {
      deleteTask(task.id);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2500);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`kanban-card-row${isDragging ? ' dragging' : ''}${task.completed ? ' completed' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => openEditModal(task.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openEditModal(task.id)}
      aria-label={`Task: ${task.title}`}
    >
      {/* Cover Image */}
      {task.coverImage && (
        <div className="kanban-card-row__img">
          <img src={task.coverImage} alt="Task cover" />
        </div>
      )}

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="kanban-card-row__label">
          {task.labels.map((label) => (
            <div key={label} className={`label ${LABEL_CLASS_MAP[label] ?? ''}`}>
              {LABEL_DISPLAY[label] ?? label}
            </div>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {total > 0 && (
        <div className="kanban-card-row__progress">
          <div
            className="kanban-card-row__progress-bar"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      {/* Title */}
      <div className="kanban-card-row__title">
        <p>{task.title}</p>
      </div>

      {/* Footer */}
      <div className="kanban-card-row__bottom">
        <div className="kanban-card-row__bottom-left self-center">
          <ul>
            {task.dueDate && (
              <li>
                <div className={`due-date ${dueDateStatus}`}>
                  <Timer size={13} strokeWidth={2.5} />
                  <span>{formattedDate}</span>
                </div>
              </li>
            )}
            {total > 0 && (
              <li className="sub-tasks self-center">
                <div>
                  <SquareCheck size={13} strokeWidth={1.5} />
                  <span>{done}/{total}</span>
                </div>
              </li>
            )}
            {task.attachments.length > 0 && (
              <li className="attachments self-center">
                <div>
                  <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                  <span>{task.attachments.length}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="kanban-card-row__bottom-right">
          <AvaStacked assigneeIds={task.assigneeIds} maxVisible={2} size="sm" />
        </div>
      </div>

      {/* Delete Button */}
      <button
        className={`card-delete-btn${showConfirm ? ' confirm' : ''}`}
        type="button"
        onClick={handleDelete}
        title={showConfirm ? 'Click again to confirm delete' : 'Delete task'}
        aria-label="Delete task"
      >
        <Trash2 size={13} />
        {showConfirm && <span>Confirm?</span>}
      </button>
    </div>
  );
}

export { KanbanCard };
