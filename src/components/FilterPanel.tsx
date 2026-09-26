import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useBoardStore } from '../store/useBoardStore';
import { AvaStackedData } from '../utils/AvaStackedData';
import type { LabelColor, DueDateStatus } from '../types/Task';

const LABEL_OPTIONS: { value: LabelColor; label: string; css: string }[] = [
  { value: 'red', label: 'Bug', css: 'label--red' },
  { value: 'blue', label: 'Feature', css: 'label--blue' },
  { value: 'yellow', label: 'Issue', css: 'label--yellow' },
  { value: 'green', label: 'Enhancement', css: 'label--green' },
  { value: 'transparent', label: 'Misc', css: 'label--transparent' },
];

const DUE_DATE_OPTIONS: { value: '' | DueDateStatus; label: string }[] = [
  { value: '', label: 'All dates' },
  { value: 'normal', label: 'On track' },
  { value: 'warning', label: 'Due soon (≤ 3 days)' },
  { value: 'overdue', label: 'Overdue' },
];

function FilterPanel() {
  const { isFilterPanelOpen, toggleFilterPanel, filters, setFilter, resetFilters } = useBoardStore();
  const panelRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters =
    filters.search ||
    filters.assigneeIds.length > 0 ||
    filters.labels.length > 0 ||
    filters.dueDateStatus;

  // Close on outside click
  useEffect(() => {
    if (!isFilterPanelOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        toggleFilterPanel();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isFilterPanelOpen]);

  if (!isFilterPanelOpen) return null;

  const toggleAssignee = (id: number) => {
    const next = filters.assigneeIds.includes(id)
      ? filters.assigneeIds.filter((a) => a !== id)
      : [...filters.assigneeIds, id];
    setFilter({ assigneeIds: next });
  };

  const toggleLabel = (label: LabelColor) => {
    const next = filters.labels.includes(label)
      ? filters.labels.filter((l) => l !== label)
      : [...filters.labels, label];
    setFilter({ labels: next });
  };

  return (
    <div className="filter-panel" ref={panelRef} role="dialog" aria-label="Filter tasks">
      {/* Panel Header */}
      <div className="filter-panel__header">
        <h3>Filter Tasks</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {hasActiveFilters && (
            <button className="filter-reset-btn" type="button" onClick={resetFilters}>
              Reset all
            </button>
          )}
          <button className="btn btn--gray btn-close" type="button" onClick={toggleFilterPanel} aria-label="Close filter panel">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Assignee Filter */}
      <div className="filter-section">
        <h4>Assignee</h4>
        <div className="filter-assignee-list">
          {AvaStackedData.map((a) => (
            <label key={a.id} className={`filter-assignee-item${filters.assigneeIds.includes(a.id) ? ' active' : ''}`}>
              <input
                type="checkbox"
                checked={filters.assigneeIds.includes(a.id)}
                onChange={() => toggleAssignee(a.id)}
              />
              <img src={a.avaimg} alt={`User ${a.id}`} />
              <span>User {a.id}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Label Filter */}
      <div className="filter-section">
        <h4>Label</h4>
        <div className="filter-label-list">
          {LABEL_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`filter-label-item${filters.labels.includes(opt.value) ? ' active' : ''}`}
            >
              <input
                type="checkbox"
                checked={filters.labels.includes(opt.value)}
                onChange={() => toggleLabel(opt.value)}
              />
              <span className={`label label-sm ${opt.css}`}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Due Date Status Filter */}
      <div className="filter-section">
        <h4>Due Date</h4>
        <div className="filter-due-list">
          {DUE_DATE_OPTIONS.map((opt) => (
            <label
              key={opt.value || 'all'}
              className={`filter-due-item${filters.dueDateStatus === opt.value ? ' active' : ''}`}
            >
              <input
                type="radio"
                name="due-date-filter"
                checked={filters.dueDateStatus === opt.value}
                onChange={() => setFilter({ dueDateStatus: opt.value })}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export { FilterPanel };
