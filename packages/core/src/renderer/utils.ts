/**
 * Renderer Utilities
 */

import type { Document, Task } from '../types';
import type { RenderableTask, RenderContext, RenderOptions } from './types';

/**
 * Default render options
 */
export const DEFAULT_OPTIONS: Required<RenderOptions> = {
  format: 'html',
  view: 'list',
  viewOptions: {},
  includeStyles: true,
  includeCSSVars: true,
  classPrefix: 'taskml',
  theme: 'light',
};

/**
 * Create render context from document and options
 */
export function createContext(doc: Document, options: RenderOptions = {}): RenderContext {
  const opts: Required<RenderOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
    view: options.view ?? doc.view?.type ?? 'list',
    viewOptions: { ...doc.view?.options, ...options.viewOptions },
  };

  const prefix = opts.classPrefix;

  return {
    document: doc,
    options: opts,
    cls: (name: string) => `${prefix}-${name}`,
    cssVar: (name: string) => `var(--${prefix}-${name})`,
  };
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generate unique key for a task
 */
let keyCounter = 0;
export function generateKey(): string {
  return `task-${++keyCounter}`;
}

/**
 * Reset key counter (for testing)
 */
export function resetKeyCounter(): void {
  keyCounter = 0;
}

/**
 * Convert tasks to renderable tasks with computed properties
 */
export function toRenderableTasks(
  tasks: Task[],
  depth: number = 0,
  parentKey?: string
): RenderableTask[] {
  return tasks.map(task => {
    const key = generateKey();
    const { total, completed } = countSubtasks(task);

    const renderable: RenderableTask = {
      ...task,
      key,
      depth,
      parentKey,
      totalSubtasks: total,
      completedSubtasks: completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    };

    if (task.subtasks && task.subtasks.length > 0) {
      renderable.subtasks = toRenderableTasks(task.subtasks, depth + 1, key);
    }

    return renderable;
  });
}

/**
 * Count total and completed subtasks recursively
 */
function countSubtasks(task: Task): { total: number; completed: number } {
  if (!task.subtasks || task.subtasks.length === 0) {
    return { total: 0, completed: 0 };
  }

  let total = 0;
  let completed = 0;

  for (const subtask of task.subtasks) {
    total++;
    if (subtask.status === 'completed') {
      completed++;
    }
    const sub = countSubtasks(subtask);
    total += sub.total;
    completed += sub.completed;
  }

  return { total, completed };
}

/**
 * Flatten tasks into a single array (for table/list views)
 */
export function flattenTasks(tasks: RenderableTask[]): RenderableTask[] {
  const result: RenderableTask[] = [];

  for (const task of tasks) {
    result.push(task);
    if (task.subtasks && task.subtasks.length > 0) {
      result.push(...flattenTasks(task.subtasks as RenderableTask[]));
    }
  }

  return result;
}

/**
 * Group tasks by status (for kanban view)
 */
export function groupByStatus(tasks: RenderableTask[]): Map<string, RenderableTask[]> {
  const groups = new Map<string, RenderableTask[]>();
  const statuses = ['pending', 'in_progress', 'review', 'blocked', 'completed', 'cancelled'];

  // Initialize all groups
  for (const status of statuses) {
    groups.set(status, []);
  }

  // Group tasks
  for (const task of tasks) {
    const group = groups.get(task.status) ?? [];
    group.push(task);
    groups.set(task.status, group);
  }

  return groups;
}

/**
 * Group tasks by assignee
 */
export function groupByAssignee(tasks: RenderableTask[]): Map<string, RenderableTask[]> {
  const groups = new Map<string, RenderableTask[]>();
  groups.set('unassigned', []);

  for (const task of tasks) {
    const assignee = task.assignee ?? 'unassigned';
    const group = groups.get(assignee) ?? [];
    group.push(task);
    groups.set(assignee, group);
  }

  return groups;
}

/**
 * Calculate document statistics
 */
export function calculateStats(doc: Document): {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<number, number>;
  progress: number;
} {
  const flat = flattenTasks(toRenderableTasks(doc.tasks));
  const total = flat.length;

  const byStatus: Record<string, number> = {};
  const byPriority: Record<number, number> = {};

  for (const task of flat) {
    byStatus[task.status] = (byStatus[task.status] ?? 0) + 1;
    if (task.priority !== undefined) {
      byPriority[task.priority] = (byPriority[task.priority] ?? 0) + 1;
    }
  }

  const completed = byStatus['completed'] ?? 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, byStatus, byPriority, progress };
}

/**
 * Format estimate for display
 */
export function formatEstimate(estimate: string): string {
  const match = estimate.match(/^(\d+)(h|d)$/);
  if (!match) return estimate;

  const [, num, unit] = match;
  return unit === 'h' ? `${num}h` : `${num}d`;
}

/**
 * Format date for display
 */
export function formatDate(date: string): string {
  try {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return date;
  }
}
