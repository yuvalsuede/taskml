/**
 * ResizablePanes - Split pane layout with draggable divider
 */

'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import type { ReactNode } from 'react';

interface ResizablePanesProps {
  left: ReactNode;
  right: ReactNode;
  defaultSize?: number;
  minSize?: number;
}

export function ResizablePanes({
  left,
  right,
  defaultSize = 50,
  minSize = 20,
}: ResizablePanesProps) {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={defaultSize} minSize={minSize}>
        <div className="h-full overflow-hidden">{left}</div>
      </Panel>

      <PanelResizeHandle className="w-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 transition-colors flex items-center justify-center group">
        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-white" />
      </PanelResizeHandle>

      <Panel defaultSize={100 - defaultSize} minSize={minSize}>
        <div className="h-full overflow-hidden">{right}</div>
      </Panel>
    </PanelGroup>
  );
}
