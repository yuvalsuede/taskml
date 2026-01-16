/**
 * @taskml/core - TaskML Parser and Renderer
 *
 * A TypeScript library for parsing and rendering TaskML documents.
 */

export * from './types';
export { tokenize, TokenType } from './lexer';
export type { Token } from './lexer';
export { parse } from './parser';

// Error types
export {
  ErrorCode,
  ErrorSeverity,
  ERROR_MESSAGES,
  ERROR_SUGGESTIONS,
  createError,
  formatError,
} from './errors';
export type { TaskMLError } from './errors';

// Interchange formats
export {
  toJSON,
  fromJSON,
  stringify as stringifyJSON,
  parseJSON,
} from './interchange/json';
export type { TaskMLJSON, TaskJSON, CriterionJSON, ViewConfigJSON } from './interchange/json';

export {
  toYAML,
  fromYAML,
  stringify as stringifyYAML,
  parseYAMLString,
} from './interchange/yaml';

// Renderer
export {
  render,
  getStyles,
  getRenderer,
  registerRenderer,
  getAvailableViews,
  createContext,
  toRenderableTasks,
  flattenTasks,
  groupByStatus,
  calculateStats,
  escapeHtml,
  generateCSSVars,
  CSS_VARS,
  DARK_THEME_VARS,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
} from './renderer';

export type {
  RenderContext,
  ViewRenderer,
  RenderableTask,
  StatusConfig,
  PriorityConfig,
} from './renderer';

import type {
  Document,
  ParseOptions,
  ParseResult,
} from './types';
import { parse as parseImpl } from './parser';

/**
 * Parse a TaskML string, throwing on errors.
 *
 * @param input - The TaskML string to parse
 * @param options - Parse options
 * @returns The parsed Document
 * @throws Error if parsing fails
 */
export function parseOrThrow(input: string, options?: ParseOptions): Document {
  const result = parseImpl(input, options);

  if (result.errors.length > 0) {
    const errorMessages = result.errors
      .map(e => `Line ${e.line}: ${e.message}`)
      .join('\n');
    throw new Error(`TaskML parse errors:\n${errorMessages}`);
  }

  if (!result.document) {
    throw new Error('Parse failed with no document');
  }

  return result.document;
}

/**
 * Validate a TaskML string without fully parsing.
 *
 * @param input - The TaskML string to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validate(input: string): ParseResult['errors'] {
  const result = parseImpl(input, { strict: true });
  return result.errors;
}

/**
 * Format a TaskML string with consistent styling.
 *
 * @param input - The TaskML string to format
 * @returns The formatted TaskML string
 */
export function format(input: string): string {
  // TODO: Implement formatter
  return input.trim();
}

// Version info
export const VERSION = '0.1.0';
export const SPEC_VERSION = '1.1';
