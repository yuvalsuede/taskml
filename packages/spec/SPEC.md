# TaskML Language Specification v1.1

## 1. Introduction

TaskML (Task Markup Language) is a lightweight, human-readable text format designed for AI agent task visualization and management. It enables AI agents to represent task state in a format that is both machine-parseable and human-friendly.

### 1.1 Design Goals

1. **Human-readable** - Easy to read without tooling
2. **Machine-parseable** - Simple grammar for reliable parsing
3. **Minimal syntax** - Learn in minutes
4. **Flexible** - Supports various project methodologies
5. **Extensible** - Custom metadata without breaking compatibility

### 1.2 Use Cases

- AI agent task progress reporting
- Project planning and tracking
- Sprint management
- Collaborative task boards
- Documentation of work in progress

## 2. Document Structure

A TaskML document consists of:
1. **Directives** - Document-level metadata (optional)
2. **Tasks** - The primary content
3. **Views** - Rendering hints (optional)

```
@directive value
@another-directive value

[ ] Task one
[x] Task two

---view:kanban
```

## 3. Directives

Directives provide document-level metadata. They start with `@` and appear at the top of the document.

### 3.1 Standard Directives

| Directive | Description | Example |
|-----------|-------------|---------|
| `@project` | Project name | `@project TaskML` |
| `@sprint` | Current sprint | `@sprint Sprint 1` |
| `@version` | TaskML version | `@version 1.1` |
| `@author` | Document author | `@author Alice` |
| `@created` | Creation date | `@created 2026-01-15` |
| `@updated` | Last update | `@updated 2026-01-15` |

### 3.2 Custom Directives

Custom directives use `@x-` prefix:

```taskml
@x-team backend
@x-milestone Q1-2026
```

## 4. Tasks

Tasks are the core of TaskML. Each task occupies one or more lines.

### 4.1 Basic Syntax

```
[status] Task description #tokens
```

### 4.2 Status Indicators

| Syntax | Status | Description |
|--------|--------|-------------|
| `[ ]` | Pending | Not started |
| `[~]` | In Progress | Currently being worked on |
| `[x]` | Completed | Finished |
| `[!]` | Blocked | Cannot proceed |
| `[-]` | Cancelled | No longer needed |
| `[?]` | Review | Needs verification |

### 4.3 Task Tokens

Tokens provide inline metadata. They can appear anywhere in the task description.

| Token | Format | Description | Example |
|-------|--------|-------------|---------|
| Priority | `#p0` - `#p3` | Priority level (0=critical) | `#p0` |
| Estimate | `~Nh` or `~Nd` | Time estimate | `~4h`, `~2d` |
| Assignee | `@name` | Assigned person | `@alice` |
| Tag | `#tag` | Category tag | `#frontend` |
| Due | `!YYYY-MM-DD` | Due date | `!2026-01-20` |
| ID | `^id` | Unique identifier | `^task-123` |

### 4.4 Examples

```taskml
[ ] Implement user authentication #p0 ~8h @bob #backend
[~] Write unit tests #p1 ~2h @alice
[x] Set up CI/CD pipeline #p0 ~4h @bob !2026-01-15
[!] Deploy to production #p0 - waiting for security review
```

## 5. Hierarchical Tasks

Tasks can be nested using indentation (2 or 4 spaces).

### 5.1 Subtasks

```taskml
[ ] Build authentication system #p0
    [ ] Design database schema ~2h
    [~] Implement login endpoint ~4h
    [ ] Implement logout endpoint ~2h
    [ ] Add session management ~4h
```

### 5.2 Task Groups

Use `-` prefix for non-task items (notes, context):

```taskml
[ ] Implement search feature #p1
    - Must support full-text search
    - Consider Elasticsearch vs PostgreSQL
    [ ] Design search API ~2h
    [ ] Implement indexing ~4h
```

### 5.3 Deep Nesting

```taskml
[ ] Project setup
    [ ] Backend
        [ ] Initialize Node project
        [ ] Configure TypeScript
    [ ] Frontend
        [ ] Create React app
        [ ] Set up routing
```

## 6. Views

Views are rendering hints that tell renderers how to display the tasks.

### 6.1 View Syntax

Views are declared with a fence:

```taskml
---view:viewname
```

Or with options:

```taskml
---view:viewname option1=value option2=value
```

### 6.2 Standard Views

| View | Description |
|------|-------------|
| `list` | Simple list (default) |
| `kanban` | Columns by status |
| `tree` | Hierarchical tree |
| `timeline` | Gantt-style timeline |
| `table` | Tabular format |
| `graph` | Dependency graph |
| `summary` | Progress summary |

### 6.3 View Examples

```taskml
---view:kanban columns=pending,in_progress,completed

---view:timeline start=2026-01-01 end=2026-03-31

---view:table columns=status,task,priority,assignee,estimate
```

## 7. Agent Context

TaskML supports AI agent-specific metadata.

### 7.1 Agent Directive

```taskml
@agent claude-3
@agent-id session-abc123
```

### 7.2 Context Block

```taskml
---context
{
  "session_id": "abc123",
  "model": "claude-3",
  "started_at": "2026-01-15T10:00:00Z"
}
---
```

### 7.3 Handoff Block

For agent-to-agent task handoff:

```taskml
---handoff
from: claude-agent-1
to: claude-agent-2
reason: "Specialized knowledge needed"
context: {...}
---
```

## 8. Verification

Tasks can include acceptance criteria for verification.

### 8.1 Criteria Syntax

```taskml
[x] Implement login #p0
    ✓ Users can log in with email/password
    ✓ Invalid credentials show error
    ✗ Session persists across browser refresh
```

| Symbol | Meaning |
|--------|---------|
| `✓` or `[✓]` | Criterion verified |
| `✗` or `[✗]` | Criterion failed |
| `○` or `[○]` | Criterion pending |

### 8.2 Evidence

```taskml
[x] API returns correct response
    ✓ Status 200 for valid request
      evidence: "curl output shows 200 OK"
    ✓ Returns JSON content-type
```

## 9. Dependencies

Tasks can declare dependencies on other tasks.

### 9.1 Dependency Syntax

```taskml
[ ] Deploy to production ^deploy-1
    depends: ^setup-ci, ^security-review

[x] Set up CI/CD ^setup-ci
[x] Security review ^security-review
```

### 9.2 Blocked Dependencies

```taskml
[!] Cannot start until ^auth-complete
    blocked-by: ^auth-complete
```

## 10. Comments

Comments start with `//` and are ignored by parsers.

```taskml
// This is a comment
[ ] Task one
// [ ] This task is commented out
[ ] Task two
```

## 11. Complete Example

```taskml
@project TaskML Parser
@sprint Sprint 1: Foundation
@version 1.1
@author Alice
@created 2026-01-15

// Core Parser Implementation
[x] Project setup #p0 ~2h @alice ^setup
    [x] Initialize TypeScript project
    [x] Configure build tools
    [x] Set up testing framework

[~] Implement lexer #p0 ~4h @bob ^lexer
    depends: ^setup
    [x] Define token types
    [~] Implement tokenizer
        - Handle multi-line strings
        - Support Unicode
    [ ] Add error recovery

[ ] Implement parser #p0 ~8h @alice ^parser
    depends: ^lexer
    [ ] Build AST types
    [ ] Parse directives
    [ ] Parse tasks
    [ ] Parse views
    ○ All tokens correctly parsed
    ○ Error messages are helpful

[!] Write documentation #p1 ~4h ^docs
    blocked-by: ^parser
    - Waiting for API to stabilize

---view:kanban columns=pending,in_progress,blocked,completed
```

## 12. MIME Type

TaskML documents use:
- File extension: `.taskml` or `.tml`
- MIME type: `text/taskml`

## 13. Grammar (EBNF)

```ebnf
document     = { directive } { task } [ view_fence ] ;
directive    = "@" identifier " " value newline ;
task         = indent status " " description { token } newline { subtask } ;
status       = "[ ]" | "[~]" | "[x]" | "[!]" | "[-]" | "[?]" ;
token        = priority | estimate | assignee | tag | due | id ;
priority     = "#p" digit ;
estimate     = "~" number ("h" | "d") ;
assignee     = "@" identifier ;
tag          = "#" identifier ;
due          = "!" date ;
id           = "^" identifier ;
subtask      = indent indent task ;
view_fence   = "---view:" identifier { option } ;
option       = identifier "=" value ;
```

## 14. Versioning

This specification follows semantic versioning:
- **Major**: Breaking changes to syntax
- **Minor**: New features, backward compatible
- **Patch**: Clarifications, typo fixes

Current version: **1.1.0**

## 15. License

This specification is released under the MIT License.

---

*TaskML Specification v1.1 - January 2026*
