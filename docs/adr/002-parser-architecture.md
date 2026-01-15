# ADR 002: Parser Architecture

## Status

Accepted

## Date

2026-01-15

## Context

We need to implement a parser for TaskML v1.1 that:
- Tokenizes the input text
- Builds an Abstract Syntax Tree (AST)
- Provides helpful error messages with line/column info
- Recovers from errors to report multiple issues
- Supports round-trip parsing (preserve comments, formatting)

## Decision

We'll implement a **hand-written recursive descent parser** with a separate lexer phase.

### Architecture

```
Input String
     │
     ▼
┌─────────┐
│  Lexer  │  → Token[]
└─────────┘
     │
     ▼
┌─────────┐
│ Parser  │  → AST (Document)
└─────────┘
     │
     ▼
┌─────────┐
│Validator│  → ParseError[]
└─────────┘
```

### File Structure

```
packages/core/src/
├── lexer/
│   ├── tokens.ts      # Token type definitions
│   ├── lexer.ts       # Tokenizer implementation
│   └── index.ts
├── parser/
│   ├── ast.ts         # AST node types (extends types.ts)
│   ├── parser.ts      # Recursive descent parser
│   └── index.ts
├── errors/
│   ├── codes.ts       # Error code constants
│   ├── messages.ts    # Error message templates
│   └── index.ts
├── interchange/
│   ├── json.ts        # toJSON / fromJSON
│   ├── yaml.ts        # toYAML / fromYAML
│   └── index.ts
├── types.ts           # Public type exports
└── index.ts           # Main entry point
```

## Token Types

Based on the spec, we need these token types:

```typescript
enum TokenType {
  // Structural
  NEWLINE,
  INDENT,
  DEDENT,
  EOF,

  // Directives
  DIRECTIVE,           // @project, @sprint, etc.

  // Tasks
  STATUS_PENDING,      // [ ]
  STATUS_IN_PROGRESS,  // [~]
  STATUS_COMPLETED,    // [x]
  STATUS_BLOCKED,      // [!]
  STATUS_CANCELLED,    // [-]
  STATUS_REVIEW,       // [?]

  // Tokens (inline metadata)
  PRIORITY,            // #p0 - #p3
  ESTIMATE,            // ~4h, ~2d
  ASSIGNEE,            // @alice
  TAG,                 // #backend
  DUE_DATE,            // !2026-01-15
  ID,                  // ^task-123

  // Verification
  CRITERION_VERIFIED,  // ✓ or [✓]
  CRITERION_FAILED,    // ✗ or [✗]
  CRITERION_PENDING,   // ○ or [○]

  // Special lines
  COMMENT,             // // ...
  NOTE_PREFIX,         // - (for notes)
  DEPENDS,             // depends:
  BLOCKED_BY,          // blocked-by:
  EVIDENCE,            // evidence:

  // Blocks
  VIEW_FENCE,          // ---view:
  CONTEXT_FENCE,       // ---context
  HANDOFF_FENCE,       // ---handoff
  FENCE_END,           // ---

  // Content
  TEXT,                // Plain text content
  COLON,               // :
  EQUALS,              // =
  COMMA,               // ,
}
```

## Parsing Strategy

### 1. Lexer Phase

The lexer:
1. Tracks line/column position
2. Handles indentation (emits INDENT/DEDENT tokens)
3. Recognizes all token patterns
4. Preserves comments for round-trip

### 2. Parser Phase

Recursive descent with these entry points:

```
parseDocument()
  ├── parseDirectives()
  ├── parseTasks()
  │     ├── parseTask()
  │     │     ├── parseStatus()
  │     │     ├── parseDescription()
  │     │     ├── parseTokens()
  │     │     └── parseSubtasks() (recursive)
  │     └── parseNote()
  └── parseView()
```

### 3. Error Recovery

On parse error:
1. Record the error with location
2. Skip to next newline
3. Continue parsing
4. Return all errors at end

## Token Patterns (Regex)

```typescript
const PATTERNS = {
  directive: /^@([\w-]+)\s+(.+)$/,
  status: /^\[([ x~!?\-])\]/,
  priority: /#p([0-3])/,
  estimate: /~(\d+)([hd])/,
  assignee: /@(\w+)/,
  tag: /#(\w+)/,
  dueDate: /!(\d{4}-\d{2}-\d{2})/,
  taskId: /\^([\w-]+)/,
  comment: /^\/\//,
  viewFence: /^---view:(\w+)/,
  contextFence: /^---context/,
  handoffFence: /^---handoff/,
  fenceEnd: /^---$/,
};
```

## Consequences

### Positive

- Full control over error messages
- No external parser dependencies
- Easy to extend for new syntax
- Can preserve formatting for round-trip

### Negative

- More code to maintain than parser generators
- Must handle edge cases manually

### Neutral

- Performance should be excellent (simple grammar)
- Tests will be comprehensive

## Implementation Order

1. Token types and lexer skeleton
2. Basic task status parsing
3. Task tokens (priority, estimate, etc.)
4. Hierarchical tasks (indentation)
5. Directives
6. Views and special blocks
7. Error recovery
8. JSON/YAML interchange
9. Tests throughout

## References

- [TaskML Spec v1.1](../packages/spec/SPEC.md)
- [Crafting Interpreters](https://craftinginterpreters.com/) - Parser patterns
