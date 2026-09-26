import { useState } from 'react';
import { Timer, SquareCheck, Paperclip, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useBoardStore } from '../store/useBoardStore';
import { AvaStacked } from './AvaStacked';
import { getDueDateStatus, formatDueDate } from '../utils/date';
import { applyFilters } from '../utils/filter';
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
  transparent: 'Undefined',
};

interface ListRowProps {
  task: Task;
}

function ListRow({ task }: ListRowProps) {
  const { openEditModal, deleteTask } = useBoardStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const total = task.subtasks.length;
  const done = task.subtasks.filter((s) => s.completed).length;
  const dueDateStatus = getDueDateStatus(task.dueDate);
  const formattedDate = formatDueDate(task.dueDate);

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
      className={`list-table__row${task.completed ? ' completed' : ''}`}
      onClick={() => openEditModal(task.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openEditModal(task.id)}
      aria-label={`Task: ${task.title}`}
    >
      {/* Task Title */}
      <div className="list-col list-col--title">
        {task.coverImage && (
          <img className="list-row__cover" src={task.coverImage} alt="cover" />
        )}
        <span className="list-row__title">{task.title}</span>
      </div>

      {/* Assignees */}
      <div className="list-col list-col--assignee">
        <AvaStacked assigneeIds={task.assigneeIds} maxVisible={3} size="sm" />
      </div>

      {/* Labels */}
      <div className="list-col list-col--labels">
        <div className="list-row__labels">
          {task.labels.map((label) => (
            <span key={label} className={`label label-sm ${LABEL_CLASS_MAP[label] ?? ''}`}>
              {LABEL_DISPLAY[label] ?? label}
            </span>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div className="list-col list-col--due">
        {task.dueDate && (
          <div className={`due-date ${dueDateStatus}`}>
            <Timer size={13} strokeWidth={2.5} />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      {/* Subtasks & Attachments */}
      <div className="list-col list-col--subtasks">
        <div className="list-row__meta">
          {total > 0 && (
            <div className="list-row__subtasks">
              <SquareCheck size={13} strokeWidth={1.5} />
              <span>{done}/{total}</span>
            </div>
          )}
          {task.attachments.length > 0 && (
            <div className="list-row__subtasks">
              <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
              <span>{task.attachments.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="list-col list-col--actions" onClick={(e) => e.stopPropagation()}>
        <button
          className={`list-delete-btn${showConfirm ? ' confirm' : ''}`}
          type="button"
          onClick={handleDelete}
          title={showConfirm ? 'Click again to confirm' : 'Delete task'}
          aria-label="Delete task"
        >
          <Trash2 size={14} />
          {showConfirm && <span>Confirm?</span>}
        </button>
      </div>
    </div>
  );
}

function ListView() {
  const { columns, tasks, filters } = useBoardStore();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (colId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [colId]: !prev[colId] }));
  };

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <div className="list-view">
      {sortedColumns.map((col) => {
        const colTasks = tasks
          .filter((t) => t.columnId === col.id)
          .sort((a, b) => a.order - b.order);
        const filteredTasks = applyFilters(colTasks, filters);
        const isCollapsed = collapsedGroups[col.id];

        return (
          <div key={col.id} className="list-group">
            {/* Group Header */}
            <button
              type="button"
              className="list-group__header"
              onClick={() => toggleGroup(col.id)}
              aria-expanded={!isCollapsed}
            >
              <div className="list-group__header-left">
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                <span className="list-group__title">{col.title}</span>
                <span className="list-group__count">{filteredTasks.length}</span>
              </div>
            </button>

            {/* Table */}
            {!isCollapsed && (
              <div className="list-table">
                <div className="list-table__header">
                  <div className="list-col list-col--title">Task</div>
                  <div className="list-col list-col--assignee">Assignee</div>
                  <div className="list-col list-col--labels">Labels</div>
                  <div className="list-col list-col--due">Due Date</div>
                  <div className="list-col list-col--subtasks">Progress</div>
                  <div className="list-col list-col--actions"></div>
                </div>

                {filteredTasks.length === 0 ? (
                  <div className="list-empty">
                    {colTasks.length === 0
                      ? 'No tasks yet. Add one from the board.'
                      : 'No tasks match current filters.'}
                  </div>
                ) : (
                  filteredTasks.map((task) => <ListRow key={task.id} task={task} />)
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { ListView };
