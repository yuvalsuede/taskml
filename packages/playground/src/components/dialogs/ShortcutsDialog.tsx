/**
 * ShortcutsDialog - Keyboard shortcuts reference
 */

'use client';

import { DialogWrapper } from './DialogWrapper';

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutGroup {
  title: string;
  shortcuts: Shortcut[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: 'General',
    shortcuts: [
      { keys: ['?'], description: 'Show shortcuts' },
      { keys: ['Esc'], description: 'Close dialog' },
      { keys: ['Ctrl', 'S'], description: 'Save diagram' },
      { keys: ['Ctrl', 'Shift', 'S'], description: 'Share link' },
      { keys: ['Ctrl', 'L'], description: 'My Diagrams' },
      { keys: ['Ctrl', 'E'], description: 'Export' },
      { keys: ['Ctrl', 'O'], description: 'Templates' },
      { keys: ['Ctrl', ','], description: 'Settings' },
      { keys: ['Ctrl', 'D'], description: 'Toggle theme' },
      { keys: ['Ctrl', 'B'], description: 'Toggle error panel' },
      { keys: ['Ctrl', 'Enter'], description: 'Force re-parse' },
    ],
  },
  {
    title: 'Views',
    shortcuts: [
      { keys: ['1'], description: 'List view' },
      { keys: ['2'], description: 'Kanban view' },
      { keys: ['3'], description: 'Tree view' },
      { keys: ['4'], description: 'Timeline view' },
      { keys: ['5'], description: 'Table view' },
      { keys: ['6'], description: 'Graph view' },
      { keys: ['7'], description: 'Summary view' },
    ],
  },
  {
    title: 'Zoom',
    shortcuts: [
      { keys: ['Ctrl', '+'], description: 'Zoom in' },
      { keys: ['Ctrl', '-'], description: 'Zoom out' },
      { keys: ['Ctrl', '0'], description: 'Reset zoom' },
    ],
  },
  {
    title: 'Editor',
    shortcuts: [
      { keys: ['Ctrl', 'Z'], description: 'Undo' },
      { keys: ['Ctrl', 'Shift', 'Z'], description: 'Redo' },
      { keys: ['Ctrl', '/'], description: 'Toggle comment' },
      { keys: ['Ctrl', 'F'], description: 'Find' },
      { keys: ['Ctrl', 'H'], description: 'Find and replace' },
      { keys: ['Shift', 'Alt', 'F'], description: 'Format document' },
    ],
  },
];

export function ShortcutsDialog() {
  // Detect OS for modifier key display
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const modKey = isMac ? '⌘' : 'Ctrl';

  const formatKey = (key: string) => {
    if (key === 'Ctrl') return modKey;
    if (key === 'Shift') return isMac ? '⇧' : 'Shift';
    if (key === 'Alt') return isMac ? '⌥' : 'Alt';
    return key;
  };

  return (
    <DialogWrapper title="Keyboard Shortcuts" width="md">
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {SHORTCUT_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.shortcuts.map((shortcut, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, j) => (
                      <kbd
                        key={j}
                        className="min-w-[24px] px-2 py-1 text-xs font-medium text-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                      >
                        {formatKey(key)}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DialogWrapper>
  );
}
