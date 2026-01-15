/**
 * YAML Interchange - Convert between TaskML AST and YAML
 *
 * Note: This is a lightweight YAML implementation that handles
 * the subset of YAML needed for TaskML documents.
 */

import type {
  Document,
  Task,
  TaskStatus,
  ViewConfig,
  Criterion,
  AgentContext,
  HandoffInfo,
} from '../types';

/**
 * Convert a TaskML Document to YAML string
 */
export function toYAML(doc: Document): string {
  const lines: string[] = [];

  lines.push(`version: "${doc.version}"`);

  // Directives
  if (doc.directives && Object.keys(doc.directives).length > 0) {
    lines.push('directives:');
    for (const [key, value] of Object.entries(doc.directives)) {
      lines.push(`  ${key}: "${escapeYAML(value)}"`);
    }
  }

  // Tasks
  if (doc.tasks.length > 0) {
    lines.push('tasks:');
    for (const task of doc.tasks) {
      lines.push(...taskToYAML(task, 2));
    }
  }

  // View
  if (doc.view) {
    lines.push('view:');
    lines.push(`  type: ${doc.view.type}`);
    if (doc.view.options && Object.keys(doc.view.options).length > 0) {
      lines.push('  options:');
      for (const [key, value] of Object.entries(doc.view.options)) {
        lines.push(`    ${key}: "${escapeYAML(value)}"`);
      }
    }
  }

  // Agent context
  if (doc.agentContext) {
    lines.push('agentContext:');
    if (doc.agentContext.agentId) {
      lines.push(`  agentId: "${escapeYAML(doc.agentContext.agentId)}"`);
    }
    if (doc.agentContext.model) {
      lines.push(`  model: "${escapeYAML(doc.agentContext.model)}"`);
    }
    if (doc.agentContext.sessionId) {
      lines.push(`  sessionId: "${escapeYAML(doc.agentContext.sessionId)}"`);
    }
    if (doc.agentContext.startedAt) {
      lines.push(`  startedAt: "${escapeYAML(doc.agentContext.startedAt)}"`);
    }
  }

  // Handoff
  if (doc.handoff) {
    lines.push('handoff:');
    lines.push(`  from: "${escapeYAML(doc.handoff.from)}"`);
    lines.push(`  to: "${escapeYAML(doc.handoff.to)}"`);
    if (doc.handoff.reason) {
      lines.push(`  reason: "${escapeYAML(doc.handoff.reason)}"`);
    }
  }

  return lines.join('\n');
}

/**
 * Convert a Task to YAML lines
 */
function taskToYAML(task: Task, indent: number): string[] {
  const lines: string[] = [];
  const pad = ' '.repeat(indent);

  lines.push(`${pad}- status: ${task.status}`);
  lines.push(`${pad}  description: "${escapeYAML(task.description)}"`);

  if (task.id) {
    lines.push(`${pad}  id: "${escapeYAML(task.id)}"`);
  }
  if (task.priority !== undefined) {
    lines.push(`${pad}  priority: ${task.priority}`);
  }
  if (task.estimate) {
    lines.push(`${pad}  estimate: "${task.estimate}"`);
  }
  if (task.assignee) {
    lines.push(`${pad}  assignee: "${escapeYAML(task.assignee)}"`);
  }
  if (task.tags && task.tags.length > 0) {
    lines.push(`${pad}  tags:`);
    for (const tag of task.tags) {
      lines.push(`${pad}    - "${escapeYAML(tag)}"`);
    }
  }
  if (task.due) {
    lines.push(`${pad}  due: "${task.due}"`);
  }
  if (task.dependsOn && task.dependsOn.length > 0) {
    lines.push(`${pad}  dependsOn:`);
    for (const dep of task.dependsOn) {
      lines.push(`${pad}    - "${escapeYAML(dep)}"`);
    }
  }
  if (task.blockedBy && task.blockedBy.length > 0) {
    lines.push(`${pad}  blockedBy:`);
    for (const dep of task.blockedBy) {
      lines.push(`${pad}    - "${escapeYAML(dep)}"`);
    }
  }
  if (task.criteria && task.criteria.length > 0) {
    lines.push(`${pad}  criteria:`);
    for (const criterion of task.criteria) {
      lines.push(`${pad}    - status: ${criterion.status}`);
      lines.push(`${pad}      description: "${escapeYAML(criterion.description)}"`);
      if (criterion.evidence) {
        lines.push(`${pad}      evidence: "${escapeYAML(criterion.evidence)}"`);
      }
    }
  }
  if (task.notes && task.notes.length > 0) {
    lines.push(`${pad}  notes:`);
    for (const note of task.notes) {
      lines.push(`${pad}    - "${escapeYAML(note)}"`);
    }
  }
  if (task.subtasks && task.subtasks.length > 0) {
    lines.push(`${pad}  subtasks:`);
    for (const subtask of task.subtasks) {
      lines.push(...taskToYAML(subtask, indent + 4));
    }
  }

  return lines;
}

/**
 * Escape special characters for YAML strings
 */
function escapeYAML(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Parse a YAML string to TaskML Document
 *
 * Note: This is a simplified YAML parser that handles
 * the specific structure of TaskML documents.
 */
export function fromYAML(yaml: string): Document {
  const lines = yaml.split('\n');
  const doc: Document = {
    version: '1.1',
    directives: {},
    tasks: [],
  };

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      i++;
      continue;
    }

    if (trimmed.startsWith('version:')) {
      doc.version = parseYAMLValue(trimmed.slice(8));
      i++;
    } else if (trimmed === 'directives:') {
      i++;
      while (i < lines.length && lines[i].startsWith('  ') && !lines[i].startsWith('  -')) {
        const directiveLine = lines[i].trim();
        const colonIdx = directiveLine.indexOf(':');
        if (colonIdx > 0) {
          const key = directiveLine.slice(0, colonIdx).trim();
          const value = parseYAMLValue(directiveLine.slice(colonIdx + 1));
          doc.directives[key] = value;
        }
        i++;
      }
    } else if (trimmed === 'tasks:') {
      i++;
      const result = parseYAMLTasks(lines, i, 2);
      doc.tasks = result.tasks;
      i = result.nextIndex;
    } else if (trimmed === 'view:') {
      i++;
      const view: ViewConfig = { type: 'list' };
      while (i < lines.length && lines[i].startsWith('  ') && !lines[i].trim().endsWith(':')) {
        const viewLine = lines[i].trim();
        if (viewLine.startsWith('type:')) {
          view.type = parseYAMLValue(viewLine.slice(5)) as ViewConfig['type'];
        }
        i++;
      }
      if (i < lines.length && lines[i].trim() === 'options:') {
        i++;
        view.options = {};
        while (i < lines.length && lines[i].startsWith('    ')) {
          const optLine = lines[i].trim();
          const colonIdx = optLine.indexOf(':');
          if (colonIdx > 0) {
            const key = optLine.slice(0, colonIdx).trim();
            const value = parseYAMLValue(optLine.slice(colonIdx + 1));
            view.options[key] = value;
          }
          i++;
        }
      }
      doc.view = view;
    } else if (trimmed === 'agentContext:') {
      i++;
      const ctx: AgentContext = {};
      while (i < lines.length && lines[i].startsWith('  ') && !lines[i].startsWith('  -')) {
        const ctxLine = lines[i].trim();
        if (ctxLine.startsWith('agentId:')) {
          ctx.agentId = parseYAMLValue(ctxLine.slice(8));
        } else if (ctxLine.startsWith('model:')) {
          ctx.model = parseYAMLValue(ctxLine.slice(6));
        } else if (ctxLine.startsWith('sessionId:')) {
          ctx.sessionId = parseYAMLValue(ctxLine.slice(10));
        } else if (ctxLine.startsWith('startedAt:')) {
          ctx.startedAt = parseYAMLValue(ctxLine.slice(10));
        }
        i++;
      }
      doc.agentContext = ctx;
    } else if (trimmed === 'handoff:') {
      i++;
      const handoff: HandoffInfo = { from: '', to: '' };
      while (i < lines.length && lines[i].startsWith('  ') && !lines[i].startsWith('  -')) {
        const hLine = lines[i].trim();
        if (hLine.startsWith('from:')) {
          handoff.from = parseYAMLValue(hLine.slice(5));
        } else if (hLine.startsWith('to:')) {
          handoff.to = parseYAMLValue(hLine.slice(3));
        } else if (hLine.startsWith('reason:')) {
          handoff.reason = parseYAMLValue(hLine.slice(7));
        }
        i++;
      }
      doc.handoff = handoff;
    } else {
      i++;
    }
  }

  return doc;
}

/**
 * Parse YAML array of tasks
 */
function parseYAMLTasks(
  lines: string[],
  startIdx: number,
  baseIndent: number
): { tasks: Task[]; nextIndex: number } {
  const tasks: Task[] = [];
  let i = startIdx;
  const indentStr = ' '.repeat(baseIndent);

  while (i < lines.length) {
    const line = lines[i];

    // Check if we're still at the right indent level
    if (!line.startsWith(indentStr) || line.trim() === '') {
      if (line.trim() === '') {
        i++;
        continue;
      }
      // Check if this is a less-indented line (we're done with this level)
      const currentIndent = line.length - line.trimStart().length;
      if (currentIndent < baseIndent) {
        break;
      }
    }

    const trimmed = line.trim();

    // Start of a new task
    if (trimmed.startsWith('- status:')) {
      const task: Task = {
        status: parseYAMLValue(trimmed.slice(9)) as TaskStatus,
        description: '',
      };
      i++;

      // Parse task properties
      while (i < lines.length) {
        const propLine = lines[i];
        const propIndent = propLine.length - propLine.trimStart().length;

        // Check if we're done with this task
        if (propIndent <= baseIndent && propLine.trim() !== '') {
          break;
        }

        const propTrimmed = propLine.trim();

        if (propTrimmed.startsWith('description:')) {
          task.description = parseYAMLValue(propTrimmed.slice(12));
        } else if (propTrimmed.startsWith('id:')) {
          task.id = parseYAMLValue(propTrimmed.slice(3));
        } else if (propTrimmed.startsWith('priority:')) {
          task.priority = parseInt(parseYAMLValue(propTrimmed.slice(9)), 10);
        } else if (propTrimmed.startsWith('estimate:')) {
          task.estimate = parseYAMLValue(propTrimmed.slice(9));
        } else if (propTrimmed.startsWith('assignee:')) {
          task.assignee = parseYAMLValue(propTrimmed.slice(9));
        } else if (propTrimmed.startsWith('due:')) {
          task.due = parseYAMLValue(propTrimmed.slice(4));
        } else if (propTrimmed === 'tags:') {
          i++;
          task.tags = [];
          while (i < lines.length && lines[i].trim().startsWith('-') && !lines[i].trim().startsWith('- status:')) {
            const tagLine = lines[i].trim();
            if (tagLine.startsWith('-')) {
              task.tags.push(parseYAMLValue(tagLine.slice(1)));
            }
            i++;
          }
          continue;
        } else if (propTrimmed === 'dependsOn:') {
          i++;
          task.dependsOn = [];
          while (i < lines.length && lines[i].trim().startsWith('-') && !lines[i].trim().startsWith('- status:')) {
            task.dependsOn.push(parseYAMLValue(lines[i].trim().slice(1)));
            i++;
          }
          continue;
        } else if (propTrimmed === 'blockedBy:') {
          i++;
          task.blockedBy = [];
          while (i < lines.length && lines[i].trim().startsWith('-') && !lines[i].trim().startsWith('- status:')) {
            task.blockedBy.push(parseYAMLValue(lines[i].trim().slice(1)));
            i++;
          }
          continue;
        } else if (propTrimmed === 'notes:') {
          i++;
          task.notes = [];
          while (i < lines.length && lines[i].trim().startsWith('-') && !lines[i].trim().startsWith('- status:')) {
            task.notes.push(parseYAMLValue(lines[i].trim().slice(1)));
            i++;
          }
          continue;
        } else if (propTrimmed === 'criteria:') {
          i++;
          task.criteria = [];
          while (i < lines.length && lines[i].trim().startsWith('- status:')) {
            const criterion: Criterion = {
              status: parseYAMLValue(lines[i].trim().slice(9)) as Criterion['status'],
              description: '',
            };
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('-') && lines[i].trim() !== '') {
              const critLine = lines[i].trim();
              if (critLine.startsWith('description:')) {
                criterion.description = parseYAMLValue(critLine.slice(12));
              } else if (critLine.startsWith('evidence:')) {
                criterion.evidence = parseYAMLValue(critLine.slice(9));
              }
              i++;
            }
            task.criteria.push(criterion);
          }
          continue;
        } else if (propTrimmed === 'subtasks:') {
          i++;
          // Subtask items are indented 2 spaces beyond the subtasks: line
          const result = parseYAMLTasks(lines, i, propIndent + 2);
          task.subtasks = result.tasks;
          i = result.nextIndex;
          continue;
        }

        i++;
      }

      tasks.push(task);
    } else {
      i++;
    }
  }

  return { tasks, nextIndex: i };
}

/**
 * Parse a YAML value (handles quoted strings and plain values)
 */
function parseYAMLValue(str: string): string {
  const trimmed = str.trim();

  // Handle quoted strings
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed
      .slice(1, -1)
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  return trimmed;
}

/**
 * Serialize a Document to YAML string (alias for toYAML)
 */
export function stringify(doc: Document): string {
  return toYAML(doc);
}

/**
 * Parse a YAML string to Document (alias for fromYAML)
 */
export function parseYAMLString(yamlString: string): Document {
  return fromYAML(yamlString);
}
