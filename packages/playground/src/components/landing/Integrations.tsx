/**
 * Integrations - Show how to use TaskML with AI tools
 */

'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  logo: string;
  color: string;
  systemPrompt: string;
  example: {
    user: string;
    assistant: string;
  };
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'claude',
    name: 'Claude',
    logo: '/logos/claude.svg',
    color: '#D97706',
    systemPrompt: `You are a task management assistant. When tracking tasks, use TaskML format:

## TaskML Syntax
- Tasks: [ ] pending, [~] in progress, [x] completed, [!] blocked
- Priority: !0 (critical) to !3 (low)
- Assignee: @name
- Estimate: ~2h, ~1d
- Metadata: @project Name, @sprint Sprint 1

## Example
@project Website Launch

[x] Design mockups !1 @designer
[~] Build frontend !0 @dev ~3d
  [x] Setup React
  [~] Create components
  [ ] Add styling
[ ] Write tests !2 @qa

Always output tasks in TaskML format for easy visualization.`,
    example: {
      user: 'Help me plan a product launch',
      assistant: `@project Product Launch
@due 2025-03-01

== Pre-Launch ==
[ ] Finalize pricing !0 @product
[ ] Create landing page !1 @marketing ~2d
[ ] Setup analytics !2 @dev

== Launch Day ==
[ ] Send email blast !0 @marketing
[ ] Post on social media !1 @marketing
[ ] Monitor systems !0 @dev

== Post-Launch ==
[ ] Gather feedback !1 @product ~1w
[ ] Fix critical bugs !0 @dev
[ ] Write case studies !3 @marketing`,
    },
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo: '/logos/openai.svg',
    color: '#10A37F',
    systemPrompt: `You are a task management assistant using TaskML format.

TaskML is a simple markup for tasks:
- [ ] = pending task
- [~] = in progress
- [x] = completed
- [!] = blocked

Add metadata:
- !0 to !3 for priority (critical to low)
- @name for assignee
- ~2h or ~1d for time estimates
- @project, @sprint for context

Example:
@project API Development

[x] Design endpoints !1 @backend
[~] Implement auth !0 @backend ~4h
[ ] Write documentation !2 @docs

Use this format when creating or updating task lists.`,
    example: {
      user: 'Create a sprint plan for our mobile app',
      assistant: `@project Mobile App
@sprint Sprint 5

== User Auth ==
[~] Implement login flow !0 @mobile ~3d
  [x] Design screens
  [~] Build UI components
  [ ] Connect to API
[ ] Add biometric auth !2 @mobile ~1d

== Performance ==
[ ] Optimize image loading !1 @mobile ~2d
[ ] Reduce bundle size !2 @mobile

== Testing ==
[ ] Unit tests for auth !1 @qa ~2d
[ ] E2E test suite !2 @qa ~3d`,
    },
  },
  {
    id: 'cursor',
    name: 'Cursor',
    logo: '/logos/cursor.svg',
    color: '#8B5CF6',
    systemPrompt: `When working on coding tasks, track progress using TaskML:

[ ] = todo, [~] = working on, [x] = done, [!] = blocked

Priority: !0 critical, !1 high, !2 medium, !3 low
Estimates: ~30m, ~2h, ~1d

Example for a feature:
@project Feature: Dark Mode

[x] Add theme context !1 ~1h
[~] Update components !0 ~3h
  [x] Header
  [~] Sidebar
  [ ] Main content
[ ] Add toggle button !2 ~30m
[ ] Test all views !1 ~1h

Use TaskML to communicate task status clearly.`,
    example: {
      user: 'Help me refactor the authentication module',
      assistant: `@project Auth Refactor

== Analysis ==
[x] Review current implementation !1 ~30m
[x] Identify pain points !1

== Refactoring ==
[~] Extract auth logic to hook !0 ~2h
  [x] Create useAuth hook
  [~] Move state management
  [ ] Add error handling
[ ] Update all consumers !1 ~1h
[ ] Add TypeScript types !2 ~30m

== Testing ==
[ ] Update unit tests !1 ~1h
[ ] Manual QA !2 ~30m`,
    },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo: '/logos/gemini.svg',
    color: '#4285F4',
    systemPrompt: `Use TaskML format for task management:

Syntax:
- [ ] pending | [~] in progress | [x] done | [!] blocked
- !0-!3 for priority (critical to low)
- @person for assignment
- ~time for estimates

Structure with @project, @sprint, and == sections ==

Example:
@project Data Pipeline

== ETL Jobs ==
[x] Setup Airflow !1 @data
[~] Create DAGs !0 @data ~2d
[ ] Add monitoring !2 @devops

Always format tasks in TaskML for consistency.`,
    example: {
      user: 'Plan our data migration project',
      assistant: `@project Data Migration
@sprint Phase 1

== Planning ==
[x] Audit current schema !1 @data
[x] Design new schema !0 @data
[ ] Create migration scripts !0 @data ~3d

== Execution ==
[ ] Setup staging environment !1 @devops ~1d
[ ] Run test migration !0 @data ~2d
[ ] Validate data integrity !0 @qa ~1d

== Cutover ==
[ ] Schedule downtime window !1 @pm
[ ] Execute production migration !0 @data
[ ] Verify all systems !0 @qa`,
    },
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
        bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy prompt
        </>
      )}
    </button>
  );
}

function IntegrationLogo({ integration }: { integration: Integration }) {
  // Simple colored circle with first letter as fallback
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
      style={{ backgroundColor: integration.color }}
    >
      {integration.name[0]}
    </div>
  );
}

export function Integrations() {
  const [activeTab, setActiveTab] = useState('claude');
  const active = INTEGRATIONS.find((i) => i.id === activeTab)!;

  return (
    <section className="py-32 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            AI Integrations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Works with your favorite AI
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Add TaskML to any AI assistant with a simple system prompt.
            Copy, paste, and start managing tasks visually.
          </p>
        </div>

        {/* Integration tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {INTEGRATIONS.map((integration) => (
            <button
              key={integration.id}
              onClick={() => setActiveTab(integration.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all ${
                activeTab === integration.id
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/15'
              }`}
            >
              <IntegrationLogo integration={integration} />
              <span className="font-medium">{integration.name}</span>
            </button>
          ))}
        </div>

        {/* Active integration content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* System prompt */}
          <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="text-sm font-medium text-white">System Prompt</span>
              <CopyButton text={active.systemPrompt} />
            </div>
            <div className="p-4 max-h-[400px] overflow-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                {active.systemPrompt}
              </pre>
            </div>
          </div>

          {/* Example conversation */}
          <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="text-sm font-medium text-white">Example Output</span>
              <CopyButton text={active.example.assistant} />
            </div>
            <div className="p-4 max-h-[400px] overflow-auto space-y-4">
              {/* User message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-sm font-medium">U</span>
                </div>
                <div className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-gray-300 text-sm">
                  {active.example.user}
                </div>
              </div>

              {/* Assistant message */}
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${active.color}20` }}
                >
                  <span style={{ color: active.color }} className="text-sm font-medium">
                    {active.name[0]}
                  </span>
                </div>
                <div className="flex-1 px-4 py-3 rounded-xl bg-white/5">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {active.example.assistant}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Try the example output in the playground to see it rendered
          </p>
          <a
            href="/playground"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg
              hover:bg-gray-100 transition-colors"
          >
            Open Playground
          </a>
        </div>
      </div>
    </section>
  );
}
