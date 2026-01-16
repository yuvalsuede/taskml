/**
 * Graph View Renderer - Dependency graph visualization
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import { STATUS_CONFIG } from '../theme';
import { getBaseStyles } from '../base';
import { escapeHtml, toRenderableTasks, flattenTasks } from '../utils';

interface GraphNode {
  task: RenderableTask;
  x: number;
  y: number;
  level: number;
}

interface GraphEdge {
  from: string;
  to: string;
  type: 'depends' | 'blocked';
}

export class GraphViewRenderer implements ViewRenderer {
  readonly viewType = 'graph' as const;

  render(ctx: RenderContext): string {
    const { cls, document } = ctx;
    const tasks = toRenderableTasks(document.tasks);
    const flat = flattenTasks(tasks);

    // Build graph data
    const { nodes, edges } = this.buildGraph(flat);

    // Render nodes and edges
    const nodeElements = nodes.map(node => this.renderNode(ctx, node)).join('');
    const edgeElements = edges.map(edge => this.renderEdge(ctx, nodes, edge)).join('');

    const width = Math.max(...nodes.map(n => n.x)) + 280;
    const height = Math.max(...nodes.map(n => n.y)) + 100;

    return `
<div class="${cls('container')} ${cls('graph-view')}">
  <svg class="${cls('graph-svg')}" viewBox="0 0 ${width} ${height}" style="min-width: ${width}px; min-height: ${height}px;">
    <defs>
      <marker id="arrowhead-depends" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="var(--taskml-status-progress)" />
      </marker>
      <marker id="arrowhead-blocked" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="var(--taskml-status-blocked)" />
      </marker>
    </defs>
    <g class="${cls('graph-edges')}">${edgeElements}</g>
    <g class="${cls('graph-nodes')}">${nodeElements}</g>
  </svg>
  ${this.renderLegend(ctx)}
</div>`.trim();
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('graph-view')} {
  overflow: auto;
  padding: var(--taskml-space-md);
}

.${cls('graph-svg')} {
  display: block;
  font-family: var(--taskml-font-family);
}

.${cls('graph-node')} {
  cursor: pointer;
}

.${cls('graph-node-rect')} {
  fill: var(--taskml-bg);
  stroke: var(--taskml-border);
  stroke-width: 1;
  rx: 6;
  transition: stroke 0.15s;
}

.${cls('graph-node')}:hover .${cls('graph-node-rect')} {
  stroke: var(--taskml-status-progress);
  stroke-width: 2;
}

.${cls('graph-node-status')} {
  font-size: 14px;
}

.${cls('graph-node-text')} {
  font-size: 13px;
  fill: var(--taskml-text);
}

.${cls('graph-node-id')} {
  font-size: 10px;
  fill: var(--taskml-text-muted);
}

.${cls('graph-edge')} {
  fill: none;
  stroke-width: 2;
}

.${cls('graph-edge-depends')} {
  stroke: var(--taskml-status-progress);
}

.${cls('graph-edge-blocked')} {
  stroke: var(--taskml-status-blocked);
  stroke-dasharray: 5,3;
}

.${cls('graph-legend')} {
  display: flex;
  gap: var(--taskml-space-md);
  padding: var(--taskml-space-md);
  margin-top: var(--taskml-space-md);
  background: var(--taskml-bg-secondary);
  border-radius: var(--taskml-radius-md);
  font-size: var(--taskml-font-size-sm);
}

.${cls('legend-item')} {
  display: flex;
  align-items: center;
  gap: var(--taskml-space-xs);
}

.${cls('legend-line')} {
  width: 24px;
  height: 2px;
}

.${cls('legend-depends')} {
  background: var(--taskml-status-progress);
}

.${cls('legend-blocked')} {
  background: var(--taskml-status-blocked);
  background: repeating-linear-gradient(
    90deg,
    var(--taskml-status-blocked) 0,
    var(--taskml-status-blocked) 5px,
    transparent 5px,
    transparent 8px
  );
}
`.trim();
  }

  private buildGraph(tasks: RenderableTask[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const taskMap = new Map<string, RenderableTask>();

    // Build task lookup by id or key
    for (const task of tasks) {
      const id = task.id || task.key;
      taskMap.set(id, task);
    }

    // Compute levels based on dependencies
    const levels = new Map<string, number>();

    function getLevel(taskId: string): number {
      if (levels.has(taskId)) return levels.get(taskId)!;

      const task = taskMap.get(taskId);
      if (!task) return 0;

      const deps = [...(task.dependsOn || []), ...(task.blockedBy || [])];
      if (deps.length === 0) {
        levels.set(taskId, 0);
        return 0;
      }

      const maxDepLevel = Math.max(...deps.map(d => getLevel(d)));
      const level = maxDepLevel + 1;
      levels.set(taskId, level);
      return level;
    }

    // Calculate levels for all tasks
    for (const task of tasks) {
      const id = task.id || task.key;
      getLevel(id);
    }

    // Group tasks by level for positioning
    const byLevel = new Map<number, RenderableTask[]>();
    for (const task of tasks) {
      const id = task.id || task.key;
      const level = levels.get(id) || 0;
      if (!byLevel.has(level)) byLevel.set(level, []);
      byLevel.get(level)!.push(task);
    }

    // Position nodes
    const nodeWidth = 240;
    const nodeHeight = 60;
    const xGap = 80;
    const yGap = 30;

    for (const [level, levelTasks] of byLevel) {
      levelTasks.forEach((task, idx) => {
        nodes.push({
          task,
          x: 40 + level * (nodeWidth + xGap),
          y: 40 + idx * (nodeHeight + yGap),
          level,
        });
      });
    }

    // Build edges
    for (const task of tasks) {
      const id = task.id || task.key;

      if (task.dependsOn) {
        for (const depId of task.dependsOn) {
          edges.push({ from: depId, to: id, type: 'depends' });
        }
      }

      if (task.blockedBy) {
        for (const blockerId of task.blockedBy) {
          edges.push({ from: blockerId, to: id, type: 'blocked' });
        }
      }
    }

    return { nodes, edges };
  }

  private renderNode(ctx: RenderContext, node: GraphNode): string {
    const { cls } = ctx;
    const { task, x, y } = node;
    const config = STATUS_CONFIG[task.status];
    const desc = escapeHtml(task.description);
    const truncDesc = desc.length > 30 ? desc.slice(0, 27) + '...' : desc;
    const id = task.id || task.key;

    return `
<g class="${cls('graph-node')}" transform="translate(${x}, ${y})">
  <rect class="${cls('graph-node-rect')}" width="240" height="56" />
  <text class="${cls('graph-node-status')}" x="12" y="24" style="fill: ${config.color}">${config.icon}</text>
  <text class="${cls('graph-node-text')}" x="34" y="24">${truncDesc}</text>
  <text class="${cls('graph-node-id')}" x="12" y="44">${escapeHtml(id)}</text>
</g>`.trim();
  }

  private renderEdge(ctx: RenderContext, nodes: GraphNode[], edge: GraphEdge): string {
    const { cls } = ctx;

    const fromNode = nodes.find(n => (n.task.id || n.task.key) === edge.from);
    const toNode = nodes.find(n => (n.task.id || n.task.key) === edge.to);

    if (!fromNode || !toNode) return '';

    const x1 = fromNode.x + 240;
    const y1 = fromNode.y + 28;
    const x2 = toNode.x;
    const y2 = toNode.y + 28;

    // Create curved path
    const midX = (x1 + x2) / 2;
    const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

    const markerEnd = `url(#arrowhead-${edge.type})`;

    return `<path class="${cls('graph-edge')} ${cls(`graph-edge-${edge.type}`)}" d="${path}" marker-end="${markerEnd}" />`;
  }

  private renderLegend(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
<div class="${cls('graph-legend')}">
  <div class="${cls('legend-item')}">
    <span class="${cls('legend-line')} ${cls('legend-depends')}"></span>
    <span>Depends on</span>
  </div>
  <div class="${cls('legend-item')}">
    <span class="${cls('legend-line')} ${cls('legend-blocked')}"></span>
    <span>Blocked by</span>
  </div>
</div>`.trim();
  }
}

export const graphRenderer = new GraphViewRenderer();
