/**
 * Shared TypeScript types for the playground
 */

import type { Document, ParseError, ViewType, Task } from '../../../core/src';

export type { Document, ParseError, ViewType, Task };

export type ThemeMode = 'light' | 'dark' | 'auto';

export type DialogType = 'share' | 'export' | 'settings' | 'examples' | 'shortcuts' | null;

export type MobileTab = 'editor' | 'preview';

export type ExportFormat = 'png' | 'svg' | 'json' | 'yaml' | 'taskml' | 'html';

export interface Example {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'basics' | 'advanced' | 'templates';
}

export interface KeyboardShortcut {
  key: string;
  modifiers: ('ctrl' | 'meta' | 'shift' | 'alt')[];
  description: string;
  action: () => void;
}
