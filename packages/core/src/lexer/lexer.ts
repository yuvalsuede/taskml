/**
 * TaskML Lexer - Tokenizes TaskML input
 */

import {
  Token,
  TokenType,
  STATUS_CHAR_MAP,
  createToken,
} from './tokens';

export interface LexerOptions {
  /** Preserve comments in token stream */
  preserveComments?: boolean;
}

export interface LexerResult {
  tokens: Token[];
  errors: LexerError[];
}

export interface LexerError {
  line: number;
  column: number;
  message: string;
}

/**
 * Lexer for TaskML documents
 */
export class Lexer {
  private input: string;
  private pos: number = 0;
  private line: number = 1;
  private column: number = 1;
  private tokens: Token[] = [];
  private errors: LexerError[] = [];
  private indentStack: number[] = [0];
  private options: LexerOptions;

  constructor(input: string, options: LexerOptions = {}) {
    this.input = input;
    this.options = options;
  }

  /**
   * Tokenize the entire input
   */
  tokenize(): LexerResult {
    while (!this.isAtEnd()) {
      this.scanToken();
    }

    // Emit remaining dedents
    while (this.indentStack.length > 1) {
      this.indentStack.pop();
      this.addToken(TokenType.DEDENT, '');
    }

    this.addToken(TokenType.EOF, '');

    return {
      tokens: this.tokens,
      errors: this.errors,
    };
  }

  private scanToken(): void {
    // Handle start of line (indentation)
    if (this.column === 1) {
      this.handleIndentation();
    }

    this.skipWhitespace();

    if (this.isAtEnd()) return;

    const char = this.peek();

    // Newline
    if (char === '\n') {
      this.addToken(TokenType.NEWLINE, '\n');
      this.advance();
      this.line++;
      this.column = 1;
      return;
    }

    // Carriage return (handle \r\n)
    if (char === '\r') {
      this.advance();
      if (this.peek() === '\n') {
        this.advance();
      }
      this.addToken(TokenType.NEWLINE, '\n');
      this.line++;
      this.column = 1;
      return;
    }

    // Comment
    if (char === '/' && this.peekNext() === '/') {
      this.scanComment();
      return;
    }

    // Directive
    if (char === '@' && this.column <= this.currentIndent() + 2) {
      this.scanDirective();
      return;
    }

    // Task status [ ]
    if (char === '[') {
      if (this.scanStatus()) return;
    }

    // View/Context/Handoff fence
    if (char === '-' && this.peek(1) === '-' && this.peek(2) === '-') {
      this.scanFence();
      return;
    }

    // Note prefix (- at start of logical line)
    if (char === '-' && this.isStartOfLogicalLine()) {
      this.addToken(TokenType.NOTE_PREFIX, '-');
      this.advance();
      return;
    }

    // Verification criteria
    if (this.scanCriterion()) return;

    // Priority #p0-#p3
    if (char === '#' && this.peekNext() === 'p') {
      if (this.scanPriority()) return;
    }

    // Tag #tag
    if (char === '#') {
      this.scanTag();
      return;
    }

    // Estimate ~4h
    if (char === '~') {
      if (this.scanEstimate()) return;
    }

    // Due date !2026-01-15
    if (char === '!') {
      if (this.scanDueDate()) return;
    }

    // Task ID ^id
    if (char === '^') {
      this.scanTaskId();
      return;
    }

    // Assignee @name (in task context, not directive)
    if (char === '@') {
      this.scanAssignee();
      return;
    }

    // Keywords: depends:, blocked-by:, evidence:
    if (this.scanKeyword()) return;

    // Punctuation
    if (char === ':') {
      this.addToken(TokenType.COLON, ':');
      this.advance();
      return;
    }
    if (char === '=') {
      this.addToken(TokenType.EQUALS, '=');
      this.advance();
      return;
    }
    if (char === ',') {
      this.addToken(TokenType.COMMA, ',');
      this.advance();
      return;
    }

    // Text content (rest of line or until token)
    this.scanText();
  }

  private handleIndentation(): void {
    let indent = 0;
    while (this.peek() === ' ' || this.peek() === '\t') {
      if (this.peek() === '\t') {
        indent += 4; // Treat tab as 4 spaces
      } else {
        indent++;
      }
      this.advance();
    }

    // Skip blank lines
    if (this.peek() === '\n' || this.peek() === '\r' || this.isAtEnd()) {
      return;
    }

    // Skip comment-only lines for indentation tracking
    if (this.peek() === '/' && this.peekNext() === '/') {
      return;
    }

    const currentIndent = this.currentIndent();

    if (indent > currentIndent) {
      this.indentStack.push(indent);
      this.addToken(TokenType.INDENT, ' '.repeat(indent - currentIndent));
    } else if (indent < currentIndent) {
      while (this.indentStack.length > 1 && this.currentIndent() > indent) {
        this.indentStack.pop();
        this.addToken(TokenType.DEDENT, '');
      }
      if (this.currentIndent() !== indent) {
        this.error(`Inconsistent indentation: expected ${this.currentIndent()} spaces, got ${indent}`);
      }
    }
  }

  private scanComment(): void {
    const startCol = this.column;
    this.advance(); // /
    this.advance(); // /

    let content = '';
    while (!this.isAtEnd() && this.peek() !== '\n' && this.peek() !== '\r') {
      content += this.advance();
    }

    if (this.options.preserveComments) {
      this.addToken(TokenType.COMMENT, content.trim(), startCol);
    }
  }

  private scanDirective(): void {
    const startCol = this.column;
    this.advance(); // @

    let name = '';
    while (!this.isAtEnd() && this.isIdentifierChar(this.peek())) {
      name += this.advance();
    }

    this.skipWhitespace();

    let value = '';
    while (!this.isAtEnd() && this.peek() !== '\n' && this.peek() !== '\r') {
      value += this.advance();
    }

    this.tokens.push({
      type: TokenType.DIRECTIVE,
      value: name,
      line: this.line,
      column: startCol,
      raw: value.trim(),
    });
  }

  private scanStatus(): boolean {
    if (this.peek() !== '[') return false;

    const next = this.peek(1);
    const close = this.peek(2);

    if (close !== ']') return false;

    const tokenType = STATUS_CHAR_MAP[next];
    if (!tokenType) return false;

    const startCol = this.column;
    this.advance(); // [
    this.advance(); // status char
    this.advance(); // ]

    this.addToken(tokenType, next, startCol);
    return true;
  }

  private scanFence(): void {
    const startCol = this.column;
    this.advance(); // -
    this.advance(); // -
    this.advance(); // -

    // Check for fence end (just ---)
    if (this.isAtEnd() || this.peek() === '\n' || this.peek() === '\r') {
      this.addToken(TokenType.FENCE_END, '---', startCol);
      return;
    }

    // Check for view fence (---view:)
    if (this.matchString('view:')) {
      let viewName = '';
      while (!this.isAtEnd() && this.isIdentifierChar(this.peek())) {
        viewName += this.advance();
      }
      this.tokens.push({
        type: TokenType.VIEW_FENCE,
        value: viewName,
        line: this.line,
        column: startCol,
      });
      return;
    }

    // Check for context fence (---context)
    if (this.matchString('context')) {
      this.addToken(TokenType.CONTEXT_START, 'context', startCol);
      return;
    }

    // Check for handoff fence (---handoff)
    if (this.matchString('handoff')) {
      this.addToken(TokenType.HANDOFF_START, 'handoff', startCol);
      return;
    }

    // Unknown fence, treat as text
    this.addToken(TokenType.TEXT, '---', startCol);
  }

  private scanCriterion(): boolean {
    const char = this.peek();

    // Unicode check marks
    if (char === '✓') {
      this.addToken(TokenType.CRITERION_VERIFIED, '✓');
      this.advance();
      return true;
    }
    if (char === '✗') {
      this.addToken(TokenType.CRITERION_FAILED, '✗');
      this.advance();
      return true;
    }
    if (char === '○') {
      this.addToken(TokenType.CRITERION_PENDING, '○');
      this.advance();
      return true;
    }

    // Bracketed form [✓], [✗], [○]
    if (char === '[') {
      const inner = this.peek(1);
      const close = this.peek(2);
      if (close === ']') {
        if (inner === '✓') {
          this.advance(); this.advance(); this.advance();
          this.addToken(TokenType.CRITERION_VERIFIED, '✓');
          return true;
        }
        if (inner === '✗') {
          this.advance(); this.advance(); this.advance();
          this.addToken(TokenType.CRITERION_FAILED, '✗');
          return true;
        }
        if (inner === '○') {
          this.advance(); this.advance(); this.advance();
          this.addToken(TokenType.CRITERION_PENDING, '○');
          return true;
        }
      }
    }

    return false;
  }

  private scanPriority(): boolean {
    if (this.peek() !== '#' || this.peekNext() !== 'p') return false;

    const digit = this.peek(2);
    if (digit < '0' || digit > '3') return false;

    const startCol = this.column;
    this.advance(); // #
    this.advance(); // p
    this.advance(); // digit

    this.addToken(TokenType.PRIORITY, digit, startCol);
    return true;
  }

  private scanTag(): void {
    const startCol = this.column;
    this.advance(); // #

    let name = '';
    while (!this.isAtEnd() && this.isIdentifierChar(this.peek())) {
      name += this.advance();
    }

    if (name) {
      this.addToken(TokenType.TAG, name, startCol);
    }
  }

  private scanEstimate(): boolean {
    if (this.peek() !== '~') return false;

    const startCol = this.column;
    let pos = 1;
    let num = '';

    while (this.peek(pos) >= '0' && this.peek(pos) <= '9') {
      num += this.peek(pos);
      pos++;
    }

    if (!num) return false;

    const unit = this.peek(pos);
    if (unit !== 'h' && unit !== 'd') return false;

    // Consume all characters
    this.advance(); // ~
    for (let i = 0; i < num.length; i++) this.advance();
    this.advance(); // unit

    this.addToken(TokenType.ESTIMATE, num + unit, startCol);
    return true;
  }

  private scanDueDate(): boolean {
    if (this.peek() !== '!') return false;

    // Check for date pattern: !YYYY-MM-DD
    const datePattern = /^\d{4}-\d{2}-\d{2}/;
    const remaining = this.input.slice(this.pos + 1);
    const match = remaining.match(datePattern);

    if (!match) return false;

    const startCol = this.column;
    this.advance(); // !

    const date = match[0];
    for (let i = 0; i < date.length; i++) {
      this.advance();
    }

    this.addToken(TokenType.DUE_DATE, date, startCol);
    return true;
  }

  private scanTaskId(): void {
    const startCol = this.column;
    this.advance(); // ^

    let id = '';
    while (!this.isAtEnd() && (this.isIdentifierChar(this.peek()) || this.peek() === '-')) {
      id += this.advance();
    }

    if (id) {
      this.addToken(TokenType.TASK_ID, id, startCol);
    }
  }

  private scanAssignee(): void {
    const startCol = this.column;
    this.advance(); // @

    let name = '';
    while (!this.isAtEnd() && this.isIdentifierChar(this.peek())) {
      name += this.advance();
    }

    if (name) {
      this.addToken(TokenType.ASSIGNEE, name, startCol);
    }
  }

  private scanKeyword(): boolean {
    const keywords = [
      { text: 'depends:', type: TokenType.DEPENDS },
      { text: 'blocked-by:', type: TokenType.BLOCKED_BY },
      { text: 'evidence:', type: TokenType.EVIDENCE },
    ];

    for (const kw of keywords) {
      if (this.matchString(kw.text)) {
        this.addToken(kw.type, kw.text.slice(0, -1)); // Remove colon from value
        return true;
      }
    }

    return false;
  }

  private scanText(): void {
    const startCol = this.column;
    let text = '';

    // Collect text until we hit a special character or end of line
    while (!this.isAtEnd()) {
      const char = this.peek();

      // Stop at end of line
      if (char === '\n' || char === '\r') break;

      // Stop at special characters that might start tokens
      if (this.isTokenStart(char)) break;

      text += this.advance();
    }

    if (text) {
      this.addToken(TokenType.TEXT, text, startCol);
    }
  }

  private isTokenStart(char: string): boolean {
    return (
      char === '#' ||
      char === '@' ||
      char === '~' ||
      char === '!' ||
      char === '^' ||
      char === '[' ||
      char === '✓' ||
      char === '✗' ||
      char === '○'
    );
  }

  // Helper methods

  private isAtEnd(): boolean {
    return this.pos >= this.input.length;
  }

  private peek(offset: number = 0): string {
    const idx = this.pos + offset;
    if (idx >= this.input.length) return '\0';
    return this.input[idx];
  }

  private peekNext(): string {
    return this.peek(1);
  }

  private advance(): string {
    const char = this.input[this.pos];
    this.pos++;
    this.column++;
    return char;
  }

  private skipWhitespace(): void {
    while (!this.isAtEnd()) {
      const char = this.peek();
      if (char === ' ' || char === '\t') {
        this.advance();
      } else {
        break;
      }
    }
  }

  private matchString(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
      if (this.peek(i) !== str[i]) return false;
    }
    for (let i = 0; i < str.length; i++) {
      this.advance();
    }
    return true;
  }

  private isIdentifierChar(char: string): boolean {
    return (
      (char >= 'a' && char <= 'z') ||
      (char >= 'A' && char <= 'Z') ||
      (char >= '0' && char <= '9') ||
      char === '_' ||
      char === '-'
    );
  }

  private isStartOfLogicalLine(): boolean {
    // Check if we're at the start of content after indentation
    return this.tokens.length === 0 ||
      this.tokens[this.tokens.length - 1].type === TokenType.INDENT ||
      this.tokens[this.tokens.length - 1].type === TokenType.NEWLINE ||
      this.tokens[this.tokens.length - 1].type === TokenType.DEDENT;
  }

  private currentIndent(): number {
    return this.indentStack[this.indentStack.length - 1];
  }

  private addToken(type: TokenType, value: string, column?: number): void {
    this.tokens.push(createToken(type, value, this.line, column ?? this.column));
  }

  private error(message: string): void {
    this.errors.push({
      line: this.line,
      column: this.column,
      message,
    });
  }
}

/**
 * Tokenize a TaskML string
 */
export function tokenize(input: string, options?: LexerOptions): LexerResult {
  const lexer = new Lexer(input, options);
  return lexer.tokenize();
}
