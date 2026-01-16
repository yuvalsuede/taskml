/**
 * useKeyboardShortcuts - Global keyboard shortcuts for the playground
 */

import { useEffect, useCallback } from 'react';
import { useUIStore, usePreviewStore, useEditorStore } from '../stores';
import { useTheme } from './useTheme';
import type { ViewType } from '../types';

const VIEW_SHORTCUTS: Record<string, ViewType> = {
  '1': 'list',
  '2': 'kanban',
  '3': 'tree',
  '4': 'timeline',
  '5': 'table',
  '6': 'graph',
  '7': 'summary',
};

export function useKeyboardShortcuts() {
  const openDialog = useUIStore((s) => s.openDialog);
  const closeDialog = useUIStore((s) => s.closeDialog);
  const activeDialog = useUIStore((s) => s.activeDialog);
  const toggleErrorPanel = useUIStore((s) => s.toggleErrorPanel);

  const setViewType = usePreviewStore((s) => s.setViewType);
  const zoomIn = usePreviewStore((s) => s.zoomIn);
  const zoomOut = usePreviewStore((s) => s.zoomOut);
  const resetZoom = usePreviewStore((s) => s.resetZoom);

  const parseContent = useEditorStore((s) => s.parseContent);

  const { toggleTheme } = useTheme();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? e.metaKey : e.ctrlKey;

    // Close dialog on Escape
    if (e.key === 'Escape' && activeDialog) {
      e.preventDefault();
      closeDialog();
      return;
    }

    // Don't handle shortcuts when typing in inputs (except Escape)
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return;
    }

    // ? - Show shortcuts dialog
    if (e.key === '?' && !modKey) {
      e.preventDefault();
      openDialog('shortcuts');
      return;
    }

    // Ctrl/Cmd + O - Open examples
    if (modKey && e.key === 'o') {
      e.preventDefault();
      openDialog('examples');
      return;
    }

    // Ctrl/Cmd + S - Save
    if (modKey && e.key === 's') {
      e.preventDefault();
      openDialog('save');
      return;
    }

    // Ctrl/Cmd + Shift + S - Share
    if (modKey && e.shiftKey && e.key === 's') {
      e.preventDefault();
      openDialog('share');
      return;
    }

    // Ctrl/Cmd + L - My Diagrams
    if (modKey && e.key === 'l') {
      e.preventDefault();
      openDialog('diagrams');
      return;
    }

    // Ctrl/Cmd + E - Export
    if (modKey && e.key === 'e') {
      e.preventDefault();
      openDialog('export');
      return;
    }

    // Ctrl/Cmd + , - Settings
    if (modKey && e.key === ',') {
      e.preventDefault();
      openDialog('settings');
      return;
    }

    // Ctrl/Cmd + Enter - Force re-parse
    if (modKey && e.key === 'Enter') {
      e.preventDefault();
      parseContent();
      return;
    }

    // Ctrl/Cmd + D - Toggle theme
    if (modKey && e.key === 'd') {
      e.preventDefault();
      toggleTheme();
      return;
    }

    // Ctrl/Cmd + B - Toggle error panel
    if (modKey && e.key === 'b') {
      e.preventDefault();
      toggleErrorPanel();
      return;
    }

    // Zoom shortcuts
    if (modKey && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      zoomIn();
      return;
    }

    if (modKey && e.key === '-') {
      e.preventDefault();
      zoomOut();
      return;
    }

    if (modKey && e.key === '0') {
      e.preventDefault();
      resetZoom();
      return;
    }

    // View shortcuts (1-7) - only when not holding modifier
    if (!modKey && !e.shiftKey && !e.altKey) {
      const viewType = VIEW_SHORTCUTS[e.key];
      if (viewType) {
        e.preventDefault();
        setViewType(viewType);
        return;
      }
    }
  }, [
    activeDialog,
    closeDialog,
    openDialog,
    parseContent,
    setViewType,
    toggleTheme,
    toggleErrorPanel,
    zoomIn,
    zoomOut,
    resetZoom,
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
