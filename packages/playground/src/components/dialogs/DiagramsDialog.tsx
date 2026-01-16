/**
 * DiagramsDialog - My Diagrams panel for managing saved diagrams
 */

'use client';

import { useState } from 'react';
import {
  FileText,
  Trash2,
  Copy,
  Clock,
  Search,
  FolderOpen,
  X,
} from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { Button } from '../ui';
import { useStorageStore, useEditorStore, usePreviewStore, useUIStore } from '../../stores';
import type { SavedDiagram } from '../../stores';
import type { ViewType } from '../../types';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;

  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now';
  }

  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  }

  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  }

  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days}d ago`;
  }

  // Format as date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

interface DiagramCardProps {
  diagram: SavedDiagram;
  onLoad: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function DiagramCard({ diagram, onLoad, onDuplicate, onDelete }: DiagramCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Get first few lines as preview
  const preview = diagram.content
    .split('\n')
    .slice(0, 3)
    .join('\n')
    .substring(0, 100);

  return (
    <div className="group relative p-4 rounded-xl border border-gray-200 dark:border-gray-700
      bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500
      transition-all duration-200">
      {/* Delete confirmation overlay */}
      {showConfirmDelete && (
        <div className="absolute inset-0 z-10 flex items-center justify-center
          bg-white/95 dark:bg-gray-800/95 rounded-xl backdrop-blur-sm">
          <div className="text-center p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Delete "{diagram.title}"?
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  onDelete();
                  setShowConfirmDelete(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Card content */}
      <button
        onClick={onLoad}
        className="w-full text-left"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {diagram.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{formatDate(diagram.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-3 p-2 rounded-md bg-gray-50 dark:bg-gray-900/50
          font-mono text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {preview || 'Empty document'}
        </div>
      </button>

      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700
            hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Duplicate"
        >
          <Copy className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirmDelete(true);
          }}
          className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700
            hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400
            hover:text-red-600 dark:hover:text-red-400" />
        </button>
      </div>
    </div>
  );
}

export function DiagramsDialog() {
  const diagrams = useStorageStore((s) => s.diagrams);
  const deleteDiagram = useStorageStore((s) => s.deleteDiagram);
  const duplicateDiagram = useStorageStore((s) => s.duplicateDiagram);
  const setContent = useEditorStore((s) => s.setContent);
  const setViewType = usePreviewStore((s) => s.setViewType);
  const closeDialog = useUIStore((s) => s.closeDialog);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiagrams = searchQuery.trim()
    ? diagrams.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : diagrams;

  const handleLoad = (diagram: SavedDiagram) => {
    setContent(diagram.content);
    if (diagram.viewType) {
      setViewType(diagram.viewType as ViewType);
    }
    closeDialog();
  };

  const handleDuplicate = (id: string) => {
    duplicateDiagram(id);
  };

  const handleDelete = (id: string) => {
    deleteDiagram(id);
  };

  return (
    <DialogWrapper title="My Diagrams" width="2xl">
      <div className="flex flex-col h-[60vh] max-h-[500px]">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search diagrams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent transition-shadow"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Diagrams grid */}
        <div className="flex-1 overflow-y-auto">
          {filteredDiagrams.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800
                flex items-center justify-center mb-4">
                <FolderOpen className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {searchQuery ? 'No diagrams found' : 'No saved diagrams yet'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Use Ctrl+S to save your current diagram'}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredDiagrams.map((diagram) => (
                <DiagramCard
                  key={diagram.id}
                  diagram={diagram}
                  onLoad={() => handleLoad(diagram)}
                  onDuplicate={() => handleDuplicate(diagram.id)}
                  onDelete={() => handleDelete(diagram.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {diagrams.length} diagram{diagrams.length !== 1 ? 's' : ''} saved locally
          </p>
        </div>
      </div>
    </DialogWrapper>
  );
}
