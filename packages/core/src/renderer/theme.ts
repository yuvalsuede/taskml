/**
 * Theme - CSS variables and color system
 */

import type { StatusConfig, PriorityConfig } from './types';
import type { TaskStatus } from '../types';

/**
 * CSS Variables for theming
 */
export const CSS_VARS = {
  // Base colors
  '--taskml-bg': '#ffffff',
  '--taskml-bg-secondary': '#f8f9fa',
  '--taskml-bg-hover': '#f1f3f4',
  '--taskml-text': '#1f2937',
  '--taskml-text-secondary': '#6b7280',
  '--taskml-text-muted': '#9ca3af',
  '--taskml-border': '#e5e7eb',
  '--taskml-border-light': '#f3f4f6',

  // Status colors
  '--taskml-status-pending': '#6b7280',
  '--taskml-status-pending-bg': '#f3f4f6',
  '--taskml-status-progress': '#3b82f6',
  '--taskml-status-progress-bg': '#dbeafe',
  '--taskml-status-completed': '#10b981',
  '--taskml-status-completed-bg': '#d1fae5',
  '--taskml-status-blocked': '#ef4444',
  '--taskml-status-blocked-bg': '#fee2e2',
  '--taskml-status-cancelled': '#9ca3af',
  '--taskml-status-cancelled-bg': '#f3f4f6',
  '--taskml-status-review': '#f59e0b',
  '--taskml-status-review-bg': '#fef3c7',

  // Priority colors
  '--taskml-priority-0': '#ef4444',
  '--taskml-priority-0-bg': '#fee2e2',
  '--taskml-priority-1': '#f59e0b',
  '--taskml-priority-1-bg': '#fef3c7',
  '--taskml-priority-2': '#3b82f6',
  '--taskml-priority-2-bg': '#dbeafe',
  '--taskml-priority-3': '#6b7280',
  '--taskml-priority-3-bg': '#f3f4f6',

  // Criterion colors
  '--taskml-criterion-verified': '#10b981',
  '--taskml-criterion-failed': '#ef4444',
  '--taskml-criterion-pending': '#6b7280',

  // Spacing
  '--taskml-space-xs': '0.25rem',
  '--taskml-space-sm': '0.5rem',
  '--taskml-space-md': '1rem',
  '--taskml-space-lg': '1.5rem',
  '--taskml-space-xl': '2rem',

  // Typography
  '--taskml-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '--taskml-font-size-sm': '0.875rem',
  '--taskml-font-size-md': '1rem',
  '--taskml-font-size-lg': '1.125rem',

  // Borders
  '--taskml-radius-sm': '0.25rem',
  '--taskml-radius-md': '0.5rem',
  '--taskml-radius-lg': '0.75rem',

  // Shadows
  '--taskml-shadow-sm': '0 1px 2px rgba(0,0,0,0.05)',
  '--taskml-shadow-md': '0 4px 6px rgba(0,0,0,0.1)',
} as const;

/**
 * Dark theme overrides
 */
export const DARK_THEME_VARS: Record<string, string> = {
  '--taskml-bg': '#1f2937',
  '--taskml-bg-secondary': '#374151',
  '--taskml-bg-hover': '#4b5563',
  '--taskml-text': '#f9fafb',
  '--taskml-text-secondary': '#d1d5db',
  '--taskml-text-muted': '#9ca3af',
  '--taskml-border': '#4b5563',
  '--taskml-border-light': '#374151',
};

/**
 * Status configuration - Modern minimal icons
 */
export const STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
  pending: {
    label: 'Pending',
    icon: '',
    color: 'var(--taskml-status-pending)',
    bgColor: 'var(--taskml-status-pending-bg)',
  },
  in_progress: {
    label: 'In Progress',
    icon: '',
    color: 'var(--taskml-status-progress)',
    bgColor: 'var(--taskml-status-progress-bg)',
  },
  completed: {
    label: 'Completed',
    icon: '',
    color: 'var(--taskml-status-completed)',
    bgColor: 'var(--taskml-status-completed-bg)',
  },
  blocked: {
    label: 'Blocked',
    icon: '',
    color: 'var(--taskml-status-blocked)',
    bgColor: 'var(--taskml-status-blocked-bg)',
  },
  cancelled: {
    label: 'Cancelled',
    icon: '',
    color: 'var(--taskml-status-cancelled)',
    bgColor: 'var(--taskml-status-cancelled-bg)',
  },
  review: {
    label: 'Review',
    icon: '',
    color: 'var(--taskml-status-review)',
    bgColor: 'var(--taskml-status-review-bg)',
  },
};

/**
 * Priority configuration
 */
export const PRIORITY_CONFIG: Record<number, PriorityConfig> = {
  0: {
    label: 'Critical',
    color: 'var(--taskml-priority-0)',
    bgColor: 'var(--taskml-priority-0-bg)',
  },
  1: {
    label: 'High',
    color: 'var(--taskml-priority-1)',
    bgColor: 'var(--taskml-priority-1-bg)',
  },
  2: {
    label: 'Medium',
    color: 'var(--taskml-priority-2)',
    bgColor: 'var(--taskml-priority-2-bg)',
  },
  3: {
    label: 'Low',
    color: 'var(--taskml-priority-3)',
    bgColor: 'var(--taskml-priority-3-bg)',
  },
};

/**
 * Generate CSS variables string
 */
export function generateCSSVars(theme: 'light' | 'dark' | 'auto' = 'light'): string {
  const vars = { ...CSS_VARS };

  if (theme === 'dark') {
    Object.assign(vars, DARK_THEME_VARS);
  }

  const lines = Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`);

  if (theme === 'auto') {
    return `:root {\n${lines.join('\n')}\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n${Object.entries(DARK_THEME_VARS).map(([k, v]) => `    ${k}: ${v};`).join('\n')}\n  }\n}`;
  }

  return `:root {\n${lines.join('\n')}\n}`;
}
