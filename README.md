<p align="center">
  <img src="https://taskml.dev/og-image.png" alt="TaskML" width="600" />
</p>

<h1 align="center">TaskML</h1>

<p align="center">
  <strong>The task markup language for AI agents</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/taskml"><img src="https://img.shields.io/npm/v/taskml.svg?style=flat-square&color=f97316" alt="npm version" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" /></a>
  <a href="https://github.com/yuvalsuede/taskml/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/yuvalsuede/taskml/ci.yml?style=flat-square" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/taskml"><img src="https://img.shields.io/npm/dm/taskml.svg?style=flat-square&color=10b981" alt="Downloads" /></a>
</p>

<p align="center">
  <a href="https://taskml.dev">Website</a> ·
  <a href="https://taskml.dev/playground">Playground</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="./packages/core/README.md">API Docs</a>
</p>

---

## What is TaskML?

TaskML is a simple, human-readable markup language for task management designed for **AI agents**, **LLMs**, and **automation tools**. Write tasks in plain text, render them as beautiful visualizations.

<p align="center">
  <img src="https://taskml.dev/demo.gif" alt="TaskML Demo" width="700" />
</p>

### Why TaskML?

| | |
|---|---|
| **Human-Readable** | Plain text that anyone can read and write |
| **AI-Native** | Designed for LLM agents to generate and parse |
| **Multiple Views** | List, Kanban, Timeline, Table, Tree, Graph |
| **Zero Dependencies** | Lightweight ~15KB core library |

---

## Quick Start

### Installation

```bash
npm install taskml
```

### Usage

```typescript
import { parse, render, getStyles } from 'taskml';

const taskml = `
@project Website Redesign

[x] Design homepage @alice
[~] Build API !1 @bob
  [x] Setup database
  [~] Create endpoints
[ ] Write tests
`;

// Parse and render
const { document } = parse(taskml);
const html = render(document, { view: 'list' });
const css = getStyles('list');

// Insert into DOM
document.getElementById('app').innerHTML = `<style>${css}</style>${html}`;
```

---

## Syntax

```taskml
@project Website Redesign    # Metadata
@sprint Q1 2025

== Design Phase ==            # Section header

[x] Create wireframes !1 @designer ~2d    # Completed, high priority
[~] Homepage mockup !0 @designer          # In progress, critical
  [x] Hero section                        # Nested subtask
  [~] Features grid
  [ ] Footer
[ ] Review designs                        # Pending

== Development ==

[!] Blocked by API @dev                   # Blocked status

- Note: Using Tailwind                    # Comment/note
```

### Task Statuses
| Syntax | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress |
| `[x]` | Completed |
| `[!]` | Blocked |

### Modifiers
| Syntax | Meaning |
|--------|---------|
| `!0` - `!3` | Priority (critical → low) |
| `@name` | Assignee |
| `~2d` | Time estimate |
| `#tag` | Tag |

---

## View Types

<table>
<tr>
<td align="center" width="33%">
<img src="https://taskml.dev/views/list.png" width="200" alt="List View" /><br />
<strong>List</strong><br />
<sub>Hierarchical task list</sub>
</td>
<td align="center" width="33%">
<img src="https://taskml.dev/views/kanban.png" width="200" alt="Kanban View" /><br />
<strong>Kanban</strong><br />
<sub>Status columns</sub>
</td>
<td align="center" width="33%">
<img src="https://taskml.dev/views/timeline.png" width="200" alt="Timeline View" /><br />
<strong>Timeline</strong><br />
<sub>Gantt-style chart</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<img src="https://taskml.dev/views/table.png" width="200" alt="Table View" /><br />
<strong>Table</strong><br />
<sub>Spreadsheet view</sub>
</td>
<td align="center" width="33%">
<img src="https://taskml.dev/views/tree.png" width="200" alt="Tree View" /><br />
<strong>Tree</strong><br />
<sub>Collapsible structure</sub>
</td>
<td align="center" width="33%">
<img src="https://taskml.dev/views/graph.png" width="200" alt="Graph View" /><br />
<strong>Graph</strong><br />
<sub>Network diagram</sub>
</td>
</tr>
</table>

---

## Try It Online

Visit **[taskml.dev/playground](https://taskml.dev/playground)** for an interactive editor with live preview.

---

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`taskml`](./packages/core) | Core parser and renderer | [![npm](https://img.shields.io/npm/v/taskml.svg?style=flat-square)](https://www.npmjs.com/package/taskml) |

---

## Documentation

- **[API Reference](./packages/core/README.md)** - Full API documentation
- **[Language Spec](./packages/spec)** - Complete syntax specification
- **[Contributing](./CONTRIBUTING.md)** - How to contribute
- **[Changelog](./CHANGELOG.md)** - Version history

---

## Use Cases

- **AI Agent Task Management** - Let LLMs generate and track tasks
- **Project Planning** - Quick task lists without heavy tools
- **Documentation** - Embed task lists in markdown
- **Automation** - Parse and process task files programmatically

---

## Contributing

We welcome contributions! See our [Contributing Guide](./CONTRIBUTING.md).

```bash
git clone https://github.com/yuvalsuede/taskml.git
cd taskml
bun install
bun run dev
```

---

## License

[MIT](./LICENSE) - Made with love by [Yuval Suede](https://github.com/yuvalsuede)
