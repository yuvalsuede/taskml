/**
 * Shared TypeScript types for the playground
 */

import type { Document, ParseError, ViewType, Task } from '../../../core/src';

export type { Document, ParseError, ViewType, Task };

export type ThemeMode = 'light' | 'dark' | 'auto';

export type DialogType = 'share' | 'export' | 'settings' | 'examples' | 'shortcuts' | 'diagrams' | 'save' | null;

export type MobileTab = 'editor' | 'preview';

export type ExportFormat = 'png' | 'svg' | 'json' | 'yaml' | 'taskml' | 'html';

export type TemplateCategory =
  | 'getting-started'
  | 'project-management'
  | 'software-dev'
  | 'ai-agents'
  | 'devops'
  | 'personal';

export interface Example {
  id: string;
  title: string;
  description: string;
  content: string;
  category: TemplateCategory;
  /** Recommended view for this template */
  recommendedView?: ViewType;
  /** Tags for filtering */
  tags?: string[];
  /** Whether this is featured on the home screen */
  featured?: boolean;
}

export interface KeyboardShortcut {
  key: string;
  modifiers: ('ctrl' | 'meta' | 'shift' | 'alt')[];
  description: string;
  action: () => void;
}
