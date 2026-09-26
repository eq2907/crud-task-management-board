import { create } from 'zustand';
import { loadBoard, saveBoard } from '../utils/storage';
import { generateId } from '../utils/id';
import { defaultColumns, defaultTasks } from '../utils/defaultData';
import type { Column } from '../types/Column';
import type { Task } from '../types/Task';
import type { FilterState } from '../types/Filter';

interface BoardStore {
  // ─── Data ────────────────────────────────────────────────────────────────
  columns: Column[];
  tasks: Task[];

  // ─── UI State ────────────────────────────────────────────────────────────
  filters: FilterState;
  isModalOpen: boolean;
  modalMode: 'create' | 'edit';
  activeTaskId: string | null;
  activeColumnId: string | null; // used when creating a new task
  isFilterPanelOpen: boolean;
  isHydrated: boolean;

  // ─── Bootstrap ───────────────────────────────────────────────────────────
  hydrate: () => Promise<void>;

  // ─── Column Actions ───────────────────────────────────────────────────────
  addColumn: (title: string) => void;
  deleteColumn: (id: string) => void;
  renameColumn: (id: string, title: string) => void;

  // ─── Task Actions ─────────────────────────────────────────────────────────
  addTask: (columnId: string, partial: Partial<Omit<Task, 'id' | 'columnId' | 'createdAt' | 'order'>>) => void;
  updateTask: (id: string, partial: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, toColumnId: string, toIndex: number) => void;

  // ─── Subtask Actions ──────────────────────────────────────────────────────
  addSubtask: (taskId: string, text: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;

  // ─── Modal Actions ────────────────────────────────────────────────────────
  openCreateModal: (columnId: string) => void;
  openEditModal: (taskId: string) => void;
  closeModal: () => void;

  // ─── Filter Actions ───────────────────────────────────────────────────────
  setFilter: (partial: Partial<FilterState>) => void;
  resetFilters: () => void;
  toggleFilterPanel: () => void;
}

const emptyFilters: FilterState = {
  search: '',
  assigneeIds: [],
  labels: [],
  dueDateStatus: '',
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  // ─── Initial State ────────────────────────────────────────────────────────
  columns: [],
  tasks: [],
  filters: emptyFilters,
  isModalOpen: false,
  modalMode: 'create',
  activeTaskId: null,
  activeColumnId: null,
  isFilterPanelOpen: false,
  isHydrated: false,

  // ─── Bootstrap ────────────────────────────────────────────────────────────
  hydrate: async () => {
    try {
      const data = await loadBoard();
      if (data && data.columns && data.columns.length > 0) {
        set({ columns: data.columns, tasks: data.tasks, isHydrated: true });
      } else {
        set({ columns: defaultColumns, tasks: defaultTasks, isHydrated: true });
        await saveBoard({ columns: defaultColumns, tasks: defaultTasks });
      }
    } catch {
      set({ columns: defaultColumns, tasks: defaultTasks, isHydrated: true });
    }
  },

  // ─── Column Actions ───────────────────────────────────────────────────────
  addColumn: (title) => {
    const col: Column = {
      id: generateId(),
      title: title.trim() || 'New Column',
      order: get().columns.length,
    };
    set((s) => ({ columns: [...s.columns, col] }));
    persist(get());
  },

  deleteColumn: (id) => {
    set((s) => ({
      columns: s.columns.filter((c) => c.id !== id),
      tasks: s.tasks.filter((t) => t.columnId !== id),
    }));
    persist(get());
  },

  renameColumn: (id, title) => {
    set((s) => ({
      columns: s.columns.map((c) => (c.id === id ? { ...c, title } : c)),
    }));
    persist(get());
  },

  // ─── Task Actions ─────────────────────────────────────────────────────────
  addTask: (columnId, partial) => {
    const colTasks = get().tasks.filter((t) => t.columnId === columnId);
    const task: Task = {
      id: generateId(),
      columnId,
      title: 'New Task',
      description: '',
      labels: [],
      assigneeIds: [],
      priority: 'medium',
      subtasks: [],
      attachments: [],
      completed: false,
      createdAt: new Date().toISOString(),
      order: colTasks.length,
      ...partial,
    };
    set((s) => ({ tasks: [...s.tasks, task] }));
    persist(get());
    return task;
  },

  updateTask: (id, partial) => {
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...partial } : t)),
    }));
    persist(get());
  },

  deleteTask: (id) => {
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }));
    persist(get());
  },

  moveTask: (taskId, toColumnId, toIndex) => {
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return s;

      // Remove task from its current position
      const withoutTask = s.tasks.filter((t) => t.id !== taskId);

      // Get tasks in the target column and sort them
      const targetColTasks = withoutTask
        .filter((t) => t.columnId === toColumnId)
        .sort((a, b) => a.order - b.order);

      // Insert at target index
      targetColTasks.splice(toIndex, 0, { ...task, columnId: toColumnId });

      // Reassign orders in target column
      const reordered = targetColTasks.map((t, i) => ({ ...t, order: i }));

      // Rebuild full task list
      const otherTasks = withoutTask.filter((t) => t.columnId !== toColumnId);
      return { tasks: [...otherTasks, ...reordered] };
    });
    persist(get());
  },

  // ─── Subtask Actions ──────────────────────────────────────────────────────
  addSubtask: (taskId, text) => {
    const subtask = { id: generateId(), text: text.trim(), completed: false };
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === taskId ? { ...t, subtasks: [...t.subtasks, subtask] } : t
      ),
    }));
    persist(get());
  },

  toggleSubtask: (taskId, subtaskId) => {
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : t
      ),
    }));
    persist(get());
  },

  deleteSubtask: (taskId, subtaskId) => {
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === taskId
          ? { ...t, subtasks: t.subtasks.filter((st) => st.id !== subtaskId) }
          : t
      ),
    }));
    persist(get());
  },

  // ─── Modal Actions ────────────────────────────────────────────────────────
  openCreateModal: (columnId) => {
    set({ isModalOpen: true, modalMode: 'create', activeTaskId: null, activeColumnId: columnId });
  },

  openEditModal: (taskId) => {
    set({ isModalOpen: true, modalMode: 'edit', activeTaskId: taskId, activeColumnId: null });
  },

  closeModal: () => {
    set({ isModalOpen: false, activeTaskId: null, activeColumnId: null });
  },

  // ─── Filter Actions ───────────────────────────────────────────────────────
  setFilter: (partial) => {
    set((s) => ({ filters: { ...s.filters, ...partial } }));
  },

  resetFilters: () => {
    set({ filters: emptyFilters });
  },

  toggleFilterPanel: () => {
    set((s) => ({ isFilterPanelOpen: !s.isFilterPanelOpen }));
  },
}));

// ─── Internal helper ─────────────────────────────────────────────────────────
function persist(state: Pick<BoardStore, 'columns' | 'tasks'>) {
  saveBoard({ columns: state.columns, tasks: state.tasks }).catch(console.error);
}
