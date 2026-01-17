/**
 * PreviewToolbar - Minimal icon-based view selector
 */

'use client';

import { RefObject } from 'react';
import {
  List,
  LayoutGrid,
  GitBranch,
  Calendar,
  Table,
  Network,
  BarChart3,
  ChevronDown,
} from 'lucide-react';
import { Button, Tooltip } from '../ui';
import { usePreviewStore } from '../../stores';
import type { ViewType } from '../../types';

const VIEW_CONFIG: { value: ViewType; label: string; icon: typeof List }[] = [
  { value: 'list', label: 'List', icon: List },
  { value: 'kanban', label: 'Kanban', icon: LayoutGrid },
  { value: 'tree', label: 'Tree', icon: GitBranch },
  { value: 'timeline', label: 'Timeline', icon: Calendar },
  { value: 'table', label: 'Table', icon: Table },
  { value: 'graph', label: 'Graph', icon: Network },
  { value: 'summary', label: 'Summary', icon: BarChart3 },
];

interface PreviewToolbarProps {
  previewRef: RefObject<HTMLDivElement>;
}

export function PreviewToolbar({ previewRef }: PreviewToolbarProps) {
  const viewType = usePreviewStore((s) => s.viewType);
  const setViewType = usePreviewStore((s) => s.setViewType);

  const currentView = VIEW_CONFIG.find((v) => v.value === viewType) || VIEW_CONFIG[0];
  const CurrentIcon = currentView.icon;

  return (
    <div className="h-10 flex items-center justify-between px-3 border-b border-midnight-border bg-midnight-elevated">
      {/* View label */}
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        Preview
      </span>

      {/* View selector - icon buttons */}
      <div className="flex items-center gap-0.5 bg-midnight-surface rounded-lg p-0.5">
        {VIEW_CONFIG.map(({ value, label, icon: Icon }) => (
          <Tooltip key={value} content={label}>
            <button
              onClick={() => setViewType(value)}
              className={`p-1.5 rounded-md transition-all
                ${viewType === value
                  ? 'bg-signal text-white shadow-sm'
                  : 'text-gray-500 hover:text-white hover:bg-midnight-elevated'
                }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
