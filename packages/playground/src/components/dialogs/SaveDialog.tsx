/**
 * SaveDialog - Save current diagram with a title
 */

'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { Button } from '../ui';
import { useStorageStore, useEditorStore, usePreviewStore, useUIStore } from '../../stores';

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

  return '';
}

export function SaveDialog() {
  const content = useEditorStore((s) => s.content);
  const viewType = usePreviewStore((s) => s.viewType);
  const saveDiagram = useStorageStore((s) => s.saveDiagram);
  const closeDialog = useUIStore((s) => s.closeDialog);

  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  // Extract title from content on mount
  useEffect(() => {
    const extracted = extractTitle(content);
    setTitle(extracted);
  }, [content]);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!content.trim()) {
      setError('Cannot save an empty diagram');
      return;
    }

    saveDiagram(title.trim(), content, viewType);
    closeDialog();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <DialogWrapper title="Save Diagram" width="md">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="diagram-title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Title
          </label>
          <input
            id="diagram-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="My Diagram"
            autoFocus
            className={`w-full px-4 py-2.5 rounded-lg border
              ${error
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              }
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              placeholder:text-gray-400 focus:outline-none focus:ring-2
              focus:border-transparent transition-shadow`}
          />
          {error && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Preview:</span>
          </p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 font-mono line-clamp-2">
            {content.split('\n').slice(0, 2).join('\n') || 'Empty document'}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
}
