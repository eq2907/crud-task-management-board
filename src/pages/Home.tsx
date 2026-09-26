import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useBoardStore } from '../store/useBoardStore';
import { KanbanColumn } from '../components/KanbanColumn';
import { TaskModal } from '../components/TaskModal';
import './Home.css';

// ─── New Column Button ────────────────────────────────────────────────────────

function NewColumnButton() {
  const { addColumn } = useBoardStore();
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed) {
      addColumn(trimmed);
    }
    setValue('');
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div className="kanban-column new-column new-column--editing">
        <input
          autoFocus
          className="new-column-input"
          type="text"
          placeholder="Column name…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
            if (e.key === 'Escape') {
              setValue('');
              setIsAdding(false);
            }
          }}
          onBlur={handleAdd}
          maxLength={40}
        />
      </div>
    );
  }

  return (
    <div className="kanban-column new-column">
      <button
        className="btn btn-new-column btn--gray"
        type="button"
        onClick={() => setIsAdding(true)}
        aria-label="Add new column"
      >
        <Plus size={18} />
        <span>Add new List</span>
      </button>
    </div>
  );
}

// ─── Loading Spinner ──────────────────────────────────────────────────────────

function BoardSkeleton() {
  return (
    <div className="board-skeleton">
      {[1, 2, 3].map((n) => (
        <div key={n} className="skeleton-column">
          <div className="skeleton-header" />
          <div className="skeleton-card" />
          <div className="skeleton-card skeleton-card--short" />
          <div className="skeleton-card" />
        </div>
      ))}
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function Home() {
  const { columns, isHydrated, hydrate } = useBoardStore();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <>
      <div className="board">
        <div className="container mx-auto h-full">
          {!isHydrated ? (
            <BoardSkeleton />
          ) : (
            <div className="kanban-wrapper h-full">
              {[...columns]
                .sort((a, b) => a.order - b.order)
                .map((col) => (
                  <KanbanColumn key={col.id} columnId={col.id} />
                ))}
              <NewColumnButton />
            </div>
          )}
        </div>
      </div>

      {/* Task Modal (rendered outside board so it can overlay correctly) */}
      <TaskModal />
    </>
  );
}

export default Home;