/**
 * Built-in example templates
 *
 * Beautiful, real-world examples showcasing TaskML features
 * Inspired by mermaid.live - each template tells a story
 */

import type { Example, TemplateCategory } from '../types';

export const CATEGORY_INFO: Record<
  TemplateCategory,
  { label: string; description: string; icon: string; color: string; gradient: string }
> = {
  'getting-started': {
    label: 'Getting Started',
    description: 'Learn TaskML basics',
    icon: '📚',
    color: '#22C55E', // Green
    gradient: 'from-green-500 to-emerald-600',
  },
  'project-management': {
    label: 'Project Management',
    description: 'Sprints, roadmaps, and team planning',
    icon: '📋',
    color: '#F97316', // Orange (Signal)
    gradient: 'from-orange-500 to-amber-600',
  },
  'software-dev': {
    label: 'Software Development',
    description: 'Feature development and code reviews',
    icon: '💻',
    color: '#3B82F6', // Blue
    gradient: 'from-blue-500 to-indigo-600',
  },
  'ai-agents': {
    label: 'AI Agents',
    description: 'Agentic workflows and handoffs',
    icon: '🤖',
    color: '#A855F7', // Purple
    gradient: 'from-purple-500 to-violet-600',
  },
  'devops': {
    label: 'DevOps & Infrastructure',
    description: 'Deployments and CI/CD pipelines',
    icon: '🚀',
    color: '#06B6D4', // Cyan
    gradient: 'from-cyan-500 to-teal-600',
  },
  'personal': {
    label: 'Personal',
    description: 'Daily planning and personal tasks',
    icon: '✨',
    color: '#EC4899', // Pink
    gradient: 'from-pink-500 to-rose-600',
  },
};

export const EXAMPLES: Example[] = [
  // ═══════════════════════════════════════════════════════════════
  // GETTING STARTED - Welcoming, clear, progressive
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hello-taskml',
    title: 'Hello TaskML',
    description: 'Your first TaskML document in 30 seconds',
    category: 'getting-started',
    recommendedView: 'list',
    featured: true,
    tags: ['beginner', 'simple'],
    content: `@project Weekend Trip to Portland
@sprint This Weekend

[x] Book flights
[x] Reserve hotel
[~] Pack bags
  [x] Clothes for 3 days
  [~] Toiletries
  [ ] Camera & chargers
[ ] Print boarding passes
[ ] Arrange pet sitter

- Remember: Coffee shops to visit!
- Powell's Books, Blue Star Donuts
`,
  },
  {
    id: 'task-statuses',
    title: 'Task Statuses',
    description: 'All status types and how to use them',
    category: 'getting-started',
    recommendedView: 'kanban',
    tags: ['beginner', 'statuses'],
    content: `@project Understanding Progress
@philosophy "Progress, not perfection"

== The Journey ==

[ ] Not yet begun
  - Full of possibility
  - Waiting for the right moment

[~] In motion
  - Energy flowing
  - Momentum building

[?] Under review
  - Reflection time
  - Almost there

[x] Complete
  - Achievement unlocked
  - Ready to celebrate

== The Obstacles ==

[!] Blocked
  - Temporary pause
  - External dependency

[-] Cancelled
  - Pivot point
  - Learn and move on
`,
  },
  {
    id: 'metadata-tokens',
    title: 'Metadata & Syntax',
    description: 'Priorities, time estimates, assignments, tags',
    category: 'getting-started',
    recommendedView: 'table',
    tags: ['beginner', 'metadata'],
    content: `@project Mastering TaskML Syntax
@sprint Learn by Example

== Priority - The Heartbeat ==

[ ] The building is on fire #p0
[ ] Important, but tomorrow works #p1
[ ] Would be nice to finish #p2
[ ] Someday, maybe #p3

== Time - The Currency ==

[ ] ~15m Quick win
[ ] ~2h Deep focus block
[ ] ~1d A day's journey
[ ] ~1w Marathon project

== People - The Team ==

[ ] @alice Frontend wizard
[ ] @bob Backend architect
[ ] @carol Design visionary
[ ] @alice @bob Pair programming

== Tags - The Categories ==

[ ] #bug Something's broken
[ ] #feature Something new
[ ] #refactor Something cleaner
[ ] #docs Something explained
`,
  },
  {
    id: 'subtasks-hierarchy',
    title: 'Subtasks & Hierarchy',
    description: 'Nested tasks and project structure',
    category: 'getting-started',
    recommendedView: 'tree',
    tags: ['beginner', 'hierarchy'],
    content: `@project The Novel
@author Ernest

== Part One: The Beginning ==

[~] Chapter 1: Dawn #p0
  [x] Opening scene - the cafe
    [x] Describe the morning light
    [x] Introduce the protagonist
    [x] The mysterious letter
  [~] Rising tension
    [x] The decision to leave
    [ ] Saying goodbye
  [ ] Chapter climax
    [ ] The train station
    [ ] Point of no return

[ ] Chapter 2: The Journey #p1
  [ ] New landscapes
  [ ] Fellow travelers
  [ ] Seeds of doubt

[ ] Chapter 3: Arrival #p1
  [ ] First impressions
  [ ] The hotel
  [ ] An unexpected encounter

== Part Two: The Middle ==

[ ] Chapter 4: Complications #p0
[ ] Chapter 5: The Truth #p0
[ ] Chapter 6: Consequences #p1
`,
  },

  // ═══════════════════════════════════════════════════════════════
  // PROJECT MANAGEMENT - Professional, comprehensive
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sprint-planning',
    title: 'Sprint Planning',
    description: 'Agile sprint with tasks, assignments, and blockers',
    category: 'project-management',
    recommendedView: 'kanban',
    featured: true,
    tags: ['agile', 'sprint', 'team'],
    content: `@project Spotify Premium
@sprint Sprint 47 - Personalization
@team emma, liam, sofia, noah
@velocity 34
@dates Jan 15 - Jan 26, 2024

== 🔥 Critical Path ==

[~] AI DJ Improvements #p0 @emma ~13h ^ai-dj
  [x] Analyze skip patterns
  [x] Train new transition model
  [~] A/B test with 1% of users
  [ ] Gradual rollout to 100%
  - Model accuracy: 94.2% → 96.8%
  - Target: Skip rate < 15%
  - Target: Session length +5%

[~] Podcast Recommendations #p0 @liam ~8h ^podcasts
  depends: ai-dj
  [x] Episode embedding pipeline
  [~] Similar shows algorithm
  [ ] "Because you listened to..."
  - Target: Click-through > 12%

== 📱 Mobile Experience ==

[ ] Offline Mode Redesign #p1 @sofia ~10h
  [ ] New download manager UI
  [ ] Smart storage suggestions
  [ ] Quality auto-switching
  - Figma: bit.ly/spotify-offline-v2

[ ] Car Mode #p1 @noah ~8h
  [ ] Large touch targets
  [ ] Voice command integration
  [ ] Simplified now-playing
  - Target: Usable at arm's length

== ⏸️ Blocked ==

[!] Social Listening Party #p0 @emma
  - Waiting: Legal review of licensing
  - ETA: Jan 22
  - Contact: legal@spotify.internal

== ✅ Done ==

[x] Blend playlist algorithm #p0 @liam
[x] "Made For You" hub redesign #p1 @sofia
[x] Listening history export (GDPR) #p1 @noah
`,
  },
  {
    id: 'product-roadmap',
    title: 'Product Roadmap',
    description: 'Quarterly milestones and feature planning',
    category: 'project-management',
    recommendedView: 'timeline',
    tags: ['roadmap', 'planning', 'milestones'],
    content: `@project Linear 2024
@vision "The future of project management"
@team 45 engineers, 12 designers

== Q1: Foundation ==

[x] Platform Stability #p0 !2024-03-31
  [x] 99.99% uptime achieved
  [x] P95 latency < 50ms
  [x] Zero data incidents
  - Shipped: Real-time sync engine v3

[x] Enterprise Launch #p0 !2024-02-28 ^enterprise
  [x] SSO with SAML 2.0
  [x] Audit logs
  [x] Custom SLAs
  - Revenue: $2.4M ARR added

== Q2: Intelligence ==

[~] Linear AI #p0 !2024-06-30 ^ai
  [x] Auto-triage incoming issues
  [~] Smart sprint planning
  [ ] Predictive estimation
  [ ] "Ask Linear" natural language
  - Model: Fine-tuned Claude

[ ] Insights Dashboard #p1 !2024-05-31 ^insights
  depends: ai
  [ ] Cycle time analytics
  [ ] Team velocity trends
  [ ] Bottleneck detection

== Q3: Ecosystem ==

[ ] Plugin Marketplace #p0 !2024-09-30 ^plugins
  [ ] Developer SDK
  [ ] Marketplace UI
  [ ] Revenue sharing (70/30)
  - Target: 50 launch partners

[ ] Linear for Mobile #p1 !2024-08-31 ^mobile
  [ ] iOS app
  [ ] Android app
  [ ] Apple Watch glances

== Q4: Expansion ==

[ ] Linear Docs #p0 !2024-12-31 ^docs
  depends: ai, plugins
  [ ] Rich text editor
  [ ] Issue embedding
  [ ] AI writing assist
  - Compete with Notion

[ ] Multi-product Support #p1 !2024-11-30
  [ ] Product areas
  [ ] Cross-product roadmaps
  [ ] Portfolio views
`,
  },
  {
    id: 'okrs',
    title: 'OKRs & Goals',
    description: 'Objectives and key results tracking',
    category: 'project-management',
    recommendedView: 'summary',
    tags: ['okrs', 'goals', 'metrics'],
    content: `@project Stripe Q1 2024 OKRs
@owner Patrick Collison
@review-date 2024-04-01

== Objective 1: Accelerate Global Expansion ==
@confidence 85%

[~] KR1: Launch in 8 new countries #p0
  [x] Brazil - live
  [x] India - live
  [x] South Africa - live
  [~] Indonesia - beta
  [~] Vietnam - beta
  [ ] Philippines
  [ ] Thailand
  [ ] Colombia
  - Progress: 5/8 (62.5%)

[ ] KR2: Process $50B in emerging markets #p0
  - Current: $34.2B
  - Target: $50B
  - Progress: 68.4%

[~] KR3: < 2 day merchant onboarding globally #p1
  - Current avg: 2.4 days
  - Target: < 2 days
  - Blocker: KYC in India (5.2 days)

== Objective 2: Win Enterprise ==
@confidence 70%

[~] KR1: Sign 50 Fortune 500 companies #p0
  - Signed: 38
  - Pipeline: 23
  - Progress: 76%

[ ] KR2: Launch Stripe Enterprise suite #p0
  [x] Dedicated support tier
  [~] Custom contracts
  [ ] On-premise deployment option
  [ ] SOC 2 Type II

[ ] KR3: NPS > 70 for enterprise accounts #p1
  - Current NPS: 64
  - Target: 70+

== Objective 3: Build AI-Native Payments ==
@confidence 60%

[~] KR1: Launch Stripe AI #p0
  [x] Fraud detection v3
  [~] Revenue Recovery AI
  [ ] Pricing optimization
  - Impact: $890M fraud prevented

[ ] KR2: 30% of support handled by AI #p1
  - Current: 18%
  - Target: 30%
`,
  },

  // ═══════════════════════════════════════════════════════════════
  // SOFTWARE DEVELOPMENT - Technical, realistic
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'feature-development',
    title: 'Feature Development',
    description: 'End-to-end feature implementation workflow',
    category: 'software-dev',
    recommendedView: 'list',
    featured: true,
    tags: ['feature', 'development', 'criteria'],
    content: `@project GitHub Copilot
@feature GHCP-2847: Multi-file Context
@rfc github.com/copilot/rfcs/2847
@team @alex @priya @marcus

== Phase 1: Design ==

[x] RFC Approved #p0 @alex
  [x] Problem statement
  [x] Proposed solution
  [x] Security review
  [x] Privacy review
  - Approved by: Staff+ review

[x] Technical Design #p0 @alex ~3d
  [x] Architecture diagram
  [x] API contracts
  [x] Data flow
  [x] Edge cases
  - Doc: notion.so/copilot/mfc-design

== Phase 2: Implementation ==

[~] Backend Service #p0 @priya ~5d ^backend
  [x] Context aggregation service
  [x] Token budget allocation
  [~] Cross-file symbol resolution
  [ ] Caching layer
  [ ] Rate limiting

[~] Model Integration #p0 @alex ~3d ^model
  depends: backend
  [x] Prompt engineering
  [~] Context window optimization
  [ ] Streaming responses
  - Using: GPT-4 Turbo 128k

[ ] VS Code Extension #p1 @marcus ~4d ^vscode
  depends: backend
  [ ] File watcher
  [ ] Workspace indexing
  [ ] Context indicator UI
  [ ] Settings panel

== Phase 3: Quality ==

[ ] Testing #p0 ~2d
  [ ] Unit tests (>90% coverage)
  [ ] Integration tests
  [ ] Load testing (10k rps)
  [ ] Security penetration test

[ ] Acceptance Criteria #p0
  [ ] Works with 50+ file repos
  [ ] Latency < 500ms P95
  [ ] Context relevance score > 0.85
  [ ] No PII in telemetry
  [ ] Graceful degradation

== Phase 4: Release ==

[ ] Staged Rollout #p0 @alex
  [ ] 1% internal dogfood
  [ ] 5% Copilot Labs
  [ ] 25% Business tier
  [ ] 100% GA
`,
  },
  {
    id: 'code-review',
    title: 'Pull Request Review',
    description: 'Thorough code review checklist',
    category: 'software-dev',
    recommendedView: 'list',
    tags: ['review', 'checklist', 'quality'],
    content: `@project vercel/next.js
@pr #58392: Add React Server Actions
@author @tim
@reviewers @guillermo @shu

== Overview ==

- Feature: Server Actions (RFC-0001)
- Files changed: 47
- Additions: +2,847 / Deletions: -234
- Linked: vercel/next.js#58100

== Code Quality ==

[~] Architecture Review @guillermo
  [x] Follows existing patterns
  [x] No unnecessary abstractions
  [~] Error boundaries complete
  [ ] TypeScript strict compliance
  [ ] No 'any' types introduced
  [ ] Proper error types

[ ] Implementation @shu
  [ ] Logic correctness
  [ ] Edge cases handled
  [ ] Memory leaks checked
  [ ] Race conditions reviewed
  [ ] No blocking operations
  [ ] Proper cleanup on unmount

== Testing ==

[~] Test Coverage @tim
  [x] Unit tests: 94% coverage
  [x] Integration tests added
  [~] E2E tests pending
  [ ] Error scenario tests
  [ ] All tests passing in CI
  [ ] No flaky tests introduced

== Security ==

[ ] Security Review @security-team
  [ ] Input validation
  [ ] CSRF protection
  [ ] XSS prevention
  [ ] Auth boundary checks
  [ ] No secrets in code
  [ ] Approved by security team

== Documentation ==

[x] Docs Updated @tim
  [x] README changes
  [x] API documentation
  [x] Migration guide
  [x] Examples added
  [x] No typos

== Final Checklist ==

[ ] Ready to Merge
  [ ] All checks passing
  [ ] 2 approvals obtained
  [ ] No unresolved threads
  [ ] Squash commit message ready
`,
  },
  {
    id: 'bug-tracking',
    title: 'Bug Tracking',
    description: 'Debugging workflow and resolution tracking',
    category: 'software-dev',
    recommendedView: 'kanban',
    tags: ['bugs', 'tracking', 'debugging'],
    content: `@project Slack
@bug SLACK-92847
@severity P0 - Revenue Impacting
@oncall @jennifer

== 🚨 The Problem ==

[!] Messages not sending for Enterprise Grid #p0
  - Started: 2024-01-15 14:32 UTC
  - Affected: ~50,000 users
  - Revenue at risk: $2.3M MRR
  - Status page: incident.io/slack/92847

== 🔍 Investigation ==

[x] Initial Triage @jennifer ~15m
  [x] Confirm reproduction
  [x] Check error rates
  [x] Recent deployments?
  - Deploy 3.47.2 at 14:15 UTC

[x] Log Analysis @jennifer ~30m
  [x] Kibana query setup
  [x] Error pattern identified
  [x] Trace specific failure
  - Error: "Connection pool exhausted"
  - Service: message-router-prod

[x] Root Cause Found @jennifer
  - Cause: Memory leak in 3.47.2
  - Introduced: PR #34521
  - Why: Unclosed gRPC streams
  - Why missed: Load test env differs

== 🛠️ Resolution ==

[x] Immediate Mitigation #p0 @jennifer
  [x] Scale up pods (3 → 12)
  [x] Increase pool size
  - Partial relief achieved

[x] Hotfix Deployed #p0 @jennifer @marcus
  [x] Revert PR #34521
  [x] Cherry-pick to 3.47.3
  [x] Deploy to prod
  - Rolled out at 15:47 UTC

[x] Verification #p0
  [x] Error rate → 0%
  [x] Messages flowing
  [x] Customer confirmation
  - Incident resolved: 15:52 UTC

== 📝 Post-Mortem ==

[ ] Blameless Retrospective #p1 @jennifer
  [ ] Timeline documented
  [ ] 5 Whys analysis
  [ ] Action items
  [ ] Process improvements
  - Target: Published within 48h
`,
  },

  // ═══════════════════════════════════════════════════════════════
  // AI AGENTS - Cutting edge, thoughtful
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'task-dependencies',
    title: 'Task Dependencies',
    description: 'Visualize how tasks connect and block each other',
    category: 'getting-started',
    recommendedView: 'graph',
    featured: true,
    tags: ['dependencies', 'workflow', 'graph'],
    content: `@project Website Redesign
@sprint Launch Week

== Design Phase ==

[x] User research ^research
[x] Create wireframes ^wireframes
  depends: research
[x] Design mockups ^design
  depends: wireframes

== Development ==

[~] Build frontend ^frontend @alice
  depends: design
  [x] Header component
  [~] Hero section
  [ ] Footer component

[~] Build backend ^backend @bob
  [x] API endpoints
  [~] Database schema
  [ ] Authentication

[ ] Integration ^integrate
  depends: frontend, backend
  [ ] Connect API to UI
  [ ] Error handling
  [ ] Loading states

== Testing & Launch ==

[ ] QA testing ^qa @carol
  depends: integrate
  [ ] Cross-browser testing
  [ ] Mobile responsiveness
  [ ] Performance audit

[ ] Deploy to staging ^staging
  depends: qa

[ ] Final review ^review
  depends: staging

[ ] Production launch
  depends: review
`,
  },
  {
    id: 'research-agent',
    title: 'Search Pipeline',
    description: 'Research workflow with source verification',
    category: 'ai-agents',
    recommendedView: 'tree',
    tags: ['research', 'verification', 'sources'],
    content: `@project AI Search Pipeline
@query "Latest breakthroughs in fusion energy 2024"
@model claude-3-opus

== Query Understanding ==

[x] Parse Query !0
  [x] Extract topic: fusion energy
  [x] Time constraint: 2024
  [x] Intent: news/breakthroughs
  [x] Generate sub-queries

  sub_queries:
    - "NIF fusion ignition 2024"
    - "ITER construction progress"
    - "Commonwealth Fusion Systems"
    - "Helion Energy milestones"

== Source Gathering ==

[~] Web Search #p0
  [x] Google News API
  [x] Bing Search
  [x] Academic sources
  - sources_found: 47
  - quality_filtered: 12

[~] Source Verification #p0
  [x] Check domain authority
  [~] Cross-reference claims
  [ ] Identify primary sources
  - verified: nature.com (DA: 95)
  - verified: science.org (DA: 94)
  - verified: iter.org (DA: 82)

== Content Analysis ==

[ ] Extract Key Information #p1
  [ ] NIF ignition results
    - December 2023 record
    - 3.88 MJ output
    - Net energy gain confirmed
  [ ] ITER timeline updates
    - First plasma: 2025
    - Full fusion: 2035
  [ ] Private sector progress
    - CFS: SPARC on track
    - Helion: 2028 target

== Response Generation ==

[ ] Synthesize Answer #p0
  [ ] Lead with breakthrough
  [ ] Timeline visualization
  [ ] Expert quotes
  [ ] Inline citations
  [ ] Every claim has [source]
  [ ] Recency highlighted
  [ ] Confidence indicated
`,
  },
  {
    id: 'tool-use-agent',
    title: 'Coding Agent',
    description: 'Autonomous software engineering workflow',
    category: 'ai-agents',
    recommendedView: 'list',
    tags: ['tools', 'reasoning', 'execution'],
    content: `@project Autonomous Dev Agent
@task "Add dark mode to the dashboard"
@repo github.com/acme/dashboard
@tools bash, read_file, edit_file, browser

== 🧠 Planning ==

[x] Understand Codebase #p0 ~2m
  [x] Read package.json
  [x] Identify framework: Next.js 14
  [x] Find styling: Tailwind CSS
  [x] Check existing theme system
  - No theme system exists
  - Uses CSS variables for colors
  - 47 components to update
  - Recommend: next-themes + Tailwind

[x] Create Implementation Plan #p0
  [x] Step 1: Install dependencies
  [x] Step 2: Create theme provider
  [x] Step 3: Update tailwind.config
  [x] Step 4: Add color variables
  [x] Step 5: Update components
  [x] Step 6: Add toggle UI
  [x] Step 7: Test & verify

== 🔧 Execution ==

[x] Setup Theme System #p0
  [x] npm install next-themes
  [x] Create providers/theme.tsx
  [x] Wrap app in ThemeProvider
  - Tool: bash, edit_file

[~] Update Styling #p0
  [x] Modify tailwind.config.js
  [x] Add dark: variants
  [~] Update CSS variables
  [ ] Component sweep (23/47)
  - Tool: edit_file (batch mode)

[ ] Add Theme Toggle #p1
  [ ] Create ThemeToggle component
  [ ] Add to header
  [ ] Animate transition
  [ ] Persist preference
  - Tool: edit_file, browser (preview)

== ✅ Verification ==

[ ] Test Implementation #p0
  [ ] Light mode renders
  [ ] Dark mode renders
  [ ] Toggle works
  [ ] Preference persists
  [ ] No flash on load
  - Tool: browser (Playwright)

[ ] Create Pull Request #p0
  [ ] Stage changes
  [ ] Write PR description
  [ ] Request review
  - Tool: bash (gh cli)
`,
  },

  // ═══════════════════════════════════════════════════════════════
  // DEVOPS - Production-ready, battle-tested
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'deployment-pipeline',
    title: 'CI/CD Pipeline',
    description: 'Build, test, and deploy workflow',
    category: 'devops',
    recommendedView: 'timeline',
    featured: true,
    tags: ['cicd', 'deployment', 'pipeline'],
    content: `@project vercel/next.js
@pipeline Production Release
@trigger merge to main
@sha a]3f7b2c

== ⚡ Build Stage ==

[x] Checkout & Install #p0 ~45s
  - Turborepo cache: HIT
  - Dependencies: 2,847
  - Node: 20.10.0

[x] Type Check #p0 ~23s
  - TypeScript: strict
  - Errors: 0
  - Files: 1,247

[x] Lint & Format #p0 ~18s
  - ESLint: passed
  - Prettier: passed
  - Warnings: 3 (non-blocking)

[x] Build Application #p0 ~2m12s ^build
  - Framework: Next.js 14.1
  - Output: Serverless
  - Bundle: 847KB (gzipped)
  - Routes: 47 static, 12 dynamic

== 🧪 Test Stage ==

[x] Unit Tests #p0 ~1m34s ^unit
  - Vitest: 2,847 passed
  - Coverage: 89.4%
  - Snapshots: 124 matched

[x] Integration Tests #p0 ~3m22s ^integration
  depends: unit
  - Playwright: 234 passed
  - Browsers: Chrome, Firefox, Safari
  - Flaky: 0

[x] E2E Tests #p0 ~4m47s ^e2e
  depends: unit
  - Critical paths: 47/47
  - Visual regression: passed
  - Performance budget: passed

== 🌍 Deploy Stage ==

[x] Edge Network #p0 ~34s ^edge
  depends: build
  - Regions: 18
  - Cache: invalidated
  - DNS: propagated

[x] Preview Deployment #p0
  - URL: next-git-a3f7b2c.vercel.app
  - Status: ready
  - Lighthouse: 98/100

[?] Production Approval #p0 @release-team
  [ ] Staging verified
  [ ] No P0 bugs
  [ ] Rollback ready

== 📊 Post-Deploy ==

[ ] Production #p0
  [ ] Blue-green cutover
  [ ] Health checks (5m)
  [ ] Error monitoring
  [ ] Error rate < 0.01%
  [ ] P95 latency < 100ms
`,
  },
  {
    id: 'infrastructure-setup',
    title: 'Infrastructure Setup',
    description: 'Cloud infrastructure and networking',
    category: 'devops',
    recommendedView: 'tree',
    tags: ['infrastructure', 'cloud', 'setup'],
    content: `@project Acme Corp Production
@provider AWS
@region us-east-1, eu-west-1
@compliance SOC2, HIPAA

== 🌐 Networking ==

[x] VPC Architecture #p0 @infra
  [x] Primary VPC (10.0.0.0/16)
    [x] Public subnets (3 AZs)
    [x] Private subnets (3 AZs)
    [x] Database subnets (3 AZs)
  [x] VPC Peering to DR region
  [x] Transit Gateway setup

[x] Security Groups #p0
  [x] ALB (443 inbound)
  [x] App (8080 from ALB only)
  [x] DB (5432 from App only)
  [x] Bastion (22 from VPN)
  - Principle: Least privilege

== ⚡ Compute ==

[~] EKS Cluster #p0 @platform
  [x] Control plane (1.29)
  [x] Managed node groups
    [x] system: t3.large x3
    [x] app: c6i.xlarge x6
    [~] ml: g4dn.xlarge x2
  [ ] Karpenter autoscaling
  [ ] Pod security policies

[ ] Load Balancing #p1
  [ ] ALB Ingress Controller
  [ ] WAF integration
  [ ] SSL/TLS termination
  [ ] Geographic routing

== 💾 Data ==

[~] Databases #p0 @dba
  [x] RDS PostgreSQL 15
    [x] Multi-AZ deployment
    [x] 500GB gp3 storage
    [x] Automated backups (35 days)
  [~] ElastiCache Redis 7
    [~] Cluster mode enabled
    [ ] Encryption at rest/transit

[ ] Storage #p1 @infra
  [ ] S3 buckets (encrypted)
    [ ] assets.acme.com
    [ ] backups.acme.internal
    [ ] logs.acme.internal
  [ ] EFS for shared storage

== 🔐 Security ==

[ ] Identity & Access #p0 @security
  [ ] IAM roles (IRSA)
  [ ] Secrets Manager
  [ ] KMS customer keys
  [ ] AWS SSO integration
  [ ] No long-lived credentials
  [ ] Audit logging enabled
`,
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    description: 'On-call workflow and resolution tracking',
    category: 'devops',
    recommendedView: 'list',
    tags: ['incident', 'response', 'oncall'],
    content: `@project INCIDENT-2024-0892
@severity P1 - Service Degradation
@oncall @sarah
@commander @michael
@scribe @david

== 🚨 Detection ==

- 03:42 UTC - Alert Triggered
  - Source: Datadog
  - Alert: "API latency > 5s"
  - Dashboard: ddog.co/dash/api-prod

[x] 03:47 UTC - Incident Declared
  [x] Acknowledged by @sarah
  [x] Incident channel created
  [x] Status page: investigating
  - Slack: #inc-2024-0892

== 🔍 Investigation ==

[x] Initial Assessment #p0 @sarah ~10m
  [x] Scope: /api/v1/* endpoints
  [x] Impact: 40% of requests
  [x] Timeline: Started 03:38 UTC
  [x] Changes: Deploy 4.12.1 at 03:35
  - Hypothesis: Bad deploy

[x] Deep Dive #p0 @sarah ~15m
  [x] Check pod health
  [x] Analyze error logs
  [x] Review deployment diff
  [x] Database connections?
  - Root cause: N+1 query in new endpoint hitting 500ms timeout
  - Introduced: PR #8921

== 🛠️ Mitigation ==

[x] Immediate Actions #p0 @sarah
  [x] Scale API pods 6 → 20
  [x] Increase DB pool 50 → 200
  - Partial relief: latency 5s → 2s

[x] Rollback #p0 @michael
  [x] kubectl rollout undo
  [x] Verify 4.12.0 running
  [x] Monitor error rates
  - Full resolution: 04:23 UTC

== 📢 Communication ==

[x] Internal Updates @david
  [x] 03:50 - Investigating
  [x] 04:10 - Mitigation in progress
  [x] 04:25 - Resolved

[x] External Updates @comms
  [x] Status page updated
  [x] Twitter acknowledgment
  [x] Customer email (enterprise)

== 📝 Follow-up ==

[ ] Post-Mortem !1 @sarah >2024-01-18
  [ ] 5 Whys analysis
  [ ] Timeline documentation
  [ ] Action items

Action items:
  [ ] Add N+1 query detection to CI
  [ ] Implement canary deployments
  [ ] Improve load test coverage
  [ ] Add circuit breaker
`,
  },

  // ═══════════════════════════════════════════════════════════════
  // PERSONAL - Relatable, aspirational
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'daily-planning',
    title: 'Daily Planning',
    description: 'Personal daily schedule with time blocks',
    category: 'personal',
    recommendedView: 'list',
    featured: true,
    tags: ['daily', 'personal', 'productivity'],
    content: `@project Monday, January 15th
@theme Deep Work Day
@energy ████████░░ 80%

== ☀️ Morning Ritual ==

[x] 6:00 Wake with sunrise
[x] 6:15 Meditation ~20m
  - Headspace: Focus pack
[x] 6:45 Movement ~30m
  [x] 20 min run
  [x] Stretching
[x] 7:30 Healthy breakfast
  - Oatmeal, berries, coffee

== 🎯 Deep Work (9-12) ==

[~] Write quarterly review #p0 ~2h
  [x] Gather metrics
  [x] Draft narrative
  [~] Add visualizations
  [ ] Final polish
  - No Slack, no email
  - Phone in drawer

[ ] Code review: auth refactor #p1 ~1h
  - PR #234 from @alex
  - Focus: security implications

== ☕ Afternoon ==

[x] 12:00 Lunch & walk ~45m
  - Leave the laptop behind

[ ] 13:00 Team standup #p0 ~15m
[ ] 14:00 1:1 with Jordan #p1 ~30m
  - Career growth discussion
  - Feedback on presentation

[ ] Process email #p2 ~30m
  [ ] Reply to client
  [ ] Schedule dentist
  [ ] RSVP to dinner

[ ] 15:30 Focus block #2 ~90m
  - Continue auth review
  - Prep for tomorrow

== 🌙 Evening ==

[ ] 18:00 Gym - leg day ~1h
[ ] 19:30 Cook dinner
  - Try that pasta recipe
[ ] 21:00 Read ~30m
  - "Four Thousand Weeks"
[ ] 22:00 Wind down
  [ ] Journal
  [ ] Plan tomorrow
  [ ] Screens off
`,
  },
  {
    id: 'learning-plan',
    title: 'Learning Plan',
    description: 'Skill development with milestones',
    category: 'personal',
    recommendedView: 'summary',
    tags: ['learning', 'goals', 'skills'],
    content: `@project Rust Mastery Journey
@commitment 10 hours/week
@started January 2024

== 📖 Fundamentals (Jan-Feb) ==

[x] The Rust Book #p0 ~40h
  [x] Chapters 1-10: Basics
  [x] Chapters 11-15: Intermediate
  [x] Chapters 16-20: Advanced
  - Completed in 6 weeks

[x] Rustlings Exercises #p0 ~15h
  [x] 95 exercises completed
  [x] All tests passing
  - Confidence: ████████░░

[~] First Project: CLI Tool #p1 ~20h
  [x] Argument parsing (clap)
  [x] File I/O
  [~] Error handling
  [ ] Publish to crates.io
  - Building: A task runner like make

== 🔧 Intermediate (Mar-Apr) ==

[~] Async Rust #p0 ~30h
  [x] Tokio fundamentals
  [~] Streams and futures
  [ ] Building a web server
  [ ] Database connections

[ ] Systems Programming #p1 ~25h
  [ ] Memory management
  [ ] FFI with C
  [ ] Unsafe Rust
  [ ] Performance optimization

== 🚀 Advanced (May-Jun) ==

[ ] Contribute to Open Source #p0
  [ ] Find beginner-friendly issues
  [ ] First PR merged
  [ ] Regular contributor
  - Target: 10 merged PRs

[ ] Build Something Real #p0
  [ ] Idea: Git TUI client
  [ ] Design & architecture
  [ ] Core implementation
  [ ] Polish & release
  - Target: 100+ GitHub stars

== 🎯 Milestones ==

[ ] Read The Book
[x] Complete Rustlings
[ ] First crates.io publish
[ ] First open source PR
[ ] Build real project
[ ] Give a talk about Rust
`,
  },
  {
    id: 'project-checklist',
    title: 'Project Launch',
    description: 'Launch checklist with milestones',
    category: 'personal',
    recommendedView: 'kanban',
    tags: ['project', 'launch', 'checklist'],
    content: `@project TaskFlow (my SaaS)
@tagline "Task management for developers"
@deadline March 2024 launch
@budget $5,000

== 💡 Validation ==

[x] Problem Discovery #p0
  [x] Interview 15 developers
  [x] Survey in r/programming
  [x] Analyze competitors
  - Insight: Devs hate context switching
  - Opportunity: GitHub-integrated tasks

[x] Solution Design #p0
  [x] MVP feature list
  [x] Pricing research
  [x] Name & domain secured
  - Domain: taskflow.dev ($89)

== 👨‍💻 Build ==

[~] Core Product #p0 ~120h
  [x] Auth (Clerk)
  [x] Database (Supabase)
  [~] Task management
  [~] GitHub integration
  [ ] Notifications
  [ ] Billing (Stripe)

[ ] Landing Page #p1 ~20h
  [ ] Hero section
  [ ] Feature showcase
  [ ] Pricing table
  [ ] Testimonials (from beta)
  - Stack: Next.js + Tailwind

== 📋 Launch Prep ==

[ ] Legal #p1
  [ ] Privacy policy (Termly)
  [ ] Terms of service
  [ ] Cookie consent
  - Budget: $0 (templates)

[ ] Analytics #p2
  [ ] Plausible setup
  [ ] Conversion tracking
  [ ] Error monitoring (Sentry)

== 🚀 Launch ==

[ ] Soft Launch #p0
  [ ] 20 beta users
  [ ] Feedback collection
  [ ] Critical bug fixes
  - Target: 5 paying customers

[ ] Public Launch #p0
  [ ] Product Hunt
  [ ] Hacker News
  [ ] Dev.to article
  [ ] Twitter thread
  - Target: 100 signups week 1
  - Target: $500 MRR month 1
`,
  },
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export function getExampleById(id: string): Example | undefined {
  return EXAMPLES.find((e) => e.id === id);
}

export function getExamplesByCategory(category: TemplateCategory): Example[] {
  return EXAMPLES.filter((e) => e.category === category);
}

export function getFeaturedExamples(): Example[] {
  return EXAMPLES.filter((e) => e.featured);
}

export function searchExamples(query: string): Example[] {
  const lowerQuery = query.toLowerCase();
  return EXAMPLES.filter(
    (e) =>
      e.title.toLowerCase().includes(lowerQuery) ||
      e.description.toLowerCase().includes(lowerQuery) ||
      e.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllCategories(): TemplateCategory[] {
  return Object.keys(CATEGORY_INFO) as TemplateCategory[];
}
