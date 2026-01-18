/**
 * Features - Why TaskML section
 */

import { FileText, LayoutGrid, Bot } from 'lucide-react';

const FEATURES = [
  {
    icon: FileText,
    title: 'Simple Syntax',
    description:
      'Plain text that humans can read and write. No complex XML or JSON structures. Just intuitive markers like [x] for done and [~] for in progress.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: LayoutGrid,
    title: 'Multiple Views',
    description:
      'One document, many visualizations. Switch between List, Kanban, Timeline, Graph, and Table views instantly. See your tasks the way you think.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Bot,
    title: 'AI-Native',
    description:
      'Designed for LLM agents. TaskML is the perfect format for AI task management, planning, and handoffs. Structured enough to parse, simple enough to generate.',
    color: 'from-signal to-amber-500',
  },
];

export function Features() {
  return (
    <section className="py-32 bg-midnight-elevated">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why TaskML?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A markup language designed for the way we actually work with tasks.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-midnight-surface border border-midnight-border
                hover:border-midnight-border-active transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-6`}
              >
                <div className="w-full h-full rounded-[10px] bg-midnight-surface flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
