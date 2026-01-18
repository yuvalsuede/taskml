/**
 * ViewTypes - Showcase different visualization options
 */

import { List, Columns, GitBranch, Clock, Table2, Network } from 'lucide-react';

const VIEWS = [
  {
    id: 'list',
    name: 'List',
    icon: List,
    description: 'Classic hierarchical view with nested subtasks',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'hover:border-blue-500/50',
  },
  {
    id: 'kanban',
    name: 'Kanban',
    icon: Columns,
    description: 'Drag-and-drop columns by status',
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'hover:border-purple-500/50',
  },
  {
    id: 'tree',
    name: 'Tree',
    icon: GitBranch,
    description: 'Visualize task hierarchy and dependencies',
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'hover:border-green-500/50',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    icon: Clock,
    description: 'Gantt-style view with time estimates',
    gradient: 'from-orange-500/20 to-amber-500/20',
    border: 'hover:border-orange-500/50',
  },
  {
    id: 'table',
    name: 'Table',
    icon: Table2,
    description: 'Spreadsheet view with sortable columns',
    gradient: 'from-red-500/20 to-rose-500/20',
    border: 'hover:border-red-500/50',
  },
  {
    id: 'graph',
    name: 'Graph',
    icon: Network,
    description: 'Network diagram of task relationships',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    border: 'hover:border-indigo-500/50',
  },
];

export function ViewTypes() {
  return (
    <section className="py-32 bg-midnight-elevated">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            One Document, Many Views
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Switch between visualizations instantly. Same data, different perspectives.
          </p>
        </div>

        {/* Views grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIEWS.map((view) => (
            <div
              key={view.id}
              className={`group relative p-6 rounded-xl bg-gradient-to-br ${view.gradient}
                border border-midnight-border ${view.border} transition-all duration-300 cursor-pointer`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-midnight-surface/80 flex items-center justify-center mb-4">
                <view.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {view.name}
              </h3>
              <p className="text-sm text-gray-400">
                {view.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
