/**
 * TaskML Editor Themes for Monaco
 */

import type { editor } from 'monaco-editor';

export const taskmlLightTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'comment.note', foreground: '6A9955', fontStyle: 'italic' },

    { token: 'keyword.directive', foreground: '0000FF', fontStyle: 'bold' },

    { token: 'keyword.status.pending', foreground: '6B7280' },
    { token: 'keyword.status.progress', foreground: '3B82F6' },
    { token: 'keyword.status.completed', foreground: '10B981' },
    { token: 'keyword.status.blocked', foreground: 'EF4444' },
    { token: 'keyword.status.cancelled', foreground: '9CA3AF' },
    { token: 'keyword.status.review', foreground: 'F59E0B' },

    { token: 'keyword.criterion', foreground: '10B981' },

    { token: 'number.priority', foreground: 'DC2626', fontStyle: 'bold' },
    { token: 'number.estimate', foreground: '059669' },
    { token: 'number.date', foreground: '7C3AED' },
    { token: 'number', foreground: '098658' },

    { token: 'variable.assignee', foreground: '0891B2' },

    { token: 'string.tag', foreground: 'CA8A04' },
    { token: 'string', foreground: 'A31515' },

    { token: 'attribute.id', foreground: '6B7280' },

    { token: 'type.dependency.depends', foreground: '7C3AED' },
    { token: 'type.dependency.blocked', foreground: 'DC2626' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#1F2937',
    'editorLineNumber.foreground': '#9CA3AF',
    'editorLineNumber.activeForeground': '#374151',
    'editor.lineHighlightBackground': '#F3F4F6',
    'editor.selectionBackground': '#BFDBFE',
  },
};

export const taskmlDarkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'comment.note', foreground: '6A9955', fontStyle: 'italic' },

    { token: 'keyword.directive', foreground: '569CD6', fontStyle: 'bold' },

    { token: 'keyword.status.pending', foreground: '9CA3AF' },
    { token: 'keyword.status.progress', foreground: '60A5FA' },
    { token: 'keyword.status.completed', foreground: '34D399' },
    { token: 'keyword.status.blocked', foreground: 'F87171' },
    { token: 'keyword.status.cancelled', foreground: '6B7280' },
    { token: 'keyword.status.review', foreground: 'FBBF24' },

    { token: 'keyword.criterion', foreground: '34D399' },

    { token: 'number.priority', foreground: 'F87171', fontStyle: 'bold' },
    { token: 'number.estimate', foreground: '34D399' },
    { token: 'number.date', foreground: 'A78BFA' },
    { token: 'number', foreground: 'B5CEA8' },

    { token: 'variable.assignee', foreground: '22D3EE' },

    { token: 'string.tag', foreground: 'FCD34D' },
    { token: 'string', foreground: 'CE9178' },

    { token: 'attribute.id', foreground: '6B7280' },

    { token: 'type.dependency.depends', foreground: 'A78BFA' },
    { token: 'type.dependency.blocked', foreground: 'F87171' },
  ],
  colors: {
    'editor.background': '#1F2937',
    'editor.foreground': '#F9FAFB',
    'editorLineNumber.foreground': '#6B7280',
    'editorLineNumber.activeForeground': '#D1D5DB',
    'editor.lineHighlightBackground': '#374151',
    'editor.selectionBackground': '#3B82F680',
  },
};

export function registerTaskMLThemes(monaco: typeof import('monaco-editor')) {
  monaco.editor.defineTheme('taskml-light', taskmlLightTheme);
  monaco.editor.defineTheme('taskml-dark', taskmlDarkTheme);
}
