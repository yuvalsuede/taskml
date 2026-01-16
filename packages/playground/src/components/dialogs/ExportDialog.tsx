/**
 * ExportDialog - Export in various formats
 */

'use client';

import { useRef } from 'react';
import { Image, FileJson, FileCode, FileText, Globe } from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { Button } from '../ui';
import { useEditorStore, usePreviewStore, useUIStore } from '../../stores';
import { exportPNG, exportSVG, exportJSON, exportYAML, exportTaskML, exportHTML } from '../../lib/export';
import type { ExportFormat } from '../../types';

interface ExportOption {
  id: ExportFormat;
  label: string;
  description: string;
  icon: typeof Image;
}

const EXPORT_OPTIONS: ExportOption[] = [
  {
    id: 'png',
    label: 'PNG Image',
    description: 'High-quality screenshot of the preview',
    icon: Image,
  },
  {
    id: 'svg',
    label: 'SVG Image',
    description: 'Scalable vector graphic',
    icon: Image,
  },
  {
    id: 'json',
    label: 'JSON',
    description: 'Structured data format',
    icon: FileJson,
  },
  {
    id: 'yaml',
    label: 'YAML',
    description: 'Human-readable configuration',
    icon: FileCode,
  },
  {
    id: 'taskml',
    label: 'TaskML (.tml)',
    description: 'Raw TaskML source file',
    icon: FileText,
  },
  {
    id: 'html',
    label: 'Standalone HTML',
    description: 'Self-contained HTML file',
    icon: Globe,
  },
];

export function ExportDialog() {
  const content = useEditorStore((s) => s.content);
  const document = useEditorStore((s) => s.document);
  const renderedHTML = usePreviewStore((s) => s.renderedHTML);
  const closeDialog = useUIStore((s) => s.closeDialog);

  const handleExport = async (format: ExportFormat) => {
    try {
      const previewElement = window.document.querySelector('.preview-container') as HTMLElement;

      switch (format) {
        case 'png':
          if (previewElement) {
            await exportPNG(previewElement);
          }
          break;
        case 'svg':
          if (previewElement) {
            await exportSVG(previewElement);
          }
          break;
        case 'json':
          if (document) {
            exportJSON(document);
          }
          break;
        case 'yaml':
          if (document) {
            exportYAML(document);
          }
          break;
        case 'taskml':
          exportTaskML(content);
          break;
        case 'html':
          exportHTML(renderedHTML);
          break;
      }

      closeDialog();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <DialogWrapper title="Export" width="md">
      <div className="grid gap-2">
        {EXPORT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isDisabled =
            (option.id === 'png' || option.id === 'svg') && !renderedHTML;

          return (
            <button
              key={option.id}
              onClick={() => handleExport(option.id)}
              disabled={isDisabled}
              className={`
                flex items-center gap-4 p-4 rounded-lg text-left
                border border-gray-200 dark:border-gray-700
                hover:bg-gray-50 dark:hover:bg-gray-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              `}
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {option.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </DialogWrapper>
  );
}
