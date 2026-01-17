/**
 * Editor - Monaco editor wrapper with TaskML language support
 */

'use client';

import { useRef, useCallback, useEffect } from 'react';
import MonacoEditor, { type OnMount, type BeforeMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { registerTaskMLLanguage, TASKML_LANGUAGE_ID } from './taskml-language';
import { registerTaskMLThemes } from './taskml-theme';
import { useEditorStore, useSettingsStore, usePreviewStore, useUIStore } from '../../stores';
import { formatTaskML } from '../../lib/format';

export function Editor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Editor store
  const content = useEditorStore((s) => s.content);
  const setContent = useEditorStore((s) => s.setContent);
  const setCursor = useEditorStore((s) => s.setCursor);

  // Settings
  const fontSize = useSettingsStore((s) => s.fontSize);
  const tabSize = useSettingsStore((s) => s.tabSize);
  const wordWrap = useSettingsStore((s) => s.wordWrap);
  const minimap = useSettingsStore((s) => s.minimap);
  const lineNumbers = useSettingsStore((s) => s.lineNumbers);

  // Theme
  const resolvedTheme = usePreviewStore((s) => s.resolvedTheme);
  const editorTheme = resolvedTheme === 'dark' ? 'taskml-dark' : 'taskml-light';

  // Register language and themes before mount
  const handleBeforeMount: BeforeMount = useCallback((monaco) => {
    registerTaskMLLanguage(monaco);
    registerTaskMLThemes(monaco);
  }, []);

  // Handle editor mount
  const handleMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Focus editor
    editor.focus();

    // Track cursor position
    editor.onDidChangeCursorPosition((e) => {
      setCursor(e.position.lineNumber, e.position.column);
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Prevent default save, trigger save dialog
      document.dispatchEvent(new CustomEvent('taskml:save'));
    });

    // Format document: Shift+Alt+F (standard VS Code shortcut)
    editor.addCommand(
      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      () => {
        const currentContent = editor.getValue();
        const formatted = formatTaskML(currentContent);
        if (formatted !== currentContent) {
          // Preserve cursor position
          const position = editor.getPosition();
          editor.setValue(formatted);
          if (position) {
            editor.setPosition(position);
          }
          setContent(formatted);
        }
      }
    );

    // Add format command to context menu
    editor.addAction({
      id: 'taskml.formatDocument',
      label: 'Format Document',
      keybindings: [monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF],
      contextMenuGroupId: '1_modification',
      contextMenuOrder: 1.5,
      run: (ed) => {
        const currentContent = ed.getValue();
        const formatted = formatTaskML(currentContent);
        if (formatted !== currentContent) {
          const position = ed.getPosition();
          ed.setValue(formatted);
          if (position) {
            ed.setPosition(position);
          }
          setContent(formatted);
        }
      },
    });
  }, [setCursor, setContent]);

  // Handle content change
  const handleChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined) {
        setContent(value);
      }
    },
    [setContent]
  );

  // Handle go-to-line events from ErrorPanel
  useEffect(() => {
    const handleGoto = (e: CustomEvent<{ line: number; column: number }>) => {
      if (editorRef.current) {
        const { line, column } = e.detail;
        editorRef.current.setPosition({ lineNumber: line, column });
        editorRef.current.revealLineInCenter(line);
        editorRef.current.focus();
      }
    };

    document.addEventListener('taskml:goto', handleGoto as EventListener);
    return () => {
      document.removeEventListener('taskml:goto', handleGoto as EventListener);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        language={TASKML_LANGUAGE_ID}
        theme={editorTheme}
        value={content}
        onChange={handleChange}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        options={{
          fontSize,
          tabSize,
          wordWrap: wordWrap ? 'on' : 'off',
          minimap: { enabled: minimap },
          lineNumbers: lineNumbers ? 'on' : 'off',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'line',
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          folding: true,
          foldingHighlight: false,
          guides: {
            indentation: true,
            bracketPairs: false,
          },
          bracketPairColorization: {
            enabled: false,
          },
          suggest: {
            showWords: false,
            showSnippets: true,
            snippetsPreventQuickSuggestions: false,
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnCommitCharacter: true,
          snippetSuggestions: 'top',
          parameterHints: {
            enabled: false,
          },
        }}
        loading={
          <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800">
            <div className="animate-pulse text-gray-500">Loading editor...</div>
          </div>
        }
      />
    </div>
  );
}
