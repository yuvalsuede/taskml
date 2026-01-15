/**
 * TaskML Parser - Builds AST from tokens
 */

import { Token, TokenType, TOKEN_TO_STATUS, tokenize, LexerOptions } from '../lexer';
import type {
  Document,
  Task,
  TaskStatus,
  ViewConfig,
  ViewType,
  Criterion,
  AgentContext,
  HandoffInfo,
  Comment,
  ParseError,
  ParseResult,
  ParseOptions,
} from '../types';

/**
 * Parser for TaskML documents
 */
export class Parser {
  private tokens: Token[] = [];
  private current: number = 0;
  private errors: ParseError[] = [];
  private strict: boolean;

  constructor(options: ParseOptions = {}) {
    this.strict = options.strict ?? false;
  }

  /**
   * Parse tokens into a Document AST
   */
  parse(tokens: Token[]): ParseResult {
    this.tokens = tokens;
    this.current = 0;
    this.errors = [];

    try {
      const document = this.parseDocument();
      return { document, errors: this.errors };
    } catch (e) {
      // Fatal error
      this.addError(`Fatal parse error: ${e}`);
      return {
        document: null,
        errors: this.errors,
      };
    }
  }

  /** Check if strict mode is enabled */
  isStrict(): boolean {
    return this.strict;
  }

  private parseDocument(): Document {
    const directives: Record<string, string> = {};
    const tasks: Task[] = [];
    const comments: Comment[] = [];
    let view: ViewConfig | undefined;
    let agentContext: AgentContext | undefined;
    let handoff: HandoffInfo | undefined;

    // Skip leading newlines
    this.skipNewlines();

    // Parse directives at the top
    while (this.check(TokenType.DIRECTIVE)) {
      const token = this.advance();
      directives[token.value] = token.raw ?? '';

      // Handle agent-specific directives
      if (token.value === 'agent') {
        agentContext = agentContext ?? {};
        agentContext.model = token.raw;
      } else if (token.value === 'agent-id') {
        agentContext = agentContext ?? {};
        agentContext.agentId = token.raw;
      }

      this.skipNewlines();
    }

    // Parse tasks
    while (!this.isAtEnd()) {
      this.skipNewlines();

      if (this.isAtEnd()) break;

      // Check for view fence
      if (this.check(TokenType.VIEW_FENCE)) {
        view = this.parseViewFence();
        continue;
      }

      // Check for context block
      if (this.check(TokenType.CONTEXT_START)) {
        agentContext = this.parseContextBlock();
        continue;
      }

      // Check for handoff block
      if (this.check(TokenType.HANDOFF_START)) {
        handoff = this.parseHandoffBlock();
        continue;
      }

      // Check for task status
      if (this.isStatusToken()) {
        const task = this.parseTask(0);
        if (task) {
          tasks.push(task);
        }
        continue;
      }

      // Check for comment (preserve)
      if (this.check(TokenType.COMMENT)) {
        const token = this.advance();
        comments.push({ line: token.line, text: token.value });
        continue;
      }

      // Check for note at root level (unusual but possible)
      if (this.check(TokenType.NOTE_PREFIX)) {
        this.advance();
        this.consumeRestOfLine();
        continue;
      }

      // Skip unknown content
      if (!this.check(TokenType.EOF) && !this.check(TokenType.NEWLINE)) {
        this.advance();
      }
    }

    const doc: Document = {
      version: directives['version'] ?? '1.1',
      directives,
      tasks,
    };

    if (view) doc.view = view;
    if (agentContext) doc.agentContext = agentContext;
    if (handoff) doc.handoff = handoff;
    if (comments.length > 0) doc.comments = comments;

    return doc;
  }

  private parseTask(depth: number): Task | null {
    // Get status token
    const statusToken = this.advance();
    const status = TOKEN_TO_STATUS[statusToken.type] as TaskStatus;

    if (!status) {
      this.addError(`Expected task status, got ${statusToken.type}`, statusToken);
      return null;
    }

    // Parse task content (description and tokens)
    const task: Task = {
      status,
      description: '',
    };

    // Collect description and inline tokens
    this.parseTaskContent(task);

    // Skip to end of line
    this.skipToNewline();
    this.skipNewlines();

    // Check for subtasks (increased indentation)
    if (this.check(TokenType.INDENT)) {
      this.advance(); // consume INDENT

      // Parse all items at this indent level
      while (!this.isAtEnd() && !this.check(TokenType.DEDENT)) {
        this.skipNewlines();

        if (this.check(TokenType.DEDENT) || this.isAtEnd()) break;

        // Check what's at this indent level
        if (this.isStatusToken()) {
          // Subtask
          const subtask = this.parseTask(depth + 1);
          if (subtask) {
            task.subtasks = task.subtasks ?? [];
            task.subtasks.push(subtask);
          }
        } else if (this.check(TokenType.NOTE_PREFIX)) {
          // Note
          this.advance();
          const noteText = this.consumeRestOfLine();
          task.notes = task.notes ?? [];
          task.notes.push(noteText.trim());
          this.skipNewlines();
        } else if (this.check(TokenType.DEPENDS)) {
          // Dependencies
          this.advance();
          task.dependsOn = this.parseDependencyList();
          this.skipNewlines();
        } else if (this.check(TokenType.BLOCKED_BY)) {
          // Blocked by
          this.advance();
          task.blockedBy = this.parseDependencyList();
          this.skipNewlines();
        } else if (this.isCriterionToken()) {
          // Verification criterion
          const criterion = this.parseCriterion();
          if (criterion) {
            task.criteria = task.criteria ?? [];
            task.criteria.push(criterion);
          }
          this.skipNewlines();
        } else if (this.check(TokenType.EVIDENCE)) {
          // Evidence for previous criterion
          this.advance();
          const evidence = this.consumeRestOfLine().trim();
          if (task.criteria && task.criteria.length > 0) {
            task.criteria[task.criteria.length - 1].evidence = evidence;
          }
          this.skipNewlines();
        } else if (this.check(TokenType.TEXT)) {
          // Text that isn't a note - might be continuation, skip it
          this.consumeRestOfLine();
          this.skipNewlines();
        } else if (!this.check(TokenType.NEWLINE) && !this.check(TokenType.INDENT)) {
          // Unknown content, skip
          this.advance();
        }
      }

      // Consume the DEDENT
      if (this.check(TokenType.DEDENT)) {
        this.advance();
      }
    }

    return task;
  }

  private parseTaskContent(task: Task): void {
    const descParts: string[] = [];

    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF)) {
      const token = this.peek();

      switch (token.type) {
        case TokenType.PRIORITY:
          this.advance();
          task.priority = parseInt(token.value, 10);
          break;

        case TokenType.ESTIMATE:
          this.advance();
          task.estimate = token.value;
          break;

        case TokenType.ASSIGNEE:
          this.advance();
          task.assignee = token.value;
          break;

        case TokenType.TAG:
          this.advance();
          task.tags = task.tags ?? [];
          task.tags.push(token.value);
          break;

        case TokenType.DUE_DATE:
          this.advance();
          task.due = token.value;
          break;

        case TokenType.TASK_ID:
          this.advance();
          task.id = token.value;
          break;

        case TokenType.TEXT:
          this.advance();
          descParts.push(token.value);
          break;

        default:
          // Unknown token in task line, include as text
          this.advance();
          if (token.value) {
            descParts.push(token.value);
          }
          break;
      }
    }

    task.description = descParts.join('').trim();
  }

  private parseDependencyList(): string[] {
    const deps: string[] = [];

    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE)) {
      if (this.check(TokenType.TASK_ID)) {
        deps.push(this.advance().value);
      } else if (this.check(TokenType.COMMA)) {
        this.advance();
      } else if (this.check(TokenType.TEXT)) {
        // Might have inline IDs without ^
        const text = this.advance().value.trim();
        if (text) {
          // Split by comma
          const parts = text.split(',').map(s => s.trim()).filter(Boolean);
          deps.push(...parts);
        }
      } else {
        this.advance();
      }
    }

    return deps;
  }

  private parseCriterion(): Criterion | null {
    const token = this.advance();

    let status: 'pending' | 'verified' | 'failed';
    switch (token.type) {
      case TokenType.CRITERION_VERIFIED:
        status = 'verified';
        break;
      case TokenType.CRITERION_FAILED:
        status = 'failed';
        break;
      case TokenType.CRITERION_PENDING:
        status = 'pending';
        break;
      default:
        return null;
    }

    const description = this.consumeRestOfLine().trim();

    return { status, description };
  }

  private parseViewFence(): ViewConfig {
    const token = this.advance();
    const viewType = token.value as ViewType;
    const options: Record<string, string> = {};

    // Parse options (key=value pairs)
    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE)) {
      if (this.check(TokenType.TEXT) || this.check(TokenType.IDENTIFIER)) {
        const text = this.advance().value.trim();
        // Parse key=value
        const eqIdx = text.indexOf('=');
        if (eqIdx > 0) {
          const key = text.slice(0, eqIdx);
          const value = text.slice(eqIdx + 1);
          options[key] = value;
        }
      } else {
        this.advance();
      }
    }

    return { type: viewType, options };
  }

  private parseContextBlock(): AgentContext {
    this.advance(); // consume CONTEXT_START
    this.skipNewlines();

    const context: AgentContext = {};
    let jsonContent = '';

    // Collect content until fence end
    while (!this.isAtEnd() && !this.check(TokenType.FENCE_END)) {
      if (this.check(TokenType.TEXT)) {
        jsonContent += this.advance().value;
      } else if (this.check(TokenType.NEWLINE)) {
        jsonContent += '\n';
        this.advance();
      } else {
        this.advance();
      }
    }

    if (this.check(TokenType.FENCE_END)) {
      this.advance();
    }

    // Try to parse JSON content
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed.session_id) context.sessionId = parsed.session_id;
      if (parsed.model) context.model = parsed.model;
      if (parsed.started_at) context.startedAt = parsed.started_at;
      if (parsed.agent_id) context.agentId = parsed.agent_id;
      context.metadata = parsed;
    } catch {
      // Not valid JSON, store as raw metadata
      context.metadata = { raw: jsonContent.trim() };
    }

    return context;
  }

  private parseHandoffBlock(): HandoffInfo {
    this.advance(); // consume HANDOFF_START
    this.skipNewlines();

    const handoff: HandoffInfo = { from: '', to: '' };

    // Parse YAML-like key: value pairs
    while (!this.isAtEnd() && !this.check(TokenType.FENCE_END)) {
      const line = this.consumeRestOfLine().trim();

      if (line.startsWith('from:')) {
        handoff.from = line.slice(5).trim();
      } else if (line.startsWith('to:')) {
        handoff.to = line.slice(3).trim();
      } else if (line.startsWith('reason:')) {
        handoff.reason = line.slice(7).trim().replace(/^["']|["']$/g, '');
      } else if (line.startsWith('context:')) {
        const contextStr = line.slice(8).trim();
        try {
          handoff.context = JSON.parse(contextStr);
        } catch {
          handoff.context = { raw: contextStr };
        }
      }

      this.skipNewlines();
    }

    if (this.check(TokenType.FENCE_END)) {
      this.advance();
    }

    return handoff;
  }

  // Helper methods

  private isStatusToken(): boolean {
    const type = this.peek().type;
    return (
      type === TokenType.STATUS_PENDING ||
      type === TokenType.STATUS_IN_PROGRESS ||
      type === TokenType.STATUS_COMPLETED ||
      type === TokenType.STATUS_BLOCKED ||
      type === TokenType.STATUS_CANCELLED ||
      type === TokenType.STATUS_REVIEW
    );
  }

  private isCriterionToken(): boolean {
    const type = this.peek().type;
    return (
      type === TokenType.CRITERION_VERIFIED ||
      type === TokenType.CRITERION_FAILED ||
      type === TokenType.CRITERION_PENDING
    );
  }

  private peek(): Token {
    return this.tokens[this.current] ?? { type: TokenType.EOF, value: '', line: 0, column: 0 };
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.tokens[this.current - 1];
  }

  private check(type: TokenType): boolean {
    return this.peek().type === type;
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private skipNewlines(): void {
    while (this.check(TokenType.NEWLINE)) {
      this.advance();
    }
  }

  private skipToNewline(): void {
    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF)) {
      this.advance();
    }
  }

  private consumeRestOfLine(): string {
    let result = '';
    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE) && !this.check(TokenType.EOF)) {
      const token = this.advance();
      result += token.value;
      if (token.raw) result += ' ' + token.raw;
    }
    return result;
  }

  private addError(message: string, token?: Token): void {
    const line = token?.line ?? this.peek().line;
    const column = token?.column ?? this.peek().column;
    this.errors.push({ line, column, message });
  }
}

/**
 * Parse a TaskML string into a Document AST
 */
export function parse(input: string, options?: ParseOptions): ParseResult {
  const lexerOptions: LexerOptions = {
    preserveComments: true,
  };

  const { tokens, errors: lexerErrors } = tokenize(input, lexerOptions);

  // Convert lexer errors to parse errors
  const parseErrors: ParseError[] = lexerErrors.map(e => ({
    line: e.line,
    column: e.column,
    message: e.message,
  }));

  const parser = new Parser(options);
  const result = parser.parse(tokens);

  return {
    document: result.document,
    errors: [...parseErrors, ...result.errors],
  };
}
