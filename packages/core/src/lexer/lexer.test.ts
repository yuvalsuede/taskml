import { describe, it, expect } from 'bun:test';
import { tokenize, TokenType } from './index';

describe('TaskML Lexer', () => {
  describe('Basic tokens', () => {
    it('should tokenize empty input', () => {
      const result = tokenize('');
      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(1);
      expect(result.tokens[0].type).toBe(TokenType.EOF);
    });

    it('should tokenize newlines', () => {
      const result = tokenize('\n\n');
      const types = result.tokens.map(t => t.type);
      expect(types.filter(t => t === TokenType.NEWLINE)).toHaveLength(2);
    });

    it('should handle CRLF line endings', () => {
      const result = tokenize('[ ] Task\r\n[ ] Task 2');
      const types = result.tokens.map(t => t.type);
      expect(types).toContain(TokenType.NEWLINE);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Directives', () => {
    it('should tokenize directives', () => {
      const result = tokenize('@project My Project');
      const directive = result.tokens.find(t => t.type === TokenType.DIRECTIVE);
      expect(directive).toBeDefined();
      expect(directive?.value).toBe('project');
      expect(directive?.raw).toBe('My Project');
    });

    it('should tokenize multiple directives', () => {
      const result = tokenize('@project Test\n@version 1.1\n@author Alice');
      const directives = result.tokens.filter(t => t.type === TokenType.DIRECTIVE);
      expect(directives).toHaveLength(3);
      expect(directives[0].value).toBe('project');
      expect(directives[1].value).toBe('version');
      expect(directives[2].value).toBe('author');
    });

    it('should tokenize custom directives', () => {
      const result = tokenize('@x-custom custom-value');
      const directive = result.tokens.find(t => t.type === TokenType.DIRECTIVE);
      expect(directive?.value).toBe('x-custom');
      expect(directive?.raw).toBe('custom-value');
    });
  });

  describe('Task status', () => {
    it('should tokenize pending status', () => {
      const result = tokenize('[ ] Task');
      expect(result.tokens.some(t => t.type === TokenType.STATUS_PENDING)).toBe(true);
    });

    it('should tokenize in-progress status', () => {
      const result = tokenize('[~] Task');
      expect(result.tokens.some(t => t.type === TokenType.STATUS_IN_PROGRESS)).toBe(true);
    });

    it('should tokenize completed status', () => {
      const result = tokenize('[x] Task');
      expect(result.tokens.some(t => t.type === TokenType.STATUS_COMPLETED)).toBe(true);
    });

    it('should tokenize blocked status', () => {
      const result = tokenize('[!] Task');
      expect(result.tokens.some(t => t.type === TokenType.STATUS_BLOCKED)).toBe(true);
    });

    it('should tokenize cancelled status', () => {
      const result = tokenize('[-] Task');
      expect(result.tokens.some(t => t.type === TokenType.STATUS_CANCELLED)).toBe(true);
    });

    it('should tokenize review status', () => {
      const result = tokenize('[?] Task');
      expect(result.tokens.some(t => t.type === TokenType.STATUS_REVIEW)).toBe(true);
    });

    it('should not tokenize invalid status', () => {
      const result = tokenize('[z] Task');
      expect(result.tokens.some(t => t.type === TokenType.STATUS_PENDING)).toBe(false);
    });
  });

  describe('Priority', () => {
    it('should tokenize priority #p0', () => {
      const result = tokenize('[ ] Task #p0');
      const priority = result.tokens.find(t => t.type === TokenType.PRIORITY);
      expect(priority).toBeDefined();
      expect(priority?.value).toBe('0');
    });

    it('should tokenize priority #p1', () => {
      const result = tokenize('[ ] Task #p1');
      const priority = result.tokens.find(t => t.type === TokenType.PRIORITY);
      expect(priority?.value).toBe('1');
    });

    it('should tokenize priority #p2', () => {
      const result = tokenize('[ ] Task #p2');
      const priority = result.tokens.find(t => t.type === TokenType.PRIORITY);
      expect(priority?.value).toBe('2');
    });

    it('should tokenize priority #p3', () => {
      const result = tokenize('[ ] Task #p3');
      const priority = result.tokens.find(t => t.type === TokenType.PRIORITY);
      expect(priority?.value).toBe('3');
    });

    it('should not tokenize invalid priority #p4', () => {
      const result = tokenize('[ ] Task #p4');
      const priority = result.tokens.find(t => t.type === TokenType.PRIORITY);
      expect(priority).toBeUndefined();
      // Should be treated as a tag
      const tag = result.tokens.find(t => t.type === TokenType.TAG && t.value === 'p4');
      expect(tag).toBeDefined();
    });
  });

  describe('Estimate', () => {
    it('should tokenize hour estimate', () => {
      const result = tokenize('[ ] Task ~4h');
      const estimate = result.tokens.find(t => t.type === TokenType.ESTIMATE);
      expect(estimate).toBeDefined();
      expect(estimate?.value).toBe('4h');
    });

    it('should tokenize day estimate', () => {
      const result = tokenize('[ ] Task ~2d');
      const estimate = result.tokens.find(t => t.type === TokenType.ESTIMATE);
      expect(estimate?.value).toBe('2d');
    });

    it('should tokenize multi-digit estimates', () => {
      const result = tokenize('[ ] Task ~120h');
      const estimate = result.tokens.find(t => t.type === TokenType.ESTIMATE);
      expect(estimate?.value).toBe('120h');
    });

    it('should not tokenize invalid estimate unit', () => {
      const result = tokenize('[ ] Task ~4w');
      const estimate = result.tokens.find(t => t.type === TokenType.ESTIMATE);
      expect(estimate).toBeUndefined();
    });
  });

  describe('Assignee', () => {
    it('should tokenize assignee', () => {
      const result = tokenize('[ ] Task @alice');
      const assignee = result.tokens.find(t => t.type === TokenType.ASSIGNEE);
      expect(assignee).toBeDefined();
      expect(assignee?.value).toBe('alice');
    });

    it('should tokenize assignee with numbers', () => {
      const result = tokenize('[ ] Task @user123');
      const assignee = result.tokens.find(t => t.type === TokenType.ASSIGNEE);
      expect(assignee?.value).toBe('user123');
    });

    it('should tokenize assignee with underscore', () => {
      const result = tokenize('[ ] Task @john_doe');
      const assignee = result.tokens.find(t => t.type === TokenType.ASSIGNEE);
      expect(assignee?.value).toBe('john_doe');
    });

    it('should tokenize assignee with hyphen', () => {
      const result = tokenize('[ ] Task @john-doe');
      const assignee = result.tokens.find(t => t.type === TokenType.ASSIGNEE);
      expect(assignee?.value).toBe('john-doe');
    });
  });

  describe('Tags', () => {
    it('should tokenize single tag', () => {
      const result = tokenize('[ ] Task #backend');
      const tag = result.tokens.find(t => t.type === TokenType.TAG);
      expect(tag).toBeDefined();
      expect(tag?.value).toBe('backend');
    });

    it('should tokenize multiple tags', () => {
      const result = tokenize('[ ] Task #backend #api #urgent');
      const tags = result.tokens.filter(t => t.type === TokenType.TAG);
      expect(tags).toHaveLength(3);
      expect(tags.map(t => t.value)).toEqual(['backend', 'api', 'urgent']);
    });

    it('should differentiate tags from priority', () => {
      const result = tokenize('[ ] Task #p0 #backend');
      const priority = result.tokens.find(t => t.type === TokenType.PRIORITY);
      const tag = result.tokens.find(t => t.type === TokenType.TAG);
      expect(priority?.value).toBe('0');
      expect(tag?.value).toBe('backend');
    });
  });

  describe('Due date', () => {
    it('should tokenize due date', () => {
      const result = tokenize('[ ] Task !2026-01-15');
      const due = result.tokens.find(t => t.type === TokenType.DUE_DATE);
      expect(due).toBeDefined();
      expect(due?.value).toBe('2026-01-15');
    });

    it('should not tokenize invalid date format', () => {
      const result = tokenize('[ ] Task !26-01-15');
      const due = result.tokens.find(t => t.type === TokenType.DUE_DATE);
      expect(due).toBeUndefined();
    });

    it('should not tokenize partial date', () => {
      const result = tokenize('[ ] Task !2026-01');
      const due = result.tokens.find(t => t.type === TokenType.DUE_DATE);
      expect(due).toBeUndefined();
    });
  });

  describe('Task ID', () => {
    it('should tokenize task ID', () => {
      const result = tokenize('[ ] Task ^task-123');
      const id = result.tokens.find(t => t.type === TokenType.TASK_ID);
      expect(id).toBeDefined();
      expect(id?.value).toBe('task-123');
    });

    it('should tokenize task ID with underscores', () => {
      const result = tokenize('[ ] Task ^auth_setup');
      const id = result.tokens.find(t => t.type === TokenType.TASK_ID);
      expect(id?.value).toBe('auth_setup');
    });

    it('should tokenize simple task ID', () => {
      const result = tokenize('[ ] Task ^T001');
      const id = result.tokens.find(t => t.type === TokenType.TASK_ID);
      expect(id?.value).toBe('T001');
    });
  });

  describe('Indentation', () => {
    it('should emit INDENT for increased indentation', () => {
      const result = tokenize('[ ] Parent\n    [ ] Child');
      const types = result.tokens.map(t => t.type);
      expect(types).toContain(TokenType.INDENT);
    });

    it('should emit DEDENT for decreased indentation', () => {
      const result = tokenize('[ ] Parent\n    [ ] Child\n[ ] Sibling');
      const types = result.tokens.map(t => t.type);
      expect(types).toContain(TokenType.INDENT);
      expect(types).toContain(TokenType.DEDENT);
    });

    it('should handle multiple indent levels', () => {
      const result = tokenize('[ ] L0\n    [ ] L1\n        [ ] L2');
      const types = result.tokens.map(t => t.type);
      const indents = types.filter(t => t === TokenType.INDENT);
      expect(indents).toHaveLength(2);
    });

    it('should handle tabs as 4 spaces', () => {
      const result = tokenize('[ ] Parent\n\t[ ] Child');
      const types = result.tokens.map(t => t.type);
      expect(types).toContain(TokenType.INDENT);
    });

    it('should emit final DEDENTs at end', () => {
      const result = tokenize('[ ] Parent\n    [ ] Child');
      const types = result.tokens.map(t => t.type);
      // Should have at least one DEDENT before EOF
      const dedentIdx = types.lastIndexOf(TokenType.DEDENT);
      const eofIdx = types.lastIndexOf(TokenType.EOF);
      expect(dedentIdx).toBeLessThan(eofIdx);
    });
  });

  describe('Comments', () => {
    it('should skip comments by default', () => {
      const result = tokenize('// This is a comment\n[ ] Task');
      const comment = result.tokens.find(t => t.type === TokenType.COMMENT);
      expect(comment).toBeUndefined();
    });

    it('should preserve comments when option is set', () => {
      const result = tokenize('// This is a comment\n[ ] Task', { preserveComments: true });
      const comment = result.tokens.find(t => t.type === TokenType.COMMENT);
      expect(comment).toBeDefined();
      expect(comment?.value).toBe('This is a comment');
    });
  });

  describe('Note prefix', () => {
    it('should tokenize note prefix', () => {
      const result = tokenize('[ ] Task\n    - This is a note');
      const note = result.tokens.find(t => t.type === TokenType.NOTE_PREFIX);
      expect(note).toBeDefined();
    });
  });

  describe('View fence', () => {
    it('should tokenize kanban view', () => {
      const result = tokenize('---view:kanban');
      const view = result.tokens.find(t => t.type === TokenType.VIEW_FENCE);
      expect(view).toBeDefined();
      expect(view?.value).toBe('kanban');
    });

    it('should tokenize table view', () => {
      const result = tokenize('---view:table');
      const view = result.tokens.find(t => t.type === TokenType.VIEW_FENCE);
      expect(view?.value).toBe('table');
    });

    it('should tokenize list view', () => {
      const result = tokenize('---view:list');
      const view = result.tokens.find(t => t.type === TokenType.VIEW_FENCE);
      expect(view?.value).toBe('list');
    });
  });

  describe('Context and handoff fences', () => {
    it('should tokenize context start', () => {
      const result = tokenize('---context\n{"model": "test"}\n---');
      const ctx = result.tokens.find(t => t.type === TokenType.CONTEXT_START);
      expect(ctx).toBeDefined();
    });

    it('should tokenize handoff start', () => {
      const result = tokenize('---handoff\nfrom: a1\nto: a2\n---');
      const handoff = result.tokens.find(t => t.type === TokenType.HANDOFF_START);
      expect(handoff).toBeDefined();
    });

    it('should tokenize fence end', () => {
      const result = tokenize('---context\ndata\n---');
      const end = result.tokens.find(t => t.type === TokenType.FENCE_END);
      expect(end).toBeDefined();
    });
  });

  describe('Verification criteria', () => {
    it('should tokenize verified criterion', () => {
      const result = tokenize('✓ Tests pass');
      const criterion = result.tokens.find(t => t.type === TokenType.CRITERION_VERIFIED);
      expect(criterion).toBeDefined();
    });

    it('should tokenize failed criterion', () => {
      const result = tokenize('✗ Performance check');
      const criterion = result.tokens.find(t => t.type === TokenType.CRITERION_FAILED);
      expect(criterion).toBeDefined();
    });

    it('should tokenize pending criterion', () => {
      const result = tokenize('○ Code reviewed');
      const criterion = result.tokens.find(t => t.type === TokenType.CRITERION_PENDING);
      expect(criterion).toBeDefined();
    });

    it('should tokenize bracketed verified criterion', () => {
      const result = tokenize('[✓] Tests pass');
      const criterion = result.tokens.find(t => t.type === TokenType.CRITERION_VERIFIED);
      expect(criterion).toBeDefined();
    });

    it('should tokenize bracketed failed criterion', () => {
      const result = tokenize('[✗] Tests fail');
      const criterion = result.tokens.find(t => t.type === TokenType.CRITERION_FAILED);
      expect(criterion).toBeDefined();
    });

    it('should tokenize bracketed pending criterion', () => {
      const result = tokenize('[○] Pending review');
      const criterion = result.tokens.find(t => t.type === TokenType.CRITERION_PENDING);
      expect(criterion).toBeDefined();
    });
  });

  describe('Keywords', () => {
    it('should tokenize depends:', () => {
      const result = tokenize('depends: ^task-1');
      const kw = result.tokens.find(t => t.type === TokenType.DEPENDS);
      expect(kw).toBeDefined();
    });

    it('should tokenize blocked-by:', () => {
      const result = tokenize('blocked-by: ^task-2');
      const kw = result.tokens.find(t => t.type === TokenType.BLOCKED_BY);
      expect(kw).toBeDefined();
    });

    it('should tokenize evidence:', () => {
      const result = tokenize('evidence: Test output shows pass');
      const kw = result.tokens.find(t => t.type === TokenType.EVIDENCE);
      expect(kw).toBeDefined();
    });
  });

  describe('Text tokens', () => {
    it('should tokenize text content', () => {
      const result = tokenize('[ ] Implement the feature');
      const text = result.tokens.find(t => t.type === TokenType.TEXT);
      expect(text).toBeDefined();
      expect(text?.value).toContain('Implement the feature');
    });

    it('should stop text at token boundaries', () => {
      const result = tokenize('[ ] Task description #tag');
      const text = result.tokens.find(t => t.type === TokenType.TEXT);
      expect(text?.value).not.toContain('#');
    });
  });

  describe('Punctuation', () => {
    it('should tokenize comma in dependency lists', () => {
      const result = tokenize('depends: ^task1, ^task2');
      const comma = result.tokens.find(t => t.type === TokenType.COMMA);
      expect(comma).toBeDefined();
    });

    it('should have equals in view options', () => {
      const result = tokenize('---view:kanban columns=status,task');
      // View fence contains the view name, options parsed as text
      const view = result.tokens.find(t => t.type === TokenType.VIEW_FENCE);
      expect(view).toBeDefined();
      expect(view?.value).toBe('kanban');
    });
  });

  describe('Complex documents', () => {
    it('should tokenize a complete task with all tokens', () => {
      const result = tokenize('[ ] Implement auth #p0 ~8h @bob #backend !2026-01-20 ^auth-1');
      const types = result.tokens.map(t => t.type);

      expect(types).toContain(TokenType.STATUS_PENDING);
      expect(types).toContain(TokenType.TEXT);
      expect(types).toContain(TokenType.PRIORITY);
      expect(types).toContain(TokenType.ESTIMATE);
      expect(types).toContain(TokenType.ASSIGNEE);
      expect(types).toContain(TokenType.TAG);
      expect(types).toContain(TokenType.DUE_DATE);
      expect(types).toContain(TokenType.TASK_ID);
    });

    it('should handle line positions correctly', () => {
      const result = tokenize('[ ] Line 1\n[ ] Line 2\n[ ] Line 3');
      const statuses = result.tokens.filter(t =>
        t.type === TokenType.STATUS_PENDING ||
        t.type === TokenType.STATUS_COMPLETED ||
        t.type === TokenType.STATUS_IN_PROGRESS
      );

      expect(statuses[0].line).toBe(1);
      expect(statuses[1].line).toBe(2);
      expect(statuses[2].line).toBe(3);
    });

    it('should not produce errors on valid input', () => {
      const input = `@project Test
@version 1.1

[x] Completed task #p0 ~2h @alice ^task-1
    [x] Subtask 1
    - Note about subtask

[~] In progress #p1 @bob
    [ ] Pending subtask
    ✓ Tests pass
    ○ Needs review

---view:kanban`;

      const result = tokenize(input);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Escape sequences', () => {
    it('should escape hash to prevent tag parsing', () => {
      const result = tokenize('[ ] Use \\#hashtag in description');
      const tags = result.tokens.filter(t => t.type === TokenType.TAG);
      expect(tags).toHaveLength(0);
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('#hashtag');
    });

    it('should escape @ to prevent assignee parsing', () => {
      const result = tokenize('[ ] Email me \\@someone');
      const assignees = result.tokens.filter(t => t.type === TokenType.ASSIGNEE);
      expect(assignees).toHaveLength(0);
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('@someone');
    });

    it('should escape ~ to prevent estimate parsing', () => {
      const result = tokenize('[ ] Use \\~4h in text');
      const estimates = result.tokens.filter(t => t.type === TokenType.ESTIMATE);
      expect(estimates).toHaveLength(0);
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('~4h');
    });

    it('should escape ! to prevent due date parsing', () => {
      const result = tokenize('[ ] Important\\!2026-01-15 task');
      const dueDates = result.tokens.filter(t => t.type === TokenType.DUE_DATE);
      expect(dueDates).toHaveLength(0);
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('!2026-01-15');
    });

    it('should escape ^ to prevent task ID parsing', () => {
      const result = tokenize('[ ] Use \\^caret symbol');
      const taskIds = result.tokens.filter(t => t.type === TokenType.TASK_ID);
      expect(taskIds).toHaveLength(0);
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('^caret');
    });

    it('should escape backslash itself', () => {
      const result = tokenize('[ ] Path is C:\\\\Users\\\\name');
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('C:\\Users\\name');
    });

    it('should escape [ to prevent status parsing', () => {
      const result = tokenize('[ ] Array \\[0] access');
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('[0]');
    });

    it('should handle multiple escapes in one line', () => {
      const result = tokenize('[ ] Use \\#tag and \\@mention and \\~time');
      const tags = result.tokens.filter(t => t.type === TokenType.TAG);
      const assignees = result.tokens.filter(t => t.type === TokenType.ASSIGNEE);
      const estimates = result.tokens.filter(t => t.type === TokenType.ESTIMATE);
      expect(tags).toHaveLength(0);
      expect(assignees).toHaveLength(0);
      expect(estimates).toHaveLength(0);
    });

    it('should not escape regular characters', () => {
      const result = tokenize('[ ] Regular \\text here');
      // Backslash before non-special char stays as backslash
      const text = result.tokens.filter(t => t.type === TokenType.TEXT);
      const combined = text.map(t => t.value).join('');
      expect(combined).toContain('\\text');
    });
  });
});
