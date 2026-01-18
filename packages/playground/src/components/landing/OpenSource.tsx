/**
 * OpenSource - Community and open source section
 */

import { Github, Star, GitFork, Heart } from 'lucide-react';

export function OpenSource() {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-midnight-surface border border-midnight-border mb-8">
          <Heart className="w-8 h-8 text-signal" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Open Source, Forever Free
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
          TaskML is MIT licensed and free to use. Built with love for the developer community.
          Contributions welcome.
        </p>

        {/* GitHub stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href="https://github.com/anthropics/taskml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-midnight-surface border border-midnight-border
              hover:border-midnight-border-active transition-colors"
          >
            <Github className="w-6 h-6 text-white" />
            <div className="text-left">
              <div className="text-sm text-gray-400">Repository</div>
              <div className="text-white font-semibold">anthropics/taskml</div>
            </div>
          </a>

          <a
            href="https://github.com/anthropics/taskml/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-midnight-surface border border-midnight-border
              hover:border-midnight-border-active transition-colors"
          >
            <Star className="w-6 h-6 text-yellow-400" />
            <div className="text-left">
              <div className="text-sm text-gray-400">Stars</div>
              <div className="text-white font-semibold">Star on GitHub</div>
            </div>
          </a>

          <a
            href="https://github.com/anthropics/taskml/fork"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-midnight-surface border border-midnight-border
              hover:border-midnight-border-active transition-colors"
          >
            <GitFork className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <div className="text-sm text-gray-400">Fork</div>
              <div className="text-white font-semibold">Contribute</div>
            </div>
          </a>
        </div>

        {/* License badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-surface border border-midnight-border text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          MIT License
        </div>
      </div>
    </section>
  );
}
