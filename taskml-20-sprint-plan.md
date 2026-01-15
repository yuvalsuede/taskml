# TaskML Project Plan

## 20-Sprint Roadmap

**Version:** 1.0  
**Created:** January 2026  
**Project Duration:** 40 weeks (20 sprints × 2 weeks each)  
**Goal:** Establish TaskML as the universal standard for AI agent task visualization

---

## Executive Summary

TaskML (Task Markup Language) is a text-based protocol for describing and rendering AI agent work state. This plan outlines the complete development roadmap from initial infrastructure through market adoption.

### Key Deliverables

| Phase | Sprints | Outcome |
|-------|---------|---------|
| Foundation | 1-3 | Infrastructure, core parser, basic rendering |
| Playground | 4-6 | taskml.live with full editor and preview |
| Developer Tools | 7-10 | VS Code, Obsidian, CLI tools |
| Integration | 11-13 | Claudia, framework integrations |
| Launch | 14-16 | Website, docs, marketing, community |
| Growth | 17-20 | Advanced features, partnerships, scale |

### Success Criteria

- 10,000+ playground monthly active users
- 5,000+ VS Code extension installs
- 50,000+ npm weekly downloads
- GitHub code fence support request acknowledged
- 2+ major framework integrations

---

## Sprint Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TaskML 20-Sprint Roadmap                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FOUNDATION          PLAYGROUND         TOOLS            INTEGRATION       │
│  ━━━━━━━━━━          ━━━━━━━━━━         ━━━━━            ━━━━━━━━━━━       │
│  S1: Infra           S4: MVP            S7: VS Code      S11: Claudia      │
│  S2: Parser          S5: Features       S8: Obsidian     S12: LangChain    │
│  S3: Renderers       S6: Polish         S9: CLI          S13: API          │
│                                         S10: GitHub                         │
│                                                                             │
│  LAUNCH              GROWTH                                                 │
│  ━━━━━━              ━━━━━━                                                 │
│  S14: Website        S17: Collab                                           │
│  S15: Docs           S18: Mobile                                           │
│  S16: Marketing      S19: Enterprise                                       │
│                      S20: Scale                                             │
│                                                                             │
│  ──────────────────────────────────────────────────────────────────────►   │
│  Week 1                                                           Week 40   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Phase 1: Foundation (Sprints 1-3)

## Sprint 1: Infrastructure & Setup

**Duration:** Weeks 1-2  
**Theme:** Establish all infrastructure and project foundations  
**Team:** 1 developer

### Goals
- All domains registered and configured
- GitHub organization with all repositories
- CI/CD pipelines operational
- Development environment documented

### Tasks

#### 1.1 Domain Registration & DNS
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 1.1.1 | Register `taskml.dev` | P0 | 1h | Domain active, DNS configured |
| 1.1.2 | Register `taskml.live` | P0 | 1h | Domain active, DNS configured |
| 1.1.3 | Register `taskml.io` (backup) | P2 | 30m | Domain reserved |
| 1.1.4 | Configure Cloudflare DNS | P0 | 2h | SSL active, DNS propagated |
| 1.1.5 | Set up email (hello@taskml.dev) | P1 | 1h | Email receiving/sending works |

#### 1.2 GitHub Organization
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 1.2.1 | Create `github.com/taskml` org | P0 | 30m | Org exists, profile configured |
| 1.2.2 | Create `spec` repository | P0 | 1h | README, LICENSE, spec v1.1 |
| 1.2.3 | Create `taskml-js` repository | P0 | 1h | Package.json, tsconfig, README |
| 1.2.4 | Create `playground` repository | P0 | 1h | Next.js scaffold |
| 1.2.5 | Create `vscode` repository | P0 | 1h | Extension scaffold |
| 1.2.6 | Create `obsidian-taskml` repository | P1 | 1h | Plugin scaffold |
| 1.2.7 | Create `taskml-cli` repository | P1 | 1h | CLI scaffold |
| 1.2.8 | Create `website` repository | P1 | 1h | Next.js scaffold |
| 1.2.9 | Configure branch protection | P0 | 1h | Main branch protected |
| 1.2.10 | Set up issue templates | P1 | 1h | Bug, feature, RFC templates |
| 1.2.11 | Set up PR templates | P1 | 30m | PR template with checklist |
| 1.2.12 | Configure GitHub Actions | P0 | 2h | CI workflow for all repos |

#### 1.3 CI/CD & Automation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 1.3.1 | Set up GitHub Actions for taskml-js | P0 | 2h | Tests run on PR |
| 1.3.2 | Set up npm publish workflow | P0 | 2h | Auto-publish on tag |
| 1.3.3 | Set up Vercel for playground | P0 | 1h | Auto-deploy on push |
| 1.3.4 | Set up Vercel for website | P0 | 1h | Auto-deploy on push |
| 1.3.5 | Configure preview deployments | P1 | 1h | PR previews work |
| 1.3.6 | Set up Codecov | P1 | 1h | Coverage reports on PR |
| 1.3.7 | Set up Dependabot | P2 | 30m | Auto dependency updates |

#### 1.4 Development Environment
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 1.4.1 | Document dev setup in CONTRIBUTING.md | P0 | 2h | New dev can start in <30min |
| 1.4.2 | Create monorepo structure decision | P1 | 2h | ADR documented |
| 1.4.3 | Set up shared ESLint config | P1 | 1h | Consistent linting |
| 1.4.4 | Set up shared Prettier config | P1 | 30m | Consistent formatting |
| 1.4.5 | Set up shared TypeScript config | P1 | 1h | Consistent types |
| 1.4.6 | Create .nvmrc files | P2 | 15m | Node version locked |

#### 1.5 Legal & Admin
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 1.5.1 | Choose license (MIT) | P0 | 30m | LICENSE in all repos |
| 1.5.2 | Write CONTRIBUTING.md | P1 | 2h | Contribution guide complete |
| 1.5.3 | Write CODE_OF_CONDUCT.md | P1 | 1h | CoC in org |
| 1.5.4 | Set up OpenCollective (optional) | P2 | 1h | Sponsorship ready |

### Sprint 1 Deliverables
- [x] All domains live with SSL
- [x] GitHub org with 8 repositories
- [x] CI/CD pipelines for all repos
- [x] Development documentation complete

### Sprint 1 Definition of Done
All infrastructure operational. A new contributor can clone, install, and run tests within 30 minutes.

---

## Sprint 2: Core Parser

**Duration:** Weeks 3-4  
**Theme:** Build the TaskML parser (text → AST)  
**Team:** 1-2 developers  
**Dependencies:** Sprint 1 complete

### Goals
- Complete lexer and parser implementation
- 100% grammar coverage with tests
- JSON/YAML interchange working
- npm package publishable (alpha)

### Tasks

#### 2.1 Lexer Implementation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 2.1.1 | Define token types | P0 | 2h | All tokens from spec defined |
| 2.1.2 | Implement tokenizer | P0 | 8h | Tokenizes all spec examples |
| 2.1.3 | Handle directives (@) | P0 | 4h | All directives tokenized |
| 2.1.4 | Handle status groups ([]) | P0 | 2h | Status groups parsed |
| 2.1.5 | Handle tasks (-) | P0 | 4h | Tasks with all tokens |
| 2.1.6 | Handle metadata tokens (#@^+~!>:&%) | P0 | 6h | All tokens recognized |
| 2.1.7 | Handle checkboxes | P0 | 2h | All checkbox states |
| 2.1.8 | Handle verification criteria (?) | P0 | 4h | Criteria with evidence |
| 2.1.9 | Handle comments (//, /* */) | P1 | 2h | Comments preserved |
| 2.1.10 | Handle context blocks | P1 | 4h | Inline and external refs |
| 2.1.11 | Handle escaping | P1 | 2h | Escape sequences work |
| 2.1.12 | Unicode support | P1 | 2h | i18n characters work |
| 2.1.13 | Write lexer tests | P0 | 8h | >95% coverage |

#### 2.2 Parser Implementation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 2.2.1 | Define AST node types | P0 | 4h | Types match spec |
| 2.2.2 | Implement recursive descent parser | P0 | 12h | Parses all constructs |
| 2.2.3 | Handle task hierarchy (indentation) | P0 | 4h | Nesting works correctly |
| 2.2.4 | Handle dependencies (<-) | P0 | 4h | Dependency graph built |
| 2.2.5 | Handle sprints/sections (==) | P1 | 2h | Sections parsed |
| 2.2.6 | Handle includes (<) | P2 | 4h | External files referenced |
| 2.2.7 | Implement canonical order validation | P0 | 4h | Warns on wrong order |
| 2.2.8 | Write parser tests | P0 | 8h | >95% coverage |

#### 2.3 Error Handling
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 2.3.1 | Define error types | P0 | 2h | All error codes from spec |
| 2.3.2 | Implement error recovery | P0 | 6h | Parser continues after error |
| 2.3.3 | Line/column tracking | P0 | 2h | Errors have location |
| 2.3.4 | Helpful error messages | P1 | 4h | Suggestions included |
| 2.3.5 | Write error handling tests | P0 | 4h | All error cases covered |

#### 2.4 Interchange Formats
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 2.4.1 | Implement toJSON() | P0 | 4h | AST → JSON works |
| 2.4.2 | Implement fromJSON() | P0 | 4h | JSON → AST works |
| 2.4.3 | Implement toYAML() | P1 | 2h | AST → YAML works |
| 2.4.4 | Implement fromYAML() | P1 | 2h | YAML → AST works |
| 2.4.5 | Comment preservation | P1 | 4h | Comments survive round-trip |
| 2.4.6 | Write interchange tests | P0 | 4h | Round-trip fidelity |

#### 2.5 Package Setup
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 2.5.1 | Configure TypeScript build | P0 | 2h | ESM + CJS outputs |
| 2.5.2 | Configure exports map | P0 | 1h | Subpath exports work |
| 2.5.3 | Generate type definitions | P0 | 1h | .d.ts files generated |
| 2.5.4 | Create browser bundle | P0 | 2h | UMD bundle works |
| 2.5.5 | Write package README | P0 | 2h | Usage documented |
| 2.5.6 | Publish alpha to npm | P0 | 1h | `npm install taskml@alpha` works |

### Sprint 2 Deliverables
- [x] Complete lexer with all token types
- [x] Complete parser with AST generation
- [x] JSON/YAML interchange
- [x] npm alpha package published
- [x] >95% test coverage

### Sprint 2 Definition of Done
`parse()` correctly handles all examples from spec. Round-trip (text → JSON → text) preserves semantics.

---

## Sprint 3: Core Renderers

**Duration:** Weeks 5-6  
**Theme:** Build HTML/SVG renderers for all views  
**Team:** 1-2 developers  
**Dependencies:** Sprint 2 complete

### Goals
- All 7 view types rendering to HTML
- SVG export for graph view
- Consistent styling with CSS variables
- Responsive design support

### Tasks

#### 3.1 Renderer Architecture
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.1.1 | Define renderer interface | P0 | 2h | Base class/interface |
| 3.1.2 | Create render options type | P0 | 1h | View, theme, etc. |
| 3.1.3 | Implement view factory | P0 | 2h | Dynamic view selection |
| 3.1.4 | Create CSS variable system | P0 | 4h | Themeable colors |
| 3.1.5 | Create icon system | P0 | 2h | Status/priority icons |

#### 3.2 List View
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.2.1 | Implement list renderer | P0 | 4h | Basic list works |
| 3.2.2 | Add status icons | P0 | 2h | Icons display |
| 3.2.3 | Add priority badges | P0 | 2h | Priority colors |
| 3.2.4 | Add progress bars | P1 | 2h | Subtask progress |
| 3.2.5 | Add verification indicators | P0 | 2h | Criteria status |
| 3.2.6 | Write list view tests | P0 | 2h | Visual regression |

#### 3.3 Kanban View
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.3.1 | Implement column layout | P0 | 4h | Columns render |
| 3.3.2 | Implement task cards | P0 | 4h | Cards with metadata |
| 3.3.3 | Add column headers | P0 | 2h | Status + count |
| 3.3.4 | Add card metadata | P0 | 4h | All tokens display |
| 3.3.5 | Add progress on cards | P1 | 2h | Subtask progress |
| 3.3.6 | Add verification badge | P0 | 2h | Criteria summary |
| 3.3.7 | Add WIP limits | P2 | 2h | Limit indicators |
| 3.3.8 | Responsive columns | P1 | 4h | Mobile friendly |
| 3.3.9 | Write kanban tests | P0 | 4h | Visual regression |

#### 3.4 Tree View
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.4.1 | Implement tree structure | P0 | 4h | Hierarchy displays |
| 3.4.2 | Add expand/collapse | P0 | 4h | Interactive toggle |
| 3.4.3 | Add tree lines | P0 | 2h | Visual connectors |
| 3.4.4 | Add folder icons | P1 | 1h | Parent indicators |
| 3.4.5 | Add progress rollup | P1 | 2h | Parent shows child progress |
| 3.4.6 | Write tree tests | P0 | 2h | Visual regression |

#### 3.5 Timeline View (Gantt)
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.5.1 | Implement time axis | P0 | 6h | Date scale |
| 3.5.2 | Implement task bars | P0 | 6h | Duration bars |
| 3.5.3 | Add dependency arrows | P1 | 4h | Shows dependencies |
| 3.5.4 | Add today marker | P1 | 1h | Current date line |
| 3.5.5 | Add milestone markers | P1 | 2h | Diamond markers |
| 3.5.6 | Handle missing dates | P0 | 2h | Graceful fallback |
| 3.5.7 | Write timeline tests | P0 | 4h | Visual regression |

#### 3.6 Table View
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.6.1 | Implement table structure | P0 | 4h | Columns and rows |
| 3.6.2 | Add column configuration | P0 | 2h | @show directive |
| 3.6.3 | Add sorting indicators | P1 | 2h | Sort arrows |
| 3.6.4 | Add alternating rows | P2 | 1h | Zebra striping |
| 3.6.5 | Write table tests | P0 | 2h | Visual regression |

#### 3.7 Graph View (Dependencies)
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.7.1 | Implement DAG layout | P0 | 8h | Auto-layout algorithm |
| 3.7.2 | Render nodes | P0 | 4h | Task nodes |
| 3.7.3 | Render edges | P0 | 4h | Dependency arrows |
| 3.7.4 | Add node status colors | P1 | 2h | Status indicators |
| 3.7.5 | SVG export | P0 | 4h | Clean SVG output |
| 3.7.6 | Handle cycles (error) | P0 | 2h | Show error state |
| 3.7.7 | Write graph tests | P0 | 4h | Visual regression |

#### 3.8 Summary View
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.8.1 | Implement statistics | P0 | 4h | Counts, percentages |
| 3.8.2 | Add progress visualization | P0 | 2h | Progress bars |
| 3.8.3 | Add breakdowns | P1 | 4h | By status, priority |
| 3.8.4 | Add velocity (if sprint) | P2 | 2h | Velocity display |
| 3.8.5 | Write summary tests | P0 | 2h | Visual regression |

#### 3.9 Shared Components
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 3.9.1 | Create CSS reset | P0 | 1h | Consistent baseline |
| 3.9.2 | Create light theme | P0 | 2h | Default colors |
| 3.9.3 | Create dark theme | P0 | 2h | Dark mode colors |
| 3.9.4 | Create high-contrast theme | P1 | 2h | Accessibility |
| 3.9.5 | Create print theme | P2 | 2h | Print-friendly |
| 3.9.6 | Document CSS variables | P1 | 2h | Customization guide |

### Sprint 3 Deliverables
- [x] All 7 view renderers complete
- [x] SVG export for graph view
- [x] 4 themes (light, dark, high-contrast, print)
- [x] Responsive design
- [x] npm beta package published

### Sprint 3 Definition of Done
All views from spec render correctly. Themes switchable via CSS variables. Visual regression tests passing.

---

# Phase 2: Playground (Sprints 4-6)

## Sprint 4: Playground MVP

**Duration:** Weeks 7-8  
**Theme:** Build taskml.live with core editing and preview  
**Team:** 1-2 developers  
**Dependencies:** Sprint 3 complete

### Goals
- Live editor with syntax highlighting
- Real-time preview with view switching
- URL-based sharing
- Basic export (PNG, JSON)

### Tasks

#### 4.1 Project Setup
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 4.1.1 | Initialize Next.js 14 project | P0 | 2h | App router, TypeScript |
| 4.1.2 | Configure Tailwind CSS | P0 | 1h | Utility classes working |
| 4.1.3 | Set up Vercel deployment | P0 | 1h | Auto-deploy on push |
| 4.1.4 | Configure custom domain | P0 | 1h | taskml.live working |
| 4.1.5 | Add Plausible analytics | P1 | 1h | Privacy-friendly analytics |

#### 4.2 Layout & Shell
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 4.2.1 | Create app shell | P0 | 4h | Header, panels |
| 4.2.2 | Implement split pane | P0 | 4h | Resizable editor/preview |
| 4.2.3 | Add header with actions | P0 | 2h | Logo, share, export |
| 4.2.4 | Add responsive layout | P1 | 4h | Mobile: stacked panels |
| 4.2.5 | Add dark mode toggle | P1 | 2h | System preference + toggle |

#### 4.3 Editor Integration
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 4.3.1 | Integrate Monaco editor | P0 | 4h | Editor renders |
| 4.3.2 | Create TaskML language config | P0 | 4h | Basic highlighting |
| 4.3.3 | Register TaskML language | P0 | 2h | Language recognized |
| 4.3.4 | Add bracket matching | P1 | 1h | [] matching |
| 4.3.5 | Add auto-indent | P1 | 2h | Proper indentation |
| 4.3.6 | Add minimap | P2 | 1h | Code overview |
| 4.3.7 | Sync with URL state | P0 | 4h | Content in URL |

#### 4.4 Preview Panel
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 4.4.1 | Create preview container | P0 | 2h | Renders taskml-js output |
| 4.4.2 | Add view selector | P0 | 2h | Dropdown with all views |
| 4.4.3 | Implement live updates | P0 | 4h | Debounced re-render |
| 4.4.4 | Add loading state | P1 | 1h | Spinner during parse |
| 4.4.5 | Style preview output | P0 | 4h | Matches spec aesthetics |
| 4.4.6 | Add zoom controls | P2 | 2h | Scale preview |

#### 4.5 Error Display
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 4.5.1 | Create error panel | P0 | 2h | Shows parse errors |
| 4.5.2 | Add line highlighting | P0 | 2h | Error line marked |
| 4.5.3 | Add click-to-line | P1 | 2h | Click error → go to line |
| 4.5.4 | Add warning display | P1 | 1h | Non-fatal warnings |

#### 4.6 URL Sharing
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 4.6.1 | Implement base64 encoding | P0 | 2h | Content in URL hash |
| 4.6.2 | Add compression (pako) | P0 | 2h | Compressed content |
| 4.6.3 | Add view param | P0 | 1h | ?view=kanban |
| 4.6.4 | Add copy link button | P0 | 1h | Copies share URL |
| 4.6.5 | Handle URL length limits | P1 | 2h | Graceful fallback |

#### 4.7 Basic Export
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 4.7.1 | Add export dropdown | P0 | 1h | Export menu |
| 4.7.2 | Implement PNG export | P0 | 4h | html-to-image |
| 4.7.3 | Implement JSON export | P0 | 2h | Download JSON file |
| 4.7.4 | Implement .tml export | P0 | 1h | Download source |
| 4.7.5 | Add copy JSON button | P1 | 1h | Copy to clipboard |

### Sprint 4 Deliverables
- [x] taskml.live live and accessible
- [x] Monaco editor with TaskML highlighting
- [x] Real-time preview with all views
- [x] URL sharing working
- [x] PNG/JSON export working

### Sprint 4 Definition of Done
Users can write TaskML, see live preview, switch views, share via URL, and export results.

---

## Sprint 5: Playground Features

**Duration:** Weeks 9-10  
**Theme:** Add advanced features to playground  
**Team:** 1-2 developers  
**Dependencies:** Sprint 4 complete

### Goals
- Template gallery
- SVG export
- Embed code generation
- Local storage for work-in-progress
- Keyboard shortcuts

### Tasks

#### 5.1 Template System
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 5.1.1 | Create template data structure | P0 | 2h | Name, description, content |
| 5.1.2 | Build 10+ starter templates | P0 | 6h | Various use cases |
| 5.1.3 | Create template gallery UI | P0 | 4h | Grid with previews |
| 5.1.4 | Add template categories | P1 | 2h | Simple, sprint, agent |
| 5.1.5 | Add "Load template" action | P0 | 2h | Replaces editor content |
| 5.1.6 | Add template search | P2 | 2h | Filter templates |

#### 5.2 Advanced Export
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 5.2.1 | Implement SVG export | P0 | 4h | Clean SVG output |
| 5.2.2 | Implement PDF export | P1 | 4h | Print-quality PDF |
| 5.2.3 | Implement Markdown export | P1 | 2h | Basic markdown |
| 5.2.4 | Add export options dialog | P1 | 2h | Scale, background |
| 5.2.5 | Add clipboard image copy | P2 | 2h | Copy as image |

#### 5.3 Embed Generation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 5.3.1 | Create embed endpoint | P0 | 4h | /embed?content=... |
| 5.3.2 | Style embedded view | P0 | 2h | Minimal chrome |
| 5.3.3 | Generate iframe code | P0 | 2h | Copy embed HTML |
| 5.3.4 | Add embed size options | P1 | 2h | Width/height params |
| 5.3.5 | Add embed theme option | P1 | 1h | Light/dark param |

#### 5.4 Persistence
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 5.4.1 | Save to localStorage | P0 | 2h | Auto-save draft |
| 5.4.2 | Add "My Diagrams" panel | P1 | 4h | List saved items |
| 5.4.3 | Add save/load actions | P0 | 2h | Manual save |
| 5.4.4 | Add clear storage option | P1 | 1h | Privacy control |
| 5.4.5 | Add undo/redo | P1 | 4h | History stack |

#### 5.5 Keyboard Shortcuts
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 5.5.1 | Add shortcut system | P0 | 2h | Keybinding manager |
| 5.5.2 | Cmd/Ctrl+S to save | P0 | 1h | Save shortcut |
| 5.5.3 | Cmd/Ctrl+E to export | P1 | 1h | Export shortcut |
| 5.5.4 | Cmd/Ctrl+K for command palette | P2 | 4h | Quick actions |
| 5.5.5 | Add shortcuts help | P1 | 2h | ? shows shortcuts |

#### 5.6 Enhanced Editing
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 5.6.1 | Add TaskML snippets | P1 | 4h | Common patterns |
| 5.6.2 | Add autocomplete for tokens | P1 | 6h | @ ^ # suggestions |
| 5.6.3 | Add format document | P1 | 2h | Canonical order |
| 5.6.4 | Add find/replace | P2 | 2h | Search in editor |

### Sprint 5 Deliverables
- [x] 10+ starter templates
- [x] SVG and PDF export
- [x] Embed code generation
- [x] Local storage persistence
- [x] Keyboard shortcuts

### Sprint 5 Definition of Done
Playground is feature-complete for individual use. Users can start from templates, persist work, and embed results.

---

## Sprint 6: Playground Polish

**Duration:** Weeks 11-12  
**Theme:** Polish, performance, and production-readiness  
**Team:** 1-2 developers  
**Dependencies:** Sprint 5 complete

### Goals
- Performance optimization
- Accessibility audit
- Mobile experience
- Documentation
- Launch preparation

### Tasks

#### 6.1 Performance
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 6.1.1 | Add debounced parsing | P0 | 2h | No flicker on typing |
| 6.1.2 | Optimize Monaco loading | P0 | 4h | Lazy load, smaller bundle |
| 6.1.3 | Add web worker for parsing | P1 | 6h | Non-blocking parse |
| 6.1.4 | Optimize render performance | P1 | 4h | Virtual scrolling if needed |
| 6.1.5 | Implement code splitting | P1 | 4h | Route-based splitting |
| 6.1.6 | Add performance monitoring | P2 | 2h | Core Web Vitals |

#### 6.2 Accessibility
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 6.2.1 | Run Lighthouse audit | P0 | 2h | Document issues |
| 6.2.2 | Add ARIA labels | P0 | 4h | Screen reader support |
| 6.2.3 | Add keyboard navigation | P0 | 4h | Tab through UI |
| 6.2.4 | Fix color contrast | P0 | 2h | WCAG AA compliance |
| 6.2.5 | Add skip links | P1 | 1h | Skip to content |
| 6.2.6 | Test with screen reader | P1 | 4h | VoiceOver/NVDA |

#### 6.3 Mobile Experience
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 6.3.1 | Test mobile layout | P0 | 2h | Document issues |
| 6.3.2 | Fix touch interactions | P0 | 4h | Touch-friendly UI |
| 6.3.3 | Optimize for small screens | P0 | 4h | Stacked layout |
| 6.3.4 | Add mobile-friendly export | P1 | 2h | Share sheet integration |
| 6.3.5 | Test tablet layout | P1 | 2h | iPad experience |

#### 6.4 SEO & Social
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 6.4.1 | Add meta tags | P0 | 2h | Title, description |
| 6.4.2 | Add Open Graph tags | P0 | 2h | Social sharing |
| 6.4.3 | Add Twitter cards | P1 | 1h | Twitter preview |
| 6.4.4 | Create social preview image | P0 | 2h | OG image |
| 6.4.5 | Add sitemap | P1 | 1h | sitemap.xml |
| 6.4.6 | Add robots.txt | P1 | 30m | Search indexing |

#### 6.5 Documentation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 6.5.1 | Write getting started guide | P0 | 4h | In-app help |
| 6.5.2 | Create syntax quick reference | P0 | 4h | Cheat sheet |
| 6.5.3 | Add interactive tutorial | P1 | 8h | Guided walkthrough |
| 6.5.4 | Add example gallery | P1 | 4h | Real-world examples |
| 6.5.5 | Add FAQ section | P1 | 2h | Common questions |

#### 6.6 Launch Prep
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 6.6.1 | Set up error monitoring (Sentry) | P0 | 2h | Errors tracked |
| 6.6.2 | Set up uptime monitoring | P1 | 1h | Uptime alerts |
| 6.6.3 | Configure CDN caching | P1 | 2h | Asset caching |
| 6.6.4 | Security audit | P0 | 4h | XSS, CSP headers |
| 6.6.5 | Load testing | P1 | 4h | Handle traffic |
| 6.6.6 | Create launch checklist | P0 | 2h | Pre-launch items |

### Sprint 6 Deliverables
- [x] Performance optimized (<3s load)
- [x] WCAG AA accessible
- [x] Mobile-friendly
- [x] SEO configured
- [x] Documentation complete
- [x] Production monitoring live

### Sprint 6 Definition of Done
Playground is production-ready. Lighthouse scores >90. Ready for public launch.

---

# Phase 3: Developer Tools (Sprints 7-10)

## Sprint 7: VS Code Extension

**Duration:** Weeks 13-14  
**Theme:** Build VS Code extension with syntax and preview  
**Team:** 1-2 developers  
**Dependencies:** Sprint 3 complete

### Goals
- Full syntax highlighting
- Live preview panel
- Error diagnostics
- Publish to marketplace

### Tasks

#### 7.1 Extension Setup
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 7.1.1 | Scaffold extension | P0 | 2h | Yeoman generator |
| 7.1.2 | Configure TypeScript | P0 | 1h | Build working |
| 7.1.3 | Set up launch config | P0 | 1h | F5 debugging |
| 7.1.4 | Create extension icon | P0 | 2h | 128x128 icon |
| 7.1.5 | Write package.json metadata | P0 | 1h | Marketplace info |

#### 7.2 Syntax Highlighting
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 7.2.1 | Create TextMate grammar | P0 | 8h | Full spec coverage |
| 7.2.2 | Highlight directives | P0 | 2h | @ directives |
| 7.2.3 | Highlight status groups | P0 | 2h | [status] |
| 7.2.4 | Highlight tasks | P0 | 2h | - task |
| 7.2.5 | Highlight tokens | P0 | 4h | # @ ^ + ~ ! > : |
| 7.2.6 | Highlight checkboxes | P0 | 1h | [ ] [x] etc |
| 7.2.7 | Highlight verification | P0 | 2h | ? criteria |
| 7.2.8 | Highlight comments | P0 | 1h | // and /* */ |
| 7.2.9 | Highlight context blocks | P1 | 2h | context: |
| 7.2.10 | Test with all themes | P0 | 2h | Works with popular themes |

#### 7.3 Language Configuration
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 7.3.1 | Configure brackets | P0 | 1h | [] matching |
| 7.3.2 | Configure comments | P0 | 1h | Toggle comment |
| 7.3.3 | Configure auto-close | P1 | 1h | Auto-close brackets |
| 7.3.4 | Configure indentation | P1 | 2h | Auto-indent |
| 7.3.5 | Configure folding | P1 | 2h | Fold regions |
| 7.3.6 | Configure word pattern | P1 | 1h | Word selection |

#### 7.4 Preview Panel
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 7.4.1 | Create webview provider | P0 | 4h | Panel infrastructure |
| 7.4.2 | Render taskml-js output | P0 | 4h | HTML preview |
| 7.4.3 | Add view selector | P0 | 2h | Switch views |
| 7.4.4 | Sync on document change | P0 | 4h | Live update |
| 7.4.5 | Add theme matching | P1 | 2h | Match VS Code theme |
| 7.4.6 | Add refresh button | P1 | 1h | Manual refresh |
| 7.4.7 | Add open in playground link | P1 | 2h | Open in taskml.live |

#### 7.5 Diagnostics
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 7.5.1 | Create diagnostic provider | P0 | 4h | Error reporting |
| 7.5.2 | Report parse errors | P0 | 2h | Syntax errors |
| 7.5.3 | Report validation warnings | P1 | 2h | Canonical order |
| 7.5.4 | Add squiggly underlines | P0 | 1h | Error markers |
| 7.5.5 | Add problems panel | P0 | 2h | List all issues |
| 7.5.6 | Add quick fixes | P2 | 6h | Auto-fix suggestions |

#### 7.6 Commands
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 7.6.1 | Add "Open Preview" command | P0 | 1h | Cmd+Shift+V |
| 7.6.2 | Add "Format Document" command | P1 | 2h | Canonical order |
| 7.6.3 | Add "Export PNG" command | P1 | 2h | Export preview |
| 7.6.4 | Add "Copy as JSON" command | P2 | 1h | Clipboard JSON |
| 7.6.5 | Add command palette entries | P0 | 1h | All commands |

#### 7.7 Publishing
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 7.7.1 | Create publisher account | P0 | 1h | VS Code marketplace |
| 7.7.2 | Write README | P0 | 2h | Marketplace page |
| 7.7.3 | Create screenshots | P0 | 2h | Extension demo |
| 7.7.4 | Create CHANGELOG | P0 | 1h | Version history |
| 7.7.5 | Configure CI publish | P0 | 2h | Auto-publish on tag |
| 7.7.6 | Publish v1.0.0 | P0 | 1h | Live on marketplace |

### Sprint 7 Deliverables
- [x] Full syntax highlighting
- [x] Live preview panel
- [x] Error diagnostics
- [x] Published on VS Code Marketplace

### Sprint 7 Definition of Done
Extension works with all TaskML features. 4.5+ star rating capability. Marketplace page polished.

---

## Sprint 8: Obsidian Plugin

**Duration:** Weeks 15-16  
**Theme:** Build Obsidian plugin for rendering TaskML  
**Team:** 1 developer  
**Dependencies:** Sprint 3 complete

### Goals
- Render TaskML code blocks in Obsidian
- Support all views
- Dark mode support
- Community plugin submission

### Tasks

#### 8.1 Plugin Setup
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 8.1.1 | Scaffold Obsidian plugin | P0 | 2h | TypeScript template |
| 8.1.2 | Configure esbuild | P0 | 2h | Build working |
| 8.1.3 | Set up hot reload | P0 | 1h | Dev convenience |
| 8.1.4 | Create manifest.json | P0 | 1h | Plugin metadata |

#### 8.2 Code Block Rendering
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 8.2.1 | Register code block processor | P0 | 2h | taskml blocks detected |
| 8.2.2 | Parse content with taskml-js | P0 | 2h | AST generated |
| 8.2.3 | Render HTML output | P0 | 4h | Views render |
| 8.2.4 | Handle errors gracefully | P0 | 2h | Error display |
| 8.2.5 | Support tml alias | P1 | 1h | Both fences work |

#### 8.3 View Support
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 8.3.1 | Implement list view | P0 | 2h | List renders |
| 8.3.2 | Implement kanban view | P0 | 4h | Kanban renders |
| 8.3.3 | Implement tree view | P0 | 2h | Tree renders |
| 8.3.4 | Implement table view | P1 | 2h | Table renders |
| 8.3.5 | Implement timeline view | P2 | 4h | Timeline renders |
| 8.3.6 | Implement graph view | P2 | 4h | Graph renders |
| 8.3.7 | Add view directive support | P0 | 2h | @view works |

#### 8.4 Theming
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 8.4.1 | Match Obsidian light theme | P0 | 2h | Colors match |
| 8.4.2 | Match Obsidian dark theme | P0 | 2h | Colors match |
| 8.4.3 | Use CSS variables | P0 | 2h | Themeable |
| 8.4.4 | Test with popular themes | P1 | 2h | Compatibility |

#### 8.5 Settings
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 8.5.1 | Create settings tab | P0 | 2h | Settings UI |
| 8.5.2 | Add default view setting | P1 | 1h | Global default |
| 8.5.3 | Add theme override setting | P2 | 1h | Force light/dark |
| 8.5.4 | Add collapsed default setting | P2 | 1h | Start collapsed |

#### 8.6 Publishing
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 8.6.1 | Write README | P0 | 2h | GitHub readme |
| 8.6.2 | Create demo vault | P1 | 2h | Example usage |
| 8.6.3 | Submit to community plugins | P0 | 2h | PR to obsidian-releases |
| 8.6.4 | Create plugin page | P1 | 2h | Documentation |

### Sprint 8 Deliverables
- [x] Obsidian plugin rendering TaskML
- [x] All views supported
- [x] Dark mode support
- [x] Submitted to community plugins

### Sprint 8 Definition of Done
Plugin works in Obsidian. Users can write TaskML in notes and see rendered output.

---

## Sprint 9: CLI Tools

**Duration:** Weeks 17-18  
**Theme:** Build command-line tools for TaskML  
**Team:** 1 developer  
**Dependencies:** Sprint 3 complete

### Goals
- CLI for parsing, validating, rendering
- Format and lint commands
- Conversion utilities
- npm global install

### Tasks

#### 9.1 CLI Setup
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 9.1.1 | Set up Commander.js | P0 | 2h | CLI framework |
| 9.1.2 | Configure global install | P0 | 2h | npm install -g |
| 9.1.3 | Add --help for all commands | P0 | 2h | Help text |
| 9.1.4 | Add --version flag | P0 | 30m | Version display |
| 9.1.5 | Add color output (chalk) | P1 | 1h | Colorized output |

#### 9.2 Core Commands
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 9.2.1 | `taskml parse <file>` | P0 | 4h | Output AST |
| 9.2.2 | `taskml validate <file>` | P0 | 4h | Check for errors |
| 9.2.3 | `taskml render <file>` | P0 | 4h | HTML output |
| 9.2.4 | `taskml format <file>` | P0 | 4h | Canonical order |
| 9.2.5 | `taskml lint <file>` | P1 | 4h | Style warnings |

#### 9.3 Conversion Commands
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 9.3.1 | `taskml to-json <file>` | P0 | 2h | JSON output |
| 9.3.2 | `taskml to-yaml <file>` | P1 | 2h | YAML output |
| 9.3.3 | `taskml from-json <file>` | P0 | 2h | JSON to TML |
| 9.3.4 | `taskml from-yaml <file>` | P1 | 2h | YAML to TML |

#### 9.4 Export Commands
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 9.4.1 | `taskml export png <file>` | P1 | 4h | PNG export |
| 9.4.2 | `taskml export svg <file>` | P1 | 2h | SVG export |
| 9.4.3 | `taskml export pdf <file>` | P2 | 4h | PDF export |

#### 9.5 Watch Mode
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 9.5.1 | `taskml watch <file>` | P1 | 4h | Watch for changes |
| 9.5.2 | Auto-validate on change | P1 | 2h | Re-validate |
| 9.5.3 | Auto-render on change | P2 | 2h | Re-render |

#### 9.6 Init Command
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 9.6.1 | `taskml init` | P1 | 4h | Create starter file |
| 9.6.2 | Template selection | P2 | 2h | Choose template |

### Sprint 9 Deliverables
- [x] CLI with all core commands
- [x] Format and lint commands
- [x] Conversion utilities
- [x] Published to npm

### Sprint 9 Definition of Done
`npm install -g taskml-cli` works. All commands documented with --help.

---

## Sprint 10: GitHub Integration

**Duration:** Weeks 19-20  
**Theme:** GitHub Action and code fence request  
**Team:** 1 developer  
**Dependencies:** Sprint 9 complete

### Goals
- GitHub Action for TaskML validation
- Submit code fence support request
- Create browser extension fallback
- Documentation for GitHub usage

### Tasks

#### 10.1 GitHub Action
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 10.1.1 | Create action.yml | P0 | 2h | Action definition |
| 10.1.2 | Implement validation action | P0 | 4h | Validate .tml files |
| 10.1.3 | Implement render action | P1 | 4h | Render to artifacts |
| 10.1.4 | Add PR comment output | P1 | 4h | Post preview |
| 10.1.5 | Create workflow examples | P0 | 2h | Usage examples |
| 10.1.6 | Publish to marketplace | P0 | 2h | Action published |

#### 10.2 Code Fence Request
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 10.2.1 | Research GitHub process | P0 | 2h | Understand process |
| 10.2.2 | Write feature request | P0 | 4h | Compelling case |
| 10.2.3 | Gather community support | P1 | 8h | Upvotes, comments |
| 10.2.4 | Submit to GitHub | P0 | 1h | Issue submitted |
| 10.2.5 | Follow up monthly | P1 | Ongoing | Track progress |

#### 10.3 Browser Extension (Fallback)
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 10.3.1 | Create Chrome extension scaffold | P1 | 2h | Manifest v3 |
| 10.3.2 | Detect TaskML code blocks | P1 | 4h | Content script |
| 10.3.3 | Render inline preview | P1 | 6h | Replace code block |
| 10.3.4 | Add toggle button | P1 | 2h | Show/hide render |
| 10.3.5 | Create Firefox version | P2 | 4h | Firefox compat |
| 10.3.6 | Publish to stores | P1 | 4h | Chrome/Firefox |

#### 10.4 Documentation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 10.4.1 | Write GitHub integration guide | P0 | 4h | Usage docs |
| 10.4.2 | Create README examples | P0 | 2h | Copy-paste examples |
| 10.4.3 | Document browser extension | P1 | 2h | Installation guide |

### Sprint 10 Deliverables
- [x] GitHub Action published
- [x] Code fence request submitted
- [x] Browser extension (Chrome, Firefox)
- [x] Integration documentation

### Sprint 10 Definition of Done
Users can validate TaskML in CI. Feature request submitted to GitHub. Fallback rendering available.

---

# Phase 4: Integration (Sprints 11-13)

## Sprint 11: Claudia Integration

**Duration:** Weeks 21-22  
**Theme:** Integrate TaskML export into Claudia  
**Team:** 1-2 developers  
**Dependencies:** Sprint 3 complete

### Goals
- Claudia exports .tml files
- Live source mode in TaskML tools
- Bidirectional sync (experimental)

### Tasks

#### 11.1 Export Command
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 11.1.1 | Add `claudia export --format tml` | P0 | 4h | Exports current state |
| 11.1.2 | Map Claudia fields to TaskML | P0 | 4h | All fields mapped |
| 11.1.3 | Export task hierarchy | P0 | 2h | Parent/child preserved |
| 11.1.4 | Export verification criteria | P0 | 4h | Criteria mapped |
| 11.1.5 | Export agent context | P0 | 2h | Context blocks |
| 11.1.6 | Add --sprint filter | P1 | 2h | Export specific sprint |
| 11.1.7 | Add --watch mode | P1 | 4h | Auto-update file |

#### 11.2 Source Protocol
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 11.2.1 | Define claudia:// URL scheme | P0 | 2h | Spec documented |
| 11.2.2 | Implement source server | P0 | 8h | HTTP endpoint |
| 11.2.3 | Add authentication | P1 | 4h | Token auth |
| 11.2.4 | Implement read endpoint | P0 | 4h | GET tasks |
| 11.2.5 | Implement write endpoint | P2 | 6h | PUT tasks |
| 11.2.6 | Add WebSocket for live updates | P2 | 8h | Real-time sync |

#### 11.3 Playground Integration
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 11.3.1 | Add "Connect to Claudia" UI | P1 | 4h | Connection flow |
| 11.3.2 | Implement source fetching | P1 | 4h | Load from Claudia |
| 11.3.3 | Add refresh on interval | P1 | 2h | Auto-refresh |
| 11.3.4 | Handle connection errors | P1 | 2h | Offline fallback |

#### 11.4 VS Code Integration
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 11.4.1 | Add @source support | P1 | 4h | Load from Claudia |
| 11.4.2 | Add status bar item | P2 | 2h | Connection status |
| 11.4.3 | Add connect command | P1 | 2h | Manual connect |

### Sprint 11 Deliverables
- [x] Claudia exports TaskML
- [x] claudia:// source protocol
- [x] Playground can connect to Claudia
- [x] VS Code can load from Claudia

### Sprint 11 Definition of Done
Complete pipeline: Claudia → .tml file → TaskML tools → visualization.

---

## Sprint 12: Framework Integrations

**Duration:** Weeks 23-24  
**Theme:** Integrate TaskML with AI agent frameworks  
**Team:** 1-2 developers  
**Dependencies:** Sprint 9 complete

### Goals
- LangChain TaskML output
- CrewAI integration
- AutoGen integration
- Documentation for each

### Tasks

#### 12.1 LangChain Integration
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 12.1.1 | Create langchain-taskml package | P0 | 4h | Package scaffold |
| 12.1.2 | Implement TaskMLCallback | P0 | 8h | State tracking |
| 12.1.3 | Output agent actions as tasks | P0 | 6h | Action → task mapping |
| 12.1.4 | Support chain visualization | P1 | 6h | Chain as tree |
| 12.1.5 | Write documentation | P0 | 4h | Usage guide |
| 12.1.6 | Create example notebooks | P1 | 4h | Jupyter examples |

#### 12.2 CrewAI Integration
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 12.2.1 | Create crewai-taskml package | P0 | 4h | Package scaffold |
| 12.2.2 | Map Crew → Sprint | P0 | 4h | Crew as container |
| 12.2.3 | Map Agent → Task assignee | P0 | 4h | Agent tracking |
| 12.2.4 | Map Task → TaskML task | P0 | 4h | Task mapping |
| 12.2.5 | Write documentation | P0 | 4h | Usage guide |

#### 12.3 AutoGen Integration
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 12.3.1 | Create autogen-taskml package | P1 | 4h | Package scaffold |
| 12.3.2 | Map conversation to tasks | P1 | 6h | Message → task |
| 12.3.3 | Track agent handoffs | P1 | 4h | Handoff metadata |
| 12.3.4 | Write documentation | P1 | 4h | Usage guide |

#### 12.4 Generic Integration Guide
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 12.4.1 | Write integration guide | P0 | 6h | How to integrate |
| 12.4.2 | Create integration template | P1 | 4h | Starter code |
| 12.4.3 | Document best practices | P1 | 4h | Recommendations |

### Sprint 12 Deliverables
- [x] langchain-taskml package
- [x] crewai-taskml package
- [x] autogen-taskml package
- [x] Integration documentation

### Sprint 12 Definition of Done
AI frameworks can output TaskML. Users can visualize agent work from any framework.

---

## Sprint 13: API & Webhooks

**Duration:** Weeks 25-26  
**Theme:** Build hosted API and webhook support  
**Team:** 1-2 developers  
**Dependencies:** Sprint 6 complete

### Goals
- Hosted rendering API
- Webhook for external integrations
- Rate limiting and authentication
- API documentation

### Tasks

#### 13.1 Hosted API
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 13.1.1 | Design API endpoints | P0 | 2h | REST API design |
| 13.1.2 | POST /render endpoint | P0 | 4h | Submit TML, get HTML |
| 13.1.3 | POST /validate endpoint | P0 | 2h | Submit TML, get errors |
| 13.1.4 | POST /convert endpoint | P1 | 2h | TML ↔ JSON ↔ YAML |
| 13.1.5 | GET /image endpoint | P1 | 4h | Return PNG/SVG |
| 13.1.6 | Add rate limiting | P0 | 2h | Protect service |
| 13.1.7 | Add API keys | P1 | 4h | Authentication |

#### 13.2 Infrastructure
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 13.2.1 | Deploy API to Vercel Edge | P0 | 4h | Serverless functions |
| 13.2.2 | Set up Redis for rate limits | P1 | 2h | Upstash Redis |
| 13.2.3 | Set up monitoring | P0 | 2h | API metrics |
| 13.2.4 | Configure CORS | P0 | 1h | Cross-origin requests |

#### 13.3 Webhook Support
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 13.3.1 | Design webhook events | P1 | 2h | Event types |
| 13.3.2 | POST /webhooks endpoint | P1 | 4h | Register webhooks |
| 13.3.3 | Implement event dispatch | P1 | 4h | Send webhook calls |
| 13.3.4 | Add retry logic | P2 | 2h | Retry failed calls |

#### 13.4 Documentation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 13.4.1 | Write API documentation | P0 | 6h | Full API docs |
| 13.4.2 | Create OpenAPI spec | P1 | 4h | Swagger spec |
| 13.4.3 | Add interactive docs | P1 | 4h | Try it live |
| 13.4.4 | Write webhook guide | P1 | 2h | Integration guide |

### Sprint 13 Deliverables
- [x] Hosted rendering API
- [x] API documentation
- [x] Webhook support
- [x] OpenAPI specification

### Sprint 13 Definition of Done
API live at api.taskml.dev. Documentation complete. Rate limiting active.

---

# Phase 5: Launch (Sprints 14-16)

## Sprint 14: Website

**Duration:** Weeks 27-28  
**Theme:** Build taskml.dev marketing website  
**Team:** 1-2 developers + designer (optional)  
**Dependencies:** Sprint 6 complete

### Goals
- Professional landing page
- Clear value proposition
- Integration showcase
- Call to action

### Tasks

#### 14.1 Design
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 14.1.1 | Design system (colors, type) | P0 | 4h | Brand guidelines |
| 14.1.2 | Landing page design | P0 | 8h | Figma mockup |
| 14.1.3 | Create logo | P0 | 4h | SVG logo |
| 14.1.4 | Design feature sections | P0 | 4h | Visual hierarchy |
| 14.1.5 | Design integration cards | P1 | 2h | Tool logos |

#### 14.2 Landing Page
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 14.2.1 | Hero section | P0 | 4h | Title, demo, CTA |
| 14.2.2 | Embedded playground demo | P0 | 4h | Interactive example |
| 14.2.3 | Features section | P0 | 4h | Key benefits |
| 14.2.4 | Use cases section | P1 | 4h | Who it's for |
| 14.2.5 | Integrations section | P0 | 4h | Tool showcase |
| 14.2.6 | Code example section | P0 | 4h | npm install |
| 14.2.7 | Footer with links | P0 | 2h | Navigation |
| 14.2.8 | Mobile responsive | P0 | 4h | All breakpoints |

#### 14.3 Additional Pages
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 14.3.1 | /about page | P2 | 2h | Project story |
| 14.3.2 | /changelog page | P1 | 2h | Version history |
| 14.3.3 | /community page | P2 | 2h | Discord, GitHub |
| 14.3.4 | 404 page | P1 | 1h | Custom 404 |

#### 14.4 SEO & Analytics
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 14.4.1 | Meta tags | P0 | 2h | SEO basics |
| 14.4.2 | Open Graph | P0 | 2h | Social sharing |
| 14.4.3 | Sitemap | P1 | 1h | sitemap.xml |
| 14.4.4 | Analytics | P0 | 1h | Plausible setup |
| 14.4.5 | Search console | P1 | 1h | Google indexing |

### Sprint 14 Deliverables
- [x] taskml.dev live
- [x] Professional landing page
- [x] Embedded playground demo
- [x] SEO configured

### Sprint 14 Definition of Done
Website explains TaskML clearly. Visitors understand value in <10 seconds.

---

## Sprint 15: Documentation

**Duration:** Weeks 29-30  
**Theme:** Comprehensive documentation site  
**Team:** 1 developer + technical writer (optional)  
**Dependencies:** Sprint 14 complete

### Goals
- Complete documentation
- Interactive examples
- API reference
- Search functionality

### Tasks

#### 15.1 Documentation Platform
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 15.1.1 | Set up Nextra/Docusaurus | P0 | 4h | Docs framework |
| 15.1.2 | Configure at taskml.dev/docs | P0 | 2h | Subdomain setup |
| 15.1.3 | Add search (Algolia/local) | P0 | 4h | Search works |
| 15.1.4 | Add dark mode | P1 | 2h | Theme toggle |
| 15.1.5 | Add versioning | P2 | 4h | Version dropdown |

#### 15.2 Getting Started
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 15.2.1 | Quick start guide | P0 | 4h | 5-minute intro |
| 15.2.2 | Installation guide | P0 | 2h | All platforms |
| 15.2.3 | First example | P0 | 2h | Hello world |
| 15.2.4 | Playground tutorial | P1 | 4h | Interactive guide |

#### 15.3 Syntax Reference
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 15.3.1 | Directives reference | P0 | 4h | All directives |
| 15.3.2 | Task syntax | P0 | 4h | Complete syntax |
| 15.3.3 | Tokens reference | P0 | 4h | All tokens |
| 15.3.4 | Verification syntax | P0 | 4h | Criteria docs |
| 15.3.5 | Agent metadata | P0 | 4h | Context, handoff |

#### 15.4 Views Guide
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 15.4.1 | List view docs | P0 | 2h | Usage, examples |
| 15.4.2 | Kanban view docs | P0 | 2h | Usage, examples |
| 15.4.3 | Tree view docs | P0 | 2h | Usage, examples |
| 15.4.4 | Timeline view docs | P0 | 2h | Usage, examples |
| 15.4.5 | Table view docs | P0 | 2h | Usage, examples |
| 15.4.6 | Graph view docs | P0 | 2h | Usage, examples |
| 15.4.7 | Summary view docs | P1 | 2h | Usage, examples |

#### 15.5 Integration Guides
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 15.5.1 | VS Code guide | P0 | 4h | Setup, features |
| 15.5.2 | Obsidian guide | P0 | 4h | Setup, features |
| 15.5.3 | Claudia guide | P0 | 4h | Integration steps |
| 15.5.4 | LangChain guide | P1 | 4h | Code examples |
| 15.5.5 | CrewAI guide | P1 | 4h | Code examples |
| 15.5.6 | GitHub Actions guide | P0 | 4h | CI setup |

#### 15.6 API Reference
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 15.6.1 | taskml-js API | P0 | 6h | All exports |
| 15.6.2 | CLI reference | P0 | 4h | All commands |
| 15.6.3 | REST API reference | P0 | 4h | All endpoints |
| 15.6.4 | TypeScript types | P1 | 4h | Type docs |

### Sprint 15 Deliverables
- [x] Documentation site live
- [x] Complete syntax reference
- [x] All integration guides
- [x] API reference

### Sprint 15 Definition of Done
All features documented. Users can learn TaskML from docs alone.

---

## Sprint 16: Marketing & Launch

**Duration:** Weeks 31-32  
**Theme:** Public launch and community building  
**Team:** 1-2 developers + marketing  
**Dependencies:** Sprints 14-15 complete

### Goals
- Coordinated launch
- Community channels active
- Press/blog coverage
- First 1000 users

### Tasks

#### 16.1 Pre-Launch
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 16.1.1 | Launch checklist | P0 | 4h | All items verified |
| 16.1.2 | Beta tester feedback | P0 | 8h | Fix critical issues |
| 16.1.3 | Prepare launch content | P0 | 8h | Blog, tweets |
| 16.1.4 | Coordinate with Claudia launch | P1 | 4h | Cross-promotion |

#### 16.2 Launch Day
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 16.2.1 | Publish blog post | P0 | 2h | "Introducing TaskML" |
| 16.2.2 | Post to Hacker News | P0 | 1h | Show HN post |
| 16.2.3 | Post to Reddit | P0 | 2h | r/programming, r/artificial |
| 16.2.4 | Post to Twitter/X | P0 | 2h | Thread with demos |
| 16.2.5 | Post to LinkedIn | P1 | 1h | Professional audience |
| 16.2.6 | Submit to Product Hunt | P1 | 4h | Launch page |
| 16.2.7 | Monitor and respond | P0 | 8h | Engage with feedback |

#### 16.3 Community Setup
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 16.3.1 | Create Discord server | P0 | 2h | Server live |
| 16.3.2 | Set up channels | P0 | 2h | Help, showcase, dev |
| 16.3.3 | Create welcome bot | P1 | 2h | Onboarding |
| 16.3.4 | Write community guidelines | P0 | 2h | Rules posted |
| 16.3.5 | Recruit moderators | P2 | 4h | Mod team |

#### 16.4 Content Creation
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 16.4.1 | Write launch blog post | P0 | 8h | Compelling story |
| 16.4.2 | Create demo video | P0 | 8h | 2-3 minute demo |
| 16.4.3 | Create Twitter thread | P0 | 2h | Visual thread |
| 16.4.4 | Create Dev.to article | P1 | 4h | Technical audience |
| 16.4.5 | Create comparison posts | P2 | 4h | vs Mermaid, etc |

#### 16.5 Outreach
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 16.5.1 | Contact AI newsletters | P1 | 4h | Ben's Bites, etc |
| 16.5.2 | Contact framework authors | P1 | 4h | LangChain, CrewAI |
| 16.5.3 | Contact VS Code team | P2 | 2h | Extension feature |
| 16.5.4 | Contact GitHub team | P0 | 2h | Code fence follow-up |

### Sprint 16 Deliverables
- [x] Successful public launch
- [x] Discord community active
- [x] Blog post published
- [x] 1000+ playground users

### Sprint 16 Definition of Done
TaskML is publicly known. Active community forming. Positive reception.

---

# Phase 6: Growth (Sprints 17-20)

## Sprint 17: Collaborative Features

**Duration:** Weeks 33-34  
**Theme:** Real-time collaboration and team features  
**Team:** 2 developers  
**Dependencies:** Sprint 13 complete

### Goals
- Real-time collaborative editing
- Team workspaces
- Shareable boards
- Presence indicators

### Tasks

#### 17.1 Real-Time Engine
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 17.1.1 | Evaluate CRDT libraries | P0 | 4h | Yjs, Automerge |
| 17.1.2 | Implement WebSocket server | P0 | 8h | Real-time sync |
| 17.1.3 | Implement CRDT integration | P0 | 12h | Conflict-free editing |
| 17.1.4 | Add presence awareness | P0 | 6h | See who's editing |
| 17.1.5 | Add cursor sharing | P1 | 6h | See others' cursors |

#### 17.2 Team Features
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 17.2.1 | User accounts | P0 | 8h | Auth system |
| 17.2.2 | Team workspaces | P1 | 8h | Shared spaces |
| 17.2.3 | Permission system | P1 | 6h | View/edit roles |
| 17.2.4 | Shareable links | P0 | 4h | Public/private links |
| 17.2.5 | Comment system | P2 | 8h | Task comments |

#### 17.3 Infrastructure
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 17.3.1 | Database for users | P0 | 4h | Postgres/Planetscale |
| 17.3.2 | WebSocket hosting | P0 | 4h | Scalable WS server |
| 17.3.3 | CDN for assets | P1 | 2h | Fast global delivery |

### Sprint 17 Deliverables
- [x] Real-time collaboration working
- [x] User accounts
- [x] Team workspaces
- [x] Shareable boards

---

## Sprint 18: Mobile & Accessibility

**Duration:** Weeks 35-36  
**Theme:** Mobile apps and accessibility improvements  
**Team:** 1-2 developers  
**Dependencies:** Sprint 6 complete

### Goals
- PWA for mobile
- Native mobile considerations
- WCAG AAA accessibility
- Internationalization

### Tasks

#### 18.1 Progressive Web App
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 18.1.1 | Service worker | P0 | 4h | Offline support |
| 18.1.2 | Web app manifest | P0 | 2h | Installable |
| 18.1.3 | Push notifications | P2 | 6h | Task notifications |
| 18.1.4 | Offline editing | P1 | 8h | Local-first sync |
| 18.1.5 | Mobile-optimized UI | P0 | 8h | Touch-friendly |

#### 18.2 Accessibility
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 18.2.1 | WCAG AAA audit | P0 | 4h | Full audit |
| 18.2.2 | Fix all AAA issues | P0 | 8h | Pass AAA |
| 18.2.3 | Screen reader testing | P0 | 4h | Full testing |
| 18.2.4 | Add ARIA live regions | P1 | 4h | Dynamic content |
| 18.2.5 | Add skip navigation | P1 | 2h | Keyboard users |

#### 18.3 Internationalization
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 18.3.1 | Set up i18n framework | P0 | 4h | Translation system |
| 18.3.2 | Extract all strings | P0 | 4h | i18n ready |
| 18.3.3 | Add Japanese translation | P1 | 8h | Japanese support |
| 18.3.4 | Add Spanish translation | P1 | 8h | Spanish support |
| 18.3.5 | Add RTL support | P2 | 8h | Arabic/Hebrew |

### Sprint 18 Deliverables
- [x] PWA installable
- [x] WCAG AAA compliant
- [x] 3+ languages supported

---

## Sprint 19: Enterprise Features

**Duration:** Weeks 37-38  
**Theme:** Enterprise readiness and premium features  
**Team:** 2 developers  
**Dependencies:** Sprint 17 complete

### Goals
- SSO integration
- Audit logging
- Admin dashboard
- Self-hosted option

### Tasks

#### 19.1 Enterprise Auth
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 19.1.1 | SAML SSO | P0 | 12h | Okta, OneLogin |
| 19.1.2 | OIDC support | P0 | 8h | Generic OIDC |
| 19.1.3 | SCIM provisioning | P1 | 12h | User sync |
| 19.1.4 | Directory sync | P1 | 8h | Active Directory |

#### 19.2 Compliance
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 19.2.1 | Audit logging | P0 | 8h | All actions logged |
| 19.2.2 | Data export | P0 | 4h | GDPR compliance |
| 19.2.3 | Data retention | P1 | 4h | Configurable retention |
| 19.2.4 | SOC 2 preparation | P2 | 16h | Documentation |

#### 19.3 Self-Hosted
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 19.3.1 | Docker image | P0 | 8h | Single container |
| 19.3.2 | Docker Compose | P0 | 4h | Full stack |
| 19.3.3 | Helm chart | P1 | 8h | Kubernetes |
| 19.3.4 | Self-host docs | P0 | 8h | Deployment guide |

### Sprint 19 Deliverables
- [x] SSO integration
- [x] Audit logging
- [x] Self-hosted option
- [x] Docker deployment

---

## Sprint 20: Scale & Future

**Duration:** Weeks 39-40  
**Theme:** Scaling, optimization, and roadmap planning  
**Team:** Full team  
**Dependencies:** All prior sprints

### Goals
- Performance optimization
- Scale infrastructure
- v2.0 roadmap
- Community sustainability

### Tasks

#### 20.1 Performance
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 20.1.1 | Performance audit | P0 | 8h | Identify bottlenecks |
| 20.1.2 | Optimize rendering | P0 | 8h | Faster renders |
| 20.1.3 | Optimize parsing | P0 | 8h | Faster parsing |
| 20.1.4 | CDN optimization | P1 | 4h | Edge caching |

#### 20.2 Infrastructure Scaling
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 20.2.1 | Load testing | P0 | 8h | 10k concurrent users |
| 20.2.2 | Database optimization | P0 | 8h | Query optimization |
| 20.2.3 | Horizontal scaling | P1 | 8h | Auto-scaling |
| 20.2.4 | Global distribution | P2 | 8h | Multi-region |

#### 20.3 v2.0 Planning
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 20.3.1 | Gather feature requests | P0 | 8h | Community input |
| 20.3.2 | Prioritize roadmap | P0 | 8h | v2.0 plan |
| 20.3.3 | RFC process | P1 | 4h | Community RFCs |
| 20.3.4 | Write v2.0 spec | P1 | 16h | Next version |

#### 20.4 Community
| ID | Task | Priority | Estimate | Acceptance Criteria |
|----|------|----------|----------|---------------------|
| 20.4.1 | Contributor guide | P0 | 4h | How to contribute |
| 20.4.2 | Plugin system | P1 | 16h | Extensibility |
| 20.4.3 | Community showcase | P1 | 4h | User projects |
| 20.4.4 | Maintainer onboarding | P2 | 8h | Bus factor |

### Sprint 20 Deliverables
- [x] Performance optimized
- [x] Infrastructure scaled
- [x] v2.0 roadmap published
- [x] Contributor guide complete

---

# Appendices

## A. Technology Summary

| Layer | Technology |
|-------|------------|
| Core Library | TypeScript, Bun/Node |
| Playground | Next.js, Monaco, Tailwind |
| VS Code | TypeScript, Webview |
| Obsidian | TypeScript, Obsidian API |
| CLI | Commander.js, chalk |
| API | Vercel Edge Functions |
| Database | SQLite (Claudia), Postgres (Cloud) |
| Real-time | WebSocket, Yjs |
| Hosting | Vercel, Cloudflare |
| CI/CD | GitHub Actions |

## B. Estimated Timeline

| Phase | Sprints | Duration | End Date |
|-------|---------|----------|----------|
| Foundation | 1-3 | 6 weeks | Week 6 |
| Playground | 4-6 | 6 weeks | Week 12 |
| Developer Tools | 7-10 | 8 weeks | Week 20 |
| Integration | 11-13 | 6 weeks | Week 26 |
| Launch | 14-16 | 6 weeks | Week 32 |
| Growth | 17-20 | 8 weeks | Week 40 |

## C. Team Scaling

| Phase | Developers | Other Roles |
|-------|------------|-------------|
| Foundation | 1-2 | - |
| Playground | 1-2 | - |
| Developer Tools | 1-2 | - |
| Integration | 1-2 | - |
| Launch | 1-2 | Marketing, Design |
| Growth | 2-3 | Marketing, Support |

## D. Risk Register

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low adoption | High | Medium | Focus on Claudia users first |
| GitHub rejects code fence | Medium | High | Browser extension fallback |
| Competition | Medium | Low | Move fast, community focus |
| Maintainer burnout | High | Medium | Community contributions |
| Security vulnerability | High | Low | Security audits, bug bounty |

## E. Success Metrics Dashboard

### North Star Metrics
- Monthly Active Users (Playground)
- Weekly npm Downloads
- VS Code Extension Installs
- GitHub Stars

### Health Metrics
- Time to First Render
- Error Rate
- Support Ticket Volume
- Community Engagement

---

*TaskML Project Plan v1.0*  
*40 weeks to establish the standard for AI agent task visualization*
