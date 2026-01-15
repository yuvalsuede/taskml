# Contributing to TaskML

Thank you for your interest in contributing to TaskML! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment (see below)
4. Create a branch for your changes
5. Make your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 20.x or later (see `.nvmrc`)
- Bun 1.x or npm 10.x
- Git

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/taskml.git
cd taskml

# Install dependencies
bun install
# or
npm install

# Run tests to verify setup
bun test
# or
npm test
```

### Environment Setup

1. Copy `.env.example` to `.env` (if applicable)
2. Configure any required environment variables

## Project Structure

```
taskml/
├── packages/
│   ├── taskml-js/      # Core TypeScript library
│   ├── playground/     # Web playground (Next.js)
│   ├── vscode/         # VS Code extension
│   ├── obsidian/       # Obsidian plugin
│   ├── cli/            # Command-line interface
│   └── website/        # Marketing website
├── docs/               # Documentation
├── examples/           # Example TaskML files
└── spec/               # TaskML specification
```

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-timeline-view` - New features
- `fix/parser-error-handling` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/simplify-renderer` - Code refactoring

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(parser): add support for nested tasks`
- `fix(renderer): correct kanban column alignment`
- `docs(readme): update installation instructions`

## Submitting a Pull Request

1. Ensure all tests pass locally
2. Update documentation if needed
3. Add tests for new functionality
4. Push your branch to your fork
5. Open a pull request against `main`
6. Fill out the PR template completely
7. Wait for code review

### PR Requirements

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated (if applicable)
- [ ] Changelog updated (for significant changes)
- [ ] No merge conflicts

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use explicit types for function parameters and returns
- Avoid `any` - use `unknown` if type is truly unknown

### Formatting

We use Prettier for code formatting. Run before committing:

```bash
bun run format
# or
npm run format
```

### Linting

We use ESLint for code quality. Run before committing:

```bash
bun run lint
# or
npm run lint
```

## Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage
```

### Writing Tests

- Place tests next to source files: `foo.ts` -> `foo.test.ts`
- Use descriptive test names
- Test edge cases and error conditions
- Aim for high coverage on core functionality

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for public APIs
- Update the spec for language changes
- Include examples in documentation

## Questions?

- Open an issue for bugs or feature requests
- Join our Discord community for discussions
- Email hello@taskml.dev for other inquiries

Thank you for contributing to TaskML!
