/**
 * UI Store - Manages layout, dialogs, and panels
 */

import { create } from 'zustand';
import type { DialogType, MobileTab } from '../types';

interface UIState {
  // Layout
  editorWidth: number; // percentage (20-80)
  setEditorWidth: (width: number) => void;

  // Panels
  showErrorPanel: boolean;
  showASTPanel: boolean;
  toggleErrorPanel: () => void;
  toggleASTPanel: () => void;

  // Dialogs
  activeDialog: DialogType;
  openDialog: (dialog: DialogType) => void;
  closeDialog: () => void;

  // Mobile
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  activeMobileTab: MobileTab;
  setMobileTab: (tab: MobileTab) => void;

  // Command palette
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Layout
  editorWidth: 50,
  setEditorWidth: (width: number) => {
    set({ editorWidth: Math.max(20, Math.min(80, width)) });
  },

  // Panels
  showErrorPanel: true,
  showASTPanel: false,
  toggleErrorPanel: () => set((s) => ({ showErrorPanel: !s.showErrorPanel })),
  toggleASTPanel: () => set((s) => ({ showASTPanel: !s.showASTPanel })),

  // Dialogs
  activeDialog: null,
  openDialog: (dialog: DialogType) => set({ activeDialog: dialog }),
  closeDialog: () => set({ activeDialog: null }),

  // Mobile
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  activeMobileTab: 'editor',
  setMobileTab: (tab: MobileTab) => set({ activeMobileTab: tab }),

  // Command palette
  isCommandPaletteOpen: false,
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () => set((s) => ({ isCommandPaletteOpen: !s.isCommandPaletteOpen })),
}));
