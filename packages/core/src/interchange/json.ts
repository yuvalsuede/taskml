/**
 * JSON Interchange - Convert between TaskML AST and JSON
 */

import type {
  Document,
  Task,
  TaskStatus,
  ViewConfig,
  Criterion,
} from '../types';

/**
 * JSON representation of a TaskML document
 */
export interface TaskMLJSON {
  version: string;
  directives?: Record<string, string>;
  tasks: TaskJSON[];
  view?: ViewConfigJSON;
  agentContext?: AgentContextJSON;
  handoff?: HandoffInfoJSON;
}

export interface TaskJSON {
  id?: string;
  status: TaskStatus;
  description: string;
  priority?: number;
  estimate?: string;
  assignee?: string;
  tags?: string[];
  due?: string;
  dependsOn?: string[];
  blockedBy?: string[];
  subtasks?: TaskJSON[];
  criteria?: CriterionJSON[];
  notes?: string[];
}

export interface CriterionJSON {
  description: string;
  status: 'pending' | 'verified' | 'failed';
  evidence?: string;
}

export interface ViewConfigJSON {
  type: string;
  options?: Record<string, string>;
}

export interface AgentContextJSON {
  agentId?: string;
  model?: string;
  sessionId?: string;
  startedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface HandoffInfoJSON {
  from: string;
  to: string;
  reason?: string;
  context?: Record<string, unknown>;
}

/**
 * Convert a TaskML Document to JSON object
 */
export function toJSON(doc: Document): TaskMLJSON {
  const result: TaskMLJSON = {
    version: doc.version,
    tasks: doc.tasks.map(taskToJSON),
  };

  // Only include non-empty directives
  if (doc.directives && Object.keys(doc.directives).length > 0) {
    result.directives = { ...doc.directives };
  }

  if (doc.view) {
    result.view = {
      type: doc.view.type,
      ...(doc.view.options && Object.keys(doc.view.options).length > 0
        ? { options: doc.view.options }
        : {}),
    };
  }

  if (doc.agentContext) {
    result.agentContext = { ...doc.agentContext };
  }

  if (doc.handoff) {
    result.handoff = { ...doc.handoff };
  }

  return result;
}

/**
 * Convert a Task to JSON object
 */
function taskToJSON(task: Task): TaskJSON {
  const result: TaskJSON = {
    status: task.status,
    description: task.description,
  };

  if (task.id) result.id = task.id;
  if (task.priority !== undefined) result.priority = task.priority;
  if (task.estimate) result.estimate = task.estimate;
  if (task.assignee) result.assignee = task.assignee;
  if (task.tags && task.tags.length > 0) result.tags = [...task.tags];
  if (task.due) result.due = task.due;
  if (task.dependsOn && task.dependsOn.length > 0) result.dependsOn = [...task.dependsOn];
  if (task.blockedBy && task.blockedBy.length > 0) result.blockedBy = [...task.blockedBy];
  if (task.subtasks && task.subtasks.length > 0) {
    result.subtasks = task.subtasks.map(taskToJSON);
  }
  if (task.criteria && task.criteria.length > 0) {
    result.criteria = task.criteria.map(criterionToJSON);
  }
  if (task.notes && task.notes.length > 0) result.notes = [...task.notes];

  return result;
}

/**
 * Convert a Criterion to JSON object
 */
function criterionToJSON(criterion: Criterion): CriterionJSON {
  const result: CriterionJSON = {
    description: criterion.description,
    status: criterion.status,
  };

  if (criterion.evidence) {
    result.evidence = criterion.evidence;
  }

  return result;
}

/**
 * Convert a JSON object to TaskML Document
 */
export function fromJSON(json: TaskMLJSON): Document {
  const doc: Document = {
    version: json.version || '1.1',
    directives: json.directives ? { ...json.directives } : {},
    tasks: (json.tasks || []).map(taskFromJSON),
  };

  if (json.view) {
    doc.view = {
      type: json.view.type as ViewConfig['type'],
      options: json.view.options,
    };
  }

  if (json.agentContext) {
    doc.agentContext = { ...json.agentContext };
  }

  if (json.handoff) {
    doc.handoff = { ...json.handoff };
  }

  return doc;
}

/**
 * Convert a JSON object to Task
 */
function taskFromJSON(json: TaskJSON): Task {
  const task: Task = {
    status: json.status,
    description: json.description,
  };

  if (json.id) task.id = json.id;
  if (json.priority !== undefined) task.priority = json.priority;
  if (json.estimate) task.estimate = json.estimate;
  if (json.assignee) task.assignee = json.assignee;
  if (json.tags) task.tags = [...json.tags];
  if (json.due) task.due = json.due;
  if (json.dependsOn) task.dependsOn = [...json.dependsOn];
  if (json.blockedBy) task.blockedBy = [...json.blockedBy];
  if (json.subtasks) task.subtasks = json.subtasks.map(taskFromJSON);
  if (json.criteria) task.criteria = json.criteria.map(criterionFromJSON);
  if (json.notes) task.notes = [...json.notes];

  return task;
}

/**
 * Convert a JSON object to Criterion
 */
function criterionFromJSON(json: CriterionJSON): Criterion {
  return {
    description: json.description,
    status: json.status,
    evidence: json.evidence,
  };
}

/**
 * Serialize a Document to JSON string
 */
export function stringify(doc: Document, pretty: boolean = true): string {
  const json = toJSON(doc);
  return pretty ? JSON.stringify(json, null, 2) : JSON.stringify(json);
}

/**
 * Parse a JSON string to Document
 */
export function parseJSON(jsonString: string): Document {
  const json = JSON.parse(jsonString) as TaskMLJSON;
  return fromJSON(json);
}
