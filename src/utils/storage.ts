import { get, set } from 'idb-keyval';
import type { Column } from '../types/Column';
import type { Task } from '../types/Task';

const BOARD_KEY = 'kanban-board-v1';

export interface BoardData {
  columns: Column[];
  tasks: Task[];
}

/**
 * Loads the full board state from IndexedDB.
 * Returns undefined if no data has been saved yet.
 */
export async function loadBoard(): Promise<BoardData | undefined> {
  return get<BoardData>(BOARD_KEY);
}

/**
 * Persists the full board state to IndexedDB.
 */
export async function saveBoard(data: BoardData): Promise<void> {
  return set(BOARD_KEY, data);
}
