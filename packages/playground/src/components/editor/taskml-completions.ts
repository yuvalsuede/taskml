/**
 * TaskML Completions and Snippets for Monaco Editor
 */

import type { languages, Position, editor } from 'monaco-editor';

interface SnippetDefinition {
  label: string;
  insertText: string;
  documentation: string;
  detail?: string;
}

// TaskML Snippets
const SNIPPETS: SnippetDefinition[] = [
  // Document structure
  {
    label: '@project',
    insertText: '@project ${1:Project Name}\n@sprint ${2:Sprint 1}\n\n$0',
    documentation: 'Create a new project with sprint',
    detail: 'Project directive',
  },
  {
    label: '@sprint',
    insertText: '@sprint ${1:Sprint Name}',
    documentation: 'Define a sprint or milestone',
    detail: 'Sprint directive',
  },

  // Task templates
  {
    label: 'task',
    insertText: '[ ] ${1:Task description}',
    documentation: 'Create a pending task',
    detail: 'Pending task',
  },
  {
    label: 'task-full',
    insertText: '[ ] ${1:Task description} !${2|0,1,2,3|} @${3:assignee} ~${4:4h}\n  $0',
    documentation: 'Create a task with priority, assignee, and estimate',
    detail: 'Full task with metadata',
  },
  {
    label: 'task-progress',
    insertText: '[~] ${1:Task description}',
    documentation: 'Create an in-progress task',
    detail: 'In-progress task',
  },
  {
    label: 'task-done',
    insertText: '[x] ${1:Task description}',
    documentation: 'Create a completed task',
    detail: 'Completed task',
  },
  {
    label: 'task-blocked',
    insertText: '[!] ${1:Task description}\n  - Blocked by: ${2:reason}',
    documentation: 'Create a blocked task with reason',
    detail: 'Blocked task',
  },

  // Subtasks and criteria
  {
    label: 'subtask',
    insertText: '  [ ] ${1:Subtask description}',
    documentation: 'Create a subtask (indented)',
    detail: 'Subtask',
  },
  {
    label: 'criteria',
    insertText: '  \u25CB ${1:Acceptance criterion}',
    documentation: 'Add acceptance criterion (pending)',
    detail: 'Acceptance criterion',
  },
  {
    label: 'criteria-met',
    insertText: '  \u25CF ${1:Acceptance criterion}',
    documentation: 'Add met acceptance criterion',
    detail: 'Met criterion',
  },

  // Sprint/Epic templates
  {
    label: 'sprint-template',
    insertText: `@project \${1:Project Name}
@sprint \${2:Sprint 1}

== High Priority ==

[ ] \${3:Critical task} !0 @\${4:lead}
  [ ] Subtask 1
  [ ] Subtask 2
  \u25CB Acceptance criterion

== Medium Priority ==

[ ] \${5:Feature task} !1
  [ ] Implementation
  [ ] Testing

== Low Priority ==

[ ] \${6:Nice to have} !2
$0`,
    documentation: 'Complete sprint template with priority sections',
    detail: 'Sprint template',
  },
  {
    label: 'feature-template',
    insertText: `@project \${1:Project Name}
@sprint \${2:Sprint}
@feature \${3:FEAT-XXX}

\u25D0 \${4:Feature Name} !0 @\${5:lead} ~\${6:20h}
  [x] Design
  [~] Implementation
  [ ] Testing
  [ ] Documentation

  // Acceptance Criteria
  \u25CB Criterion 1
  \u25CB Criterion 2
  \u25CB Criterion 3

  - Tech notes: \${7:Notes here}
$0`,
    documentation: 'Feature development template',
    detail: 'Feature template',
  },

  // Dependencies
  {
    label: 'dependency',
    insertText: '->${1:task-id}',
    documentation: 'Add dependency (this task depends on another)',
    detail: 'Depends on',
  },
  {
    label: 'blocker',
    insertText: '<-${1:task-id}',
    documentation: 'Add blocker (this task blocks another)',
    detail: 'Blocks',
  },
  {
    label: 'task-with-id',
    insertText: '[ ] ${1:Task description} #id:${2:task-id}',
    documentation: 'Create a task with ID for dependencies',
    detail: 'Task with ID',
  },

  // Notes and comments
  {
    label: 'note',
    insertText: '  - ${1:Note text}',
    documentation: 'Add a note to a task',
    detail: 'Note',
  },
  {
    label: 'section',
    insertText: '== ${1:Section Name} ==\n\n$0',
    documentation: 'Create a section header',
    detail: 'Section',
  },
  {
    label: 'comment',
    insertText: '// ${1:Comment}',
    documentation: 'Add a comment',
    detail: 'Comment',
  },
];

// Inline completions (triggered by special characters)
const INLINE_COMPLETIONS = {
  '!': [
    { label: '!0', insertText: '!0', documentation: 'Critical priority (P0)' },
    { label: '!1', insertText: '!1', documentation: 'High priority (P1)' },
    { label: '!2', insertText: '!2', documentation: 'Medium priority (P2)' },
    { label: '!3', insertText: '!3', documentation: 'Low priority (P3)' },
  ],
  '@': [
    { label: '@alice', insertText: '@alice', documentation: 'Assign to alice' },
    { label: '@bob', insertText: '@bob', documentation: 'Assign to bob' },
    { label: '@team', insertText: '@team', documentation: 'Assign to team' },
    { label: '@lead', insertText: '@lead', documentation: 'Assign to lead' },
  ],
  '~': [
    { label: '~30m', insertText: '~30m', documentation: '30 minutes' },
    { label: '~1h', insertText: '~1h', documentation: '1 hour' },
    { label: '~2h', insertText: '~2h', documentation: '2 hours' },
    { label: '~4h', insertText: '~4h', documentation: '4 hours (half day)' },
    { label: '~8h', insertText: '~8h', documentation: '8 hours (1 day)' },
    { label: '~1d', insertText: '~1d', documentation: '1 day' },
    { label: '~2d', insertText: '~2d', documentation: '2 days' },
    { label: '~1w', insertText: '~1w', documentation: '1 week' },
  ],
  '#': [
    { label: '#bug', insertText: '#bug', documentation: 'Bug tag' },
    { label: '#feature', insertText: '#feature', documentation: 'Feature tag' },
    { label: '#refactor', insertText: '#refactor', documentation: 'Refactor tag' },
    { label: '#urgent', insertText: '#urgent', documentation: 'Urgent tag' },
    { label: '#blocked', insertText: '#blocked', documentation: 'Blocked tag' },
    { label: '#id:', insertText: '#id:${1:task-id}', documentation: 'Task ID for dependencies' },
  ],
  '[': [
    { label: '[ ]', insertText: '[ ] ', documentation: 'Pending task' },
    { label: '[x]', insertText: '[x] ', documentation: 'Completed task' },
    { label: '[~]', insertText: '[~] ', documentation: 'In progress task' },
    { label: '[!]', insertText: '[!] ', documentation: 'Blocked task' },
    { label: '[?]', insertText: '[?] ', documentation: 'In review task' },
  ],
};

export function registerTaskMLCompletions(monaco: typeof import('monaco-editor')) {
  monaco.languages.registerCompletionItemProvider('taskml', {
    triggerCharacters: ['@', '!', '~', '#', '[', '\n'],

    provideCompletionItems: (
      model: editor.ITextModel,
      position: Position
    ): languages.ProviderResult<languages.CompletionList> => {
      const lineContent = model.getLineContent(position.lineNumber);
      const textUntilPosition = lineContent.substring(0, position.column - 1);

      const items: languages.CompletionItem[] = [];
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: position.column,
        endColumn: position.column,
      };

      // Check for trigger character
      const lastChar = textUntilPosition.slice(-1);

      if (lastChar in INLINE_COMPLETIONS) {
        const completions = INLINE_COMPLETIONS[lastChar as keyof typeof INLINE_COMPLETIONS];
        const triggerRange = {
          ...range,
          startColumn: position.column - 1,
        };

        completions.forEach((c, i) => {
          items.push({
            label: c.label,
            kind: monaco.languages.CompletionItemKind.Value,
            insertText: c.insertText,
            insertTextRules: c.insertText.includes('${')
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
            documentation: c.documentation,
            range: triggerRange,
            sortText: String(i).padStart(3, '0'),
          });
        });
      }

      // Add snippets at line start or after whitespace
      const isLineStart = textUntilPosition.trim() === '' || textUntilPosition.endsWith('\n');

      if (isLineStart || textUntilPosition.length === 0) {
        SNIPPETS.forEach((snippet, i) => {
          items.push({
            label: snippet.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: snippet.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: {
              value: `**${snippet.detail || snippet.label}**\n\n${snippet.documentation}`,
            },
            detail: snippet.detail,
            range,
            sortText: `zzz${String(i).padStart(3, '0')}`, // Sort snippets after inline completions
          });
        });
      }

      return { suggestions: items };
    },
  });
}
