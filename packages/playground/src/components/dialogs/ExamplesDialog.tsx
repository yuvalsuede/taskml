/**
 * ExamplesDialog - Load example documents
 */

'use client';

import { FileText } from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { useEditorStore, useUIStore } from '../../stores';
import { EXAMPLES } from '../../lib/examples';
import type { Example } from '../../types';

export function ExamplesDialog() {
  const setContent = useEditorStore((s) => s.setContent);
  const closeDialog = useUIStore((s) => s.closeDialog);

  const handleLoadExample = (example: Example) => {
    setContent(example.content);
    closeDialog();
  };

  const categories = [
    { id: 'basics', label: 'Basics' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'templates', label: 'Templates' },
  ] as const;

  return (
    <DialogWrapper title="Examples" width="lg">
      <div className="space-y-6">
        {categories.map((category) => {
          const examples = EXAMPLES.filter((e) => e.category === category.id);
          if (examples.length === 0) return null;

          return (
            <div key={category.id}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {category.label}
              </h3>
              <div className="grid gap-2">
                {examples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => handleLoadExample(example)}
                    className="flex items-start gap-4 p-4 rounded-lg text-left border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {example.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {example.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DialogWrapper>
  );
}
