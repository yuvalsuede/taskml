import { describe, it, expect } from 'bun:test';
import { parse } from './parser';

describe('TaskML Parser', () => {
  describe('Directives', () => {
    it('should parse basic directives', () => {
      const input = `@project My Project
@sprint Sprint 1
@version 1.1
@author Alice`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document).not.toBeNull();
      expect(result.document?.directives.project).toBe('My Project');
      expect(result.document?.directives.sprint).toBe('Sprint 1');
      expect(result.document?.directives.version).toBe('1.1');
      expect(result.document?.directives.author).toBe('Alice');
    });

    it('should parse custom directives', () => {
      const input = `@x-team backend
@x-milestone Q1-2026`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.directives['x-team']).toBe('backend');
      expect(result.document?.directives['x-milestone']).toBe('Q1-2026');
    });
  });

  describe('Task Status', () => {
    it('should parse all status types', () => {
      const input = `[ ] Pending task
[~] In progress task
[x] Completed task
[!] Blocked task
[-] Cancelled task
[?] Review task`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks).toHaveLength(6);
      expect(result.document?.tasks[0].status).toBe('pending');
      expect(result.document?.tasks[1].status).toBe('in_progress');
      expect(result.document?.tasks[2].status).toBe('completed');
      expect(result.document?.tasks[3].status).toBe('blocked');
      expect(result.document?.tasks[4].status).toBe('cancelled');
      expect(result.document?.tasks[5].status).toBe('review');
    });
  });

  describe('Task Tokens', () => {
    it('should parse priority', () => {
      const input = `[ ] Critical task #p0
[ ] High priority #p1
[ ] Medium priority #p2
[ ] Low priority #p3`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].priority).toBe(0);
      expect(result.document?.tasks[1].priority).toBe(1);
      expect(result.document?.tasks[2].priority).toBe(2);
      expect(result.document?.tasks[3].priority).toBe(3);
    });

    it('should parse estimate', () => {
      const input = `[ ] Quick task ~2h
[ ] Day task ~1d
[ ] Long task ~5d`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].estimate).toBe('2h');
      expect(result.document?.tasks[1].estimate).toBe('1d');
      expect(result.document?.tasks[2].estimate).toBe('5d');
    });

    it('should parse assignee', () => {
      const input = `[ ] Task for Alice @alice
[ ] Task for Bob @bob`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].assignee).toBe('alice');
      expect(result.document?.tasks[1].assignee).toBe('bob');
    });

    it('should parse tags', () => {
      const input = `[ ] Backend work #backend #api
[ ] Frontend work #frontend #react`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].tags).toEqual(['backend', 'api']);
      expect(result.document?.tasks[1].tags).toEqual(['frontend', 'react']);
    });

    it('should parse due date', () => {
      const input = `[ ] Task due soon !2026-01-20
[ ] Task due later !2026-03-15`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].due).toBe('2026-01-20');
      expect(result.document?.tasks[1].due).toBe('2026-03-15');
    });

    it('should parse task ID', () => {
      const input = `[ ] Task with ID ^task-123
[ ] Another task ^auth-setup`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].id).toBe('task-123');
      expect(result.document?.tasks[1].id).toBe('auth-setup');
    });

    it('should parse multiple tokens together', () => {
      const input = `[ ] Implement auth #p0 ~8h @bob #backend !2026-01-20 ^auth-1`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      const task = result.document?.tasks[0];
      expect(task?.description).toContain('Implement auth');
      expect(task?.priority).toBe(0);
      expect(task?.estimate).toBe('8h');
      expect(task?.assignee).toBe('bob');
      expect(task?.tags).toContain('backend');
      expect(task?.due).toBe('2026-01-20');
      expect(task?.id).toBe('auth-1');
    });
  });

  describe('Hierarchical Tasks', () => {
    it('should parse subtasks', () => {
      const input = `[ ] Parent task
    [ ] Child task 1
    [ ] Child task 2`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks).toHaveLength(1);
      expect(result.document?.tasks[0].subtasks).toHaveLength(2);
      expect(result.document?.tasks[0].subtasks?.[0].description).toContain('Child task 1');
      expect(result.document?.tasks[0].subtasks?.[1].description).toContain('Child task 2');
    });

    it('should parse deeply nested tasks', () => {
      const input = `[ ] Level 0
    [ ] Level 1
        [ ] Level 2`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].subtasks).toHaveLength(1);
      expect(result.document?.tasks[0].subtasks?.[0].subtasks).toHaveLength(1);
    });

    it('should parse notes in tasks', () => {
      const input = `[ ] Task with notes
    - This is a note
    - Another note`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].notes).toHaveLength(2);
      expect(result.document?.tasks[0].notes?.[0]).toContain('This is a note');
    });
  });

  describe('Views', () => {
    it('should parse view fence', () => {
      const input = `[ ] Task 1
[ ] Task 2

---view:kanban`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.view?.type).toBe('kanban');
    });

    it('should parse view with options', () => {
      const input = `[ ] Task 1
---view:table columns=status,task,priority`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.view?.type).toBe('table');
      expect(result.document?.view?.options?.columns).toBe('status,task,priority');
    });
  });

  describe('Complete Document', () => {
    it('should parse a complete TaskML document', () => {
      const input = `@project TaskML Parser
@sprint Sprint 1
@version 1.1

[x] Project setup #p0 ~2h @alice ^setup
    [x] Initialize TypeScript project
    [x] Configure build tools
    - Used tsup for bundling

[~] Implement lexer #p0 ~4h @bob ^lexer
    [x] Define token types
    [~] Implement tokenizer
    [ ] Add error recovery

[ ] Implement parser #p0 ~8h @alice ^parser
    [ ] Build AST types
    [ ] Parse tasks

---view:kanban`;

      const result = parse(input);

      expect(result.errors).toHaveLength(0);
      expect(result.document).not.toBeNull();

      // Check directives
      expect(result.document?.directives.project).toBe('TaskML Parser');
      expect(result.document?.directives.sprint).toBe('Sprint 1');

      // Check tasks
      expect(result.document?.tasks).toHaveLength(3);

      // First task
      expect(result.document?.tasks[0].status).toBe('completed');
      expect(result.document?.tasks[0].id).toBe('setup');
      expect(result.document?.tasks[0].subtasks).toHaveLength(2);
      expect(result.document?.tasks[0].notes).toHaveLength(1);

      // Second task
      expect(result.document?.tasks[1].status).toBe('in_progress');
      expect(result.document?.tasks[1].subtasks).toHaveLength(3);

      // Third task
      expect(result.document?.tasks[2].status).toBe('pending');
      expect(result.document?.tasks[2].subtasks).toHaveLength(2);

      // View
      expect(result.document?.view?.type).toBe('kanban');
    });
  });

  describe('Sections', () => {
    it('should parse section headers', () => {
      const input = `== Sprint 1 ==
[ ] Task in sprint 1

== Sprint 2 ==
[ ] Task in sprint 2`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.sections).toHaveLength(2);
      expect(result.document?.sections?.[0].title).toBe('Sprint 1');
      expect(result.document?.sections?.[0].tasks).toHaveLength(1);
      expect(result.document?.sections?.[1].title).toBe('Sprint 2');
      expect(result.document?.sections?.[1].tasks).toHaveLength(1);
    });

    it('should parse section without trailing ==', () => {
      const input = `== My Section
[ ] Task in section`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.sections).toHaveLength(1);
      expect(result.document?.sections?.[0].title).toBe('My Section');
    });

    it('should track section level', () => {
      const input = `== Level 2 ==
[ ] Task

=== Level 3 ===
[ ] Another task`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.sections?.[0].level).toBe(2);
      expect(result.document?.sections?.[1].level).toBe(3);
    });

    it('should keep root tasks separate from section tasks', () => {
      const input = `[ ] Root task

== Section 1 ==
[ ] Section task`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks).toHaveLength(1);
      expect(result.document?.tasks[0].description).toContain('Root task');
      expect(result.document?.sections).toHaveLength(1);
      expect(result.document?.sections?.[0].tasks).toHaveLength(1);
    });

    it('should handle empty sections', () => {
      const input = `== Empty Section ==

== Section with tasks ==
[ ] A task`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      // Empty section should not be included
      expect(result.document?.sections).toHaveLength(1);
      expect(result.document?.sections?.[0].title).toBe('Section with tasks');
    });
  });

  describe('Includes', () => {
    it('should parse include directives', () => {
      const input = `< ./tasks/sprint1.taskml
< ../common/templates.taskml

[ ] Local task`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.includes).toHaveLength(2);
      expect(result.document?.includes?.[0].path).toBe('./tasks/sprint1.taskml');
      expect(result.document?.includes?.[1].path).toBe('../common/templates.taskml');
    });

    it('should track include line numbers', () => {
      const input = `< file1.taskml
[ ] Task
< file2.taskml`;

      const result = parse(input);
      expect(result.document?.includes?.[0].line).toBe(1);
      expect(result.document?.includes?.[1].line).toBe(3);
    });

    it('should handle includes with spaces in path', () => {
      const input = `< ./path/with spaces/file.taskml`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.document?.includes?.[0].path).toBe('./path/with spaces/file.taskml');
    });
  });

  describe('Canonical order validation', () => {
    it('should not warn on correct token order', () => {
      const input = `[ ] Task description #p0 ~4h @alice #backend !2026-01-15 ^task-1`;
      const result = parse(input, { strict: true });
      expect(result.warnings).toBeUndefined();
    });

    it('should warn when priority comes after estimate in strict mode', () => {
      const input = `[ ] Task ~4h #p0`;
      const result = parse(input, { strict: true });
      expect(result.warnings).toBeDefined();
      expect(result.warnings).toHaveLength(1);
      expect(result.warnings?.[0].message).toContain('priority');
      expect(result.warnings?.[0].message).toContain('estimate');
    });

    it('should warn when task ID comes before due date in strict mode', () => {
      const input = `[ ] Task ^task-1 !2026-01-15`;
      const result = parse(input, { strict: true });
      expect(result.warnings).toBeDefined();
      expect(result.warnings?.[0].message).toContain('due date');
    });

    it('should not warn in non-strict mode', () => {
      const input = `[ ] Task ~4h #p0`;
      const result = parse(input); // non-strict by default
      expect(result.warnings).toBeUndefined();
    });

    it('should still parse correctly despite order warnings', () => {
      const input = `[ ] Task ~4h #p0 @bob`;
      const result = parse(input, { strict: true });
      expect(result.errors).toHaveLength(0);
      expect(result.document?.tasks[0].estimate).toBe('4h');
      expect(result.document?.tasks[0].priority).toBe(0);
      expect(result.document?.tasks[0].assignee).toBe('bob');
    });
  });

  describe('Comment preservation', () => {
    it('should capture comments from TaskML source', () => {
      const result = parse(`// Header comment
@project Test

// Before task
[ ] Do something
// After task
`);

      expect(result.errors).toHaveLength(0);
      expect(result.document?.comments).toBeDefined();
      expect(result.document?.comments).toHaveLength(3);
      expect(result.document?.comments?.[0].text).toBe('Header comment');
      expect(result.document?.comments?.[0].line).toBe(1);
    });

    it('should preserve comment line numbers', () => {
      const result = parse(`[ ] Task 1
// Comment on line 2
[ ] Task 2
// Comment on line 4`);

      expect(result.document?.comments).toHaveLength(2);
      expect(result.document?.comments?.[0].line).toBe(2);
      expect(result.document?.comments?.[1].line).toBe(4);
    });

    it('should handle documents without comments', () => {
      const result = parse(`[ ] Task without comments`);

      expect(result.document?.comments).toBeUndefined();
    });
  });
});
