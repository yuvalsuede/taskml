/**
 * Built-in example templates
 *
 * Beautiful, real-world examples showcasing TaskML features
 */

import type { Example, TemplateCategory } from '../types';

export const CATEGORY_INFO: Record<TemplateCategory, { label: string; description: string; icon: string }> = {
  'getting-started': {
    label: 'Getting Started',
    description: 'Learn TaskML basics',
    icon: '📚',
  },
  'project-management': {
    label: 'Project Management',
    description: 'Sprints, roadmaps, and team planning',
    icon: '📋',
  },
  'software-dev': {
    label: 'Software Development',
    description: 'Feature development and code reviews',
    icon: '💻',
  },
  'ai-agents': {
    label: 'AI Agents',
    description: 'Agentic workflows and handoffs',
    icon: '🤖',
  },
  'devops': {
    label: 'DevOps & Infrastructure',
    description: 'Deployments and CI/CD pipelines',
    icon: '🚀',
  },
  'personal': {
    label: 'Personal',
    description: 'Daily planning and personal tasks',
    icon: '✨',
  },
};

export const EXAMPLES: Example[] = [
  // ============================================================
  // GETTING STARTED
  // ============================================================
  {
    id: 'hello-taskml',
    title: 'Hello TaskML',
    description: 'The simplest example - your first TaskML document',
    category: 'getting-started',
    recommendedView: 'list',
    featured: true,
    tags: ['beginner', 'simple'],
    content: `@project My First Project

[ ] Learn TaskML syntax
[ ] Create my first document
[x] Install TaskML
`,
  },
  {
    id: 'task-statuses',
    title: 'Task Statuses',
    description: 'All the different task status indicators',
    category: 'getting-started',
    recommendedView: 'kanban',
    tags: ['beginner', 'statuses'],
    content: `@project Understanding Task Statuses
@description Learn all the ways to mark task progress

// Pending - not started yet
[ ] This task is pending

// In Progress - actively working
[~] This task is in progress
◐ Alternative in-progress syntax

// Completed - finished!
[x] This task is done
● Also means completed

// Blocked - waiting on something
[!] This task is blocked
⊘ Alternative blocked syntax

// In Review - awaiting approval
◎ This task is in review
`,
  },
  {
    id: 'metadata-tokens',
    title: 'Metadata & Tokens',
    description: 'Priority, assignees, time estimates, and tags',
    category: 'getting-started',
    recommendedView: 'table',
    tags: ['beginner', 'metadata'],
    content: `@project Task Metadata Guide
@sprint Learning Phase

// Priority: !0 (critical) to !3 (low)
[ ] Critical security fix !0
[ ] Important feature !1
[ ] Nice to have !2
[ ] Backlog item !3

// Assignees with @
[ ] Backend work @alice
[ ] Frontend work @bob
[ ] Design review @carol @dave

// Time estimates with ~
[ ] Quick fix ~30m
[ ] Medium task ~2h
[ ] Large feature ~2d

// Tags with #
[ ] Bug fix #bug #urgent
[ ] New feature #feature #v2
[ ] Technical debt #refactor #backend
`,
  },
  {
    id: 'subtasks-hierarchy',
    title: 'Subtasks & Hierarchy',
    description: 'Organize tasks with parent-child relationships',
    category: 'getting-started',
    recommendedView: 'tree',
    tags: ['beginner', 'hierarchy'],
    content: `@project Building a House

◐ Foundation !0
  [x] Survey the land
  [x] Get permits
  [~] Pour concrete
  [ ] Cure for 7 days

[ ] Framing !1
  [ ] First floor walls
    [ ] Load-bearing walls
    [ ] Interior walls
  [ ] Second floor
    [ ] Floor joists
    [ ] Subfloor
  [ ] Roof structure
    [ ] Trusses
    [ ] Sheathing

[ ] Electrical !2
  [ ] Main panel
  [ ] Rough-in wiring
  [ ] Fixtures
`,
  },

  // ============================================================
  // PROJECT MANAGEMENT
  // ============================================================
  {
    id: 'sprint-planning',
    title: 'Sprint Planning',
    description: 'A complete two-week sprint with team assignments',
    category: 'project-management',
    recommendedView: 'kanban',
    featured: true,
    tags: ['agile', 'sprint', 'team'],
    content: `@project E-Commerce Platform
@sprint Sprint 14 - User Experience
@team alice, bob, carol, dave
@velocity 42

// === HIGH PRIORITY ===

◐ Checkout flow redesign !0 @alice ~16h
  [x] Wireframes approved
  [x] Component library setup
  [~] Payment form UI
  [ ] Order summary panel
  [ ] Mobile responsive
  ○ Pass accessibility audit
  ○ < 3 second load time

◐ Shopping cart persistence !0 @bob ~8h
  [x] LocalStorage implementation
  [~] Sync with backend
  [ ] Handle conflicts
  ○ Cart survives refresh
  ○ Merge anonymous cart on login

// === MEDIUM PRIORITY ===

[ ] Product search improvements !1 @carol ~12h
  [ ] Autocomplete suggestions
  [ ] Search filters
  [ ] Recent searches
  [ ] "No results" improvements

[ ] User reviews system !1 @dave ~10h
  [ ] Star rating component
  [ ] Review form
  [ ] Review moderation queue
  [ ] Helpful votes

// === BLOCKED ===

⊘ Payment gateway integration !0 @bob
  ○ Waiting for Stripe API keys
  ○ Need PCI compliance sign-off
  - Contact: finance@company.com

// === COMPLETED ===

[x] Sprint planning meeting !0 @alice
[x] Design system updates !1 @carol
[x] Performance monitoring setup !2 @dave
`,
  },
  {
    id: 'product-roadmap',
    title: 'Product Roadmap',
    description: 'Quarterly planning with milestones and dependencies',
    category: 'project-management',
    recommendedView: 'timeline',
    tags: ['roadmap', 'planning', 'milestones'],
    content: `@project SaaS Product Roadmap 2024
@timeline Q1-Q4 2024

== Q1: Foundation ==

[x] Core platform launch !0 ^2024-01-15 +2024-02-28
  [x] User authentication
  [x] Billing integration
  [x] Admin dashboard
  [x] API v1

[x] Beta program !1 ^2024-02-01 +2024-03-15
  [x] Recruit 50 beta users
  [x] Feedback collection
  [x] Priority bug fixes

== Q2: Growth ==

◐ Team collaboration features !0 ^2024-04-01 +2024-05-31 #id:collab
  [x] Team workspaces
  [~] Real-time editing
  [ ] Comments & mentions
  [ ] Activity feed

[ ] Mobile app MVP !1 ^2024-05-01 +2024-06-30 ->collab
  [ ] iOS app
  [ ] Android app
  [ ] Push notifications

== Q3: Scale ==

[ ] Enterprise features !0 ^2024-07-01 +2024-09-30 #id:enterprise
  [ ] SSO (SAML/OIDC)
  [ ] Audit logging
  [ ] Custom branding
  [ ] SLA guarantees

[ ] API v2 !1 ^2024-08-01 +2024-09-15
  [ ] GraphQL support
  [ ] Webhooks
  [ ] Rate limiting

== Q4: Expansion ==

[ ] Marketplace launch !0 ^2024-10-01 +2024-11-30 ->enterprise
  [ ] Plugin system
  [ ] Developer portal
  [ ] Partner program

[ ] International expansion !1 ^2024-11-01 +2024-12-31
  [ ] Multi-language support
  [ ] Regional data centers
  [ ] Local payment methods
`,
  },
  {
    id: 'okrs',
    title: 'OKRs & Goals',
    description: 'Objectives and Key Results tracking',
    category: 'project-management',
    recommendedView: 'summary',
    tags: ['okrs', 'goals', 'metrics'],
    content: `@project Q1 2024 OKRs
@team Engineering

== Objective 1: Improve Platform Reliability ==

◐ 99.9% uptime SLA !0
  [x] Implement health checks
  [x] Set up alerting
  [~] Redundant infrastructure
  [ ] Disaster recovery testing
  ○ Zero unplanned outages in March

[ ] Reduce mean time to recovery !1
  [ ] Runbook documentation
  [ ] Automated rollbacks
  [ ] On-call training
  ○ MTTR < 15 minutes

[ ] Error rate below 0.1% !1
  [x] Error tracking setup
  [ ] Fix top 10 errors
  [ ] Improve error messages
  ○ 99.9% success rate

== Objective 2: Accelerate Development Velocity ==

◐ Reduce deploy time to < 10 minutes !0
  [x] Parallel test execution
  [~] Docker layer caching
  [ ] Incremental builds
  ○ P95 deploy time < 10m

[ ] Increase test coverage to 80% !1
  [ ] Unit test gaps
  [ ] Integration test suite
  [ ] E2E critical paths
  ○ Coverage report in CI

[x] Developer experience improvements !2
  [x] Local dev environment
  [x] Hot reload
  [x] Debug tooling
  ○ < 5 min to first build
`,
  },

  // ============================================================
  // SOFTWARE DEVELOPMENT
  // ============================================================
  {
    id: 'feature-development',
    title: 'Feature Development',
    description: 'End-to-end feature implementation with acceptance criteria',
    category: 'software-dev',
    recommendedView: 'list',
    featured: true,
    tags: ['feature', 'development', 'criteria'],
    content: `@project User Authentication System
@sprint Sprint 8
@feature FEAT-1234

◐ User Registration Flow !0 @backend ~16h
  [x] API endpoint design
  [x] Database schema
  [~] Email verification
  [ ] Rate limiting
  [ ] Audit logging

  // Acceptance Criteria
  ○ Email validation (RFC 5322)
  ○ Password: 8+ chars, mixed case, number
  ○ Verification email within 30 seconds
  ○ Account locked after 5 failed attempts
  ○ GDPR consent checkbox required

  - Tech: Node.js, PostgreSQL, SendGrid

◐ Login & Session Management !0 @backend ~12h
  [x] JWT implementation
  [~] Refresh token rotation
  [ ] Remember me functionality
  [ ] Concurrent session limits

  ○ Access token expires in 15 minutes
  ○ Refresh token expires in 7 days
  ○ Max 5 concurrent sessions
  ○ Secure cookie settings (httpOnly, sameSite)

[ ] Two-Factor Authentication !1 @security ~20h
  [ ] TOTP implementation
  [ ] QR code generation
  [ ] Backup codes (10 codes)
  [ ] SMS fallback (optional)

  ○ Compatible with Google Authenticator
  ○ Backup codes are one-time use
  ○ Recovery flow documented

[ ] Frontend Integration !1 @frontend ~8h
  [ ] Login form
  [ ] Registration form
  [ ] Password reset flow
  [ ] 2FA setup wizard

  ○ Form validation before submit
  ○ Loading states
  ○ Error messages
  ○ WCAG AA compliant
`,
  },
  {
    id: 'code-review',
    title: 'Code Review Checklist',
    description: 'Comprehensive code review process',
    category: 'software-dev',
    recommendedView: 'list',
    tags: ['review', 'checklist', 'quality'],
    content: `@project Pull Request Review
@pr PR-456: Add payment processing

== Code Quality ==

◐ Code Review @senior ~2h
  [x] Logic correctness
  [x] Edge case handling
  [~] Error handling
  [ ] Code duplication check
  [ ] Naming conventions
  ○ No console.log statements
  ○ No hardcoded values
  ○ Follows style guide

== Testing ==

[ ] Test Coverage @qa
  [ ] Unit tests present
  [ ] Integration tests
  [ ] Edge cases covered
  [ ] Error scenarios tested
  ○ Coverage >= 80%
  ○ All tests passing

== Security ==

[ ] Security Review @security
  [ ] Input validation
  [ ] SQL injection prevention
  [ ] XSS prevention
  [ ] Authentication checks
  [ ] Authorization checks
  ○ No sensitive data in logs
  ○ Secrets in environment variables

== Documentation ==

[ ] Documentation @author
  [ ] README updated
  [ ] API docs updated
  [ ] Inline comments for complex logic
  [ ] CHANGELOG entry
  ○ Breaking changes documented

== Performance ==

[ ] Performance Check @senior
  [ ] No N+1 queries
  [ ] Proper indexing
  [ ] Caching strategy
  [ ] Memory usage
  ○ Response time < 200ms
`,
  },
  {
    id: 'bug-tracking',
    title: 'Bug Tracking',
    description: 'Bug investigation and resolution workflow',
    category: 'software-dev',
    recommendedView: 'kanban',
    tags: ['bugs', 'tracking', 'debugging'],
    content: `@project Bug Backlog
@sprint Bugfix Sprint

// === CRITICAL ===

◐ Payment fails on Safari !0 @alice #bug #payments
  [x] Reproduce issue
  [x] Identify root cause
  [~] Implement fix
  [ ] Test on all browsers
  [ ] Deploy hotfix
  - Cause: WebCrypto API difference
  - Affects: ~5% of transactions

⊘ Data loss on session timeout !0 @bob #bug #data
  ○ Waiting for logs from customer
  ○ Cannot reproduce locally
  - Customer: enterprise-corp
  - Ticket: SUP-789

// === HIGH ===

[ ] Search returns wrong results !1 @carol #bug #search
  [ ] Add logging
  [ ] Analyze query patterns
  [ ] Fix ranking algorithm
  - Elasticsearch version mismatch?

[ ] Mobile layout broken on tablets !1 @dave #bug #ui
  [ ] Test all breakpoints
  [ ] Fix CSS grid issues
  [ ] Test on real devices
  ○ Works on iPad Pro
  ○ Works on iPad Mini
  ○ Works on Android tablets

// === MEDIUM ===

[ ] Slow dashboard loading !2 @alice #bug #performance
  [ ] Profile API calls
  [ ] Optimize queries
  [ ] Add pagination
  ○ Load time < 2 seconds

[ ] Email notifications delayed !2 @bob #bug #email
  [ ] Check queue backlog
  [ ] Review worker logs
  [ ] Scale if needed

// === RESOLVED ===

[x] Login button unresponsive !0 @carol
[x] Wrong timezone in reports !1 @dave
[x] Missing validation error !2 @alice
`,
  },

  // ============================================================
  // AI AGENTS
  // ============================================================
  {
    id: 'ai-agent-workflow',
    title: 'AI Agent Workflow',
    description: 'Multi-agent task execution with handoffs',
    category: 'ai-agents',
    recommendedView: 'graph',
    featured: true,
    tags: ['agents', 'handoff', 'context'],
    content: `@project Customer Support Automation
@agent orchestrator
@model claude-3-opus

== Research Phase ==

[x] Analyze customer inquiry !0 @researcher #id:analyze
  [x] Extract key entities
  [x] Classify intent
  [x] Sentiment analysis
  context:
    inquiry: "My order #12345 hasn't arrived"
    intent: order_status
    sentiment: frustrated
    entities: [order_id: 12345]

◐ Gather relevant information !0 @researcher #id:gather ->analyze
  [x] Query order database
  [~] Check shipping status
  [ ] Review customer history
  context:
    order_status: shipped
    tracking: 1Z999AA10123456784
    ship_date: 2024-01-10
    expected: 2024-01-15

== Resolution Phase ==

◐ Formulate response !0 @writer #id:respond ->gather
  [~] Draft empathetic response
  [ ] Include tracking info
  [ ] Offer compensation if late
  handoff:
    from: researcher
    to: writer
    reason: Information gathered, ready for response

[ ] Quality check !1 @reviewer ->respond
  [ ] Tone appropriate
  [ ] Information accurate
  [ ] Follows brand guidelines
  [ ] Escalation needed?

[ ] Send response !0 @sender ->respond
  [ ] Via email
  [ ] Update ticket status
  [ ] Log interaction
`,
  },
  {
    id: 'research-agent',
    title: 'Research Agent',
    description: 'Deep research workflow with verification',
    category: 'ai-agents',
    recommendedView: 'tree',
    tags: ['research', 'verification', 'sources'],
    content: `@project Market Research: AI Code Assistants
@agent research-bot
@model claude-3-opus

◐ Initial Research !0 @researcher
  [x] Define research scope
  [x] Identify key players
  [~] Gather public information
  [ ] Compile findings

  context:
    scope: "AI-powered code assistants market 2024"
    players: [GitHub Copilot, Cursor, Cody, Tabnine]
    sources_needed: 5+

== GitHub Copilot Analysis ==

[x] Product analysis @researcher
  [x] Features inventory
  [x] Pricing tiers
  [x] Integration options
  ● Verified via official docs

  context:
    pricing: "$10/mo individual, $19/mo business"
    models: "GPT-4, Codex"
    integrations: [VS Code, JetBrains, Neovim]

== Cursor Analysis ==

◐ Product analysis @researcher
  [x] Features inventory
  [~] Pricing research
  [ ] User reviews
  ○ Verify with 3+ sources

== Comparative Analysis ==

[ ] Feature comparison !1 @analyst
  [ ] Create comparison matrix
  [ ] Identify unique features
  [ ] Gap analysis

[ ] Market positioning !1 @analyst
  [ ] Target audience
  [ ] Pricing strategy
  [ ] Competitive advantages

== Report Generation ==

[ ] Draft report !0 @writer
  [ ] Executive summary
  [ ] Detailed findings
  [ ] Recommendations
  ○ All claims have citations
  ○ Reviewed by human
`,
  },
  {
    id: 'tool-use-agent',
    title: 'Tool-Using Agent',
    description: 'Agent with tool calls and reasoning',
    category: 'ai-agents',
    recommendedView: 'list',
    tags: ['tools', 'reasoning', 'execution'],
    content: `@project File Organization Agent
@agent file-organizer
@tools read_file, write_file, move_file, list_directory

◐ Analyze current structure !0
  [x] List all files in directory
  [x] Categorize by type
  [~] Identify duplicates
  [ ] Calculate sizes

  context:
    total_files: 1247
    categories:
      documents: 342
      images: 567
      code: 238
      other: 100
    duplicates_found: 23

◐ Plan reorganization !0 #id:plan
  [x] Define folder structure
  [x] Create naming conventions
  [ ] Handle conflicts

  reasoning: |
    Based on file analysis:
    1. Create /documents, /images, /code, /archive
    2. Move files by extension
    3. Rename duplicates with suffix
    4. Archive files older than 1 year

== Execution ==

[ ] Create folder structure !1 ->plan
  [ ] /documents
    [ ] /reports
    [ ] /notes
  [ ] /images
    [ ] /screenshots
    [ ] /photos
  [ ] /code
    [ ] /projects
    [ ] /scripts
  [ ] /archive

[ ] Move files !1
  [ ] Documents: 342 files
  [ ] Images: 567 files
  [ ] Code: 238 files
  ○ No data loss
  ○ Permissions preserved

[ ] Handle duplicates !2
  [ ] Compare checksums
  [ ] Keep newest version
  [ ] Move duplicates to /duplicates

[ ] Generate report !2
  [ ] Files moved: X
  [ ] Space saved: Y GB
  [ ] Errors: Z
`,
  },

  // ============================================================
  // DEVOPS
  // ============================================================
  {
    id: 'deployment-pipeline',
    title: 'Deployment Pipeline',
    description: 'CI/CD pipeline with staging and production',
    category: 'devops',
    recommendedView: 'timeline',
    featured: true,
    tags: ['cicd', 'deployment', 'pipeline'],
    content: `@project Release v2.5.0
@pipeline main
@trigger push to main

== Build Stage ==

[x] Code checkout !0 ~30s
[x] Install dependencies !0 ~2m
[x] Run linter !1 ~1m
  ● 0 errors, 3 warnings
[x] Run type check !1 ~1m
  ● TypeScript strict mode

== Test Stage ==

[x] Unit tests !0 ~3m #id:unit
  ● 847 tests passed
  ● Coverage: 84%
[x] Integration tests !0 ~5m #id:integration ->unit
  ● 123 tests passed
  ● All APIs verified
[x] E2E tests !1 ~10m ->integration
  ● 45 scenarios passed
  ● Chrome, Firefox, Safari

== Build Artifacts ==

[x] Build application !0 ~2m #id:build
  ● Bundle size: 245KB (gzipped)
  ● Tree shaking applied
[x] Build Docker image !0 ~3m ->build
  ● Image: app:v2.5.0
  ● Size: 127MB
[x] Push to registry !0 ~1m
  ● registry.company.com/app:v2.5.0

== Deploy Staging ==

[x] Deploy to staging !0 ~2m #id:staging
  ● Kubernetes rollout
  ● 3/3 pods ready
[x] Smoke tests !0 ~2m ->staging
  ● Health check passed
  ● Critical paths verified
◎ QA approval !0 @qa-team
  ○ Manual testing complete
  ○ No P0/P1 bugs found

== Deploy Production ==

[ ] Deploy to production !0 ~5m #id:prod
  [ ] Blue-green deployment
  [ ] Database migrations
  [ ] Cache invalidation
  ○ Zero downtime

[ ] Post-deploy verification !0 ->prod
  [ ] Health checks
  [ ] Error rate monitoring
  [ ] Performance metrics
  ○ Error rate < 0.1%
  ○ P95 latency < 200ms

[ ] Rollback plan ready !1
  - Command: kubectl rollout undo
  - Previous: v2.4.3
`,
  },
  {
    id: 'infrastructure-setup',
    title: 'Infrastructure Setup',
    description: 'Cloud infrastructure provisioning checklist',
    category: 'devops',
    recommendedView: 'tree',
    tags: ['infrastructure', 'cloud', 'setup'],
    content: `@project AWS Infrastructure Setup
@environment production
@region us-east-1

◐ Networking !0 @infra
  [x] VPC configuration
    [x] CIDR: 10.0.0.0/16
    [x] 3 availability zones
  [x] Subnets
    [x] Public subnets (3)
    [x] Private subnets (3)
    [x] Database subnets (3)
  [~] Security groups
    [x] Web tier (80, 443)
    [x] App tier (8080)
    [ ] Database tier (5432)
  [ ] NAT Gateways

◐ Compute !0 @infra
  [x] EKS cluster
    [x] Kubernetes 1.28
    [x] Managed node groups
    [x] Cluster autoscaler
  [~] Node configuration
    [x] t3.large instances
    [ ] Spot instances for workers
  [ ] Load balancer
    [ ] ALB ingress controller
    [ ] SSL certificates

[ ] Database !1 @dba
  [ ] RDS PostgreSQL
    [ ] Multi-AZ deployment
    [ ] Automated backups
    [ ] Read replicas
  [ ] ElastiCache Redis
    [ ] Cluster mode
    [ ] Encryption at rest

[ ] Storage !1 @infra
  [ ] S3 buckets
    [ ] Application assets
    [ ] Backup storage
    [ ] Logs archive
  [ ] EFS for shared storage

[ ] Monitoring !2 @sre
  [ ] CloudWatch dashboards
  [ ] Alerts configuration
  [ ] Log aggregation
  [ ] APM integration

[ ] Security !0 @security
  [ ] IAM roles & policies
  [ ] Secrets Manager
  [ ] KMS encryption keys
  [ ] WAF configuration
  ○ SOC 2 compliant
  ○ HIPAA ready
`,
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    description: 'Production incident handling playbook',
    category: 'devops',
    recommendedView: 'list',
    tags: ['incident', 'response', 'oncall'],
    content: `@project INCIDENT-2024-042
@severity P1 - Major Outage
@oncall @alice
@started 2024-01-15T14:32:00Z

== Detection ==

[x] Alert triggered !0 14:32
  ● Source: PagerDuty
  ● Alert: API error rate > 10%
  ● Affected: /api/v1/orders

[x] Acknowledge incident !0 @alice 14:35
  ● Incident commander: @alice
  ● Comms lead: @bob

== Investigation ==

[x] Initial assessment !0 @alice ~10m
  [x] Check dashboards
  [x] Review recent deploys
  [x] Check dependencies
  context:
    deploy: v2.4.5 at 14:15
    error: "Connection refused to payment-svc"
    affected_users: ~2000

[x] Root cause identified !0 @alice 14:45
  ● Payment service crashed
  ● OOM kill due to memory leak
  ● Introduced in v2.4.5

== Mitigation ==

[x] Rollback deployment !0 @alice 14:50
  [x] kubectl rollout undo
  [x] Verify old version running
  [x] Confirm error rate dropping
  ● Rolled back to v2.4.4

[x] Verify recovery !0 @alice 15:00
  [x] Error rate < 0.1%
  [x] Orders processing
  [x] No data loss confirmed
  ● Service restored

== Communication ==

[x] Internal update !1 @bob 14:40
  [x] Slack #incidents
  [x] Stakeholder email

[x] Customer communication !1 @bob 15:10
  [x] Status page updated
  [x] Twitter acknowledgment
  [x] Resolution notice

== Post-Incident ==

[ ] Blameless postmortem !1 @alice ~2h
  [ ] Timeline documented
  [ ] Root cause analysis
  [ ] Action items identified

[ ] Preventive measures !0
  [ ] Add memory limits
  [ ] Improve alerting
  [ ] Add canary deploys
`,
  },

  // ============================================================
  // PERSONAL
  // ============================================================
  {
    id: 'daily-planning',
    title: 'Daily Planning',
    description: 'Personal daily task management',
    category: 'personal',
    recommendedView: 'list',
    featured: true,
    tags: ['daily', 'personal', 'productivity'],
    content: `@project Monday, January 15
@focus Deep Work

== Morning Routine ==

[x] Wake up 6:30 AM
[x] Meditation ~15m
[x] Exercise ~30m
[x] Healthy breakfast

== Deep Work Block (9 AM - 12 PM) ==

◐ Write project proposal !0 ~2h
  [x] Outline main points
  [~] Draft introduction
  [ ] Add supporting data
  [ ] Review and polish

[ ] Code review for team !1 ~1h
  [ ] PR #234 - Authentication
  [ ] PR #235 - Dashboard

== Afternoon ==

[ ] Team standup !0 ^14:00 ~15m
[ ] 1:1 with manager !1 ^15:00 ~30m
  - Discuss promotion path
  - Q1 goals review

[ ] Respond to emails !2 ~30m
  [ ] Client follow-up
  [ ] Schedule meetings
  [ ] Clear inbox

== Evening ==

[ ] Grocery shopping !2
  [ ] Vegetables
  [ ] Protein
  [ ] Snacks for week

[ ] Read for 30 minutes !3
  - Currently: "Deep Work" by Cal Newport

[ ] Plan tomorrow !2 ~10m
`,
  },
  {
    id: 'learning-plan',
    title: 'Learning Plan',
    description: 'Personal skill development tracking',
    category: 'personal',
    recommendedView: 'summary',
    tags: ['learning', 'goals', 'skills'],
    content: `@project 2024 Learning Goals
@commitment 10 hours/week

== Programming Languages ==

◐ Rust Mastery !1 ~100h
  [x] The Rust Book
  [x] Rustlings exercises
  [~] Build CLI tool
  [ ] Contribute to open source
  ○ Complete Advent of Code in Rust

[ ] Go Proficiency !2 ~60h
  [ ] Tour of Go
  [ ] Build REST API
  [ ] Concurrency patterns
  ○ Deploy production service

== Cloud & DevOps ==

◐ Kubernetes (CKA) !0 ~80h
  [x] Core concepts
  [x] Workloads
  [~] Networking
  [ ] Storage
  [ ] Security
  [ ] Practice exams
  ○ Pass CKA certification

[ ] AWS Solutions Architect !1 ~100h
  [ ] Compute services
  [ ] Storage & databases
  [ ] Networking
  [ ] Security
  ○ Pass SAA-C03 exam

== Soft Skills ==

[ ] Technical Writing !2 ~40h
  [ ] Write 10 blog posts
  [ ] Document a project
  [ ] Create tutorial series
  ○ 1000+ readers on a post

[ ] Public Speaking !2 ~30h
  [ ] Join Toastmasters
  [ ] Give team presentation
  [ ] Conference talk proposal
  ○ Speak at local meetup
`,
  },
  {
    id: 'project-checklist',
    title: 'Side Project Launch',
    description: 'Checklist for launching a side project',
    category: 'personal',
    recommendedView: 'kanban',
    tags: ['project', 'launch', 'checklist'],
    content: `@project Launch My SaaS
@deadline 2024-03-01

== Planning ==

[x] Validate idea !0
  [x] Talk to 10 potential users
  [x] Analyze competitors
  [x] Define MVP scope

[x] Technical decisions !1
  [x] Choose tech stack
  [x] Select hosting
  [x] Plan architecture

== Development ==

◐ Build MVP !0 ~80h
  [x] User authentication
  [x] Core feature 1
  [~] Core feature 2
  [ ] Payment integration
  [ ] Email notifications

[ ] Testing !1
  [ ] Unit tests
  [ ] User acceptance testing
  [ ] Performance testing

== Launch Prep ==

[ ] Marketing site !1
  [ ] Landing page
  [ ] Pricing page
  [ ] About page
  [ ] Blog setup

[ ] Legal !1
  [ ] Terms of service
  [ ] Privacy policy
  [ ] Cookie consent

[ ] Analytics !2
  [ ] Google Analytics
  [ ] Error tracking
  [ ] User feedback widget

== Launch ==

[ ] Soft launch !0
  [ ] Invite beta users
  [ ] Collect feedback
  [ ] Fix critical bugs

[ ] Public launch !0
  [ ] Product Hunt
  [ ] Hacker News
  [ ] Twitter/X
  [ ] Reddit
  ○ 100 signups first week
`,
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

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
