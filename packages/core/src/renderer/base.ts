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
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
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
  padding: 0.125rem 0.5rem;
  border-radius: var(--taskml-radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.${cls('priority')} {
  color: var(--color);
  background: var(--bg);
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
 * Render status icon
 */
export function renderStatusIcon(ctx: RenderContext, status: string): string {
  const { cls } = ctx;
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  if (!config) return '';

  return `<span class="${cls('status-icon')}" style="color: ${config.color}" title="${config.label}">${config.icon}</span>`;
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
