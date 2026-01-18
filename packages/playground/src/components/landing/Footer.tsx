/**
 * Footer - Landing page footer with CTA
 */

import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-20 bg-midnight-elevated border-t border-midnight-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Final CTA */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Try TaskML in the playground or integrate it into your project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/playground"
              className="group flex items-center gap-2 px-8 py-4 bg-signal text-white font-semibold rounded-lg
                hover:bg-signal-hover transition-colors shadow-lg shadow-signal/20"
            >
              Open Playground
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://www.npmjs.com/package/taskml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-midnight-surface text-white font-semibold rounded-lg
                border border-midnight-border hover:border-midnight-border-active transition-colors"
            >
              <code className="text-signal">npm i taskml</code>
            </a>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-midnight-border">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <svg className="w-5 h-5 text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            <span className="font-semibold text-white">TaskML</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/playground" className="hover:text-white transition-colors">
              Playground
            </Link>
            <a
              href="https://github.com/anthropics/taskml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/taskml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              npm
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 mt-4 sm:mt-0">
            MIT License
          </div>
        </div>
      </div>
    </footer>
  );
}
