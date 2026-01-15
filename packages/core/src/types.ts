/**
 * TaskML Type Definitions
 */

export type TaskStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'blocked'
  | 'cancelled'
  | 'review';

export type ViewType =
  | 'list'
  | 'kanban'
  | 'tree'
  | 'timeline'
  | 'table'
  | 'graph'
  | 'summary';

export type OutputFormat = 'html' | 'markdown' | 'json' | 'text';

export interface Criterion {
  description: string;
  status: 'pending' | 'verified' | 'failed';
  evidence?: string;
}

export interface Task {
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
  subtasks?: Task[];
  criteria?: Criterion[];
  notes?: string[];
}

export interface ViewConfig {
  type: ViewType;
  options?: Record<string, string>;
}

export interface AgentContext {
  agentId?: string;
  model?: string;
  sessionId?: string;
  startedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface HandoffInfo {
  from: string;
  to: string;
  reason?: string;
  context?: Record<string, unknown>;
}

export interface Comment {
  line: number;
  text: string;
}

export interface Document {
  version: string;
  directives: Record<string, string>;
  tasks: Task[];
  view?: ViewConfig;
  agentContext?: AgentContext;
  handoff?: HandoffInfo;
  comments?: Comment[];
}

export interface ParseOptions {
  strict?: boolean;
  allowUnknownDirectives?: boolean;
}

export interface RenderOptions {
  format?: OutputFormat;
  view?: ViewType;
  viewOptions?: Record<string, string>;
  includeStyles?: boolean;
}

export interface ParseError {
  line: number;
  column: number;
  message: string;
}

export interface ParseResult {
  document: Document | null;
  errors: ParseError[];
}
