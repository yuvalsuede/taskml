/**
 * Timeline View Renderer - Gantt-style timeline visualization
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import { getBaseStyles, renderStatusIcon, renderPriority } from '../base';
import { escapeHtml, toRenderableTasks, flattenTasks } from '../utils';

export class TimelineViewRenderer implements ViewRenderer {
  readonly viewType = 'timeline' as const;

  render(ctx: RenderContext): string {
    const { cls, document } = ctx;
    const tasks = toRenderableTasks(document.tasks);
    const flat = flattenTasks(tasks);

    // Parse due dates and estimates to create timeline bars
    const timelineTasks = flat.map(task => ({
      ...task,
      parsedDue: task.due ? this.parseDate(task.due) : null,
      parsedEstimate: task.estimate ? this.parseEstimate(task.estimate) : null,
    }));

    const rows = timelineTasks.map(task => this.renderRow(ctx, task)).join('');

    return `
<div class="${cls('container')} ${cls('timeline-view')}">
  <div class="${cls('timeline-header')}">
    <div class="${cls('timeline-label-col')}">Task</div>
    <div class="${cls('timeline-bar-col')}">Timeline</div>
  </div>
  <div class="${cls('timeline-body')}">${rows}</div>
</div>`.trim();
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('timeline-view')} {
  overflow-x: auto;
}

.${cls('timeline-header')} {
  display: flex;
  border-bottom: 2px solid var(--taskml-border);
  font-weight: 600;
  padding: var(--taskml-space-sm) var(--taskml-space-md);
  background: var(--taskml-bg-secondary);
}

.${cls('timeline-label-col')} {
  flex: 0 0 300px;
  padding-right: var(--taskml-space-md);
}

.${cls('timeline-bar-col')} {
  flex: 1;
  min-width: 400px;
}

.${cls('timeline-body')} {
  min-width: max-content;
}

.${cls('timeline-row')} {
  display: flex;
  border-bottom: 1px solid var(--taskml-border-light);
  padding: var(--taskml-space-sm) var(--taskml-space-md);
  align-items: center;
}

.${cls('timeline-row')}:hover {
  background: var(--taskml-bg-hover);
}

.${cls('timeline-task')} {
  flex: 0 0 300px;
  display: flex;
  align-items: center;
  gap: var(--taskml-space-sm);
  padding-right: var(--taskml-space-md);
}

.${cls('timeline-task-info')} {
  flex: 1;
  overflow: hidden;
}

.${cls('timeline-task-name')} {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.${cls('timeline-task-meta')} {
  font-size: var(--taskml-font-size-sm);
  color: var(--taskml-text-secondary);
}

.${cls('timeline-bar-area')} {
  flex: 1;
  min-width: 400px;
  height: 24px;
  position: relative;
  background: var(--taskml-bg-secondary);
  border-radius: var(--taskml-radius-sm);
}

.${cls('timeline-bar')} {
  position: absolute;
  height: 100%;
  border-radius: var(--taskml-radius-sm);
  min-width: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--taskml-font-size-sm);
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 var(--taskml-space-xs);
}

.${cls('timeline-bar-pending')} {
  background: var(--taskml-status-pending);
}

.${cls('timeline-bar-in_progress')} {
  background: var(--taskml-status-progress);
}

.${cls('timeline-bar-completed')} {
  background: var(--taskml-status-completed);
}

.${cls('timeline-bar-blocked')} {
  background: var(--taskml-status-blocked);
}

.${cls('timeline-bar-cancelled')} {
  background: var(--taskml-status-cancelled);
}

.${cls('timeline-bar-review')} {
  background: var(--taskml-status-review);
}

.${cls('timeline-no-date')} {
  color: var(--taskml-text-muted);
  font-size: var(--taskml-font-size-sm);
  font-style: italic;
}
`.trim();
  }

  private renderRow(ctx: RenderContext, task: RenderableTask & { parsedDue: Date | null; parsedEstimate: number | null }): string {
    const { cls } = ctx;
    const statusIcon = renderStatusIcon(ctx, task.status);
    const priority = task.priority !== undefined ? renderPriority(ctx, task.priority) : '';
    const description = escapeHtml(task.description);

    const meta = [];
    if (task.due) meta.push(`Due: ${task.due}`);
    if (task.estimate) meta.push(`Est: ${task.estimate}`);
    const metaHtml = meta.length > 0 ? `<div class="${cls('timeline-task-meta')}">${meta.join(' | ')}</div>` : '';

    let barHtml: string;
    if (task.parsedDue || task.parsedEstimate) {
      // Simplified visualization - bar width based on estimate or fixed width
      const width = task.parsedEstimate ? Math.min(task.parsedEstimate * 10, 80) : 20;
      barHtml = `<div class="${cls('timeline-bar')} ${cls(`timeline-bar-${task.status}`)}" style="left: 10%; width: ${width}%;">${task.estimate || ''}</div>`;
    } else {
      barHtml = `<span class="${cls('timeline-no-date')}">No timeline data</span>`;
    }

    return `
<div class="${cls('timeline-row')}">
  <div class="${cls('timeline-task')}">
    ${statusIcon}
    ${priority}
    <div class="${cls('timeline-task-info')}">
      <div class="${cls('timeline-task-name')}">${description}</div>
      ${metaHtml}
    </div>
  </div>
  <div class="${cls('timeline-bar-area')}">${barHtml}</div>
</div>`.trim();
  }

  private parseDate(dateStr: string): Date | null {
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private parseEstimate(estimate: string): number | null {
    // Parse estimates like "2h", "3d", "1w"
    const match = estimate.match(/^(\d+(?:\.\d+)?)\s*(h|d|w|m)?$/i);
    if (!match) return null;

    const value = parseFloat(match[1]);
    const unit = (match[2] || 'h').toLowerCase();

    switch (unit) {
      case 'h': return value;
      case 'd': return value * 8; // 8 hours per day
      case 'w': return value * 40; // 40 hours per week
      case 'm': return value * 160; // 160 hours per month
      default: return value;
    }
  }
}

export const timelineRenderer = new TimelineViewRenderer();
