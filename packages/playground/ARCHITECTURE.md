# TaskML Playground Architecture

> A production-grade interactive playground for TaskML, inspired by mermaid.live, TypeScript Playground, and Excalidraw.

## Design Philosophy

1. **Instant feedback** - Sub-100ms parse-to-render cycle
2. **Shareable by default** - Every state encodable in URL
3. **Progressive disclosure** - Simple by default, powerful when needed
4. **Keyboard-first** - All actions accessible via shortcuts
5. **Mobile-aware** - Fully functional on tablets, readable on phones

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 14 (App Router) | SSR for SEO, React Server Components |
| Styling | Tailwind CSS + CSS Variables | Utility-first, themeable |
| State | Zustand | Minimal boilerplate, great DevTools |
| Editor | Monaco Editor (@monaco-editor/react) | Industry standard, extensible |
| Compression | lz-string | URL-safe compression (same as TS Playground) |
| Resizable Panes | react-resizable-panels | Lightweight, accessible |
| Icons | Lucide React | Consistent, tree-shakeable |
| Export | html-to-image | PNG/SVG screenshot capture |
| Analytics | Plausible | Privacy-friendly |

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, providers, metadata
│   ├── page.tsx                # Main playground page
│   ├── globals.css             # Tailwind imports, CSS variables
│   └── embed/
│       └── page.tsx            # Embeddable iframe version
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx        # Main container with header
│   │   ├── Header.tsx          # Logo, actions, share button
│   │   ├── ResizablePanes.tsx  # Split pane wrapper
│   │   └── MobileNav.tsx       # Mobile bottom navigation
│   │
│   ├── editor/
│   │   ├── Editor.tsx          # Monaco wrapper component
│   │   ├── EditorToolbar.tsx   # Format, undo, redo buttons
│   │   ├── taskml-language.ts  # Monaco language definition
│   │   └── taskml-theme.ts     # Monaco color themes
│   │
│   ├── preview/
│   │   ├── Preview.tsx         # Preview container
│   │   ├── PreviewToolbar.tsx  # View selector, zoom, theme
│   │   ├── ViewRenderer.tsx    # Renders taskml output
│   │   └── EmptyState.tsx      # "Start typing..." placeholder
│   │
│   ├── panels/
│   │   ├── ErrorPanel.tsx      # Parse errors display
│   │   ├── ASTPanel.tsx        # Debug: show parsed AST
│   │   └── OutputPanel.tsx     # Debug: show JSON/YAML
│   │
│   ├── dialogs/
│   │   ├── ShareDialog.tsx     # Copy link, embed code
│   │   ├── ExportDialog.tsx    # PNG, SVG, JSON, TML options
│   │   ├── SettingsDialog.tsx  # Editor preferences
│   │   ├── ExamplesDialog.tsx  # Load example documents
│   │   └── KeyboardShortcuts.tsx # Shortcut reference
│   │
│   └── ui/
│       ├── Button.tsx          # Styled button variants
│       ├── Select.tsx          # Custom select dropdown
│       ├── Tooltip.tsx         # Hover tooltips
│       ├── Toast.tsx           # Notifications
│       └── CommandPalette.tsx  # Cmd+K command palette
│
├── stores/
│   ├── editor-store.ts         # Editor content, cursor, history
│   ├── preview-store.ts        # View type, zoom, theme
│   ├── ui-store.ts             # Dialogs, panels, layout
│   └── settings-store.ts       # Persisted user preferences
│
├── lib/
│   ├── url-state.ts            # URL encode/decode with lz-string
│   ├── debounce.ts             # Debounced parsing
│   ├── export.ts               # PNG/JSON/TML export logic
│   ├── examples.ts             # Built-in example documents
│   ├── keyboard.ts             # Keyboard shortcut definitions
│   └── analytics.ts            # Plausible event tracking
│
├── hooks/
│   ├── useTaskML.ts            # Parse + render hook
│   ├── useURLSync.ts           # Bidirectional URL sync
│   ├── useKeyboardShortcuts.ts # Global shortcut handler
│   ├── useDebounce.ts          # Debounced value hook
│   └── useMediaQuery.ts        # Responsive breakpoints
│
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## State Architecture

### Zustand Stores

```typescript
// stores/editor-store.ts
interface EditorState {
  // Content
  content: string;
  setContent: (content: string) => void;

  // Parse result (cached)
  document: Document | null;
  errors: ParseError[];
  parseContent: () => void;

  // History (undo/redo)
  history: string[];
  historyIndex: number;
  undo: () => void;
  redo: () => void;

  // Cursor position for error highlighting
  cursorLine: number;
  cursorColumn: number;
  setCursor: (line: number, col: number) => void;
}

// stores/preview-store.ts
interface PreviewState {
  // View configuration
  viewType: ViewType;
  setViewType: (view: ViewType) => void;

  // Theme
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;

  // Zoom
  zoom: number; // 0.5 - 2.0
  setZoom: (zoom: number) => void;
  resetZoom: () => void;

  // Rendered HTML (cached)
  renderedHTML: string;
  renderPreview: (doc: Document) => void;
}

// stores/ui-store.ts
interface UIState {
  // Layout
  editorWidth: number; // percentage
  setEditorWidth: (width: number) => void;

  // Panels
  showErrorPanel: boolean;
  showASTPanel: boolean;
  togglePanel: (panel: string) => void;

  // Dialogs
  activeDialog: 'share' | 'export' | 'settings' | 'examples' | 'shortcuts' | null;
  openDialog: (dialog: string) => void;
  closeDialog: () => void;

  // Mobile
  activeMobileTab: 'editor' | 'preview';
  setMobileTab: (tab: 'editor' | 'preview') => void;
}

// stores/settings-store.ts (persisted to localStorage)
interface SettingsState {
  // Editor preferences
  fontSize: number;
  fontFamily: 'mono' | 'jetbrains' | 'fira';
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;

  // Preview preferences
  defaultView: ViewType;
  autoRender: boolean;
  renderDelay: number; // debounce ms

  // Accessibility
  reduceMotion: boolean;
  highContrast: boolean;
}
```

### State Flow

```
User Input → Editor Store → Parse (debounced) → Preview Store → Render
     ↓                              ↓
  URL Sync                    Error Panel
```

---

## URL State Encoding

Following TypeScript Playground's proven pattern:

### URL Structure
```
https://taskml.live/?view=kanban&theme=dark#code/XQAAAAJkAAAAAAAAAAA...
                    └── query params ──┘ └── compressed code ──────┘
```

### Hash: Code Storage
```typescript
// lib/url-state.ts
import LZString from 'lz-string';

export function encodeContent(content: string): string {
  return LZString.compressToEncodedURIComponent(content);
}

export function decodeContent(encoded: string): string {
  return LZString.decompressFromEncodedURIComponent(encoded) || '';
}

export function buildURL(state: {
  content: string;
  view?: ViewType;
  theme?: string;
}): string {
  const url = new URL(window.location.href);

  // Query params for settings
  if (state.view && state.view !== 'list') {
    url.searchParams.set('view', state.view);
  }
  if (state.theme && state.theme !== 'auto') {
    url.searchParams.set('theme', state.theme);
  }

  // Hash for code (compressed)
  url.hash = `code/${encodeContent(state.content)}`;

  return url.toString();
}
```

### Query Parameters
| Param | Values | Default | Description |
|-------|--------|---------|-------------|
| `view` | list, kanban, tree, timeline, table, graph, summary | list | Active view |
| `theme` | light, dark, auto | auto | Color theme |
| `readonly` | true | false | Disable editing |
| `embed` | true | false | Minimal chrome for iframes |

---

## Monaco Editor Integration

### TaskML Language Definition

```typescript
// components/editor/taskml-language.ts
import type { languages } from 'monaco-editor';

export const taskmlLanguage: languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      // Directives: @project, @sprint, @version
      [/@\w+/, 'keyword'],

      // Status markers
      [/\[[ x~!?]\]/, 'keyword.status'],
      [/[○◐●⊘⊖◎]/, 'keyword.status'],

      // Priority: !0, !1, !2, !3
      [/![0-3]/, 'number.priority'],

      // Assignee: @username
      [/@\w+/, 'variable.assignee'],

      // Tags: #tag
      [/#\w+/, 'string.tag'],

      // Estimate: ~4h, ~2d
      [/~\d+[hdwm]?/, 'number.estimate'],

      // Due date: >2024-01-15
      [/>\d{4}-\d{2}-\d{2}/, 'number.date'],

      // Dependencies: ->task, <-task
      [/[<>]->\w+/, 'type.dependency'],

      // ID: #id:ABC-123
      [/#id:\S+/, 'attribute.id'],

      // Comments
      [/\/\/.*$/, 'comment'],

      // Criteria
      [/\s+[○●✗]\s+/, 'keyword.criterion'],

      // Notes
      [/^\s*-\s+/, 'comment.note'],
    ],
  },
};

export const taskmlConfig: languages.LanguageConfiguration = {
  brackets: [['[', ']']],
  autoClosingPairs: [
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
  surroundingPairs: [
    { open: '[', close: ']' },
  ],
  indentationRules: {
    increaseIndentPattern: /^\s*\[.*\]\s*$/,
    decreaseIndentPattern: /^\s*$/,
  },
};
```

### Editor Theme

```typescript
// components/editor/taskml-theme.ts
export const taskmlDarkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '569CD6' },
    { token: 'keyword.status', foreground: '4EC9B0' },
    { token: 'number.priority', foreground: 'CE9178' },
    { token: 'variable.assignee', foreground: '9CDCFE' },
    { token: 'string.tag', foreground: 'DCDCAA' },
    { token: 'number.estimate', foreground: 'B5CEA8' },
    { token: 'number.date', foreground: 'B5CEA8' },
    { token: 'type.dependency', foreground: 'C586C0' },
    { token: 'attribute.id', foreground: '808080' },
    { token: 'comment', foreground: '6A9955' },
    { token: 'keyword.criterion', foreground: '4EC9B0' },
    { token: 'comment.note', foreground: '6A9955', fontStyle: 'italic' },
  ],
  colors: {
    'editor.background': '#1E1E1E',
  },
};
```

---

## Keyboard Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Cmd/Ctrl + S` | Copy share link | Global |
| `Cmd/Ctrl + E` | Export dialog | Global |
| `Cmd/Ctrl + K` | Command palette | Global |
| `Cmd/Ctrl + /` | Toggle comment | Editor |
| `Cmd/Ctrl + D` | Duplicate line | Editor |
| `Cmd/Ctrl + Shift + F` | Format document | Editor |
| `Cmd/Ctrl + 1-7` | Switch view (1=list, 2=kanban, etc.) | Global |
| `Cmd/Ctrl + +/-` | Zoom in/out | Preview |
| `Cmd/Ctrl + 0` | Reset zoom | Preview |
| `Escape` | Close dialog | Dialog |
| `?` | Show shortcuts | Global |

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Stacked tabs (Editor/Preview toggle) |
| Tablet | 768-1024px | Side-by-side, collapsible editor |
| Desktop | > 1024px | Full split pane with all features |

### Mobile Layout

```
┌─────────────────────────────┐
│  Header: Logo | Share | ⋮   │
├─────────────────────────────┤
│                             │
│    Active Panel             │
│    (Editor OR Preview)      │
│                             │
├─────────────────────────────┤
│  [Editor] [Preview]  Tabs   │
└─────────────────────────────┘
```

### Desktop Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Logo    Examples ▼    |    Share    Export    Settings  ⋮   │
├────────────────────────┼─────────────────────────────────────┤
│                        │  View: [List ▼]  Theme: [◐]  Zoom   │
│                        ├─────────────────────────────────────┤
│    Monaco Editor       │                                     │
│                        │         Preview Panel               │
│                        │                                     │
│                        │                                     │
├────────────────────────┤                                     │
│  Errors: 0 | Line 5:12 │                                     │
└────────────────────────┴─────────────────────────────────────┘
```

---

## Export Options

| Format | Method | Use Case |
|--------|--------|----------|
| **PNG** | html-to-image | Share on social, docs |
| **SVG** | html-to-image | Scalable graphics |
| **JSON** | taskml.toJSON() | Data interchange |
| **YAML** | taskml.toYAML() | Human-readable config |
| **TaskML** | Raw source | Backup, version control |
| **HTML** | Standalone render | Embed in pages |
| **Embed Code** | iframe snippet | Blog posts, docs |

---

## Performance Targets

| Metric | Target | Method |
|--------|--------|--------|
| Initial Load | < 2s | Code splitting, lazy Monaco |
| Parse Time | < 50ms | Web Worker (future) |
| Render Time | < 50ms | Memoized components |
| URL Update | < 10ms | Debounced, no blocking |
| Export PNG | < 500ms | html-to-image |

---

## Security Considerations

1. **No server-side storage** - All data in URL (client-only)
2. **CSP headers** - Prevent XSS via strict Content-Security-Policy
3. **Sanitized HTML** - Escape all user content in renders
4. **No eval()** - Monaco sandboxed, no arbitrary code execution
5. **URL length limits** - Graceful fallback for very large documents

---

## Analytics Events (Privacy-Friendly)

Using Plausible (no cookies, GDPR-compliant):

| Event | Properties |
|-------|------------|
| `page_view` | - |
| `view_change` | view_type |
| `export` | format |
| `share_link_copied` | - |
| `example_loaded` | example_id |
| `error_encountered` | error_type |

---

## Implementation Phases

### Phase 1: Foundation (Sprint 4.1-4.2)
- [ ] Project setup, dependencies
- [ ] App shell, header, responsive layout
- [ ] Resizable split panes
- [ ] Dark mode with system preference

### Phase 2: Editor (Sprint 4.3)
- [ ] Monaco integration
- [ ] TaskML language definition
- [ ] Syntax highlighting
- [ ] Auto-indent, bracket matching

### Phase 3: Preview (Sprint 4.4)
- [ ] Preview container
- [ ] View selector (all 7 views)
- [ ] Live render with debounce
- [ ] Theme sync (light/dark)

### Phase 4: Errors (Sprint 4.5)
- [ ] Error panel
- [ ] Line highlighting
- [ ] Click-to-error navigation

### Phase 5: Sharing (Sprint 4.6)
- [ ] URL state encoding (lz-string)
- [ ] Share dialog
- [ ] Copy link functionality
- [ ] Embed code generation

### Phase 6: Export (Sprint 4.7)
- [ ] Export dialog
- [ ] PNG/SVG export
- [ ] JSON/YAML export
- [ ] TaskML download

### Phase 7: Polish (Sprint 4.8)
- [ ] Keyboard shortcuts
- [ ] Command palette
- [ ] Examples library
- [ ] Performance optimization

---

## Example Documents

```typescript
// lib/examples.ts
export const EXAMPLES = {
  'getting-started': {
    title: 'Getting Started',
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

  'sprint-planning': {
    title: 'Sprint Planning',
    content: `@project E-Commerce App
@sprint Sprint 14

◐ User authentication !0 @alice ~8h
  [x] Design login flow
  [~] Implement JWT tokens
  [ ] Add OAuth providers

[ ] Shopping cart !1 @bob ~12h ->auth
  [ ] Add to cart functionality
  [ ] Cart persistence
  [ ] Quantity updates

⊘ Payment integration !0 @alice <-cart
  ○ Stripe setup pending API keys
`,
  },

  // ... more examples
};
```

---

## Dependencies to Add

```json
{
  "dependencies": {
    "lz-string": "^1.5.0",
    "react-resizable-panels": "^2.0.0",
    "lucide-react": "^0.300.0",
    "html-to-image": "^1.11.0",
    "zustand": "^4.5.0",
    "cmdk": "^0.2.0"
  }
}
```

---

## Success Metrics

1. **Usability**: User can create, preview, and share a task list in < 60 seconds
2. **Performance**: Lighthouse score > 90 on all metrics
3. **Reliability**: Zero data loss (URL always recoverable)
4. **Accessibility**: WCAG 2.1 AA compliant
5. **SEO**: First page for "TaskML playground" within 3 months
