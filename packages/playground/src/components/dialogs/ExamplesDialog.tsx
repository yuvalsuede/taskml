/**
 * ExamplesDialog - Beautiful template gallery
 *
 * Mermaid.live-inspired template browser with categories,
 * search, and featured templates.
 */

'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Star,
  Layout,
  Columns,
  GitBranch,
  Clock,
  Table,
  Share2,
  BarChart3,
  X,
} from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { useEditorStore, useUIStore, usePreviewStore } from '../../stores';
import { EXAMPLES, CATEGORY_INFO, searchExamples, getFeaturedExamples } from '../../lib/examples';
import type { Example, TemplateCategory, ViewType } from '../../types';

const VIEW_ICONS: Record<ViewType, typeof Layout> = {
  list: Layout,
  kanban: Columns,
  tree: GitBranch,
  timeline: Clock,
  table: Table,
  graph: Share2,
  summary: BarChart3,
};

const VIEW_LABELS: Record<ViewType, string> = {
  list: 'List',
  kanban: 'Kanban',
  tree: 'Tree',
  timeline: 'Timeline',
  table: 'Table',
  graph: 'Graph',
  summary: 'Summary',
};

interface TemplateCardProps {
  example: Example;
  onSelect: () => void;
  compact?: boolean;
}

function TemplateCard({ example, onSelect, compact }: TemplateCardProps) {
  const ViewIcon = example.recommendedView ? VIEW_ICONS[example.recommendedView] : Layout;

  return (
    <button
      onClick={onSelect}
      className={`group relative flex flex-col text-left rounded-xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500
        hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200
        ${compact ? 'p-3' : 'p-4'}`}
    >
      {/* Featured badge */}
      {example.featured && (
        <div className="absolute -top-2 -right-2 bg-amber-400 dark:bg-amber-500 text-amber-900
          text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100
          dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center
          ${compact ? 'w-10 h-10' : 'w-12 h-12'}`}>
          <ViewIcon className={`text-blue-600 dark:text-blue-400 ${compact ? 'w-5 h-5' : 'w-6 h-6'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-900 dark:text-white group-hover:text-blue-600
            dark:group-hover:text-blue-400 transition-colors truncate
            ${compact ? 'text-sm' : 'text-base'}`}>
            {example.title}
          </h3>
          <p className={`text-gray-500 dark:text-gray-400 line-clamp-2 ${compact ? 'text-xs mt-0.5' : 'text-sm mt-1'}`}>
            {example.description}
          </p>
        </div>
      </div>

      {/* Footer with tags and recommended view */}
      {!compact && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {example.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700
                  text-gray-600 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
          {example.recommendedView && (
            <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
              Best in {VIEW_LABELS[example.recommendedView]}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export function ExamplesDialog() {
  const setContent = useEditorStore((s) => s.setContent);
  const setViewType = usePreviewStore((s) => s.setViewType);
  const closeDialog = useUIStore((s) => s.closeDialog);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all' | 'featured'>('featured');

  const categories = Object.entries(CATEGORY_INFO) as [TemplateCategory, typeof CATEGORY_INFO[TemplateCategory]][];

  const filteredExamples = useMemo(() => {
    if (searchQuery.trim()) {
      return searchExamples(searchQuery);
    }
    if (selectedCategory === 'featured') {
      return getFeaturedExamples();
    }
    if (selectedCategory === 'all') {
      return EXAMPLES;
    }
    return EXAMPLES.filter((e) => e.category === selectedCategory);
  }, [searchQuery, selectedCategory]);

  const handleLoadExample = (example: Example) => {
    setContent(example.content);
    if (example.recommendedView) {
      setViewType(example.recommendedView);
    }
    closeDialog();
  };

  return (
    <DialogWrapper title="Templates" width="3xl">
      <div className="flex flex-col h-[70vh] max-h-[600px]">
        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setSelectedCategory('all');
            }}
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

        <div className="flex flex-1 gap-4 min-h-0">
          {/* Category sidebar */}
          <div className="w-48 flex-shrink-0 space-y-1 overflow-y-auto">
            {/* Featured */}
            <button
              onClick={() => {
                setSelectedCategory('featured');
                setSearchQuery('');
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors
                ${selectedCategory === 'featured'
                  ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <Star className="w-4 h-4" />
              Featured
            </button>

            {/* All */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors
                ${selectedCategory === 'all'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <Layout className="w-4 h-4" />
              All Templates
              <span className="ml-auto text-xs text-gray-400">{EXAMPLES.length}</span>
            </button>

            <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

            {/* Categories */}
            {categories.map(([id, info]) => {
              const count = EXAMPLES.filter((e) => e.category === id).length;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedCategory(id);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors
                    ${selectedCategory === id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <span className="text-base">{info.icon}</span>
                  <span className="truncate">{info.label}</span>
                  <span className="ml-auto text-xs text-gray-400">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Template grid */}
          <div className="flex-1 overflow-y-auto pr-2">
            {searchQuery && (
              <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                {filteredExamples.length} result{filteredExamples.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>
            )}

            {filteredExamples.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No templates found
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View all templates
                </button>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredExamples.map((example) => (
                  <TemplateCard
                    key={example.id}
                    example={example}
                    onSelect={() => handleLoadExample(example)}
                    compact={filteredExamples.length > 6}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {EXAMPLES.length} templates available
          </p>
        </div>
      </div>
    </DialogWrapper>
  );
}
