/**
 * Base Renderer - Common rendering functionality
 */

import type { RenderContext, RenderableTask } from './types';
import { STATUS_CONFIG, PRIORITY_CONFIG } from './theme';
import { escapeHtml, formatEstimate, formatDate } from './utils';

/**
 * Base styles shared by all renderers
 */
export function getBaseStyles(ctx: RenderContext): string {
  const { cls } = ctx;

  return `
.${cls('container')} {
  font-family: var(--taskml-font-family);
  font-size: var(--taskml-font-size-md);
  color: var(--taskml-text);
  background: var(--taskml-bg);
  line-height: 1.5;
}

.${cls('task')} {
  display: flex;
  align-items: flex-start;
  gap: var(--taskml-space-sm);
  padding: var(--taskml-space-sm) var(--taskml-space-md);
  border-radius: var(--taskml-radius-md);
  transition: background-color 0.15s;
}

.${cls('task')}:hover {
  background: var(--taskml-bg-hover);
}

.${cls('status-icon')} {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.${cls('status-icon')} svg {
  width: 100%;
  height: 100%;
}

.${cls('task-content')} {
  flex: 1;
  min-width: 0;
}

.${cls('task-description')} {
  font-weight: 500;
}

.${cls('task-meta')} {
  display: flex;
  flex-wrap: wrap;
  gap: var(--taskml-space-xs);
  margin-top: var(--taskml-space-xs);
  font-size: var(--taskml-font-size-sm);
  color: var(--taskml-text-secondary);
}

.${cls('badge')} {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.${cls('priority')} {
  color: var(--color);
  background: transparent;
  padding: 0;
}

.${cls('priority')}::before {
  content: '';
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: var(--color);
}

.${cls('tag')} {
  color: var(--taskml-text-secondary);
  background: var(--taskml-bg-secondary);
}

.${cls('assignee')} {
  color: var(--taskml-status-progress);
}

.${cls('estimate')} {
  color: var(--taskml-text-muted);
}

.${cls('due')} {
  color: var(--taskml-text-muted);
}

.${cls('progress-bar')} {
  height: 4px;
  background: var(--taskml-bg-secondary);
  border-radius: 2px;
  overflow: hidden;
  margin-top: var(--taskml-space-xs);
}

.${cls('progress-fill')} {
  height: 100%;
  background: var(--taskml-status-completed);
  transition: width 0.3s;
}

.${cls('criteria')} {
  margin-top: var(--taskml-space-sm);
  font-size: var(--taskml-font-size-sm);
}

.${cls('criterion')} {
  display: flex;
  align-items: center;
  gap: var(--taskml-space-xs);
  padding: var(--taskml-space-xs) 0;
}

.${cls('criterion-icon')} {
  flex-shrink: 0;
}

.${cls('criterion-verified')} {
  color: var(--taskml-criterion-verified);
}

.${cls('criterion-failed')} {
  color: var(--taskml-criterion-failed);
}

.${cls('criterion-pending')} {
  color: var(--taskml-criterion-pending);
}

.${cls('notes')} {
  margin-top: var(--taskml-space-sm);
  padding-left: var(--taskml-space-md);
  font-size: var(--taskml-font-size-sm);
  color: var(--taskml-text-secondary);
  border-left: 2px solid var(--taskml-border);
}

.${cls('note')} {
  padding: var(--taskml-space-xs) 0;
}
`.trim();
}

/**
 * SVG icons for status - clean, minimal design
 */
const STATUS_ICONS: Record<string, string> = {
  pending: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/></svg>`,
  in_progress: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  completed: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5.5 8l2 2 3.5-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  blocked: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M5 8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  cancelled: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  review: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>`,
};

/**
 * Render status icon
 */
export function renderStatusIcon(ctx: RenderContext, status: string): string {
  const { cls } = ctx;
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  if (!config) return '';

  const icon = STATUS_ICONS[status] || STATUS_ICONS.pending;
  return `<span class="${cls('status-icon')}" style="color: ${config.color}" title="${config.label}">${icon}</span>`;
}

/**
 * Render priority badge
 */
export function renderPriority(ctx: RenderContext, priority: number): string {
  const { cls } = ctx;
  const config = PRIORITY_CONFIG[priority];
  if (!config) return '';

  return `<span class="${cls('badge')} ${cls('priority')}" style="--color: ${config.color}; --bg: ${config.bgColor}">P${priority}</span>`;
}

/**
 * Render tags
 */
export function renderTags(ctx: RenderContext, tags: string[]): string {
  const { cls } = ctx;
  return tags
    .map(tag => `<span class="${cls('badge')} ${cls('tag')}">#${escapeHtml(tag)}</span>`)
    .join('');
}

/**
 * Render assignee
 */
export function renderAssignee(ctx: RenderContext, assignee: string): string {
  const { cls } = ctx;
  return `<span class="${cls('assignee')}">@${escapeHtml(assignee)}</span>`;
}

/**
 * Render estimate
 */
export function renderEstimate(ctx: RenderContext, estimate: string): string {
  const { cls } = ctx;
  return `<span class="${cls('estimate')}">~${formatEstimate(estimate)}</span>`;
}

/**
 * Render due date
 */
export function renderDueDate(ctx: RenderContext, due: string): string {
  const { cls } = ctx;
  return `<span class="${cls('due')}">${formatDate(due)}</span>`;
}

/**
 * Render task metadata (priority, tags, assignee, etc.)
 */
export function renderTaskMeta(ctx: RenderContext, task: RenderableTask): string {
  const { cls } = ctx;
  const parts: string[] = [];

  if (task.priority !== undefined) {
    parts.push(renderPriority(ctx, task.priority));
  }
  if (task.tags && task.tags.length > 0) {
    parts.push(renderTags(ctx, task.tags));
  }
  if (task.assignee) {
    parts.push(renderAssignee(ctx, task.assignee));
  }
  if (task.estimate) {
    parts.push(renderEstimate(ctx, task.estimate));
  }
  if (task.due) {
    parts.push(renderDueDate(ctx, task.due));
  }

  if (parts.length === 0) return '';

  return `<div class="${cls('task-meta')}">${parts.join(' ')}</div>`;
}

/**
 * Render progress bar
 */
export function renderProgressBar(ctx: RenderContext, progress: number): string {
  const { cls } = ctx;
  if (progress === 0) return '';

  return `<div class="${cls('progress-bar')}"><div class="${cls('progress-fill')}" style="width: ${progress}%"></div></div>`;
}

/**
 * Render criteria list
 */
export function renderCriteria(ctx: RenderContext, task: RenderableTask): string {
  const { cls } = ctx;
  if (!task.criteria || task.criteria.length === 0) return '';

  const items = task.criteria.map(c => {
    const iconClass = `${cls('criterion-icon')} ${cls(`criterion-${c.status}`)}`;
    const icon = c.status === 'verified' ? '✓' : c.status === 'failed' ? '✗' : '○';
    return `<div class="${cls('criterion')}"><span class="${iconClass}">${icon}</span><span>${escapeHtml(c.description)}</span></div>`;
  });

  return `<div class="${cls('criteria')}">${items.join('')}</div>`;
}

/**
 * Render notes
 */
export function renderNotes(ctx: RenderContext, task: RenderableTask): string {
  const { cls } = ctx;
  if (!task.notes || task.notes.length === 0) return '';

  const items = task.notes.map(n => `<div class="${cls('note')}">${escapeHtml(n)}</div>`);

  return `<div class="${cls('notes')}">${items.join('')}</div>`;
}
