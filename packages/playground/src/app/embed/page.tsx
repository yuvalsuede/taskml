/**
 * Embed Page - Minimal embeddable view of TaskML content
 *
 * URL Parameters:
 * - c: Compressed TaskML content (lz-string)
 * - view: View type (list, kanban, tree, timeline, table, graph, summary)
 * - theme: Theme (light, dark)
 * - hideHeader: Hide the TaskML branding header (true/false)
 */

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { parse, render } from '../../../../core/src';
import type { ViewType, Document } from '../../types';

const DEFAULT_CONTENT = `@project Sample Project

[ ] First task
[x] Completed task
◐ In progress task
`;

function EmbedContent() {
  const searchParams = useSearchParams();
  const [renderedHTML, setRenderedHTML] = useState('');
  const [error, setError] = useState<string | null>(null);

  const compressedContent = searchParams.get('c');
  const viewType = (searchParams.get('view') as ViewType) || 'list';
  const theme = searchParams.get('theme') || 'light';
  const hideHeader = searchParams.get('hideHeader') === 'true';

  useEffect(() => {
    try {
      // Decompress content
      const content = compressedContent
        ? decompressFromEncodedURIComponent(compressedContent) || DEFAULT_CONTENT
        : DEFAULT_CONTENT;

      // Parse and render
      const result = parse(content);

      if (result.errors.length > 0) {
        setError(result.errors[0].message);
        return;
      }

      const html = render(result.document as Document, { view: viewType });
      setRenderedHTML(html);
      setError(null);
    } catch (err) {
      setError('Failed to render content');
    }
  }, [compressedContent, viewType]);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Optional header */}
      {!hideHeader && (
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2
          border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <span>TaskML</span>
          </a>
          <a
            href={`/?c=${compressedContent}&view=${viewType}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Open in Playground
          </a>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {error ? (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        ) : (
          <div
            className="taskml-embed prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
          />
        )}
      </div>
    </div>
  );
}

export default function EmbedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full" />
        </div>
      }
    >
      <EmbedContent />
    </Suspense>
  );
}
