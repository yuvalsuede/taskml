# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0-alpha.2] - 2025-01-18

### Added
- Core parser and renderer for TaskML syntax
- Multiple view types: list, kanban, timeline, table, tree, graph
- JSON/YAML interchange format support
- Browser bundle for CDN usage
- Interactive playground at taskml.dev
- Comprehensive TypeScript types
- Task statuses: pending `[ ]`, in-progress `[~]`, completed `[x]`, blocked `[!]`
- Priority levels: `!0` (critical) through `!3` (low)
- Assignee syntax: `@name`
- Time estimates: `~2d`, `~4h`
- Section headers: `== Section ==`
- Metadata: `@project`, `@sprint`, `@due`
- Nested subtasks with indentation
- Comments and notes with `-` prefix

### Infrastructure
- Monorepo structure with Turborepo
- CI/CD with GitHub Actions
- npm publishing workflow
- Codecov integration

## [0.1.0-alpha.1] - 2025-01-15

### Added
- Initial alpha release
- Basic parser implementation
- List view renderer

---

[Unreleased]: https://github.com/yuvalsuede/taskml/compare/v0.1.0-alpha.2...HEAD
[0.1.0-alpha.2]: https://github.com/yuvalsuede/taskml/compare/v0.1.0-alpha.1...v0.1.0-alpha.2
[0.1.0-alpha.1]: https://github.com/yuvalsuede/taskml/releases/tag/v0.1.0-alpha.1
