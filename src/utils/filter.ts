import type { Task } from '../types/Task';
import type { FilterState } from '../types/Filter';
import { getDueDateStatus } from './date';

/**
 * Applies active filters to a list of tasks.
 * Returns only tasks that match ALL active filters.
 */
export function applyFilters(tasks: Task[], filters: FilterState): Task[] {
  return tasks.filter((task) => {
    // Text search — title or description
    const matchSearch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());

    // Assignee filter — task must include at least one selected assignee
    const matchAssignee =
      filters.assigneeIds.length === 0 ||
      filters.assigneeIds.some((id) => task.assigneeIds.includes(id));

    // Label filter — task must include at least one selected label
    const matchLabel =
      filters.labels.length === 0 ||
      filters.labels.some((l) => task.labels.includes(l));

    // Due date status filter
    const matchDueDate =
      !filters.dueDateStatus ||
      getDueDateStatus(task.dueDate) === filters.dueDateStatus;

    return matchSearch && matchAssignee && matchLabel && matchDueDate;
  });
}
