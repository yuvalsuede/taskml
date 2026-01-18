/**
 * SyntaxShowcase - Interactive code example with live preview
 */

'use client';

import { useEffect, useState } from 'react';
import { parse, render, getStyles } from 'taskml';
import { Copy, Check } from 'lucide-react';

const EXAMPLE_CODE = `@project Website Redesign
@sprint Q1 2025

== Design Phase ==
[x] Create wireframes !1 @designer ~2d
[x] Design system setup !1 @designer
[~] Homepage mockup !0 @designer
  [x] Hero section
  [x] Features grid
  [~] Testimonials
  [ ] Footer

== Development ==
[ ] Set up Next.js project !2 @dev
[ ] Implement components !1 @dev
[ ] Add animations !3 @dev

- Note: Using Tailwind for styling
- Deadline: End of Q1`;

const SYNTAX_HIGHLIGHTS = [
  { pattern: '[ ]', label: 'Pending', color: 'text-gray-400' },
  { pattern: '[~]', label: 'In Progress', color: 'text-blue-400' },
  { pattern: '[x]', label: 'Completed', color: 'text-green-400' },
  { pattern: '!0', label: 'Critical', color: 'text-red-400' },
  { pattern: '!1', label: 'High', color: 'text-orange-400' },
  { pattern: '@name', label: 'Assignee', color: 'text-purple-400' },
  { pattern: '~2d', label: 'Estimate', color: 'text-cyan-400' },
  { pattern: '== ==', label: 'Section', color: 'text-yellow-400' },
];

export function SyntaxShowcase() {
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const result = parse(EXAMPLE_CODE);
      if (result.document) {
        const styles = getStyles('list');
        const rendered = render(result.document, { view: 'list', includeStyles: false });
        setHtml(`<style>${styles}</style>${rendered}`);
      }
    } catch {
      // Ignore
    }
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(EXAMPLE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Intuitive Syntax
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Write tasks in plain text. TaskML handles the rest.
          </p>
        </div>

        {/* Syntax legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {SYNTAX_HIGHLIGHTS.map((item) => (
            <div
              key={item.pattern}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-surface border border-midnight-border"
            >
              <code className={`font-mono text-sm ${item.color}`}>
                {item.pattern}
              </code>
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Code + Preview */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code editor */}
          <div className="relative rounded-xl bg-midnight-elevated border border-midnight-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-midnight-border bg-midnight-surface">
              <span className="text-sm text-gray-400 font-mono">tasks.taskml</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-midnight-elevated transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Code content */}
            <pre className="p-6 text-sm font-mono text-gray-300 overflow-auto max-h-[500px]">
              <code>{EXAMPLE_CODE}</code>
            </pre>
          </div>

          {/* Live preview */}
          <div className="relative rounded-xl bg-midnight-elevated border border-midnight-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-midnight-border bg-midnight-surface">
              <span className="text-sm text-gray-400">Live Preview</span>
              <span className="text-xs text-green-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Auto-updating
              </span>
            </div>

            {/* Preview content */}
            <div className="p-6 overflow-auto max-h-[500px]">
              <div
                className="taskml-preview"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
