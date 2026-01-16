/**
 * Editor Store - Manages editor content, parsing, and history
 */

import { create } from 'zustand';
import { parse } from '../../../core/src';
import type { Document, ParseError } from '../types';

interface EditorState {
  // Content
  content: string;
  setContent: (content: string) => void;

  // Parse result
  document: Document | null;
  errors: ParseError[];
  parseContent: () => void;

  // Cursor position
  cursorLine: number;
  cursorColumn: number;
  setCursor: (line: number, column: number) => void;

  // Dirty state
  isDirty: boolean;
  setDirty: (dirty: boolean) => void;
}

const DEFAULT_CONTENT = `@project My Project
@sprint Sprint 1

[ ] Set up development environment !0 @alice
  ○ Install dependencies
  ○ Configure IDE
  ● Create project structure

[~] Implement core features !1 @bob ~8h
  [ ] User authentication
  [~] Data persistence
  [ ] API endpoints

[ ] Write documentation !2 ~4h
[ ] Deploy to production !1 >2024-02-01
`;

export const useEditorStore = create<EditorState>((set, get) => ({
  // Content
  content: DEFAULT_CONTENT,
  setContent: (content: string) => {
    set({ content, isDirty: true });
    // Auto-parse on content change (debounced externally)
  },

  // Parse result
  document: null,
  errors: [],
  parseContent: () => {
    const { content } = get();
    try {
      const result = parse(content);
      set({
        document: result.document || null,
        errors: result.errors,
      });
    } catch (e) {
      set({
        document: null,
        errors: [{
          line: 1,
          column: 1,
          message: e instanceof Error ? e.message : 'Unknown parse error',
        }],
      });
    }
  },

  // Cursor
  cursorLine: 1,
  cursorColumn: 1,
  setCursor: (line: number, column: number) => {
    set({ cursorLine: line, cursorColumn: column });
  },

  // Dirty state
  isDirty: false,
  setDirty: (dirty: boolean) => set({ isDirty: dirty }),
}));
