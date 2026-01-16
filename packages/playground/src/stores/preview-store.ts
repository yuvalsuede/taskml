/**
 * Preview Store - Manages preview rendering options
 */

import { create } from 'zustand';
import { render } from '../../../core/src';
import type { Document, ViewType, ThemeMode } from '../types';

// Available view types (hardcoded to avoid import issues)
const AVAILABLE_VIEWS: ViewType[] = ['list', 'kanban', 'tree', 'timeline', 'table', 'graph', 'summary'];

interface PreviewState {
  // View configuration
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
  availableViews: ViewType[];

  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
  setResolvedTheme: (theme: 'light' | 'dark') => void;

  // Zoom
  zoom: number;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;

  // Rendered output
  renderedHTML: string;
  renderPreview: (doc: Document | null) => void;

  // Loading state
  isRendering: boolean;
}

export const usePreviewStore = create<PreviewState>((set, get) => ({
  // View configuration
  viewType: 'list',
  setViewType: (viewType: ViewType) => {
    set({ viewType });
  },
  availableViews: AVAILABLE_VIEWS,

  // Theme
  theme: 'auto',
  setTheme: (theme: ThemeMode) => set({ theme }),
  resolvedTheme: 'light',
  setResolvedTheme: (resolvedTheme: 'light' | 'dark') => set({ resolvedTheme }),

  // Zoom (0.5 to 2.0)
  zoom: 1,
  setZoom: (zoom: number) => set({ zoom: Math.max(0.5, Math.min(2, zoom)) }),
  zoomIn: () => {
    const { zoom } = get();
    set({ zoom: Math.min(2, zoom + 0.1) });
  },
  zoomOut: () => {
    const { zoom } = get();
    set({ zoom: Math.max(0.5, zoom - 0.1) });
  },
  resetZoom: () => set({ zoom: 1 }),

  // Rendered output
  renderedHTML: '',
  renderPreview: (doc: Document | null) => {
    if (!doc) {
      set({ renderedHTML: '', isRendering: false });
      return;
    }

    set({ isRendering: true });

    try {
      const { viewType, resolvedTheme } = get();
      const html = render(doc, {
        view: viewType,
        theme: resolvedTheme,
        includeStyles: true,
        includeCSSVars: true,
      });
      set({ renderedHTML: html, isRendering: false });
    } catch (e) {
      console.error('Render error:', e);
      set({ renderedHTML: '', isRendering: false });
    }
  },

  // Loading state
  isRendering: false,
}));
