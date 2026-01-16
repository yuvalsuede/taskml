/**
 * Tree View Renderer - Hierarchical tree visualization
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import {
  getBaseStyles,
  renderStatusIcon,
  renderPriority,
  renderTags,
  renderAssignee,
} from '../base';
import { escapeHtml, toRenderableTasks } from '../utils';

export class TreeViewRenderer implements ViewRenderer {
  readonly viewType = 'tree' as const;

  render(ctx: RenderContext): string {
    const { cls, document } = ctx;
    const tasks = toRenderableTasks(document.tasks);

    const treeHtml = tasks.map(task => this.renderNode(ctx, task)).join('');

    return `<div class="${cls('container')} ${cls('tree-view')}"><div class="${cls('tree')}">${treeHtml}</div></div>`;
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('tree-view')} {
  padding: var(--taskml-space-md);
}

.${cls('tree')} {
  font-family: var(--taskml-font-family);
}

.${cls('tree-node')} {
  position: relative;
}

.${cls('tree-item')} {
  display: flex;
  align-items: flex-start;
  gap: var(--taskml-space-sm);
  padding: var(--taskml-space-sm) 0;
  cursor: pointer;
  border-radius: var(--taskml-radius-sm);
}

.${cls('tree-item')}:hover {
  background: var(--taskml-bg-hover);
}

.${cls('tree-toggle')} {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--taskml-text-secondary);
  flex-shrink: 0;
  user-select: none;
}

.${cls('tree-toggle')}:empty::after {
  content: '';
  width: 0.5rem;
}

.${cls('tree-content')} {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--taskml-space-sm);
  flex-wrap: wrap;
}

.${cls('tree-description')} {
  flex: 1;
  min-width: 200px;
}

.${cls('tree-children')} {
  margin-left: 1.5rem;
  padding-left: var(--taskml-space-md);
  border-left: 1px dashed var(--taskml-border);
}

.${cls('tree-meta')} {
  display: flex;
  align-items: center;
  gap: var(--taskml-space-xs);
  flex-wrap: wrap;
}

.${cls('tree-leaf')} .${cls('tree-toggle')} {
  visibility: hidden;
}
`.trim();
  }

  private renderNode(ctx: RenderContext, task: RenderableTask): string {
    const { cls } = ctx;
    const hasChildren = task.subtasks && task.subtasks.length > 0;
    const leafClass = hasChildren ? '' : ` ${cls('tree-leaf')}`;

    const toggle = hasChildren ? '▼' : '';
    const statusIcon = renderStatusIcon(ctx, task.status);
    const priority = task.priority !== undefined ? renderPriority(ctx, task.priority) : '';
    const tags = task.tags && task.tags.length > 0 ? renderTags(ctx, task.tags) : '';
    const assignee = task.assignee ? renderAssignee(ctx, task.assignee) : '';
    const description = escapeHtml(task.description);

    const meta = (priority || tags || assignee)
      ? `<div class="${cls('tree-meta')}">${priority}${tags}${assignee}</div>`
      : '';

    const children = hasChildren
      ? `<div class="${cls('tree-children')}">${(task.subtasks as RenderableTask[]).map(t => this.renderNode(ctx, t)).join('')}</div>`
      : '';

    return `
<div class="${cls('tree-node')}${leafClass}">
  <div class="${cls('tree-item')}">
    <span class="${cls('tree-toggle')}">${toggle}</span>
    ${statusIcon}
    <div class="${cls('tree-content')}">
      <span class="${cls('tree-description')}">${description}</span>
      ${meta}
    </div>
  </div>
  ${children}
</div>`.trim();
  }
}

export const treeRenderer = new TreeViewRenderer();
