/**
 * Built-in example documents
 */

import type { Example } from '../types';

export const EXAMPLES: Example[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'A simple project with basic task syntax',
    category: 'basics',
    content: `@project My First Project
@sprint Week 1

[ ] Set up development environment !1
  ○ Install Node.js
  ○ Clone repository
  ● Configure IDE

[ ] Read documentation !2 ~2h
[x] Create project structure !0
`,
  },
  {
    id: 'sprint-planning',
    title: 'Sprint Planning',
    description: 'A typical sprint with multiple assignees',
    category: 'advanced',
    content: `@project E-Commerce Platform
@sprint Sprint 14

◐ User authentication !0 @alice ~8h
  [x] Design login flow
  [~] Implement JWT tokens
  [ ] Add OAuth providers
  - Note: Using Auth0 for OAuth

[ ] Shopping cart !1 @bob ~12h
  [ ] Add to cart functionality
  [ ] Cart persistence (localStorage)
  [ ] Quantity updates
  [ ] Remove items

⊘ Payment integration !0 @charlie
  ○ Waiting for Stripe API keys
  ○ Need finance approval

[ ] Order management !2 @alice ~6h
  [ ] Order history page
  [ ] Email notifications
`,
  },
  {
    id: 'dependencies',
    title: 'Task Dependencies',
    description: 'Showing blockers and dependencies',
    category: 'advanced',
    content: `@project API Migration
@sprint Q1 2024

[x] Design new API schema !0 #id:api-design @lead
  ● RESTful endpoints defined
  ● GraphQL schema complete
  ● OpenAPI spec generated

◐ Implement v2 endpoints !0 #id:v2-impl @backend ->api-design
  [x] User endpoints
  [~] Product endpoints
  [ ] Order endpoints

[ ] Write integration tests !1 #id:tests @qa ->v2-impl
  ○ Need staging environment
  [ ] User flow tests
  [ ] Product CRUD tests
  [ ] Order flow tests

⊘ Deploy to production !0 #id:deploy <-tests
  ○ Blocked by: Integration tests
  ○ Blocked by: Security review

[ ] Update client SDKs !2 @frontend ->v2-impl
  [ ] JavaScript SDK
  [ ] Python SDK
  [ ] Mobile SDK
`,
  },
  {
    id: 'kanban-workflow',
    title: 'Kanban Workflow',
    description: 'Tasks organized for Kanban view',
    category: 'templates',
    content: `@project Website Redesign
@sprint Design Phase

[ ] Research competitor sites !1 @designer
[ ] Create mood board !2 @designer
[ ] Gather brand assets !2 @marketing

◐ Design homepage mockup !0 @designer ~16h
◐ Define color palette !1 @designer ~4h
◐ Select typography !1 @designer ~2h

◎ Review homepage design !0 @lead
◎ Review mobile layouts !1 @lead

[x] Project kickoff meeting !0 @lead
[x] Define project scope !0 @pm
[x] Set up design tools !2 @designer
`,
  },
  {
    id: 'acceptance-criteria',
    title: 'Acceptance Criteria',
    description: 'Tasks with detailed acceptance criteria',
    category: 'advanced',
    content: `@project User Management
@sprint Sprint 8

◐ Implement user registration !0 @backend ~12h
  ● Email validation working
  ○ Password strength check
  ○ Terms acceptance
  ○ Welcome email sent
  - Must comply with GDPR

[ ] Add profile editing !1 @frontend ~8h
  ○ Avatar upload (max 2MB)
  ○ Display name change
  ○ Email change with verification
  ○ Password change
  ○ Account deletion

[ ] Implement 2FA !0 @security ~16h
  ○ TOTP setup flow
  ○ Backup codes generation
  ○ Recovery flow
  ○ SMS fallback (optional)
  - Use existing auth service
`,
  },
  {
    id: 'minimal',
    title: 'Minimal Example',
    description: 'The simplest possible TaskML document',
    category: 'basics',
    content: `[ ] First task
[ ] Second task
[x] Completed task
`,
  },
];

export function getExampleById(id: string): Example | undefined {
  return EXAMPLES.find((e) => e.id === id);
}

export function getExamplesByCategory(category: Example['category']): Example[] {
  return EXAMPLES.filter((e) => e.category === category);
}
