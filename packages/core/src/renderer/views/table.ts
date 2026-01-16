/**
 * Table View Renderer - Tabular task visualization
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../theme';
import { getBaseStyles, renderStatusIcon, renderTags } from '../base';
import { escapeHtml, toRenderableTasks, flattenTasks } from '../utils';

export class TableViewRenderer implements ViewRenderer {
  readonly viewType = 'table' as const;

  render(ctx: RenderContext): string {
    const { cls, document, options } = ctx;
    const tasks = toRenderableTasks(document.tasks);
    const flat = flattenTasks(tasks);

    // Determine visible columns from options or use defaults
    const columnsOpt = options.viewOptions?.columns;
    const columns = columnsOpt
      ? columnsOpt.split(',').map(c => c.trim())
      : ['status', 'description', 'priority', 'assignee', 'due', 'tags'];

    const headerRow = this.renderHeaderRow(ctx, columns);
    const bodyRows = flat.map(task => this.renderRow(ctx, task, columns)).join('');

    return `
<div class="${cls('container')} ${cls('table-view')}">
  <table class="${cls('table')}">
    <thead>${headerRow}</thead>
    <tbody>${bodyRows}</tbody>
  </table>
</div>`.trim();
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('table-view')} {
  overflow-x: auto;
}

.${cls('table')} {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--taskml-font-family);
}

.${cls('table')} th,
.${cls('table')} td {
  padding: var(--taskml-space-sm) var(--taskml-space-md);
  text-align: left;
  border-bottom: 1px solid var(--taskml-border-light);
}

.${cls('table')} th {
  background: var(--taskml-bg-secondary);
  font-weight: 600;
  color: var(--taskml-text);
  border-bottom: 2px solid var(--taskml-border);
  white-space: nowrap;
}

.${cls('table')} tr:hover {
  background: var(--taskml-bg-hover);
}

.${cls('table')} td.${cls('col-status')} {
  width: 120px;
}

.${cls('table')} td.${cls('col-priority')} {
  width: 80px;
}

.${cls('table')} td.${cls('col-assignee')} {
  width: 120px;
}

.${cls('table')} td.${cls('col-due')} {
  width: 100px;
}

.${cls('table')} td.${cls('col-estimate')} {
  width: 80px;
}

.${cls('table')} td.${cls('col-progress')} {
  width: 100px;
}

.${cls('status-cell')} {
  display: flex;
  align-items: center;
  gap: var(--taskml-space-xs);
}

.${cls('priority-badge')} {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: var(--taskml-radius-sm);
  font-size: var(--taskml-font-size-sm);
  font-weight: 500;
}

.${cls('progress-cell')} {
  display: flex;
  align-items: center;
  gap: var(--taskml-space-xs);
}

.${cls('progress-bar-mini')} {
  width: 60px;
  height: 6px;
  background: var(--taskml-bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.${cls('progress-fill-mini')} {
  height: 100%;
  background: var(--taskml-status-progress);
  border-radius: 3px;
}

.${cls('no-data')} {
  color: var(--taskml-text-muted);
}
`.trim();
  }

  private renderHeaderRow(ctx: RenderContext, columns: string[]): string {
    const { cls } = ctx;
    const headers: Record<string, string> = {
      status: 'Status',
      description: 'Description',
      priority: 'Priority',
      assignee: 'Assignee',
      due: 'Due',
      estimate: 'Estimate',
      tags: 'Tags',
      progress: 'Progress',
    };

    const cells = columns.map(col => `<th class="${cls(`col-${col}`)}">${headers[col] || col}</th>`).join('');
    return `<tr>${cells}</tr>`;
  }

  private renderRow(ctx: RenderContext, task: RenderableTask, columns: string[]): string {
    const cells = columns.map(col => this.renderCell(ctx, task, col)).join('');
    return `<tr>${cells}</tr>`;
  }

  private renderCell(ctx: RenderContext, task: RenderableTask, column: string): string {
    const { cls } = ctx;

    switch (column) {
      case 'status': {
        const config = STATUS_CONFIG[task.status];
        const icon = renderStatusIcon(ctx, task.status);
        return `<td class="${cls('col-status')}"><div class="${cls('status-cell')}">${icon}<span>${config.label}</span></div></td>`;
      }
      case 'description':
        return `<td class="${cls('col-description')}">${escapeHtml(task.description)}</td>`;
      case 'priority': {
        if (task.priority === undefined) {
          return `<td class="${cls('col-priority')}"><span class="${cls('no-data')}">—</span></td>`;
        }
        const config = PRIORITY_CONFIG[task.priority];
        return `<td class="${cls('col-priority')}"><span class="${cls('priority-badge')}" style="background: ${config?.bgColor || 'var(--taskml-bg-secondary)'}; color: ${config?.color || 'inherit'}">${config?.label || `P${task.priority}`}</span></td>`;
      }
      case 'assignee':
        return `<td class="${cls('col-assignee')}">${task.assignee ? escapeHtml(task.assignee) : `<span class="${cls('no-data')}">—</span>`}</td>`;
      case 'due':
        return `<td class="${cls('col-due')}">${task.due ? escapeHtml(task.due) : `<span class="${cls('no-data')}">—</span>`}</td>`;
      case 'estimate':
        return `<td class="${cls('col-estimate')}">${task.estimate ? escapeHtml(task.estimate) : `<span class="${cls('no-data')}">—</span>`}</td>`;
      case 'tags':
        return `<td class="${cls('col-tags')}">${task.tags && task.tags.length > 0 ? renderTags(ctx, task.tags) : `<span class="${cls('no-data')}">—</span>`}</td>`;
      case 'progress': {
        if (task.totalSubtasks === 0) {
          return `<td class="${cls('col-progress')}"><span class="${cls('no-data')}">—</span></td>`;
        }
        const pct = Math.round(task.progress * 100);
        return `<td class="${cls('col-progress')}"><div class="${cls('progress-cell')}"><div class="${cls('progress-bar-mini')}"><div class="${cls('progress-fill-mini')}" style="width: ${pct}%"></div></div><span>${pct}%</span></div></td>`;
      }
      default:
        return `<td>—</td>`;
    }
  }
}

export const tableRenderer = new TableViewRenderer();
