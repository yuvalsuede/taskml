/**
 * Hero - Landing page hero section
 * Raycast-inspired dark, minimal design
 */

'use client';

import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parse, render, getStyles } from 'taskml';

const DEMO_CODE = `@project TaskML Demo

== In Progress ==
[~] Build landing page !1 @sarah
  [x] Design hero section
  [~] Add live preview
  [ ] Polish animations

== Completed ==
[x] Set up project structure
[x] Configure deployment`;

export function Hero() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      const result = parse(DEMO_CODE);
      if (result.document) {
        const styles = getStyles('list');
        const rendered = render(result.document, { view: 'list', includeStyles: false });
        setHtml(`<style>${styles}</style>${rendered}`);
      }
    } catch {
      // Ignore parse errors in demo
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-midnight-elevated" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
            </span>
            Open Source
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            The markup language
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal via-orange-400 to-amber-400">
              for tasks
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Simple syntax. Multiple views. Perfect for AI agents and humans alike.
            <br className="hidden sm:block" />
            Turn plain text into beautiful task visualizations.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/playground"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg
                hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-white/10"
            >
              Try Playground
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/anthropics/taskml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-midnight-surface text-white font-semibold rounded-lg
                border border-midnight-border hover:border-midnight-border-active transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Live Preview */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-signal/20 via-orange-500/20 to-amber-500/20 rounded-2xl blur-2xl opacity-50" />

          {/* Preview container */}
          <div className="relative bg-midnight-elevated rounded-xl border border-midnight-border overflow-hidden shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-midnight-border bg-midnight-surface">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-500 font-mono">taskml preview</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
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
