/**
 * ExamplesDialog - Vivid template gallery
 * Inspired by monday.com - colorful, visual, engaging
 */

'use client';

import { useState, useMemo } from 'react';
import { Search, Star, LayoutGrid, X, ArrowRight } from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { useEditorStore, useUIStore, usePreviewStore } from '../../stores';
import {
  EXAMPLES,
  CATEGORY_INFO,
  searchExamples,
  getFeaturedExamples,
} from '../../lib/examples';
import type { Example, TemplateCategory, ViewType } from '../../types';

const VIEW_LABELS: Record<ViewType, string> = {
  list: 'List',
  kanban: 'Kanban',
  tree: 'Tree',
  timeline: 'Timeline',
  table: 'Table',
  graph: 'Graph',
  summary: 'Summary',
};

// Colorful gradients for featured cards
const FEATURED_GRADIENTS = [
  'from-orange-500 to-rose-500',
  'from-blue-500 to-purple-500',
  'from-green-500 to-teal-500',
  'from-purple-500 to-pink-500',
  'from-cyan-500 to-blue-500',
  'from-amber-500 to-orange-500',
];

interface TemplateCardProps {
  example: Example;
  onSelect: () => void;
  featured?: boolean;
  index?: number;
}

function TemplateCard({ example, onSelect, featured, index = 0 }: TemplateCardProps) {
  const categoryInfo = CATEGORY_INFO[example.category];
  const gradient = featured
    ? FEATURED_GRADIENTS[index % FEATURED_GRADIENTS.length]
    : categoryInfo?.gradient || 'from-gray-500 to-gray-600';

  if (featured) {
    // Featured cards are large and colorful
    return (
      <button
        onClick={onSelect}
        className="group relative overflow-hidden rounded-xl text-left transition-all duration-200
          hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />

        {/* Content */}
        <div className="relative p-5">
          {/* Category icon */}
          <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <span className="text-2xl">{categoryInfo?.icon || '📄'}</span>
          </div>

          {/* Title & description */}
          <h3 className="text-lg font-bold text-white mb-1">{example.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2">{example.description}</p>

          {/* View hint */}
          {example.recommendedView && (
            <div className="mt-3 flex items-center gap-1 text-xs text-white/60">
              <span>Best in {VIEW_LABELS[example.recommendedView]}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </button>
    );
  }

  // Regular cards
  return (
    <button
      onClick={onSelect}
      className="group relative flex items-start gap-3 p-4 text-left rounded-xl
        bg-midnight-surface border border-midnight-border
        hover:border-transparent hover:shadow-lg transition-all duration-200"
      style={{
        '--card-color': categoryInfo?.color || '#6B7280',
      } as React.CSSProperties}
    >
      {/* Colored left border */}
      <div
        className="absolute left-0 top-3 bottom-3 w-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: categoryInfo?.color }}
      />

      {/* Category icon with color background */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-2"
        style={{ backgroundColor: `${categoryInfo?.color}20` }}
      >
        <span className="text-xl">{categoryInfo?.icon || '📄'}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white group-hover:text-signal transition-colors">
          {example.title}
        </h3>
        <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">{example.description}</p>
        {example.recommendedView && (
          <span className="text-xs text-gray-500 mt-1 inline-block">
            Best in {VIEW_LABELS[example.recommendedView]}
          </span>
        )}
      </div>
    </button>
  );
}

// Category pill for horizontal scrolling
function CategoryPill({
  id,
  info,
  count,
  selected,
  onClick,
}: {
  id: string;
  info: (typeof CATEGORY_INFO)[TemplateCategory];
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
        ${
          selected
            ? 'text-white shadow-lg'
            : 'bg-midnight-surface text-gray-400 hover:text-white hover:bg-midnight-elevated'
        }`}
      style={
        selected
          ? { backgroundColor: info.color }
          : undefined
      }
    >
      <span>{info.icon}</span>
      <span className="font-medium">{info.label}</span>
      <span className={`text-xs ${selected ? 'text-white/70' : 'text-gray-500'}`}>
        {count}
      </span>
    </button>
  );
}

export function ExamplesDialog() {
  const setContent = useEditorStore((s) => s.setContent);
  const setViewType = usePreviewStore((s) => s.setViewType);
  const closeDialog = useUIStore((s) => s.closeDialog);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    TemplateCategory | 'all' | 'featured'
  >('featured');

  const categories = Object.entries(CATEGORY_INFO) as [
    TemplateCategory,
    (typeof CATEGORY_INFO)[TemplateCategory],
  ][];

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

  const isFeaturedView = selectedCategory === 'featured' && !searchQuery;

  return (
    <DialogWrapper title="Templates" width="4xl">
      <div className="flex flex-col h-[75vh] max-h-[700px] -mx-6 -mb-6">
        {/* Search bar */}
        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setSelectedCategory('all');
              }}
              className="w-full pl-12 pr-12 py-3 rounded-xl
                border border-midnight-border bg-midnight-surface
                text-white placeholder:text-gray-500 text-base
                focus:outline-none focus:ring-2 focus:ring-signal focus:border-transparent
                transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full
                  hover:bg-midnight-elevated transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Category pills - horizontal scroll */}
        <div className="px-6 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2">
            {/* Featured */}
            <button
              onClick={() => {
                setSelectedCategory('featured');
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
                ${
                  selectedCategory === 'featured'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-midnight-surface text-gray-400 hover:text-white hover:bg-midnight-elevated'
                }`}
            >
              <Star className="w-4 h-4" />
              <span className="font-medium">Featured</span>
            </button>

            {/* All */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
                ${
                  selectedCategory === 'all'
                    ? 'bg-signal text-white shadow-lg'
                    : 'bg-midnight-surface text-gray-400 hover:text-white hover:bg-midnight-elevated'
                }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="font-medium">All</span>
              <span className="text-xs opacity-70">{EXAMPLES.length}</span>
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-midnight-border self-center mx-1" />

            {/* Categories */}
            {categories.map(([id, info]) => {
              const count = EXAMPLES.filter((e) => e.category === id).length;
              return (
                <CategoryPill
                  key={id}
                  id={id}
                  info={info}
                  count={count}
                  selected={selectedCategory === id}
                  onClick={() => {
                    setSelectedCategory(id);
                    setSearchQuery('');
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Template grid */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-500">
              {filteredExamples.length} result{filteredExamples.length !== 1 ? 's' : ''} for "
              {searchQuery}"
            </div>
          )}

          {filteredExamples.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-16 h-16 rounded-2xl bg-midnight-surface flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg">No templates found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-signal hover:underline"
              >
                View all templates
              </button>
            </div>
          ) : isFeaturedView ? (
            // Featured view: 2x3 grid of colorful cards
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredExamples.map((example, index) => (
                <TemplateCard
                  key={example.id}
                  example={example}
                  onSelect={() => handleLoadExample(example)}
                  featured
                  index={index}
                />
              ))}
            </div>
          ) : (
            // Regular view: list of cards
            <div className="grid gap-3 md:grid-cols-2">
              {filteredExamples.map((example) => (
                <TemplateCard
                  key={example.id}
                  example={example}
                  onSelect={() => handleLoadExample(example)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-midnight-border bg-midnight-elevated/50 text-center">
          <p className="text-xs text-gray-500">
            {EXAMPLES.length} templates available • Press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-midnight-surface text-gray-400">Esc</kbd> to
            close
          </p>
        </div>
      </div>
    </DialogWrapper>
  );
}
