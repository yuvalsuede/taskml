# TaskML Specification

This directory contains the official TaskML language specification.

## What is TaskML?

TaskML (Task Markup Language) is a text-based protocol designed for AI agent task visualization. It provides a human-readable format that AI agents can generate and parse, enabling standardized task management across different AI systems.

## Specification

- [SPEC.md](./SPEC.md) - Full language specification (v1.1)

## Quick Example

```taskml
@project TaskML Development
@sprint Sprint 1: Core Parser

[x] Set up project structure #p0
    - Initialize TypeScript project
    - Configure build system
[ ] Implement lexer #p0 ~4h @alice
    - Tokenize input
    - Handle edge cases
[~] Write parser tests #p1 ~2h
```

## Key Features

- **Simple syntax** - Easy to read and write
- **Status tracking** - `[ ]` pending, `[~]` in progress, `[x]` completed
- **Metadata** - Priorities, estimates, assignees
- **Hierarchical** - Nested tasks and subtasks
- **Multiple views** - List, Kanban, Tree, Timeline, Graph

## License

MIT
