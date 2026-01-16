/**
 * useTaskML - Main hook for parsing and rendering
 */

import { useEffect } from 'react';
import { useEditorStore } from '../stores/editor-store';
import { usePreviewStore } from '../stores/preview-store';
import { useSettingsStore } from '../stores/settings-store';
import { useDebouncedCallback } from './useDebounce';

export function useTaskML() {
  const content = useEditorStore((s) => s.content);
  const parseContent = useEditorStore((s) => s.parseContent);
  const document = useEditorStore((s) => s.document);
  const errors = useEditorStore((s) => s.errors);

  const renderPreview = usePreviewStore((s) => s.renderPreview);
  const viewType = usePreviewStore((s) => s.viewType);
  const resolvedTheme = usePreviewStore((s) => s.resolvedTheme);

  const autoRender = useSettingsStore((s) => s.autoRender);
  const renderDelay = useSettingsStore((s) => s.renderDelay);

  // Debounced parse
  const debouncedParse = useDebouncedCallback(() => {
    parseContent();
  }, renderDelay);

  // Parse on content change
  useEffect(() => {
    if (autoRender) {
      debouncedParse();
    }
  }, [content, autoRender, debouncedParse]);

  // Re-render when document, view, or theme changes
  useEffect(() => {
    renderPreview(document);
  }, [document, viewType, resolvedTheme, renderPreview]);

  // Manual parse (for when autoRender is off)
  const manualParse = () => {
    parseContent();
  };

  return {
    document,
    errors,
    manualParse,
    hasErrors: errors.length > 0,
  };
}
