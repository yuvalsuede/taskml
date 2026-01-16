/**
 * List View Renderer
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import {
  getBaseStyles,
  renderStatusIcon,
  renderTaskMeta,
  renderProgressBar,
  renderCriteria,
  renderNotes,
} from '../base';
import { escapeHtml, toRenderableTasks } from '../utils';

export class ListViewRenderer implements ViewRenderer {
  readonly viewType = 'list' as const;

  render(ctx: RenderContext): string {
    const { cls, document } = ctx;
    const tasks = toRenderableTasks(document.tasks);

    const header = this.renderHeader(ctx);
    const taskList = this.renderTasks(ctx, tasks);

    return `<div class="${cls('container')} ${cls('list-view')}">${header}${taskList}</div>`;
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('list-view')} {
  max-width: 800px;
}

.${cls('header')} {
  padding: var(--taskml-space-md);
  border-bottom: 1px solid var(--taskml-border);
  margin-bottom: var(--taskml-space-md);
}

.${cls('title')} {
  font-size: var(--taskml-font-size-lg);
  font-weight: 600;
  margin: 0;
}

.${cls('subtitle')} {
  color: var(--taskml-text-secondary);
  margin-top: var(--taskml-space-xs);
}

.${cls('task-list')} {
  list-style: none;
  margin: 0;
  padding: 0;
}

.${cls('task-item')} {
  border-bottom: 1px solid var(--taskml-border-light);
}

.${cls('task-item')}:last-child {
  border-bottom: none;
}

.${cls('subtasks')} {
  margin-left: var(--taskml-space-lg);
  border-left: 2px solid var(--taskml-border-light);
}

.${cls('task-depth-1')} {
  padding-left: var(--taskml-space-sm);
}

.${cls('task-depth-2')} {
  padding-left: var(--taskml-space-sm);
}
`.trim();
  }

  private renderHeader(ctx: RenderContext): string {
    const { cls, document } = ctx;
    const { directives } = document;

    if (!directives.project && !directives.sprint) {
      return '';
    }

    const title = directives.project
      ? `<h1 class="${cls('title')}">${escapeHtml(directives.project)}</h1>`
      : '';
    const subtitle = directives.sprint
      ? `<p class="${cls('subtitle')}">${escapeHtml(directives.sprint)}</p>`
      : '';

    return `<div class="${cls('header')}">${title}${subtitle}</div>`;
  }

  private renderTasks(ctx: RenderContext, tasks: RenderableTask[]): string {
    const { cls } = ctx;

    const items = tasks.map(task => this.renderTask(ctx, task));

    return `<ul class="${cls('task-list')}">${items.join('')}</ul>`;
  }

  private renderTask(ctx: RenderContext, task: RenderableTask): string {
    const { cls } = ctx;

    const statusIcon = renderStatusIcon(ctx, task.status);
    const description = `<span class="${cls('task-description')}">${escapeHtml(task.description)}</span>`;
    const meta = renderTaskMeta(ctx, task);
    const progress = task.totalSubtasks > 0 ? renderProgressBar(ctx, task.progress) : '';
    const criteria = renderCriteria(ctx, task);
    const notes = renderNotes(ctx, task);

    const subtasks = task.subtasks && task.subtasks.length > 0
      ? `<div class="${cls('subtasks')}">${this.renderTasks(ctx, task.subtasks as RenderableTask[])}</div>`
      : '';

    const depthClass = task.depth > 0 ? ` ${cls(`task-depth-${Math.min(task.depth, 2)}`)}` : '';

    return `
<li class="${cls('task-item')}${depthClass}">
  <div class="${cls('task')}">
    ${statusIcon}
    <div class="${cls('task-content')}">
      ${description}
      ${meta}
      ${progress}
      ${criteria}
      ${notes}
    </div>
  </div>
  ${subtasks}
</li>`.trim();
  }
}

export const listRenderer = new ListViewRenderer();
