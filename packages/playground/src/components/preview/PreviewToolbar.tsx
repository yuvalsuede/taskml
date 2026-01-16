/**
 * PreviewToolbar - View selector, zoom, and preview controls
 */

'use client';

import { RefObject } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import { Button, Select, Tooltip } from '../ui';
import { usePreviewStore } from '../../stores';
import type { ViewType } from '../../types';

const VIEW_OPTIONS: { value: ViewType; label: string }[] = [
  { value: 'list', label: 'List' },
  { value: 'kanban', label: 'Kanban' },
  { value: 'tree', label: 'Tree' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'table', label: 'Table' },
  { value: 'graph', label: 'Graph' },
  { value: 'summary', label: 'Summary' },
];

interface PreviewToolbarProps {
  previewRef: RefObject<HTMLDivElement>;
}

export function PreviewToolbar({ previewRef }: PreviewToolbarProps) {
  const viewType = usePreviewStore((s) => s.viewType);
  const setViewType = usePreviewStore((s) => s.setViewType);
  const zoom = usePreviewStore((s) => s.zoom);
  const zoomIn = usePreviewStore((s) => s.zoomIn);
  const zoomOut = usePreviewStore((s) => s.zoomOut);
  const resetZoom = usePreviewStore((s) => s.resetZoom);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      {/* View selector */}
      <div className="flex items-center gap-3">
        <Select
          label="View"
          options={VIEW_OPTIONS}
          value={viewType}
          onChange={(e) => setViewType(e.target.value as ViewType)}
        />
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-1">
        <Tooltip content="Zoom out" shortcut="Ctrl+-">
          <Button variant="ghost" size="icon" onClick={zoomOut} disabled={zoom <= 0.5}>
            <ZoomOut className="w-4 h-4" />
          </Button>
        </Tooltip>

        <span className="w-12 text-center text-sm text-gray-600 dark:text-gray-400">
          {zoomPercent}%
        </span>

        <Tooltip content="Zoom in" shortcut="Ctrl++">
          <Button variant="ghost" size="icon" onClick={zoomIn} disabled={zoom >= 2}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Reset zoom" shortcut="Ctrl+0">
          <Button variant="ghost" size="icon" onClick={resetZoom}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
