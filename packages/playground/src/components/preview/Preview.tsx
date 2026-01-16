/**
 * Preview - TaskML render output panel
 */

'use client';

import { useRef } from 'react';
import { PreviewToolbar } from './PreviewToolbar';
import { EmptyState } from './EmptyState';
import { usePreviewStore, useEditorStore } from '../../stores';

export function Preview() {
  const previewRef = useRef<HTMLDivElement>(null);

  const renderedHTML = usePreviewStore((s) => s.renderedHTML);
  const isRendering = usePreviewStore((s) => s.isRendering);
  const zoom = usePreviewStore((s) => s.zoom);

  const document = useEditorStore((s) => s.document);
  const errors = useEditorStore((s) => s.errors);

  const hasContent = document && document.tasks.length > 0;
  const hasErrors = errors.length > 0;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <PreviewToolbar previewRef={previewRef} />

      <div className="flex-1 overflow-auto p-4">
        {isRendering ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-gray-500 dark:text-gray-400">
              Rendering...
            </div>
          </div>
        ) : hasErrors && !hasContent ? (
          <EmptyState
            title="Parse Error"
            description="Fix the errors in your TaskML to see the preview"
            icon="error"
          />
        ) : !hasContent ? (
          <EmptyState
            title="No Tasks"
            description="Add some tasks to see them rendered here"
            icon="empty"
          />
        ) : (
          <div
            ref={previewRef}
            className="preview-container"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: `${100 / zoom}%`,
            }}
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
          />
        )}
      </div>
    </div>
  );
}
