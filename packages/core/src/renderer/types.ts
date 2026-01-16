/**
 * Renderer Types - Base interfaces for all view renderers
 */

import type { Document, Task, ViewType } from '../types';

/**
 * Options for rendering a TaskML document
 */
export interface RenderOptions {
  /** Output format */
  format?: 'html' | 'svg' | 'text';
  /** View type override (uses document view if not specified) */
  view?: ViewType;
  /** View-specific options */
  viewOptions?: Record<string, string>;
  /** Include inline styles */
  includeStyles?: boolean;
  /** Include CSS variables definition */
  includeCSSVars?: boolean;
  /** Custom CSS class prefix */
  classPrefix?: string;
  /** Theme name */
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Render context passed to renderers
 */
export interface RenderContext {
  document: Document;
  options: Required<RenderOptions>;
  /** Get CSS class with prefix */
  cls: (name: string) => string;
  /** Get CSS variable reference */
  cssVar: (name: string) => string;
}

/**
 * Base interface for all view renderers
 */
export interface ViewRenderer {
  /** View type this renderer handles */
  readonly viewType: ViewType;

  /** Render the document to HTML string */
  render(ctx: RenderContext): string;

  /** Get required CSS for this view */
  getStyles(ctx: RenderContext): string;
}

/**
 * Task with computed properties for rendering
 */
export interface RenderableTask extends Task {
  /** Unique key for React/rendering */
  key: string;
  /** Depth in hierarchy (0 = root) */
  depth: number;
  /** Parent task key */
  parentKey?: string;
  /** Flattened subtask count */
  totalSubtasks: number;
  /** Completed subtask count */
  completedSubtasks: number;
  /** Progress percentage (0-100) */
  progress: number;
}

/**
 * Status display configuration
 */
export interface StatusConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

/**
 * Priority display configuration
 */
export interface PriorityConfig {
  label: string;
  color: string;
  bgColor: string;
}
