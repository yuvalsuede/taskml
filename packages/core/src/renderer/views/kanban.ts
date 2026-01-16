/**
 * Kanban View Renderer
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import { STATUS_CONFIG } from '../theme';
import {
  getBaseStyles,
  renderPriority,
  renderTags,
  renderAssignee,
  renderProgressBar,
} from '../base';
import { escapeHtml, toRenderableTasks, groupByStatus, flattenTasks } from '../utils';
import type { TaskStatus } from '../../types';

export class KanbanViewRenderer implements ViewRenderer {
  readonly viewType = 'kanban' as const;

  render(ctx: RenderContext): string {
    const { cls, document, options } = ctx;
    const tasks = toRenderableTasks(document.tasks);
    const flat = flattenTasks(tasks);

    // Determine columns from options or use defaults
    const columnsOpt = options.viewOptions?.columns;
    const columns = columnsOpt
      ? columnsOpt.split(',').map(c => c.trim())
      : ['pending', 'in_progress', 'review', 'completed'];

    const groups = groupByStatus(flat);
    const columnHtml = columns
      .map(status => this.renderColumn(ctx, status as TaskStatus, groups.get(status) ?? []))
      .join('');

    return `<div class="${cls('container')} ${cls('kanban-view')}"><div class="${cls('kanban-board')}">${columnHtml}</div></div>`;
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('kanban-view')} {
  overflow-x: auto;
}

.${cls('kanban-board')} {
  display: flex;
  gap: var(--taskml-space-md);
  padding: var(--taskml-space-md);
  min-width: max-content;
}

.${cls('kanban-column')} {
  flex: 0 0 280px;
  background: var(--taskml-bg-secondary);
  border-radius: var(--taskml-radius-lg);
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}

.${cls('column-header')} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--taskml-space-md);
  border-bottom: 1px solid var(--taskml-border);
}

.${cls('column-title')} {
  display: flex;
  align-items: center;
  gap: var(--taskml-space-sm);
  font-weight: 600;
}

.${cls('column-count')} {
  background: var(--taskml-bg);
  color: var(--taskml-text-secondary);
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: var(--taskml-radius-sm);
}

.${cls('column-cards')} {
  flex: 1;
  overflow-y: auto;
  padding: var(--taskml-space-sm);
}

.${cls('card')} {
  background: var(--taskml-bg);
  border-radius: var(--taskml-radius-md);
  padding: var(--taskml-space-md);
  margin-bottom: var(--taskml-space-sm);
  box-shadow: var(--taskml-shadow-sm);
  cursor: pointer;
  transition: box-shadow 0.15s;
}

.${cls('card')}:hover {
  box-shadow: var(--taskml-shadow-md);
}

.${cls('card')}:last-child {
  margin-bottom: 0;
}

.${cls('card-header')} {
  display: flex;
  align-items: flex-start;
  gap: var(--taskml-space-sm);
}

.${cls('card-title')} {
  flex: 1;
  font-weight: 500;
  line-height: 1.4;
}

.${cls('card-meta')} {
  display: flex;
  flex-wrap: wrap;
  gap: var(--taskml-space-xs);
  margin-top: var(--taskml-space-sm);
}

.${cls('card-footer')} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--taskml-space-sm);
  padding-top: var(--taskml-space-sm);
  border-top: 1px solid var(--taskml-border-light);
}

.${cls('subtask-count')} {
  font-size: var(--taskml-font-size-sm);
  color: var(--taskml-text-secondary);
}

.${cls('empty-column')} {
  color: var(--taskml-text-muted);
  text-align: center;
  padding: var(--taskml-space-lg);
  font-size: var(--taskml-font-size-sm);
}
`.trim();
  }

  private renderColumn(ctx: RenderContext, status: TaskStatus, tasks: RenderableTask[]): string {
    const { cls } = ctx;
    const config = STATUS_CONFIG[status];

    const cards = tasks.length > 0
      ? tasks.map(task => this.renderCard(ctx, task)).join('')
      : `<div class="${cls('empty-column')}">No tasks</div>`;

    return `
<div class="${cls('kanban-column')}">
  <div class="${cls('column-header')}">
    <div class="${cls('column-title')}">
      <span style="color: ${config.color}">${config.icon}</span>
      <span>${config.label}</span>
    </div>
    <span class="${cls('column-count')}">${tasks.length}</span>
  </div>
  <div class="${cls('column-cards')}">${cards}</div>
</div>`.trim();
  }

  private renderCard(ctx: RenderContext, task: RenderableTask): string {
    const { cls } = ctx;

    const priority = task.priority !== undefined ? renderPriority(ctx, task.priority) : '';
    const title = escapeHtml(task.description);
    const tags = task.tags && task.tags.length > 0 ? renderTags(ctx, task.tags) : '';
    const assignee = task.assignee ? renderAssignee(ctx, task.assignee) : '';

    const meta = (tags || assignee)
      ? `<div class="${cls('card-meta')}">${tags}${assignee}</div>`
      : '';

    let footer = '';
    if (task.totalSubtasks > 0) {
      const progress = renderProgressBar(ctx, task.progress);
      footer = `
<div class="${cls('card-footer')}">
  <span class="${cls('subtask-count')}">${task.completedSubtasks}/${task.totalSubtasks} subtasks</span>
</div>
${progress}`.trim();
    }

    return `
<div class="${cls('card')}">
  <div class="${cls('card-header')}">
    ${priority}
    <span class="${cls('card-title')}">${title}</span>
  </div>
  ${meta}
  ${footer}
</div>`.trim();
  }
}

export const kanbanRenderer = new KanbanViewRenderer();
