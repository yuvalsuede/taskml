/**
 * TaskML Renderer
 */

import type { Document, ViewType } from '../types';
import type { ViewRenderer, RenderOptions } from './types';
import { createContext, resetKeyCounter } from './utils';
import { generateCSSVars } from './theme';
import { listRenderer } from './views/list';
import { kanbanRenderer } from './views/kanban';
import { treeRenderer } from './views/tree';
import { timelineRenderer } from './views/timeline';
import { tableRenderer } from './views/table';
import { graphRenderer } from './views/graph';
import { summaryRenderer } from './views/summary';

// Export types
export type { RenderOptions, RenderContext, ViewRenderer, RenderableTask } from './types';
export type { StatusConfig, PriorityConfig } from './types';

// Export utilities
export { createContext, toRenderableTasks, flattenTasks, groupByStatus, calculateStats } from './utils';
export { escapeHtml, formatEstimate, formatDate } from './utils';

// Export theme
export { CSS_VARS, DARK_THEME_VARS, STATUS_CONFIG, PRIORITY_CONFIG, generateCSSVars } from './theme';

// Export renderers
export { listRenderer, ListViewRenderer } from './views/list';
export { kanbanRenderer, KanbanViewRenderer } from './views/kanban';
export { treeRenderer, TreeViewRenderer } from './views/tree';
export { timelineRenderer, TimelineViewRenderer } from './views/timeline';
export { tableRenderer, TableViewRenderer } from './views/table';
export { graphRenderer, GraphViewRenderer } from './views/graph';
export { summaryRenderer, SummaryViewRenderer } from './views/summary';

/**
 * Registry of available view renderers
 */
const renderers = new Map<ViewType, ViewRenderer>();
renderers.set('list', listRenderer);
renderers.set('kanban', kanbanRenderer);
renderers.set('tree', treeRenderer);
renderers.set('timeline', timelineRenderer);
renderers.set('table', tableRenderer);
renderers.set('graph', graphRenderer);
renderers.set('summary', summaryRenderer);

/**
 * Register a custom view renderer
 */
export function registerRenderer(renderer: ViewRenderer): void {
  renderers.set(renderer.viewType, renderer);
}

/**
 * Get a renderer for a view type
 */
export function getRenderer(viewType: ViewType): ViewRenderer | undefined {
  return renderers.get(viewType);
}

/**
 * Render a TaskML document to HTML
 */
export function render(doc: Document, options: RenderOptions = {}): string {
  // Reset key counter for consistent output
  resetKeyCounter();

  const ctx = createContext(doc, options);
  const renderer = renderers.get(ctx.options.view);

  if (!renderer) {
    // Fallback to list view
    const fallback = renderers.get('list');
    if (!fallback) {
      return `<!-- No renderer available for view: ${ctx.options.view} -->`;
    }
    ctx.options.view = 'list';
    return renderWithRenderer(ctx, fallback);
  }

  return renderWithRenderer(ctx, renderer);
}

/**
 * Render with a specific renderer
 */
function renderWithRenderer(ctx: ReturnType<typeof createContext>, renderer: ViewRenderer): string {
  const parts: string[] = [];

  // Add CSS variables
  if (ctx.options.includeCSSVars) {
    parts.push(`<style>${generateCSSVars(ctx.options.theme)}</style>`);
  }

  // Add view-specific styles
  if (ctx.options.includeStyles) {
    parts.push(`<style>${renderer.getStyles(ctx)}</style>`);
  }

  // Render content
  parts.push(renderer.render(ctx));

  return parts.join('\n');
}

/**
 * Get just the styles for a view
 */
export function getStyles(viewType: ViewType, options: RenderOptions = {}): string {
  const ctx = createContext({ version: '1.1', directives: {}, tasks: [] }, options);
  const renderer = renderers.get(viewType);

  if (!renderer) return '';

  const parts: string[] = [];

  if (ctx.options.includeCSSVars) {
    parts.push(generateCSSVars(ctx.options.theme));
  }

  parts.push(renderer.getStyles(ctx));

  return parts.join('\n\n');
}

/**
 * Get available view types
 */
export function getAvailableViews(): ViewType[] {
  return Array.from(renderers.keys());
}
