/**
 * TaskML Error Types and Codes
 *
 * Error codes follow the pattern:
 * - E1xx: Lexer/tokenization errors
 * - E2xx: Parser/syntax errors
 * - E3xx: Semantic errors (validation)
 * - E4xx: Interchange errors (JSON/YAML)
 * - E5xx: Renderer errors
 */

export enum ErrorCode {
  // === Lexer Errors (E1xx) ===
  /** Unexpected character in input */
  E100_UNEXPECTED_CHARACTER = 'E100',
  /** Inconsistent indentation (mixed tabs/spaces or wrong level) */
  E101_INCONSISTENT_INDENTATION = 'E101',
  /** Unterminated string literal */
  E102_UNTERMINATED_STRING = 'E102',
  /** Invalid escape sequence */
  E103_INVALID_ESCAPE = 'E103',
  /** Invalid date format (expected YYYY-MM-DD) */
  E104_INVALID_DATE_FORMAT = 'E104',
  /** Invalid estimate format (expected Nh or Nd) */
  E105_INVALID_ESTIMATE_FORMAT = 'E105',
  /** Invalid priority (expected #p0-#p3) */
  E106_INVALID_PRIORITY = 'E106',
  /** Unterminated block comment */
  E107_UNTERMINATED_COMMENT = 'E107',
  /** Invalid Unicode character */
  E108_INVALID_UNICODE = 'E108',

  // === Parser Errors (E2xx) ===
  /** Expected task status marker [ ] */
  E200_EXPECTED_STATUS = 'E200',
  /** Expected task description */
  E201_EXPECTED_DESCRIPTION = 'E201',
  /** Expected closing bracket ] */
  E202_EXPECTED_CLOSE_BRACKET = 'E202',
  /** Expected directive value after @ */
  E203_EXPECTED_DIRECTIVE_VALUE = 'E203',
  /** Unexpected token */
  E204_UNEXPECTED_TOKEN = 'E204',
  /** Invalid nesting depth */
  E205_INVALID_NESTING = 'E205',
  /** Expected fence end --- */
  E206_EXPECTED_FENCE_END = 'E206',
  /** Invalid section header */
  E207_INVALID_SECTION = 'E207',
  /** Invalid criterion marker */
  E208_INVALID_CRITERION = 'E208',
  /** Duplicate task ID */
  E209_DUPLICATE_TASK_ID = 'E209',

  // === Semantic Errors (E3xx) ===
  /** Unknown directive */
  E300_UNKNOWN_DIRECTIVE = 'E300',
  /** Invalid view type */
  E301_INVALID_VIEW_TYPE = 'E301',
  /** Unknown task status */
  E302_UNKNOWN_STATUS = 'E302',
  /** Dependency references non-existent task */
  E303_UNKNOWN_DEPENDENCY = 'E303',
  /** Circular dependency detected */
  E304_CIRCULAR_DEPENDENCY = 'E304',
  /** Token order violation (in strict mode) */
  E305_TOKEN_ORDER_VIOLATION = 'E305',
  /** Blocked-by references non-existent task */
  E306_UNKNOWN_BLOCKER = 'E306',
  /** Invalid version format */
  E307_INVALID_VERSION = 'E307',
  /** Multiple assignees not allowed */
  E308_MULTIPLE_ASSIGNEES = 'E308',

  // === Interchange Errors (E4xx) ===
  /** Invalid JSON input */
  E400_INVALID_JSON = 'E400',
  /** Invalid YAML input */
  E401_INVALID_YAML = 'E401',
  /** Missing required field */
  E402_MISSING_REQUIRED_FIELD = 'E402',
  /** Invalid field type */
  E403_INVALID_FIELD_TYPE = 'E403',
  /** Schema validation failed */
  E404_SCHEMA_VALIDATION = 'E404',

  // === Renderer Errors (E5xx) ===
  /** Unknown view type */
  E500_UNKNOWN_VIEW = 'E500',
  /** Missing required render option */
  E501_MISSING_RENDER_OPTION = 'E501',
  /** Invalid render option value */
  E502_INVALID_RENDER_OPTION = 'E502',
  /** Template not found */
  E503_TEMPLATE_NOT_FOUND = 'E503',
}

export enum ErrorSeverity {
  /** Stops parsing/processing */
  ERROR = 'error',
  /** Continues but reports issue */
  WARNING = 'warning',
  /** Informational note */
  INFO = 'info',
}

export interface TaskMLError {
  /** Error code (e.g., E100) */
  code: ErrorCode;
  /** Human-readable message */
  message: string;
  /** Severity level */
  severity: ErrorSeverity;
  /** Source file line (1-indexed) */
  line: number;
  /** Source file column (1-indexed) */
  column: number;
  /** Length of the problematic span */
  length?: number;
  /** Suggestion for fixing the error */
  suggestion?: string;
  /** Related information or context */
  related?: TaskMLError[];
}

/**
 * Error message templates
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.E100_UNEXPECTED_CHARACTER]: 'Unexpected character "{0}"',
  [ErrorCode.E101_INCONSISTENT_INDENTATION]: 'Inconsistent indentation: expected {0} spaces, got {1}',
  [ErrorCode.E102_UNTERMINATED_STRING]: 'Unterminated string literal',
  [ErrorCode.E103_INVALID_ESCAPE]: 'Invalid escape sequence "\\{0}"',
  [ErrorCode.E104_INVALID_DATE_FORMAT]: 'Invalid date format: expected YYYY-MM-DD, got "{0}"',
  [ErrorCode.E105_INVALID_ESTIMATE_FORMAT]: 'Invalid estimate format: expected Nh or Nd (e.g., 4h, 2d)',
  [ErrorCode.E106_INVALID_PRIORITY]: 'Invalid priority: expected #p0, #p1, #p2, or #p3',
  [ErrorCode.E107_UNTERMINATED_COMMENT]: 'Unterminated block comment',
  [ErrorCode.E108_INVALID_UNICODE]: 'Invalid Unicode character',

  [ErrorCode.E200_EXPECTED_STATUS]: 'Expected task status marker [ ]',
  [ErrorCode.E201_EXPECTED_DESCRIPTION]: 'Expected task description after status',
  [ErrorCode.E202_EXPECTED_CLOSE_BRACKET]: 'Expected closing bracket ]',
  [ErrorCode.E203_EXPECTED_DIRECTIVE_VALUE]: 'Expected value after directive @{0}',
  [ErrorCode.E204_UNEXPECTED_TOKEN]: 'Unexpected token "{0}"',
  [ErrorCode.E205_INVALID_NESTING]: 'Invalid nesting: maximum depth exceeded',
  [ErrorCode.E206_EXPECTED_FENCE_END]: 'Expected fence end ---',
  [ErrorCode.E207_INVALID_SECTION]: 'Invalid section header: expected == title ==',
  [ErrorCode.E208_INVALID_CRITERION]: 'Invalid verification criterion marker',
  [ErrorCode.E209_DUPLICATE_TASK_ID]: 'Duplicate task ID "{0}"',

  [ErrorCode.E300_UNKNOWN_DIRECTIVE]: 'Unknown directive @{0}',
  [ErrorCode.E301_INVALID_VIEW_TYPE]: 'Invalid view type "{0}": expected list, kanban, tree, timeline, table, graph, or summary',
  [ErrorCode.E302_UNKNOWN_STATUS]: 'Unknown task status "{0}"',
  [ErrorCode.E303_UNKNOWN_DEPENDENCY]: 'Unknown task dependency "{0}"',
  [ErrorCode.E304_CIRCULAR_DEPENDENCY]: 'Circular dependency detected: {0}',
  [ErrorCode.E305_TOKEN_ORDER_VIOLATION]: 'Token order: {0} should appear before {1}',
  [ErrorCode.E306_UNKNOWN_BLOCKER]: 'Unknown blocker task "{0}"',
  [ErrorCode.E307_INVALID_VERSION]: 'Invalid version format: expected "1.1"',
  [ErrorCode.E308_MULTIPLE_ASSIGNEES]: 'Multiple assignees not allowed on a single task',

  [ErrorCode.E400_INVALID_JSON]: 'Invalid JSON: {0}',
  [ErrorCode.E401_INVALID_YAML]: 'Invalid YAML: {0}',
  [ErrorCode.E402_MISSING_REQUIRED_FIELD]: 'Missing required field "{0}"',
  [ErrorCode.E403_INVALID_FIELD_TYPE]: 'Invalid type for field "{0}": expected {1}',
  [ErrorCode.E404_SCHEMA_VALIDATION]: 'Schema validation failed: {0}',

  [ErrorCode.E500_UNKNOWN_VIEW]: 'Unknown view type "{0}"',
  [ErrorCode.E501_MISSING_RENDER_OPTION]: 'Missing required render option "{0}"',
  [ErrorCode.E502_INVALID_RENDER_OPTION]: 'Invalid value for render option "{0}": {1}',
  [ErrorCode.E503_TEMPLATE_NOT_FOUND]: 'Template not found: {0}',
};

/**
 * Error suggestions for common mistakes
 */
export const ERROR_SUGGESTIONS: Partial<Record<ErrorCode, string>> = {
  [ErrorCode.E100_UNEXPECTED_CHARACTER]: 'Check for special characters that need escaping with \\',
  [ErrorCode.E101_INCONSISTENT_INDENTATION]: 'Use consistent indentation (4 spaces per level recommended)',
  [ErrorCode.E104_INVALID_DATE_FORMAT]: 'Use ISO 8601 format: !YYYY-MM-DD (e.g., !2026-01-15)',
  [ErrorCode.E105_INVALID_ESTIMATE_FORMAT]: 'Use ~Nh for hours or ~Nd for days (e.g., ~4h, ~2d)',
  [ErrorCode.E106_INVALID_PRIORITY]: 'Use #p0 (critical), #p1 (high), #p2 (medium), or #p3 (low)',
  [ErrorCode.E200_EXPECTED_STATUS]: 'Start task lines with [ ], [x], [~], [!], [-], or [?]',
  [ErrorCode.E202_EXPECTED_CLOSE_BRACKET]: 'Status markers need a closing bracket: [ ], [x], etc.',
  [ErrorCode.E205_INVALID_NESTING]: 'Maximum nesting depth is 10 levels. Consider restructuring tasks.',
  [ErrorCode.E206_EXPECTED_FENCE_END]: 'Close the block with --- on its own line',
  [ErrorCode.E209_DUPLICATE_TASK_ID]: 'Each ^id must be unique. Rename one of the duplicates.',
  [ErrorCode.E300_UNKNOWN_DIRECTIVE]: 'Standard directives: @project, @sprint, @version, @author, @agent',
  [ErrorCode.E301_INVALID_VIEW_TYPE]: 'Valid views: list, kanban, tree, timeline, table, graph, summary',
  [ErrorCode.E303_UNKNOWN_DEPENDENCY]: 'Ensure the referenced task exists with a matching ^id',
  [ErrorCode.E304_CIRCULAR_DEPENDENCY]: 'Remove one of the dependencies to break the cycle',
  [ErrorCode.E305_TOKEN_ORDER_VIOLATION]: 'Recommended order: description #priority ~estimate @assignee #tags !due ^id',
  [ErrorCode.E400_INVALID_JSON]: 'Check for syntax errors like missing commas or quotes',
  [ErrorCode.E401_INVALID_YAML]: 'Check indentation and use proper YAML syntax',
  [ErrorCode.E402_MISSING_REQUIRED_FIELD]: 'Add the missing field to your document',
};

/**
 * Create an error with formatted message
 */
export function createError(
  code: ErrorCode,
  line: number,
  column: number,
  args: string[] = [],
  options: {
    severity?: ErrorSeverity;
    suggestion?: string;
    length?: number;
  } = {}
): TaskMLError {
  let message = ERROR_MESSAGES[code] || 'Unknown error';

  // Replace placeholders {0}, {1}, etc. with args
  args.forEach((arg, i) => {
    message = message.replace(`{${i}}`, arg);
  });

  // Auto-include suggestion if not provided
  const suggestion = options.suggestion ?? ERROR_SUGGESTIONS[code];

  return {
    code,
    message,
    severity: options.severity ?? ErrorSeverity.ERROR,
    line,
    column,
    length: options.length,
    suggestion,
  };
}

/**
 * Format error for display
 */
export function formatError(error: TaskMLError, source?: string): string {
  const prefix = error.severity === ErrorSeverity.ERROR ? 'error' :
                 error.severity === ErrorSeverity.WARNING ? 'warning' : 'info';

  let output = `${prefix}[${error.code}]: ${error.message} (${error.line}:${error.column})`;

  if (error.suggestion) {
    output += `\n  suggestion: ${error.suggestion}`;
  }

  if (source) {
    const lines = source.split('\n');
    const line = lines[error.line - 1];
    if (line) {
      output += `\n  ${error.line} | ${line}`;
      output += `\n    ${' '.repeat(String(error.line).length)}| ${' '.repeat(error.column - 1)}${'~'.repeat(error.length || 1)}`;
    }
  }

  return output;
}
