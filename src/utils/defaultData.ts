import { generateId } from './id';
import type { Column } from '../types/Column';
import type { Task } from '../types/Task';

export const defaultColumns: Column[] = [
  { id: 'col-todo', title: 'To Do', order: 0 },
  { id: 'col-doing', title: 'Doing', order: 1 },
  { id: 'col-review', title: 'Review', order: 2 },
];

const today = new Date();
const inTwoDays = new Date(today);
inTwoDays.setDate(today.getDate() + 2);
const inFiveDays = new Date(today);
inFiveDays.setDate(today.getDate() + 5);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const fmt = (d: Date) => d.toISOString().slice(0, 10);

export const defaultTasks: Task[] = [
  {
    id: generateId(),
    columnId: 'col-todo',
    title: 'Fix authentication bug on 2FA flow',
    description: 'Users are unable to complete login when two-factor authentication is enabled. The OTP validation step times out prematurely.',
    labels: ['red'],
    assigneeIds: [1, 2],
    dueDate: fmt(inTwoDays),
    priority: 'high',
    subtasks: [
      { id: generateId(), text: 'Reproduce the issue locally', completed: true },
      { id: generateId(), text: 'Identify root cause in auth service', completed: false },
      { id: generateId(), text: 'Write regression test', completed: false },
    ],
    attachments: [],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 0,
  },
  {
    id: generateId(),
    columnId: 'col-todo',
    title: 'Design new onboarding flow',
    description: 'Create wireframes and high-fidelity designs for the new user onboarding experience.',
    labels: ['blue'],
    assigneeIds: [3],
    dueDate: fmt(inFiveDays),
    priority: 'medium',
    subtasks: [
      { id: generateId(), text: 'Create wireframes', completed: true },
      { id: generateId(), text: 'User testing session', completed: true },
      { id: generateId(), text: 'High-fidelity mockups', completed: false },
      { id: generateId(), text: 'Stakeholder review', completed: false },
    ],
    attachments: [],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 1,
  },
  {
    id: generateId(),
    columnId: 'col-doing',
    title: 'Implement dashboard analytics charts',
    description: 'Integrate Chart.js to display real-time analytics on the main dashboard.',
    labels: ['blue'],
    assigneeIds: [1, 3, 4],
    dueDate: fmt(inTwoDays),
    priority: 'high',
    subtasks: [
      { id: generateId(), text: 'Set up Chart.js', completed: true },
      { id: generateId(), text: 'Build line chart component', completed: true },
      { id: generateId(), text: 'Build bar chart component', completed: false },
      { id: generateId(), text: 'Connect to API endpoint', completed: false },
    ],
    attachments: [],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 0,
  },
  {
    id: generateId(),
    columnId: 'col-doing',
    title: 'Refactor API layer to use React Query',
    description: 'Migrate all existing fetch calls to use React Query for better caching and loading state management.',
    labels: ['yellow'],
    assigneeIds: [2],
    dueDate: fmt(yesterday),
    priority: 'medium',
    subtasks: [
      { id: generateId(), text: 'Install React Query', completed: true },
      { id: generateId(), text: 'Migrate user endpoints', completed: false },
      { id: generateId(), text: 'Migrate product endpoints', completed: false },
    ],
    attachments: [],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 1,
  },
  {
    id: generateId(),
    columnId: 'col-review',
    title: 'Update landing page copy & SEO',
    description: 'Rewrite the hero section, update meta descriptions, and add structured data for better search rankings.',
    labels: ['green'],
    assigneeIds: [4],
    dueDate: fmt(inFiveDays),
    priority: 'low',
    subtasks: [
      { id: generateId(), text: 'Rewrite hero copy', completed: true },
      { id: generateId(), text: 'Update meta descriptions', completed: true },
      { id: generateId(), text: 'Add Open Graph tags', completed: false },
    ],
    attachments: [],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 0,
  },
];
