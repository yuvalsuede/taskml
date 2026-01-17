/**
 * TaskML Document Formatter
 *
 * Formats TaskML documents with consistent indentation, spacing, and alignment.
 */

export interface FormatOptions {
  /** Indentation: 'spaces' (2 spaces) or 'tabs' */
  indent?: 'spaces' | 'tabs';
  /** Number of spaces per indent level (if using spaces) */
  indentSize?: number;
  /** Whether to trim trailing whitespace */
  trimTrailingWhitespace?: boolean;
  /** Whether to add blank line after sections */
  blankLineAfterSections?: boolean;
}

const DEFAULT_OPTIONS: FormatOptions = {
  indent: 'spaces',
  indentSize: 2,
  trimTrailingWhitespace: true,
  blankLineAfterSections: true,
};

/**
 * Format a TaskML document
 */
export function format(content: string, options: FormatOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const indentStr = opts.indent === 'tabs' ? '\t' : ' '.repeat(opts.indentSize || 2);

  const lines = content.split('\n');
  const formattedLines: string[] = [];

  type LineType = 'directive' | 'section' | 'task' | 'subtask' | 'criterion' | 'note' | 'comment' | 'empty' | 'other';
  let currentIndent = 0;
  let previousLineType: LineType = 'empty';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Trim trailing whitespace
    if (opts.trimTrailingWhitespace) {
      line = line.trimEnd();
    }

    // Skip empty lines but track them
    if (line.trim() === '') {
      // Don't add multiple consecutive empty lines
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1].trim() !== '') {
        formattedLines.push('');
      }
      previousLineType = 'empty';
      continue;
    }

    const trimmedLine = line.trim();
    let formattedLine = line;
    let lineType: LineType = previousLineType;

    // Detect line type and format accordingly
    if (trimmedLine.startsWith('@')) {
      // Directive: @project, @sprint, etc.
      formattedLine = trimmedLine;
      lineType = 'directive';
      currentIndent = 0;
    } else if (trimmedLine.startsWith('==') && trimmedLine.endsWith('==')) {
      // Section header
      // Add blank line before section (unless at start)
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1].trim() !== '') {
        formattedLines.push('');
      }
      formattedLine = trimmedLine;
      lineType = 'section';
      currentIndent = 0;
    } else if (trimmedLine.startsWith('//')) {
      // Comment - preserve current indent
      const leadingWhitespace = line.match(/^\s*/)?.[0] || '';
      const detectedIndent = Math.floor(leadingWhitespace.replace(/\t/g, '  ').length / 2);
      formattedLine = indentStr.repeat(detectedIndent) + trimmedLine;
      lineType = 'comment';
    } else if (/^[\[◐◎●○⊘⊖]/.test(trimmedLine) || /^\[.\]/.test(trimmedLine)) {
      // Top-level task
      formattedLine = trimmedLine;
      lineType = 'task';
      currentIndent = 1;
    } else if (trimmedLine.startsWith('-') && !trimmedLine.startsWith('->') && !trimmedLine.startsWith('<-')) {
      // Note line
      formattedLine = indentStr.repeat(currentIndent) + trimmedLine;
      lineType = 'note';
    } else if (/^[○●✗]/.test(trimmedLine)) {
      // Acceptance criterion
      formattedLine = indentStr.repeat(currentIndent) + trimmedLine;
      lineType = 'criterion';
    } else {
      // Check if this is a subtask (indented task)
      const leadingWhitespace = line.match(/^\s*/)?.[0] || '';
      const detectedIndent = Math.floor(leadingWhitespace.replace(/\t/g, '  ').length / 2);

      if (/^[\[◐◎●○⊘⊖]/.test(trimmedLine) || /^\[.\]/.test(trimmedLine)) {
        // Subtask
        formattedLine = indentStr.repeat(detectedIndent) + trimmedLine;
        currentIndent = detectedIndent + 1;
        lineType = 'subtask';
      } else {
        // Other content - preserve relative indent
        formattedLine = indentStr.repeat(detectedIndent) + trimmedLine;
        lineType = 'other';
      }
    }

    formattedLines.push(formattedLine);
    previousLineType = lineType;
  }

  // Join lines and ensure single trailing newline
  let result = formattedLines.join('\n');

  // Remove trailing empty lines
  result = result.replace(/\n+$/, '');

  // Add single trailing newline
  return result + '\n';
}

/**
 * Check if content needs formatting
 */
export function needsFormatting(content: string): boolean {
  const formatted = format(content);
  return formatted !== content;
}
