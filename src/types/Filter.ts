import type { LabelColor, DueDateStatus } from './Task';

export interface FilterState {
  search: string;
  assigneeIds: number[];
  labels: LabelColor[];
  dueDateStatus: '' | DueDateStatus;
}
