import { describe, it, expect } from 'bun:test';
import { toYAML, fromYAML, stringify, parseYAMLString } from './yaml';
import type { Document } from '../types';

describe('YAML Interchange', () => {
  describe('toYAML', () => {
    it('should convert a minimal document', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('version: "1.1"');
    });

    it('should convert directives', () => {
      const doc: Document = {
        version: '1.1',
        directives: {
          project: 'Test Project',
          sprint: 'Sprint 1',
        },
        tasks: [],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('directives:');
      expect(yaml).toContain('project: "Test Project"');
      expect(yaml).toContain('sprint: "Sprint 1"');
    });

    it('should convert tasks', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Test task',
          },
        ],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('tasks:');
      expect(yaml).toContain('- status: pending');
      expect(yaml).toContain('description: "Test task"');
    });

    it('should convert task with all properties', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'in_progress',
            description: 'Full task',
            id: 'task-1',
            priority: 0,
            estimate: '4h',
            assignee: 'alice',
            tags: ['backend', 'api'],
            due: '2026-01-20',
          },
        ],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('id: "task-1"');
      expect(yaml).toContain('priority: 0');
      expect(yaml).toContain('estimate: "4h"');
      expect(yaml).toContain('assignee: "alice"');
      expect(yaml).toContain('tags:');
      expect(yaml).toContain('- "backend"');
      expect(yaml).toContain('- "api"');
      expect(yaml).toContain('due: "2026-01-20"');
    });

    it('should convert criteria', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Task',
            criteria: [
              { status: 'verified', description: 'Tests pass', evidence: 'All green' },
              { status: 'pending', description: 'Review done' },
            ],
          },
        ],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('criteria:');
      expect(yaml).toContain('- status: verified');
      expect(yaml).toContain('description: "Tests pass"');
      expect(yaml).toContain('evidence: "All green"');
    });

    it('should convert notes', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Task',
            notes: ['Note 1', 'Note 2'],
          },
        ],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('notes:');
      expect(yaml).toContain('- "Note 1"');
      expect(yaml).toContain('- "Note 2"');
    });

    it('should convert subtasks', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Parent',
            subtasks: [
              {
                status: 'completed',
                description: 'Child',
              },
            ],
          },
        ],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('subtasks:');
      expect(yaml).toContain('- status: completed');
      expect(yaml).toContain('description: "Child"');
    });

    it('should convert view config', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [],
        view: {
          type: 'kanban',
          options: { columns: 'status,task' },
        },
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('view:');
      expect(yaml).toContain('type: kanban');
      expect(yaml).toContain('options:');
      expect(yaml).toContain('columns: "status,task"');
    });

    it('should convert agent context', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [],
        agentContext: {
          agentId: 'agent-1',
          model: 'claude-3',
          sessionId: 'sess-123',
        },
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('agentContext:');
      expect(yaml).toContain('agentId: "agent-1"');
      expect(yaml).toContain('model: "claude-3"');
      expect(yaml).toContain('sessionId: "sess-123"');
    });

    it('should convert handoff info', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [],
        handoff: {
          from: 'agent-1',
          to: 'agent-2',
          reason: 'Context limit',
        },
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('handoff:');
      expect(yaml).toContain('from: "agent-1"');
      expect(yaml).toContain('to: "agent-2"');
      expect(yaml).toContain('reason: "Context limit"');
    });

    it('should escape special characters', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Task with "quotes" and\nnewline',
          },
        ],
      };

      const yaml = toYAML(doc);
      expect(yaml).toContain('\\"quotes\\"');
      expect(yaml).toContain('\\n');
    });
  });

  describe('fromYAML', () => {
    it('should parse minimal YAML', () => {
      const yaml = `version: "1.1"
tasks:`;

      const doc = fromYAML(yaml);
      expect(doc.version).toBe('1.1');
      expect(doc.tasks).toEqual([]);
    });

    it('should parse directives', () => {
      const yaml = `version: "1.1"
directives:
  project: "My Project"
  sprint: "Sprint 2"
tasks:`;

      const doc = fromYAML(yaml);
      expect(doc.directives.project).toBe('My Project');
      expect(doc.directives.sprint).toBe('Sprint 2');
    });

    it('should parse tasks', () => {
      const yaml = `version: "1.1"
tasks:
  - status: pending
    description: "Test task"`;

      const doc = fromYAML(yaml);
      expect(doc.tasks).toHaveLength(1);
      expect(doc.tasks[0].status).toBe('pending');
      expect(doc.tasks[0].description).toBe('Test task');
    });

    it('should parse task with all properties', () => {
      const yaml = `version: "1.1"
tasks:
  - status: in_progress
    description: "Full task"
    id: "task-1"
    priority: 1
    estimate: "2d"
    assignee: "bob"
    due: "2026-02-01"
    tags:
      - "frontend"
      - "ui"`;

      const doc = fromYAML(yaml);
      const task = doc.tasks[0];
      expect(task.status).toBe('in_progress');
      expect(task.id).toBe('task-1');
      expect(task.priority).toBe(1);
      expect(task.estimate).toBe('2d');
      expect(task.assignee).toBe('bob');
      expect(task.due).toBe('2026-02-01');
      expect(task.tags).toEqual(['frontend', 'ui']);
    });

    it('should parse notes', () => {
      const yaml = `version: "1.1"
tasks:
  - status: pending
    description: "Task"
    notes:
      - "First note"
      - "Second note"`;

      const doc = fromYAML(yaml);
      expect(doc.tasks[0].notes).toEqual(['First note', 'Second note']);
    });

    it('should parse view config', () => {
      const yaml = `version: "1.1"
tasks:
view:
  type: table
  options:
    sort: "priority"`;

      const doc = fromYAML(yaml);
      expect(doc.view?.type).toBe('table');
      expect(doc.view?.options?.sort).toBe('priority');
    });

    it('should parse agent context', () => {
      const yaml = `version: "1.1"
tasks:
agentContext:
  agentId: "test-agent"
  model: "gpt-4"`;

      const doc = fromYAML(yaml);
      expect(doc.agentContext?.agentId).toBe('test-agent');
      expect(doc.agentContext?.model).toBe('gpt-4');
    });

    it('should parse handoff info', () => {
      const yaml = `version: "1.1"
tasks:
handoff:
  from: "a1"
  to: "a2"
  reason: "testing"`;

      const doc = fromYAML(yaml);
      expect(doc.handoff?.from).toBe('a1');
      expect(doc.handoff?.to).toBe('a2');
      expect(doc.handoff?.reason).toBe('testing');
    });

    it('should handle unquoted values', () => {
      const yaml = `version: 1.1
tasks:
  - status: completed
    description: Simple task`;

      const doc = fromYAML(yaml);
      expect(doc.version).toBe('1.1');
      expect(doc.tasks[0].description).toBe('Simple task');
    });

    it('should skip comments', () => {
      const yaml = `# This is a comment
version: "1.1"
# Another comment
tasks:
  # Task comment
  - status: pending
    description: "Task"`;

      const doc = fromYAML(yaml);
      expect(doc.version).toBe('1.1');
      expect(doc.tasks).toHaveLength(1);
    });
  });

  describe('Round-trip conversion', () => {
    it('should preserve data through toYAML -> fromYAML', () => {
      const original: Document = {
        version: '1.1',
        directives: {
          project: 'Round Trip',
        },
        tasks: [
          {
            status: 'in_progress',
            description: 'Complex task',
            id: 'task-1',
            priority: 0,
            estimate: '4h',
            assignee: 'dev',
            tags: ['urgent'],
            due: '2026-01-25',
            notes: ['Important'],
          },
        ],
        view: {
          type: 'kanban',
        },
        agentContext: {
          agentId: 'agent-001',
        },
        handoff: {
          from: 'a1',
          to: 'a2',
          reason: 'test handoff',
        },
      };

      const yaml = toYAML(original);
      const restored = fromYAML(yaml);

      expect(restored.version).toBe('1.1');
      expect(restored.directives.project).toBe('Round Trip');

      const task = restored.tasks[0];
      expect(task.status).toBe('in_progress');
      expect(task.description).toBe('Complex task');
      expect(task.id).toBe('task-1');
      expect(task.priority).toBe(0);
      expect(task.estimate).toBe('4h');
      expect(task.assignee).toBe('dev');
      expect(task.tags).toEqual(['urgent']);
      expect(task.due).toBe('2026-01-25');
      expect(task.notes).toEqual(['Important']);

      expect(restored.view?.type).toBe('kanban');
      expect(restored.agentContext?.agentId).toBe('agent-001');
      expect(restored.handoff?.from).toBe('a1');
      expect(restored.handoff?.to).toBe('a2');
    });

    it('should preserve nested subtasks', () => {
      const original: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Parent',
            subtasks: [
              {
                status: 'completed',
                description: 'Child 1',
              },
              {
                status: 'pending',
                description: 'Child 2',
                subtasks: [
                  {
                    status: 'pending',
                    description: 'Grandchild',
                  },
                ],
              },
            ],
          },
        ],
      };

      const yaml = toYAML(original);
      const restored = fromYAML(yaml);

      expect(restored.tasks[0].subtasks).toHaveLength(2);
      expect(restored.tasks[0].subtasks?.[0].description).toBe('Child 1');
      expect(restored.tasks[0].subtasks?.[1].subtasks).toHaveLength(1);
      expect(restored.tasks[0].subtasks?.[1].subtasks?.[0].description).toBe('Grandchild');
    });
  });

  describe('stringify and parseYAMLString', () => {
    it('should stringify (alias for toYAML)', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [{ status: 'pending', description: 'Test' }],
      };

      const yaml = stringify(doc);
      expect(yaml).toContain('version: "1.1"');
      expect(yaml).toContain('tasks:');
    });

    it('should parseYAMLString (alias for fromYAML)', () => {
      const yaml = `version: "1.1"
tasks:
  - status: completed
    description: "Done"`;

      const doc = parseYAMLString(yaml);
      expect(doc.version).toBe('1.1');
      expect(doc.tasks[0].status).toBe('completed');
    });
  });
});
