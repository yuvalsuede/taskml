/**
 * Settings Store - Persisted user preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ViewType } from '../types';

interface SettingsState {
  // Editor preferences
  fontSize: number;
  setFontSize: (size: number) => void;
  tabSize: number;
  setTabSize: (size: number) => void;
  wordWrap: boolean;
  setWordWrap: (wrap: boolean) => void;
  minimap: boolean;
  setMinimap: (show: boolean) => void;
  lineNumbers: boolean;
  setLineNumbers: (show: boolean) => void;

  // Preview preferences
  defaultView: ViewType;
  setDefaultView: (view: ViewType) => void;
  autoRender: boolean;
  setAutoRender: (auto: boolean) => void;
  renderDelay: number; // debounce ms
  setRenderDelay: (delay: number) => void;

  // Reset
  resetSettings: () => void;
}

const DEFAULT_SETTINGS = {
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  minimap: false,
  lineNumbers: true,
  defaultView: 'list' as ViewType,
  autoRender: true,
  renderDelay: 300,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Editor preferences
      ...DEFAULT_SETTINGS,
      setFontSize: (fontSize: number) => set({ fontSize: Math.max(10, Math.min(24, fontSize)) }),
      setTabSize: (tabSize: number) => set({ tabSize: Math.max(2, Math.min(8, tabSize)) }),
      setWordWrap: (wordWrap: boolean) => set({ wordWrap }),
      setMinimap: (minimap: boolean) => set({ minimap }),
      setLineNumbers: (lineNumbers: boolean) => set({ lineNumbers }),

      // Preview preferences
      setDefaultView: (defaultView: ViewType) => set({ defaultView }),
      setAutoRender: (autoRender: boolean) => set({ autoRender }),
      setRenderDelay: (renderDelay: number) => set({ renderDelay: Math.max(100, Math.min(1000, renderDelay)) }),

      // Reset
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'taskml-playground-settings',
    }
  )
);
