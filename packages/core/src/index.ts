/**
 * @taskml/core - TaskML Parser and Renderer
 *
 * A TypeScript library for parsing and rendering TaskML documents.
 */

export * from './types';
export { tokenize, TokenType } from './lexer';
export type { Token } from './lexer';
export { parse } from './parser';

import type {
  Document,
  ParseOptions,
  ParseResult,
  RenderOptions
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
 * Render a TaskML Document to various output formats.
 *
 * @param doc - The Document to render
 * @param options - Render options
 * @returns The rendered output string
 *
 * @example
 * ```typescript
 * const html = render(doc, { format: 'html', view: 'kanban' });
 * const md = render(doc, { format: 'markdown' });
 * ```
 */
export function render(doc: Document, options?: RenderOptions): string {
  const format = options?.format ?? 'text';

  // TODO: Implement renderers in Sprint 2-3
  void doc;

  switch (format) {
    case 'json':
      return JSON.stringify(doc, null, 2);
    case 'html':
      return '<!-- HTML renderer not yet implemented -->';
    case 'markdown':
      return '<!-- Markdown renderer not yet implemented -->';
    case 'text':
    default:
      return '// Text renderer not yet implemented';
  }
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
