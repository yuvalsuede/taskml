/**
 * ZoomControls - Floating zoom controls for the preview
 * Mermaid Live style - bottom-right corner
 */

'use client';

import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import { Tooltip } from '../ui';
import { usePreviewStore } from '../../stores';

export function ZoomControls() {
  const zoom = usePreviewStore((s) => s.zoom);
  const zoomIn = usePreviewStore((s) => s.zoomIn);
  const zoomOut = usePreviewStore((s) => s.zoomOut);
  const resetZoom = usePreviewStore((s) => s.resetZoom);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-midnight-elevated/95 backdrop-blur-sm
      border border-midnight-border rounded-lg shadow-lg p-1 z-10">
      <Tooltip content="Zoom out (Ctrl+-)">
        <button
          onClick={zoomOut}
          disabled={zoom <= 0.5}
          className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-midnight-surface
            disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </Tooltip>

      <button
        onClick={resetZoom}
        className="min-w-[50px] px-2 py-1 text-xs font-medium text-gray-300 hover:text-white
          hover:bg-midnight-surface rounded-md transition-colors"
      >
        {zoomPercent}%
      </button>

      <Tooltip content="Zoom in (Ctrl++)">
        <button
          onClick={zoomIn}
          disabled={zoom >= 2}
          className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-midnight-surface
            disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </Tooltip>

      <div className="w-px h-5 bg-midnight-border mx-0.5" />

      <Tooltip content="Reset zoom (Ctrl+0)">
        <button
          onClick={resetZoom}
          className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-midnight-surface transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
  );
}
