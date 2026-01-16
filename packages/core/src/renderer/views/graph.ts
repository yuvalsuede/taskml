/**
 * Graph View Renderer - Beautiful dependency graph visualization
 * Inspired by mermaid.live mind maps
 */

import type { ViewRenderer, RenderContext, RenderableTask } from '../types';
import { STATUS_CONFIG } from '../theme';
import { getBaseStyles } from '../base';
import { escapeHtml, toRenderableTasks, getAllTasks, flattenTasks } from '../utils';

interface GraphNode {
  task: RenderableTask;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
  color: string;
}

interface GraphEdge {
  from: string;
  to: string;
}

// Color palette for nodes (mermaid-inspired)
const NODE_COLORS = [
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#6366F1', // Indigo
];

export class GraphViewRenderer implements ViewRenderer {
  readonly viewType = 'graph' as const;

  render(ctx: RenderContext): string {
    const { cls, document } = ctx;
    const tasks = toRenderableTasks(getAllTasks(document));
    const flat = flattenTasks(tasks);

    // Only show tasks that have IDs (can be referenced) or have dependencies
    const graphTasks = flat.filter(t => t.id || t.dependsOn?.length || t.blockedBy?.length);

    // If no graph-worthy tasks, show all top-level tasks
    const displayTasks = graphTasks.length > 0 ? graphTasks : tasks.slice(0, 10);

    // Build graph data
    const { nodes, edges } = this.buildGraph(displayTasks);

    if (nodes.length === 0) {
      return `
<div class="${cls('container')} ${cls('graph-view')}">
  <div class="${cls('graph-empty')}">
    <p>No tasks to display</p>
    <p class="${cls('graph-hint')}">Add task IDs with ^taskid and dependencies with depends:</p>
  </div>
</div>`.trim();
    }

    // Calculate canvas size
    const contentWidth = Math.max(...nodes.map(n => n.x + n.width)) + 40;
    const contentHeight = Math.max(...nodes.map(n => n.y + n.height)) + 40;

    // Render
    const edgeElements = edges.map(edge => this.renderEdge(nodes, edge)).join('');
    const nodeElements = nodes.map(node => this.renderNode(ctx, node)).join('');

    return `
<div class="${cls('container')} ${cls('graph-view')}">
  <div class="${cls('graph-canvas')}">
    <svg class="${cls('graph-svg')}" width="${contentWidth}" height="${contentHeight}" viewBox="0 0 ${contentWidth} ${contentHeight}">
      <defs>
        <marker id="taskml-arrow" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,10 L12,5 z" fill="rgba(255,255,255,0.6)" />
        </marker>
      </defs>
      <g class="${cls('graph-edges')}">${edgeElements}</g>
      <g class="${cls('graph-nodes')}">${nodeElements}</g>
    </svg>
  </div>
</div>`.trim();
  }

  getStyles(ctx: RenderContext): string {
    const { cls } = ctx;

    return `
${getBaseStyles(ctx)}

.${cls('container')}.${cls('graph-view')} {
  background: transparent;
  border-radius: 0;
}

.${cls('graph-canvas')} {
  padding: 40px;
}

.${cls('graph-svg')} {
  display: block;
  font-family: var(--taskml-font-family);
}

.${cls('graph-empty')} {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: rgba(255,255,255,0.6);
  text-align: center;
}

.${cls('graph-hint')} {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  margin-top: 8px;
}

.${cls('graph-node-bg')} {
  rx: 8;
  ry: 8;
}

.${cls('graph-node-title')} {
  font-size: 14px;
  font-weight: 600;
  fill: white;
}

.${cls('graph-node-id')} {
  font-size: 11px;
  fill: rgba(255,255,255,0.7);
}

.${cls('graph-node-status')} {
  font-size: 16px;
}

.${cls('graph-edge')} {
  fill: none;
  stroke: rgba(255,255,255,0.4);
  stroke-width: 2;
  marker-end: url(#taskml-arrow);
}
`.trim();
  }

  private buildGraph(tasks: RenderableTask[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const taskMap = new Map<string, RenderableTask>();

    // Build task lookup
    for (const task of tasks) {
      const id = task.id || task.key;
      taskMap.set(id, task);
    }

    // Calculate dependency levels
    const levels = new Map<string, number>();

    function getLevel(taskId: string, visited = new Set<string>()): number {
      if (levels.has(taskId)) return levels.get(taskId)!;
      if (visited.has(taskId)) return 0; // Circular dependency

      visited.add(taskId);
      const task = taskMap.get(taskId);
      if (!task) return 0;

      const deps = [...(task.dependsOn || []), ...(task.blockedBy || [])];
      if (deps.length === 0) {
        levels.set(taskId, 0);
        return 0;
      }

      const maxDepLevel = Math.max(0, ...deps.map(d => getLevel(d, new Set(visited))));
      const level = maxDepLevel + 1;
      levels.set(taskId, level);
      return level;
    }

    for (const task of tasks) {
      getLevel(task.id || task.key);
    }

    // Group by level
    const byLevel = new Map<number, RenderableTask[]>();
    for (const task of tasks) {
      const id = task.id || task.key;
      const level = levels.get(id) || 0;
      if (!byLevel.has(level)) byLevel.set(level, []);
      byLevel.get(level)!.push(task);
    }

    // Position nodes - large nodes with generous spacing like mermaid
    const nodeWidth = 160;
    const nodeHeight = 52;
    const xGap = 80;
    const yGap = 30;
    const startX = 40;
    const startY = 40;

    // Center each level vertically
    const levelHeights = new Map<number, number>();

    for (const [level, levelTasks] of byLevel) {
      levelHeights.set(level, levelTasks.length * (nodeHeight + yGap) - yGap);
    }

    const maxHeight = Math.max(...Array.from(levelHeights.values()));

    for (const [level, levelTasks] of byLevel) {
      const levelHeight = levelHeights.get(level) || 0;
      const yOffset = (maxHeight - levelHeight) / 2;

      levelTasks.forEach((task, idx) => {
        const colorIndex = (level + idx) % NODE_COLORS.length;
        nodes.push({
          task,
          x: startX + level * (nodeWidth + xGap),
          y: startY + yOffset + idx * (nodeHeight + yGap),
          width: nodeWidth,
          height: nodeHeight,
          level,
          color: NODE_COLORS[colorIndex],
        });
      });
    }

    // Build edges
    for (const task of tasks) {
      const toId = task.id || task.key;

      if (task.dependsOn) {
        for (const fromId of task.dependsOn) {
          if (taskMap.has(fromId)) {
            edges.push({ from: fromId, to: toId });
          }
        }
      }

      if (task.blockedBy) {
        for (const fromId of task.blockedBy) {
          if (taskMap.has(fromId)) {
            edges.push({ from: fromId, to: toId });
          }
        }
      }
    }

    return { nodes, edges };
  }

  private renderNode(ctx: RenderContext, node: GraphNode): string {
    const { cls } = ctx;
    const { task, x, y, width, height, color } = node;
    const config = STATUS_CONFIG[task.status];
    const desc = escapeHtml(task.description);
    const truncDesc = desc.length > 18 ? desc.slice(0, 16) + '...' : desc;
    const id = task.id || task.key;

    return `
<g transform="translate(${x}, ${y})">
  <rect class="${cls('graph-node-bg')}" width="${width}" height="${height}" fill="${color}" />
  <text class="${cls('graph-node-status')}" x="12" y="22">${config.icon}</text>
  <text class="${cls('graph-node-title')}" x="32" y="22">${truncDesc}</text>
  <text class="${cls('graph-node-id')}" x="12" y="40">${escapeHtml(id)}</text>
</g>`.trim();
  }

  private renderEdge(nodes: GraphNode[], edge: GraphEdge): string {
    const fromNode = nodes.find(n => (n.task.id || n.task.key) === edge.from);
    const toNode = nodes.find(n => (n.task.id || n.task.key) === edge.to);

    if (!fromNode || !toNode) return '';

    // Calculate connection points
    const x1 = fromNode.x + fromNode.width;
    const y1 = fromNode.y + fromNode.height / 2;
    const x2 = toNode.x;
    const y2 = toNode.y + toNode.height / 2;

    // Create smooth bezier curve
    const dx = x2 - x1;
    const controlOffset = Math.min(Math.abs(dx) * 0.5, 80);

    const path = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`;

    return `<path class="taskml-graph-edge" d="${path}" />`;
  }
}

export const graphRenderer = new GraphViewRenderer();
