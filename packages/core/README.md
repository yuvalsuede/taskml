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

### Browser (CDN)

```html
<script src="https://unpkg.com/@taskml/core/dist/index.browser.js"></script>
<script>
  const { parse, toJSON, toYAML } = TaskML;
  const doc = parse('[x] My completed task #done');
  console.log(doc.tasks[0].status); // 'completed'
</script>
```

## Quick Start

```typescript
import { parse, toJSON, toYAML } from '@taskml/core';

const taskml = `
@project My Project
@sprint Sprint 1

[x] Set up project #p0
[~] Implement feature #p1 ~4h @alice
[ ] Write tests #p2
`;

// Parse TaskML to AST
const result = parse(taskml);
const doc = result.document;

// Check for errors
if (result.errors.length > 0) {
  console.error('Parse errors:', result.errors);
}

// Convert to JSON
const json = toJSON(doc);

// Convert to YAML
const yaml = toYAML(doc);
```

## API

### `parse(input: string, options?: ParseOptions): ParseResult`

Parses a TaskML string into an AST.

```typescript
const result = parse(taskmlString);

if (result.document) {
  console.log(result.document.directives); // { project: 'My Project' }
  console.log(result.document.tasks);      // Array of Task objects
}
console.log(result.errors); // Array of parse errors
```

### `parseOrThrow(input: string, options?: ParseOptions): Document`

Parses TaskML and throws if there are errors.

```typescript
try {
  const doc = parseOrThrow(taskmlString);
  console.log(doc.tasks);
} catch (e) {
  console.error('Parse failed:', e.message);
}
```

### `validate(input: string): ParseError[]`

Validate TaskML without fully parsing.

```typescript
const errors = validate(taskmlString);
if (errors.length === 0) {
  console.log('Valid!');
}
```

### `tokenize(input: string): LexerResult`

Low-level tokenization for advanced use cases.

```typescript
const { tokens, errors } = tokenize(taskmlString);
tokens.forEach(token => {
  console.log(token.type, token.value);
});
```

## Interchange Formats

### JSON

```typescript
import { toJSON, fromJSON, stringifyJSON, parseJSON } from '@taskml/core';

// Document -> JSON object
const json = toJSON(doc);

// JSON object -> Document
const doc = fromJSON(json);

// Document -> JSON string
const jsonString = stringifyJSON(doc);

// JSON string -> Document
const doc = parseJSON(jsonString);
```

### YAML

```typescript
import { toYAML, fromYAML, stringifyYAML, parseYAMLString } from '@taskml/core';

// Document -> YAML string
const yaml = toYAML(doc);

// YAML string -> Document
const doc = fromYAML(yaml);
```

## Types

```typescript
interface Document {
  version: string;
  directives: Record<string, string>;
  tasks: Task[];
  view?: ViewConfig;
  agentContext?: AgentContext;
  handoff?: HandoffInfo;
}

interface Task {
  id?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled' | 'review';
  description: string;
  priority?: number;     // 0-3 (#p0 = critical, #p3 = low)
  estimate?: string;     // e.g., "4h", "2d"
  assignee?: string;
  tags?: string[];
  due?: string;          // ISO date
  dependsOn?: string[];  // task IDs
  blockedBy?: string[];  // task IDs
  subtasks?: Task[];
  criteria?: Criterion[];
  notes?: string[];
}

interface Criterion {
  description: string;
  status: 'pending' | 'verified' | 'failed';
  evidence?: string;
}

type ViewType = 'list' | 'kanban' | 'tree' | 'timeline' | 'table' | 'graph' | 'summary';
```

## TaskML Syntax

```taskml
@project My Project      // Directive
@sprint Sprint 1

// Tasks with status
[ ] Pending task
[~] In progress
[x] Completed
[!] Blocked
[-] Cancelled
[?] In review

// Task metadata
[~] Feature work #p1 ~4h @alice #backend !2024-12-31 ^task-1
    // #p1 = priority, ~4h = estimate, @alice = assignee
    // #backend = tag, !2024-12-31 = due date, ^task-1 = ID

// Subtasks (indented)
[ ] Parent task
    [x] Completed subtask
    [ ] Pending subtask

// Verification criteria
[~] Implement auth
    [✓] Unit tests pass
    [○] Integration tests pending
    [✗] E2E tests failed

// Dependencies
[!] Blocked task
    blocked-by: ^other-task, ^another-task

// Notes
[ ] Task with notes
    - First note
    - Second note
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

```taskml
---view:kanban
groupBy=assignee
---
```

## License

MIT
