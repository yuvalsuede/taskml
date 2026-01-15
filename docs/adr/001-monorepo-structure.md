# ADR 001: Monorepo Structure

## Status

Accepted

## Date

2026-01-15

## Context

TaskML consists of multiple related packages:
- Core library (parser, validator, renderers)
- VS Code extension
- Obsidian plugin
- CLI tools
- Web playground
- Marketing website
- Specification document

We needed to decide how to organize these packages across repositories.

## Decision

We chose a **monorepo structure** using Turborepo over separate repositories (polyrepo).

### Structure

```
taskml/
├── packages/           # Publishable packages
│   ├── core/          # @taskml/core
│   ├── spec/          # Specification
│   ├── cli/           # @taskml/cli
│   ├── vscode/        # taskml-vscode
│   ├── obsidian/      # obsidian-taskml
│   └── playground/    # Web playground
├── apps/              # Deployable applications
│   └── website/       # taskml.dev
└── docs/              # Documentation
```

## Rationale

### Advantages of Monorepo

1. **Atomic changes**: Cross-package refactors happen in a single PR
2. **Shared tooling**: One ESLint, Prettier, TypeScript config
3. **Dependency consistency**: All packages use same versions
4. **Faster iteration**: No need to publish/link during development
5. **Simplified CI**: Single workflow for all packages
6. **Easier onboarding**: Clone once, work on everything

### Why Turborepo

- **Incremental builds**: Only rebuilds what changed
- **Remote caching**: CI builds are fast
- **Task orchestration**: Parallel execution with dependencies
- **Zero config**: Works out of the box with npm/bun workspaces

### Considered Alternatives

1. **Polyrepo (separate repos)**:
   - Rejected due to coordination overhead
   - Cross-repo changes require multiple PRs
   - Version synchronization is manual

2. **Nx**:
   - More powerful but more complex
   - Turborepo sufficient for our scale

3. **Lerna**:
   - Legacy tool, less active development
   - Turborepo is the modern alternative

## Consequences

### Positive

- Single source of truth for all TaskML code
- Faster development velocity
- Consistent code style across packages
- Simplified dependency management

### Negative

- Larger repository size
- All contributors see all code (no access control)
- CI runs for all packages on changes (mitigated by Turbo caching)

### Neutral

- Each package maintains its own package.json
- Packages are published independently to npm
- VS Code and Obsidian extensions have separate release cycles

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Monorepo vs Polyrepo](https://monorepo.tools/)
