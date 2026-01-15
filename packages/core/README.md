# @taskml/core

The official TaskML parser and renderer library for TypeScript/JavaScript.

## Installation

```bash
npm install @taskml/core
# or
bun add @taskml/core
# or
pnpm add @taskml/core
```

## Quick Start

```typescript
import { parse, render } from '@taskml/core';

const taskml = `
@project My Project
@sprint Sprint 1

[x] Set up project #p0
[~] Implement feature #p1 ~4h @alice
[ ] Write tests #p2
`;

// Parse TaskML to AST
const doc = parse(taskml);

// Render to different formats
const html = render(doc, { format: 'html' });
const markdown = render(doc, { format: 'markdown' });
const json = render(doc, { format: 'json' });
```

## API

### `parse(input: string): Document`

Parses a TaskML string into an AST.

```typescript
const doc = parse(taskmlString);

console.log(doc.directives); // { project: 'My Project', sprint: 'Sprint 1' }
console.log(doc.tasks);      // Array of Task objects
```

### `render(doc: Document, options?: RenderOptions): string`

Renders a Document to various output formats.

```typescript
// HTML output
const html = render(doc, { format: 'html', view: 'kanban' });

// Markdown output
const md = render(doc, { format: 'markdown' });

// JSON output
const json = render(doc, { format: 'json' });
```

### Types

```typescript
interface Document {
  version: string;
  directives: Record<string, string>;
  tasks: Task[];
  view?: ViewConfig;
}

interface Task {
  id?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled' | 'review';
  description: string;
  priority?: number;
  estimate?: string;
  assignee?: string;
  tags?: string[];
  due?: string;
  subtasks?: Task[];
  criteria?: Criterion[];
}

type ViewType = 'list' | 'kanban' | 'tree' | 'timeline' | 'table' | 'graph' | 'summary';
```

## Views

TaskML supports multiple visualization views:

| View | Description |
|------|-------------|
| `list` | Simple list (default) |
| `kanban` | Columns by status |
| `tree` | Hierarchical tree |
| `timeline` | Gantt-style timeline |
| `table` | Tabular format |
| `graph` | Dependency graph |
| `summary` | Progress summary |

```typescript
const kanban = render(doc, { format: 'html', view: 'kanban' });
const timeline = render(doc, { format: 'html', view: 'timeline' });
```

## License

MIT
