# TaskML

[![npm version](https://img.shields.io/npm/v/taskml.svg)](https://www.npmjs.com/package/taskml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/yuvalsuede/taskml/actions/workflows/ci.yml/badge.svg)](https://github.com/yuvalsuede/taskml/actions/workflows/ci.yml)

**The task markup language for AI agents.**

TaskML is a simple, human-readable markup language for task management that's perfect for AI agents, LLMs, and automation tools. Write tasks in plain text, render them as beautiful visualizations.

## Why TaskML?

- **Human-readable** - Plain text that anyone can read and write
- **AI-native** - Designed for LLM agents to generate and parse
- **Multiple views** - List, Kanban, Timeline, Table, Tree, and Graph
- **Zero dependencies** - Lightweight core library

## Quick Example

```taskml
@project Website Redesign
@sprint Q1 2025

== Design Phase ==
[x] Create wireframes !1 @designer ~2d
[x] Design system setup @designer
[~] Homepage mockup !0 @designer
  [x] Hero section
  [~] Features grid
  [ ] Footer

== Development ==
[ ] Set up Next.js !2 @dev
[ ] Implement components !1 @dev
```

**Syntax at a glance:**
- `[x]` completed, `[~]` in progress, `[ ]` pending, `[!]` blocked
- `!0` critical, `!1` high, `!2` medium, `!3` low priority
- `@name` assignee
- `~2d` time estimate
- `== Section ==` group tasks

## Installation

```bash
npm install taskml
```

## Usage

```typescript
import { parse, render, getStyles } from 'taskml';

const taskml = `
[x] Design homepage @alice
[~] Build API !1 @bob
[ ] Write tests
`;

// Parse and render
const { document } = parse(taskml);
const html = render(document, { view: 'list' });
const css = getStyles('list');
```

## View Types

| View | Description |
|------|-------------|
| `list` | Hierarchical task list with nested subtasks |
| `kanban` | Columns grouped by status |
| `timeline` | Gantt-style timeline based on estimates |
| `table` | Spreadsheet view with sortable columns |
| `tree` | Collapsible tree structure |
| `graph` | Network diagram of dependencies |

## Try It

Visit **[taskml.dev](https://taskml.dev)** for an interactive playground.

## Packages

| Package | Description |
|---------|-------------|
| [`taskml`](./packages/core) | Core parser and renderer |
| [`@taskml/playground`](./packages/playground) | Interactive web playground |

## Documentation

- [Core Library API](./packages/core/README.md) - Full API reference
- [Language Specification](./packages/spec) - Complete syntax specification
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

```bash
# Clone the repo
git clone https://github.com/yuvalsuede/taskml.git
cd taskml

# Install dependencies
bun install

# Run development
bun run dev
```

## License

[MIT](./LICENSE) - Yuval Suede
