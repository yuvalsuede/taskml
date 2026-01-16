/**
 * Preview - TaskML render output panel
 */

'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { PreviewToolbar } from './PreviewToolbar';
import { EmptyState } from './EmptyState';
import { usePreviewStore, useEditorStore } from '../../stores';

export function Preview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderedHTML = usePreviewStore((s) => s.renderedHTML);
  const isRendering = usePreviewStore((s) => s.isRendering);
  const zoom = usePreviewStore((s) => s.zoom);
  const viewType = usePreviewStore((s) => s.viewType);

  const document = useEditorStore((s) => s.document);
  const errors = useEditorStore((s) => s.errors);

  // Check for content in both root tasks and sections
  const hasContent = document && (
    document.tasks.length > 0 ||
    (document.sections && document.sections.some(s => s.tasks && s.tasks.length > 0))
  );
  const hasErrors = errors.length > 0;

  const isGraphView = viewType === 'graph';

  // Pan state for graph view (draggable canvas)
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [panOffsetStart, setPanOffsetStart] = useState({ x: 0, y: 0 });

  // Reset pan when view changes or content changes
  useEffect(() => {
    setPanOffset({ x: 0, y: 0 });
  }, [viewType, renderedHTML]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isGraphView) return;
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    setPanOffsetStart(panOffset);
  }, [isGraphView, panOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    setPanOffset({
      x: panOffsetStart.x + dx,
      y: panOffsetStart.y + dy,
    });
  }, [isPanning, panStart, panOffsetStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle wheel zoom for graph view
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isGraphView || !e.ctrlKey) return;
    e.preventDefault();
    const { zoomIn, zoomOut } = usePreviewStore.getState();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  }, [isGraphView]);

  // Stop panning if mouse leaves window
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsPanning(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <PreviewToolbar previewRef={previewRef} />

      <div
        ref={containerRef}
        className={`flex-1 ${isGraphView ? 'overflow-hidden' : 'overflow-auto'}`}
        style={{
          cursor: isGraphView ? (isPanning ? 'grabbing' : 'grab') : 'default',
          padding: isGraphView ? 0 : 16,
          background: isGraphView ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)' : undefined,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
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
            className={`preview-container ${isGraphView ? 'graph-preview' : ''}`}
            style={isGraphView ? {
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
            } : {
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
            }}
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
          />
        )}
      </div>
    </div>
  );
}
