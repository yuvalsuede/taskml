/**
 * Storage Store - Local storage persistence for diagrams
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedDiagram {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  /** Last view type used */
  viewType?: string;
}

interface StorageState {
  diagrams: SavedDiagram[];
  autosaveEnabled: boolean;
  lastAutosave: SavedDiagram | null;
}

interface StorageActions {
  saveDiagram: (title: string, content: string, viewType?: string) => SavedDiagram;
  updateDiagram: (id: string, updates: Partial<Omit<SavedDiagram, 'id' | 'createdAt'>>) => void;
  deleteDiagram: (id: string) => void;
  getDiagram: (id: string) => SavedDiagram | undefined;
  duplicateDiagram: (id: string) => SavedDiagram | undefined;
  setAutosave: (diagram: SavedDiagram | null) => void;
  toggleAutosave: () => void;
  clearAllDiagrams: () => void;
  importDiagrams: (diagrams: SavedDiagram[]) => void;
  exportDiagrams: () => SavedDiagram[];
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function extractTitle(content: string): string {
  // Try to extract title from @project directive
  const projectMatch = content.match(/@project\s+(.+?)(?:\n|$)/);
  if (projectMatch) {
    return projectMatch[1].trim();
  }

  // Try to extract from first task
  const taskMatch = content.match(/^[\s]*(?:\[.\]|[◐◎●○⊘])\s+(.+?)(?:\s+[!@#~^+]|$)/m);
  if (taskMatch) {
    return taskMatch[1].trim().substring(0, 50);
  }

  // Default to timestamp-based title
  return `Untitled - ${new Date().toLocaleDateString()}`;
}

export const useStorageStore = create<StorageState & StorageActions>()(
  persist(
    (set, get) => ({
      diagrams: [],
      autosaveEnabled: true,
      lastAutosave: null,

      saveDiagram: (title, content, viewType) => {
        const id = generateId();
        const now = Date.now();
        const diagram: SavedDiagram = {
          id,
          title: title || extractTitle(content),
          content,
          viewType,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          diagrams: [diagram, ...state.diagrams],
        }));

        return diagram;
      },

      updateDiagram: (id, updates) => {
        set((state) => ({
          diagrams: state.diagrams.map((d) =>
            d.id === id
              ? { ...d, ...updates, updatedAt: Date.now() }
              : d
          ),
        }));
      },

      deleteDiagram: (id) => {
        set((state) => ({
          diagrams: state.diagrams.filter((d) => d.id !== id),
        }));
      },

      getDiagram: (id) => {
        return get().diagrams.find((d) => d.id === id);
      },

      duplicateDiagram: (id) => {
        const original = get().getDiagram(id);
        if (!original) return undefined;

        return get().saveDiagram(
          `${original.title} (copy)`,
          original.content,
          original.viewType
        );
      },

      setAutosave: (diagram) => {
        set({ lastAutosave: diagram });
      },

      toggleAutosave: () => {
        set((state) => ({ autosaveEnabled: !state.autosaveEnabled }));
      },

      clearAllDiagrams: () => {
        set({ diagrams: [], lastAutosave: null });
      },

      importDiagrams: (diagrams) => {
        set((state) => ({
          diagrams: [...diagrams, ...state.diagrams],
        }));
      },

      exportDiagrams: () => {
        return get().diagrams;
      },
    }),
    {
      name: 'taskml-storage',
      version: 1,
    }
  )
);
