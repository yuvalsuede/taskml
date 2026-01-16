/**
 * TaskML Language Definition for Monaco Editor
 */

import type { languages } from 'monaco-editor';

export const TASKML_LANGUAGE_ID = 'taskml';

export const taskmlLanguageConfig: languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
  },
  brackets: [
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
  ],
  surroundingPairs: [
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
  ],
  indentationRules: {
    increaseIndentPattern: /^\s*\[.*\]\s*$/,
    decreaseIndentPattern: /^\s*$/,
  },
  folding: {
    markers: {
      start: /^\s*\[/,
      end: /^\s*$/,
    },
  },
};

export const taskmlTokensProvider: languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      // Comments
      [/\/\/.*$/, 'comment'],

      // Directives: @project, @sprint, @version
      [/@(project|sprint|version|due|assignee)\b/, 'keyword.directive'],

      // Checkbox status markers
      [/\[\s*\]/, 'keyword.status.pending'],
      [/\[x\]/, 'keyword.status.completed'],
      [/\[~\]/, 'keyword.status.progress'],
      [/\[!\]/, 'keyword.status.blocked'],
      [/\[\?\]/, 'keyword.status.review'],

      // Unicode status markers
      [/○/, 'keyword.status.pending'],
      [/◐/, 'keyword.status.progress'],
      [/●/, 'keyword.status.completed'],
      [/⊘/, 'keyword.status.blocked'],
      [/⊖/, 'keyword.status.cancelled'],
      [/◎/, 'keyword.status.review'],

      // Criteria markers
      [/^\s+[○●✗]\s+/, 'keyword.criterion'],

      // Priority: !0, !1, !2, !3
      [/![0-3]/, 'number.priority'],

      // Assignee inline: @username (not at line start)
      [/(?<=\s)@\w+/, 'variable.assignee'],

      // Tags: #tag
      [/#(?!id:)\w+/, 'string.tag'],

      // ID: #id:ABC-123
      [/#id:\S+/, 'attribute.id'],

      // Estimate: ~4h, ~2d
      [/~\d+(\.\d+)?[hdwm]?/, 'number.estimate'],

      // Due date: >2024-01-15
      [/>\d{4}-\d{2}-\d{2}/, 'number.date'],

      // Dependencies: ->task, <-task
      [/->[\w-]+/, 'type.dependency.depends'],
      [/<-[\w-]+/, 'type.dependency.blocked'],

      // Note prefix
      [/^\s*-\s+/, 'comment.note'],

      // Strings
      [/"[^"]*"/, 'string'],

      // Numbers
      [/\b\d+\b/, 'number'],
    ],
  },
};

export function registerTaskMLLanguage(monaco: typeof import('monaco-editor')) {
  // Register language
  monaco.languages.register({ id: TASKML_LANGUAGE_ID });

  // Set language configuration
  monaco.languages.setLanguageConfiguration(TASKML_LANGUAGE_ID, taskmlLanguageConfig);

  // Set token provider
  monaco.languages.setMonarchTokensProvider(TASKML_LANGUAGE_ID, taskmlTokensProvider);
}
