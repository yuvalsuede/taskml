/**
 * Summary View Renderer - Statistics and overview
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../theme';
import { getBaseStyles } from '../base';
import { toRenderableTasks, getAllTasks, flattenTasks } from '../utils';
import type { TaskStatus } from '../../types';

interface SummaryStats {
  total: number;
  topLevel: number;
  completed: number;
  inProgress: number;
  pending: number;
  blocked: number;
}

export class SummaryViewRenderer implements ViewRenderer {
  readonly viewType = 'summary' as const;

  render(ctx: RenderContext): string {
    const { cls, document } = ctx;
    const tasks = toRenderableTasks(getAllTasks(document));
    const flat = flattenTasks(tasks);
    const stats = this.computeStats(tasks, flat);

    const header = this.renderHeader(ctx, document.directives);
    const overview = this.renderOverview(ctx, stats, flat);
    const statusBreakdown = this.renderStatusBreakdown(ctx, flat);
    const priorityBreakdown = this.renderPriorityBreakdown(ctx, flat);
    const assigneeBreakdown = this.renderAssigneeBreakdown(ctx, flat);

    return `
<div class="${cls('container')} ${cls('summary-view')}">
  ${header}
  ${overview}
  <div class="${cls('summary-grid')}">
    ${statusBreakdown}
    ${priorityBreakdown}
    ${assigneeBreakdown}
  </div>
</div>`.trim();
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('summary-view')} {
  padding: var(--taskml-space-md);
  max-width: 1200px;
}

.${cls('summary-header')} {
  margin-bottom: var(--taskml-space-lg);
}

.${cls('summary-title')} {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.${cls('summary-subtitle')} {
  color: var(--taskml-text-secondary);
  margin-top: var(--taskml-space-xs);
}

.${cls('summary-overview')} {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--taskml-space-md);
  margin-bottom: var(--taskml-space-lg);
}

.${cls('stat-card')} {
  background: var(--taskml-bg-secondary);
  border-radius: var(--taskml-radius-lg);
  padding: var(--taskml-space-md);
}

.${cls('stat-label')} {
  font-size: var(--taskml-font-size-sm);
  color: var(--taskml-text-secondary);
  margin-bottom: var(--taskml-space-xs);
}

.${cls('stat-value')} {
  font-size: 2rem;
  font-weight: 600;
}

.${cls('stat-sub')} {
  font-size: var(--taskml-font-size-sm);
  color: var(--taskml-text-muted);
  margin-top: var(--taskml-space-xs);
}

.${cls('summary-grid')} {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--taskml-space-md);
}

.${cls('breakdown-card')} {
  background: var(--taskml-bg-secondary);
  border-radius: var(--taskml-radius-lg);
  padding: var(--taskml-space-md);
}

.${cls('breakdown-title')} {
  font-weight: 600;
  margin-bottom: var(--taskml-space-md);
  padding-bottom: var(--taskml-space-sm);
  border-bottom: 1px solid var(--taskml-border);
}

.${cls('breakdown-item')} {
  display: flex;
  align-items: center;
  gap: var(--taskml-space-sm);
  padding: var(--taskml-space-xs) 0;
}

.${cls('breakdown-icon')} {
  width: 1.5rem;
  text-align: center;
}

.${cls('breakdown-label')} {
  flex: 1;
}

.${cls('breakdown-count')} {
  font-weight: 500;
}

.${cls('breakdown-bar')} {
  flex: 0 0 100px;
  height: 8px;
  background: var(--taskml-border-light);
  border-radius: 4px;
  overflow: hidden;
}

.${cls('breakdown-fill')} {
  height: 100%;
  border-radius: 4px;
}

.${cls('progress-ring')} {
  margin: var(--taskml-space-md) auto;
  display: block;
}
`.trim();
  }

  private computeStats(topLevel: RenderableTask[], flat: RenderableTask[]): SummaryStats {
    const stats: SummaryStats = {
      total: flat.length,
      topLevel: topLevel.length,
      completed: 0,
      inProgress: 0,
      pending: 0,
      blocked: 0,
    };

    for (const task of flat) {
      switch (task.status) {
        case 'completed':
          stats.completed++;
          break;
        case 'in_progress':
          stats.inProgress++;
          break;
        case 'pending':
          stats.pending++;
          break;
        case 'blocked':
          stats.blocked++;
          break;
      }
    }

    return stats;
  }

  private renderHeader(ctx: RenderContext, directives: Record<string, string>): string {
    const { cls } = ctx;

    if (!directives.project && !directives.sprint) {
      return '';
    }

    const title = directives.project || 'Task Summary';
    const subtitle = directives.sprint ? `Sprint: ${directives.sprint}` : '';

    return `
<div class="${cls('summary-header')}">
  <h1 class="${cls('summary-title')}">${title}</h1>
  ${subtitle ? `<p class="${cls('summary-subtitle')}">${subtitle}</p>` : ''}
</div>`.trim();
  }

  private renderOverview(ctx: RenderContext, stats: SummaryStats, tasks: RenderableTask[]): string {
    const { cls } = ctx;

    const completionPct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    // Calculate total estimate (simplified - just count hours)
    let totalHours = 0;
    for (const task of tasks) {
      if (task.estimate) {
        const match = task.estimate.match(/(\d+(?:\.\d+)?)\s*(h|d|w)?/i);
        if (match) {
          const val = parseFloat(match[1]);
          const unit = (match[2] || 'h').toLowerCase();
          if (unit === 'h') totalHours += val;
          else if (unit === 'd') totalHours += val * 8;
          else if (unit === 'w') totalHours += val * 40;
        }
      }
    }

    return `
<div class="${cls('summary-overview')}">
  <div class="${cls('stat-card')}">
    <div class="${cls('stat-label')}">Total Tasks</div>
    <div class="${cls('stat-value')}">${stats.total}</div>
    <div class="${cls('stat-sub')}">${stats.topLevel} top-level</div>
  </div>
  <div class="${cls('stat-card')}">
    <div class="${cls('stat-label')}">Completed</div>
    <div class="${cls('stat-value')}" style="color: var(--taskml-status-completed)">${stats.completed}</div>
    <div class="${cls('stat-sub')}">${completionPct}% done</div>
  </div>
  <div class="${cls('stat-card')}">
    <div class="${cls('stat-label')}">In Progress</div>
    <div class="${cls('stat-value')}" style="color: var(--taskml-status-progress)">${stats.inProgress}</div>
    <div class="${cls('stat-sub')}">${stats.pending} pending</div>
  </div>
  <div class="${cls('stat-card')}">
    <div class="${cls('stat-label')}">Estimated</div>
    <div class="${cls('stat-value')}">${totalHours > 0 ? `${totalHours}h` : '—'}</div>
    <div class="${cls('stat-sub')}">total effort</div>
  </div>
</div>`.trim();
  }

  private renderStatusBreakdown(ctx: RenderContext, tasks: RenderableTask[]): string {
    const { cls } = ctx;

    const counts = new Map<TaskStatus, number>();
    for (const task of tasks) {
      counts.set(task.status, (counts.get(task.status) || 0) + 1);
    }

    const total = tasks.length;
    const items = Object.entries(STATUS_CONFIG)
      .map(([status, config]) => {
        const count = counts.get(status as TaskStatus) || 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        return `
<div class="${cls('breakdown-item')}">
  <span class="${cls('breakdown-icon')}" style="color: ${config.color}">${config.icon}</span>
  <span class="${cls('breakdown-label')}">${config.label}</span>
  <span class="${cls('breakdown-count')}">${count}</span>
  <div class="${cls('breakdown-bar')}">
    <div class="${cls('breakdown-fill')}" style="width: ${pct}%; background: ${config.color}"></div>
  </div>
</div>`.trim();
      })
      .join('');

    return `
<div class="${cls('breakdown-card')}">
  <div class="${cls('breakdown-title')}">By Status</div>
  ${items}
</div>`.trim();
  }

  private renderPriorityBreakdown(ctx: RenderContext, tasks: RenderableTask[]): string {
    const { cls } = ctx;

    const counts = new Map<number, number>();
    let noPriority = 0;

    for (const task of tasks) {
      if (task.priority !== undefined) {
        counts.set(task.priority, (counts.get(task.priority) || 0) + 1);
      } else {
        noPriority++;
      }
    }

    const total = tasks.length;
    const items = Object.entries(PRIORITY_CONFIG)
      .map(([priority, config]) => {
        const count = counts.get(parseInt(priority)) || 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        return `
<div class="${cls('breakdown-item')}">
  <span class="${cls('breakdown-icon')}" style="color: ${config.color}">●</span>
  <span class="${cls('breakdown-label')}">${config.label}</span>
  <span class="${cls('breakdown-count')}">${count}</span>
  <div class="${cls('breakdown-bar')}">
    <div class="${cls('breakdown-fill')}" style="width: ${pct}%; background: ${config.color}"></div>
  </div>
</div>`.trim();
      })
      .join('');

    const noPriorityPct = total > 0 ? (noPriority / total) * 100 : 0;
    const noPriorityItem = `
<div class="${cls('breakdown-item')}">
  <span class="${cls('breakdown-icon')}" style="color: var(--taskml-text-muted)">○</span>
  <span class="${cls('breakdown-label')}">Unset</span>
  <span class="${cls('breakdown-count')}">${noPriority}</span>
  <div class="${cls('breakdown-bar')}">
    <div class="${cls('breakdown-fill')}" style="width: ${noPriorityPct}%; background: var(--taskml-text-muted)"></div>
  </div>
</div>`.trim();

    return `
<div class="${cls('breakdown-card')}">
  <div class="${cls('breakdown-title')}">By Priority</div>
  ${items}
  ${noPriorityItem}
</div>`.trim();
  }

  private renderAssigneeBreakdown(ctx: RenderContext, tasks: RenderableTask[]): string {
    const { cls } = ctx;

    const counts = new Map<string, number>();
    let unassigned = 0;

    for (const task of tasks) {
      if (task.assignee) {
        counts.set(task.assignee, (counts.get(task.assignee) || 0) + 1);
      } else {
        unassigned++;
      }
    }

    const total = tasks.length;

    // Sort by count descending
    const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

    const items = sorted
      .slice(0, 5) // Top 5 assignees
      .map(([assignee, count]) => {
        const pct = total > 0 ? (count / total) * 100 : 0;
        return `
<div class="${cls('breakdown-item')}">
  <span class="${cls('breakdown-icon')}">👤</span>
  <span class="${cls('breakdown-label')}">${assignee}</span>
  <span class="${cls('breakdown-count')}">${count}</span>
  <div class="${cls('breakdown-bar')}">
    <div class="${cls('breakdown-fill')}" style="width: ${pct}%; background: var(--taskml-status-progress)"></div>
  </div>
</div>`.trim();
      })
      .join('');

    const unassignedPct = total > 0 ? (unassigned / total) * 100 : 0;
    const unassignedItem = `
<div class="${cls('breakdown-item')}">
  <span class="${cls('breakdown-icon')}" style="color: var(--taskml-text-muted)">—</span>
  <span class="${cls('breakdown-label')}">Unassigned</span>
  <span class="${cls('breakdown-count')}">${unassigned}</span>
  <div class="${cls('breakdown-bar')}">
    <div class="${cls('breakdown-fill')}" style="width: ${unassignedPct}%; background: var(--taskml-text-muted)"></div>
  </div>
</div>`.trim();

    return `
<div class="${cls('breakdown-card')}">
  <div class="${cls('breakdown-title')}">By Assignee</div>
  ${items}
  ${unassignedItem}
</div>`.trim();
  }
}

export const summaryRenderer = new SummaryViewRenderer();
