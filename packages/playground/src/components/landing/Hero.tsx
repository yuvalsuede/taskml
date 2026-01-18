/**
 * Hero - Landing page hero section
 * Raycast-inspired dark, minimal design
 */

'use client';

import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parse, render, getStyles } from 'taskml';

const DEMO_TEMPLATES = [
  {
    id: 'project',
    name: 'Project',
    code: `@project Website Redesign

== Design ==
[x] Create wireframes !1 @emma
[x] Design system setup @emma
[~] Homepage mockup !0 @emma
  [x] Hero section
  [~] Features grid
  [ ] Footer

== Development ==
[ ] Set up Next.js !2 @alex
[ ] Implement components !1`,
  },
  {
    id: 'sprint',
    name: 'Sprint',
    code: `@sprint Sprint 24 - Auth
@due 2025-02-01

[x] User login flow !0 @dev
[x] Password reset !1 @dev
[~] OAuth integration !1 @backend
  [x] Google SSO
  [~] GitHub SSO
  [ ] Microsoft SSO
[!] Security audit blocked @security
[ ] Documentation !3 @docs`,
  },
  {
    id: 'meeting',
    name: 'Meeting',
    code: `@meeting Product Sync
@date 2025-01-15

== Action Items ==
[x] Review Q4 metrics @product
[~] Finalize roadmap !0 @team
[ ] Update stakeholders !1 @pm
[ ] Schedule demos !2 @sales

== Notes ==
- Launch target: March 1st
- Budget approved for expansion
- New hire starting Monday`,
  },
];

const ROTATING_WORDS = [
  { name: 'Claude', color: '#D97706' },      // Anthropic orange
  { name: 'Cursor', color: '#8B5CF6' },      // Purple
  { name: 'ChatGPT', color: '#10A37F' },     // OpenAI green
  { name: 'Gemini', color: '#4285F4' },      // Google blue
  { name: 'Grok', color: '#FFFFFF' },        // X/Twitter white
  { name: 'Copilot', color: '#0078D4' },     // Microsoft blue
];

export function Hero() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [html, setHtml] = useState('');
  const [currentWord, setCurrentWord] = useState(ROTATING_WORDS[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % ROTATING_WORDS.length;
      setCurrentWord(ROTATING_WORDS[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const result = parse(DEMO_TEMPLATES[activeTemplate].code);
      if (result.document) {
        const styles = getStyles('list');
        const rendered = render(result.document, { view: 'list', includeStyles: false });
        setHtml(`<style>${styles}</style>${rendered}`);
      }
    } catch {
      // Ignore parse errors in demo
    }
  }, [activeTemplate]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Glass header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <svg className="w-5 h-5 text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              <span className="text-[13px] font-semibold text-white">TaskML</span>
            </a>

            {/* Nav */}
            <nav className="hidden sm:flex items-center gap-6">
              <Link href="/playground" className="text-sm text-gray-400 hover:text-white transition-colors">
                Playground
              </Link>
              <a href="https://github.com/anthropics/taskml" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                Docs
              </a>
              <a href="https://github.com/anthropics/taskml" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </nav>

            {/* CTA */}
            <Link
              href="/playground"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
            >
              Try it now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          {/* Logo - TaskML with checkmark */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative inline-block">
              <h1 className="font-bold tracking-tight text-7xl sm:text-8xl lg:text-9xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal via-orange-400 to-amber-400">
                  T<span className="text-[0.75em] tracking-tight" style={{ marginLeft: '-0.08em', marginRight: '-0.02em' }}>ask</span>ML
                </span>
              </h1>
              {/* Logo mark - positioned like trademark */}
              <div className="absolute -top-1 -right-2 sm:-right-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gradient-to-br from-signal via-orange-500 to-amber-500 p-[1.5px]">
                  <div className="w-full h-full rounded-[5px] bg-black flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline with rotating word */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-300 mb-2 tracking-tight">
            The <span className="relative inline-block"><span className="text-white">task</span><span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-signal to-amber-400 rounded-full"></span></span> markup language
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-300 mb-8 tracking-tight flex items-baseline justify-center gap-3">
            <span>for</span>
            <span className="inline-block overflow-hidden h-[1.15em] relative" style={{ verticalAlign: 'baseline' }}>
              <span
                key={currentWord.name}
                className="inline-block font-bold"
                style={{
                  animation: 'rollUp 0.5s ease-out forwards',
                  color: currentWord.color,
                }}
              >
                {currentWord.name}
              </span>
            </span>
          </h3>
          <style jsx global>{`
            @keyframes rollUp {
              0% {
                transform: translateY(100%);
                opacity: 0;
              }
              15% {
                opacity: 1;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }

            /* Dark theme for TaskML preview - override CSS variables */
            .taskml-preview {
              --taskml-bg: transparent;
              --taskml-bg-secondary: rgba(31, 41, 55, 0.5);
              --taskml-bg-hover: rgba(55, 65, 81, 0.6);
              --taskml-text: #f3f4f6;
              --taskml-text-secondary: #d1d5db;
              --taskml-text-muted: #9ca3af;
              --taskml-border: #374151;
              --taskml-border-light: #4b5563;
              --taskml-status-pending: #6b7280;
              --taskml-status-pending-bg: rgba(107, 114, 128, 0.2);
              --taskml-status-progress: #3b82f6;
              --taskml-status-progress-bg: rgba(59, 130, 246, 0.2);
              --taskml-status-completed: #22c55e;
              --taskml-status-completed-bg: rgba(34, 197, 94, 0.2);
              --taskml-status-blocked: #ef4444;
              --taskml-status-blocked-bg: rgba(239, 68, 68, 0.2);
              --taskml-priority-0: #ef4444;
              --taskml-priority-0-bg: rgba(239, 68, 68, 0.2);
              --taskml-priority-1: #f97316;
              --taskml-priority-1-bg: rgba(249, 115, 22, 0.2);
              --taskml-priority-2: #3b82f6;
              --taskml-priority-2-bg: rgba(59, 130, 246, 0.2);
              --taskml-priority-3: #6b7280;
              --taskml-priority-3-bg: rgba(107, 114, 128, 0.2);
              --taskml-assignee: #60a5fa;
              --taskml-tag: #a78bfa;
              --taskml-estimate: #34d399;
            }
          `}</style>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
            </span>
            Open Source
          </div>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Simple syntax. Multiple views. Built for AI agents.
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
          <div className="absolute -inset-4 bg-gradient-to-r from-signal/20 via-orange-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-40" />

          {/* Preview container - Glass style */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {/* Window chrome with tabs */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Tabs */}
              <div className="flex-1 flex items-center justify-center gap-1">
                {DEMO_TEMPLATES.map((template, index) => (
                  <button
                    key={template.id}
                    onClick={() => setActiveTemplate(index)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      activeTemplate === index
                        ? 'bg-white/10 text-white'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>

              <div className="w-[52px]" /> {/* Spacer for symmetry */}
            </div>

            {/* Content */}
            <div className="p-6 min-h-[280px]">
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
