import { describe, it, expect } from 'bun:test';
import { toJSON, fromJSON, stringify, parseJSON } from './json';
import type { Document, Task } from '../types';

describe('JSON Interchange', () => {
  describe('toJSON', () => {
    it('should convert a minimal document', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [],
      };

      const json = toJSON(doc);
      expect(json.version).toBe('1.1');
      expect(json.tasks).toEqual([]);
      expect(json.directives).toBeUndefined();
    });

    it('should convert a document with directives', () => {
      const doc: Document = {
        version: '1.1',
        directives: {
          project: 'Test Project',
          sprint: 'Sprint 1',
        },
        tasks: [],
      };

      const json = toJSON(doc);
      expect(json.directives).toEqual({
        project: 'Test Project',
        sprint: 'Sprint 1',
      });
    });

    it('should convert tasks with all properties', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Test task',
            id: 'task-1',
            priority: 0,
            estimate: '4h',
            assignee: 'alice',
            tags: ['backend', 'api'],
            due: '2026-01-20',
            dependsOn: ['task-0'],
            blockedBy: ['task-x'],
          },
        ],
      };

      const json = toJSON(doc);
      expect(json.tasks[0]).toEqual({
        status: 'pending',
        description: 'Test task',
        id: 'task-1',
        priority: 0,
        estimate: '4h',
        assignee: 'alice',
        tags: ['backend', 'api'],
        due: '2026-01-20',
        dependsOn: ['task-0'],
        blockedBy: ['task-x'],
      });
    });

    it('should convert nested subtasks', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'in_progress',
            description: 'Parent task',
            subtasks: [
              {
                status: 'completed',
                description: 'Child task',
              },
            ],
          },
        ],
      };

      const json = toJSON(doc);
      expect(json.tasks[0].subtasks).toHaveLength(1);
      expect(json.tasks[0].subtasks?.[0].status).toBe('completed');
      expect(json.tasks[0].subtasks?.[0].description).toBe('Child task');
    });

    it('should convert criteria', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Task with criteria',
            criteria: [
              { status: 'verified', description: 'Tests pass', evidence: 'All 100 tests passed' },
              { status: 'pending', description: 'Code reviewed' },
              { status: 'failed', description: 'Performance check' },
            ],
          },
        ],
      };

      const json = toJSON(doc);
      expect(json.tasks[0].criteria).toHaveLength(3);
      expect(json.tasks[0].criteria?.[0]).toEqual({
        status: 'verified',
        description: 'Tests pass',
        evidence: 'All 100 tests passed',
      });
      expect(json.tasks[0].criteria?.[1]).toEqual({
        status: 'pending',
        description: 'Code reviewed',
      });
    });

    it('should convert notes', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [
          {
            status: 'pending',
            description: 'Task with notes',
            notes: ['Note 1', 'Note 2'],
          },
        ],
      };

      const json = toJSON(doc);
      expect(json.tasks[0].notes).toEqual(['Note 1', 'Note 2']);
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

      const json = toJSON(doc);
      expect(json.view).toEqual({
        type: 'kanban',
        options: { columns: 'status,task' },
      });
    });

    it('should convert agent context', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [],
        agentContext: {
          agentId: 'agent-123',
          model: 'claude-3',
          sessionId: 'session-456',
          startedAt: '2026-01-15T10:00:00Z',
        },
      };

      const json = toJSON(doc);
      expect(json.agentContext).toEqual({
        agentId: 'agent-123',
        model: 'claude-3',
        sessionId: 'session-456',
        startedAt: '2026-01-15T10:00:00Z',
      });
    });

    it('should convert handoff info', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [],
        handoff: {
          from: 'agent-1',
          to: 'agent-2',
          reason: 'Context limit reached',
        },
      };

      const json = toJSON(doc);
      expect(json.handoff).toEqual({
        from: 'agent-1',
        to: 'agent-2',
        reason: 'Context limit reached',
      });
    });
  });

  describe('fromJSON', () => {
    it('should parse a minimal JSON', () => {
      const json = {
        version: '1.1',
        tasks: [],
      };

      const doc = fromJSON(json);
      expect(doc.version).toBe('1.1');
      expect(doc.tasks).toEqual([]);
      expect(doc.directives).toEqual({});
    });

    it('should parse directives', () => {
      const json = {
        version: '1.1',
        directives: { project: 'My Project' },
        tasks: [],
      };

      const doc = fromJSON(json);
      expect(doc.directives.project).toBe('My Project');
    });

    it('should parse tasks with all properties', () => {
      const json = {
        version: '1.1',
        tasks: [
          {
            status: 'pending' as const,
            description: 'Test task',
            id: 'task-1',
            priority: 1,
            estimate: '2d',
            assignee: 'bob',
            tags: ['frontend'],
            due: '2026-02-01',
            dependsOn: ['task-0'],
            blockedBy: ['task-x'],
          },
        ],
      };

      const doc = fromJSON(json);
      const task = doc.tasks[0];
      expect(task.status).toBe('pending');
      expect(task.description).toBe('Test task');
      expect(task.id).toBe('task-1');
      expect(task.priority).toBe(1);
      expect(task.estimate).toBe('2d');
      expect(task.assignee).toBe('bob');
      expect(task.tags).toEqual(['frontend']);
      expect(task.due).toBe('2026-02-01');
      expect(task.dependsOn).toEqual(['task-0']);
      expect(task.blockedBy).toEqual(['task-x']);
    });

    it('should parse nested subtasks', () => {
      const json = {
        version: '1.1',
        tasks: [
          {
            status: 'pending' as const,
            description: 'Parent',
            subtasks: [
              {
                status: 'completed' as const,
                description: 'Child',
              },
            ],
          },
        ],
      };

      const doc = fromJSON(json);
      expect(doc.tasks[0].subtasks).toHaveLength(1);
      expect(doc.tasks[0].subtasks?.[0].status).toBe('completed');
    });

    it('should parse criteria', () => {
      const json = {
        version: '1.1',
        tasks: [
          {
            status: 'pending' as const,
            description: 'Task',
            criteria: [
              { status: 'verified' as const, description: 'Done', evidence: 'Proof' },
              { status: 'pending' as const, description: 'Pending' },
            ],
          },
        ],
      };

      const doc = fromJSON(json);
      expect(doc.tasks[0].criteria).toHaveLength(2);
      expect(doc.tasks[0].criteria?.[0].evidence).toBe('Proof');
    });

    it('should parse view config', () => {
      const json = {
        version: '1.1',
        tasks: [],
        view: {
          type: 'table',
          options: { sort: 'priority' },
        },
      };

      const doc = fromJSON(json);
      expect(doc.view?.type).toBe('table');
      expect(doc.view?.options?.sort).toBe('priority');
    });

    it('should parse agent context', () => {
      const json = {
        version: '1.1',
        tasks: [],
        agentContext: {
          agentId: 'test-agent',
          model: 'gpt-4',
        },
      };

      const doc = fromJSON(json);
      expect(doc.agentContext?.agentId).toBe('test-agent');
      expect(doc.agentContext?.model).toBe('gpt-4');
    });

    it('should parse handoff info', () => {
      const json = {
        version: '1.1',
        tasks: [],
        handoff: {
          from: 'a1',
          to: 'a2',
          reason: 'test',
        },
      };

      const doc = fromJSON(json);
      expect(doc.handoff?.from).toBe('a1');
      expect(doc.handoff?.to).toBe('a2');
      expect(doc.handoff?.reason).toBe('test');
    });
  });

  describe('Round-trip conversion', () => {
    it('should preserve data through toJSON -> fromJSON', () => {
      const original: Document = {
        version: '1.1',
        directives: {
          project: 'Round Trip Test',
          author: 'Test',
        },
        tasks: [
          {
            status: 'in_progress',
            description: 'Complex task',
            id: 'complex-1',
            priority: 0,
            estimate: '8h',
            assignee: 'dev',
            tags: ['urgent', 'backend'],
            due: '2026-01-25',
            notes: ['Important note'],
            criteria: [
              { status: 'verified', description: 'Unit tests', evidence: 'CI passed' },
              { status: 'pending', description: 'Integration tests' },
            ],
            subtasks: [
              {
                status: 'completed',
                description: 'Subtask 1',
              },
              {
                status: 'pending',
                description: 'Subtask 2',
                subtasks: [
                  {
                    status: 'pending',
                    description: 'Nested subtask',
                  },
                ],
              },
            ],
          },
        ],
        view: {
          type: 'kanban',
          options: { columns: 'status,priority' },
        },
        agentContext: {
          agentId: 'agent-001',
          sessionId: 'session-123',
        },
      };

      const json = toJSON(original);
      const restored = fromJSON(json);

      // Check top-level
      expect(restored.version).toBe(original.version);
      expect(restored.directives).toEqual(original.directives);

      // Check task
      const task = restored.tasks[0];
      expect(task.status).toBe('in_progress');
      expect(task.description).toBe('Complex task');
      expect(task.id).toBe('complex-1');
      expect(task.priority).toBe(0);
      expect(task.estimate).toBe('8h');
      expect(task.assignee).toBe('dev');
      expect(task.tags).toEqual(['urgent', 'backend']);
      expect(task.due).toBe('2026-01-25');
      expect(task.notes).toEqual(['Important note']);

      // Check criteria
      expect(task.criteria).toHaveLength(2);
      expect(task.criteria?.[0].evidence).toBe('CI passed');

      // Check nested subtasks
      expect(task.subtasks).toHaveLength(2);
      expect(task.subtasks?.[1].subtasks).toHaveLength(1);
      expect(task.subtasks?.[1].subtasks?.[0].description).toBe('Nested subtask');

      // Check view
      expect(restored.view?.type).toBe('kanban');
      expect(restored.view?.options?.columns).toBe('status,priority');

      // Check agent context
      expect(restored.agentContext?.agentId).toBe('agent-001');
    });
  });

  describe('stringify and parseJSON', () => {
    it('should stringify to pretty JSON by default', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [{ status: 'pending', description: 'Test' }],
      };

      const str = stringify(doc);
      expect(str).toContain('\n');
      expect(str).toContain('  '); // indentation
    });

    it('should stringify to compact JSON when pretty=false', () => {
      const doc: Document = {
        version: '1.1',
        directives: {},
        tasks: [{ status: 'pending', description: 'Test' }],
      };

      const str = stringify(doc, false);
      expect(str).not.toContain('\n');
    });

    it('should parseJSON string to Document', () => {
      const jsonStr = JSON.stringify({
        version: '1.1',
        tasks: [{ status: 'completed', description: 'Done task' }],
      });

      const doc = parseJSON(jsonStr);
      expect(doc.version).toBe('1.1');
      expect(doc.tasks[0].status).toBe('completed');
    });

    it('should handle round-trip through stringify/parseJSON', () => {
      const original: Document = {
        version: '1.1',
        directives: { test: 'value' },
        tasks: [{ status: 'pending', description: 'Test', priority: 1 }],
      };

      const str = stringify(original);
      const restored = parseJSON(str);

      expect(restored.version).toBe('1.1');
      expect(restored.directives.test).toBe('value');
      expect(restored.tasks[0].priority).toBe(1);
    });
  });
});
