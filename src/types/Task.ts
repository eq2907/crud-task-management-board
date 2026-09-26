export type LabelColor = 'red' | 'blue' | 'yellow' | 'green' | 'transparent';
export type Priority = 'low' | 'medium' | 'high';
export type DueDateStatus = 'normal' | 'warning' | 'overdue';

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  base64: string;
  type: string;
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  coverImage?: string;
  labels: LabelColor[];
  assigneeIds: number[];
  dueDate?: string; // YYYY-MM-DD
  priority: Priority;
  subtasks: Subtask[];
  attachments: Attachment[];
  completed: boolean;
  createdAt: string;
  order: number;
}
