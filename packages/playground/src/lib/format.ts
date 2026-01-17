/**
 * TaskML Document Formatter
 *
 * Re-exports the format function from the core library.
 */

export { format as formatTaskML, needsFormatting } from 'taskml';
export type { FormatOptions } from 'taskml';

/**
 * Sort tasks by priority within sections
 * (Advanced feature - just returns formatted for now)
 */
export function sortByPriority(content: string): string {
  const { format } = require('taskml');
  return format(content);
}
