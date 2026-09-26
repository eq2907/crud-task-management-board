import type { DueDateStatus } from '../types/Task';

/**
 * Determines the due date status relative to today.
 */
export function getDueDateStatus(dueDate?: string): DueDateStatus {
  if (!dueDate) return 'normal';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + 'T00:00:00');
  const diffMs = due.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffDays < 0) return 'overdue';
  if (diffDays <= 3) return 'warning';
  return 'normal';
}

/**
 * Formats a YYYY-MM-DD string to a short human-readable date (e.g. "18 Aug").
 */
export function formatDueDate(dueDate?: string): string {
  if (!dueDate) return '';
  return new Date(dueDate + 'T00:00:00').toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
}
