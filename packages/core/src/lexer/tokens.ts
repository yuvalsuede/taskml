/**
 * TaskML Token Types and Definitions
 */

export enum TokenType {
  // Structural
  NEWLINE = 'NEWLINE',
  INDENT = 'INDENT',
  DEDENT = 'DEDENT',
  EOF = 'EOF',

  // Directives
  DIRECTIVE = 'DIRECTIVE',

  // Task Status
  STATUS_PENDING = 'STATUS_PENDING',         // [ ]
  STATUS_IN_PROGRESS = 'STATUS_IN_PROGRESS', // [~]
  STATUS_COMPLETED = 'STATUS_COMPLETED',     // [x]
  STATUS_BLOCKED = 'STATUS_BLOCKED',         // [!]
  STATUS_CANCELLED = 'STATUS_CANCELLED',     // [-]
  STATUS_REVIEW = 'STATUS_REVIEW',           // [?]

  // Task Tokens (inline metadata)
  PRIORITY = 'PRIORITY',       // #p0 - #p3
  ESTIMATE = 'ESTIMATE',       // ~4h, ~2d
  ASSIGNEE = 'ASSIGNEE',       // @alice (in task context)
  TAG = 'TAG',                 // #backend
  DUE_DATE = 'DUE_DATE',       // !2026-01-15
  TASK_ID = 'TASK_ID',         // ^task-123

  // Verification Criteria
  CRITERION_VERIFIED = 'CRITERION_VERIFIED', // ✓ or [✓]
  CRITERION_FAILED = 'CRITERION_FAILED',     // ✗ or [✗]
  CRITERION_PENDING = 'CRITERION_PENDING',   // ○ or [○]

  // Special Lines
  COMMENT = 'COMMENT',         // // ...
  NOTE_PREFIX = 'NOTE_PREFIX', // - (for notes in task context)

  // Keywords
  DEPENDS = 'DEPENDS',         // depends:
  BLOCKED_BY = 'BLOCKED_BY',   // blocked-by:
  EVIDENCE = 'EVIDENCE',       // evidence:

  // Blocks/Fences
  VIEW_FENCE = 'VIEW_FENCE',       // ---view:
  CONTEXT_START = 'CONTEXT_START', // ---context
  HANDOFF_START = 'HANDOFF_START', // ---handoff
  FENCE_END = 'FENCE_END',         // ---

  // Content
  TEXT = 'TEXT',
  IDENTIFIER = 'IDENTIFIER',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  DATE = 'DATE',

  // Punctuation
  COLON = 'COLON',
  EQUALS = 'EQUALS',
  COMMA = 'COMMA',
}

/**
 * A single token from the lexer
 */
export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
  /** Raw text that produced this token */
  raw?: string;
}

/**
 * Position in source text
 */
export interface Position {
  line: number;
  column: number;
  offset: number;
}

/**
 * Span in source text
 */
export interface Span {
  start: Position;
  end: Position;
}

/**
 * Map status characters to token types
 */
export const STATUS_CHAR_MAP: Record<string, TokenType> = {
  ' ': TokenType.STATUS_PENDING,
  '~': TokenType.STATUS_IN_PROGRESS,
  'x': TokenType.STATUS_COMPLETED,
  'X': TokenType.STATUS_COMPLETED,
  '!': TokenType.STATUS_BLOCKED,
  '-': TokenType.STATUS_CANCELLED,
  '?': TokenType.STATUS_REVIEW,
};

/**
 * Map token types to task status strings
 */
export const TOKEN_TO_STATUS: Record<string, string> = {
  [TokenType.STATUS_PENDING]: 'pending',
  [TokenType.STATUS_IN_PROGRESS]: 'in_progress',
  [TokenType.STATUS_COMPLETED]: 'completed',
  [TokenType.STATUS_BLOCKED]: 'blocked',
  [TokenType.STATUS_CANCELLED]: 'cancelled',
  [TokenType.STATUS_REVIEW]: 'review',
};

/**
 * Standard directives recognized by TaskML
 */
export const STANDARD_DIRECTIVES = new Set([
  'project',
  'sprint',
  'version',
  'author',
  'created',
  'updated',
  'agent',
  'agent-id',
]);

/**
 * Create a token with position info
 */
export function createToken(
  type: TokenType,
  value: string,
  line: number,
  column: number,
  raw?: string
): Token {
  return { type, value, line, column, raw };
}
