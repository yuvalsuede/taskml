/**
 * ErrorPanel - Display parse errors
 */

'use client';

import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui';
import { useEditorStore, useUIStore } from '../../stores';

export function ErrorPanel() {
  const errors = useEditorStore((s) => s.errors);
  const cursorLine = useEditorStore((s) => s.cursorLine);
  const cursorColumn = useEditorStore((s) => s.cursorColumn);
  const toggleErrorPanel = useUIStore((s) => s.toggleErrorPanel);

  const hasErrors = errors.length > 0;

  return (
    <div className="h-auto min-h-[40px] max-h-32 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {hasErrors ? (
            <>
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                {errors.length} error{errors.length !== 1 ? 's' : ''}
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                No errors
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Ln {cursorLine}, Col {cursorColumn}
          </span>
          <Button variant="ghost" size="icon" onClick={toggleErrorPanel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {hasErrors && (
        <div className="overflow-auto max-h-20 px-3 py-1">
          {errors.map((error, i) => (
            <button
              key={i}
              className="w-full text-left py-1 px-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded flex items-start gap-2"
              onClick={() => {
                // Jump to line in editor
                document.dispatchEvent(
                  new CustomEvent('taskml:goto', {
                    detail: { line: error.line, column: error.column }
                  })
                );
              }}
            >
              <span className="text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                {error.line}:{error.column}
              </span>
              <span>{error.message}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
