/**
 * useURLSync - Bidirectional URL state synchronization
 */

import { useEffect, useRef } from 'react';
import { useEditorStore } from '../stores/editor-store';
import { usePreviewStore } from '../stores/preview-store';
import { parseURL, updateURL } from '../lib/url-state';
import { useDebouncedCallback } from './useDebounce';

export function useURLSync() {
  const content = useEditorStore((s) => s.content);
  const setContent = useEditorStore((s) => s.setContent);

  const viewType = usePreviewStore((s) => s.viewType);
  const setViewType = usePreviewStore((s) => s.setViewType);
  const theme = usePreviewStore((s) => s.theme);
  const setTheme = usePreviewStore((s) => s.setTheme);

  const initialLoadDone = useRef(false);

  // Load state from URL on mount
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    const urlState = parseURL();

    if (urlState.content) {
      setContent(urlState.content);
    }
    if (urlState.view) {
      setViewType(urlState.view);
    }
    if (urlState.theme) {
      setTheme(urlState.theme);
    }
  }, [setContent, setViewType, setTheme]);

  // Debounced URL update (don't spam browser history)
  const debouncedURLUpdate = useDebouncedCallback(() => {
    updateURL({ content, view: viewType, theme });
  }, 500);

  // Update URL when state changes
  useEffect(() => {
    if (!initialLoadDone.current) return;
    debouncedURLUpdate();
  }, [content, viewType, theme, debouncedURLUpdate]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const urlState = parseURL();
      if (urlState.content) {
        setContent(urlState.content);
      }
      if (urlState.view) {
        setViewType(urlState.view);
      }
      if (urlState.theme) {
        setTheme(urlState.theme);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setContent, setViewType, setTheme]);
}
