/**
 * Renderer Tests
 */

import { describe, it, expect } from 'bun:test';
import {
  render,
  getStyles,
  getRenderer,
  registerRenderer,
  getAvailableViews,
  generateCSSVars,
  CSS_VARS,
  DARK_THEME_VARS,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
} from '../renderer';
import { parse } from '../parser';
import type { Document } from '../types';

function parseDoc(input: string): Document {
  const result = parse(input);
  if (!result.document) throw new Error('Parse failed');
  return result.document;
}

describe('Renderer', () => {
  describe('render()', () => {
    it('renders document with default options (list view)', () => {
      const doc = parseDoc(`[ ] Task 1\n[ ] Task 2`);
      const html = render(doc);

      expect(html).toContain('class="taskml-container');
      expect(html).toContain('Task 1');
      expect(html).toContain('Task 2');
    });

    it('renders with list view explicitly', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { view: 'list' });

      expect(html).toContain('taskml-list-view');
      expect(html).toContain('taskml-task-list');
    });

    it('renders with kanban view', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { view: 'kanban' });

      expect(html).toContain('taskml-kanban-view');
      expect(html).toContain('taskml-kanban-board');
      expect(html).toContain('taskml-kanban-column');
    });

    it('renders with tree view', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { view: 'tree' });

      expect(html).toContain('taskml-tree-view');
      expect(html).toContain('taskml-tree-node');
    });

    it('renders with timeline view', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { view: 'timeline' });

      expect(html).toContain('taskml-timeline-view');
      expect(html).toContain('taskml-timeline-row');
    });

    it('renders with table view', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { view: 'table' });

      expect(html).toContain('taskml-table-view');
      expect(html).toContain('<table');
      expect(html).toContain('<thead>');
      expect(html).toContain('<tbody>');
    });

    it('renders with graph view', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { view: 'graph' });

      expect(html).toContain('taskml-graph-view');
      expect(html).toContain('<svg');
      expect(html).toContain('taskml-graph-node');
    });

    it('renders with summary view', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { view: 'summary' });

      expect(html).toContain('taskml-summary-view');
      expect(html).toContain('taskml-stat-card');
      expect(html).toContain('taskml-breakdown-card');
    });

    it('includes CSS variables when requested', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { includeCSSVars: true });

      expect(html).toContain(':root');
      expect(html).toContain('--taskml-bg');
    });

    it('includes styles when requested', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { includeStyles: true });

      expect(html).toContain('<style>');
      expect(html).toContain('.taskml-');
    });

    it('uses custom class prefix', () => {
      const doc = parseDoc(`[ ] Task`);
      const html = render(doc, { classPrefix: 'my-tasks' });

      expect(html).toContain('my-tasks-container');
      expect(html).not.toContain('taskml-container');
    });
  });

  describe('getStyles()', () => {
    it('returns styles for list view', () => {
      const styles = getStyles('list');
      expect(styles).toContain('.taskml-list-view');
    });

    it('returns styles for kanban view', () => {
      const styles = getStyles('kanban');
      expect(styles).toContain('.taskml-kanban-view');
    });

    it('includes CSS variables when requested', () => {
      const styles = getStyles('list', { includeCSSVars: true });
      expect(styles).toContain(':root');
      expect(styles).toContain('--taskml-bg');
    });
  });

  describe('getRenderer()', () => {
    it('returns renderer for list view', () => {
      const renderer = getRenderer('list');
      expect(renderer).toBeDefined();
      expect(renderer?.viewType).toBe('list');
    });

    it('returns renderer for kanban view', () => {
      const renderer = getRenderer('kanban');
      expect(renderer).toBeDefined();
      expect(renderer?.viewType).toBe('kanban');
    });

    it('returns renderer for tree view', () => {
      const renderer = getRenderer('tree');
      expect(renderer).toBeDefined();
      expect(renderer?.viewType).toBe('tree');
    });

    it('returns renderer for timeline view', () => {
      const renderer = getRenderer('timeline');
      expect(renderer).toBeDefined();
      expect(renderer?.viewType).toBe('timeline');
    });

    it('returns renderer for table view', () => {
      const renderer = getRenderer('table');
      expect(renderer).toBeDefined();
      expect(renderer?.viewType).toBe('table');
    });

    it('returns renderer for graph view', () => {
      const renderer = getRenderer('graph');
      expect(renderer).toBeDefined();
      expect(renderer?.viewType).toBe('graph');
    });

    it('returns renderer for summary view', () => {
      const renderer = getRenderer('summary');
      expect(renderer).toBeDefined();
      expect(renderer?.viewType).toBe('summary');
    });
  });

  describe('getAvailableViews()', () => {
    it('returns all registered views', () => {
      const views = getAvailableViews();
      expect(views).toContain('list');
      expect(views).toContain('kanban');
      expect(views).toContain('tree');
      expect(views).toContain('timeline');
      expect(views).toContain('table');
      expect(views).toContain('graph');
      expect(views).toContain('summary');
    });
  });

  describe('generateCSSVars()', () => {
    it('generates light theme CSS', () => {
      const css = generateCSSVars('light');
      expect(css).toContain(':root');
      expect(css).toContain('--taskml-bg: #ffffff');
    });

    it('generates dark theme CSS', () => {
      const css = generateCSSVars('dark');
      expect(css).toContain(':root');
      expect(css).toContain('--taskml-bg: #1f2937');
    });

    it('generates auto theme CSS with media query', () => {
      const css = generateCSSVars('auto');
      expect(css).toContain(':root');
      expect(css).toContain('@media (prefers-color-scheme: dark)');
    });
  });

  describe('Theme constants', () => {
    it('exports CSS_VARS', () => {
      expect(CSS_VARS).toBeDefined();
      expect(CSS_VARS['--taskml-bg']).toBe('#ffffff');
    });

    it('exports DARK_THEME_VARS', () => {
      expect(DARK_THEME_VARS).toBeDefined();
      expect(DARK_THEME_VARS['--taskml-bg']).toBe('#1f2937');
    });

    it('exports STATUS_CONFIG', () => {
      expect(STATUS_CONFIG).toBeDefined();
      expect(STATUS_CONFIG.pending.label).toBe('Pending');
      expect(STATUS_CONFIG.completed.label).toBe('Completed');
    });

    it('exports PRIORITY_CONFIG', () => {
      expect(PRIORITY_CONFIG).toBeDefined();
      expect(PRIORITY_CONFIG[0].label).toBe('Critical');
      expect(PRIORITY_CONFIG[3].label).toBe('Low');
    });
  });
});

describe('View rendering content', () => {
  describe('List view', () => {
    it('renders task descriptions', () => {
      const doc = parseDoc(`[ ] Task 1\n[ ] Task 2`);
      const html = render(doc, { view: 'list' });
      expect(html).toContain('Task 1');
      expect(html).toContain('Task 2');
    });

    it('renders status icons', () => {
      const doc = parseDoc(`[ ] Pending task\n[x] Completed task`);
      const html = render(doc, { view: 'list' });
      // STATUS_CONFIG.pending.icon is '○', STATUS_CONFIG.completed.icon is '●'
      expect(html).toContain('○');
      expect(html).toContain('●');
    });

    it('renders project header', () => {
      const doc = parseDoc(`@project My Project\n[ ] Task`);
      const html = render(doc, { view: 'list' });
      expect(html).toContain('My Project');
    });
  });

  describe('Kanban view', () => {
    it('renders columns for different statuses', () => {
      const doc = parseDoc(`[ ] Task 1\n◐ Task 2\n● Task 3`);
      const html = render(doc, { view: 'kanban' });
      expect(html).toContain('Pending');
      expect(html).toContain('In Progress');
      expect(html).toContain('Completed');
    });

    it('renders task cards', () => {
      const doc = parseDoc(`[ ] Task 1`);
      const html = render(doc, { view: 'kanban' });
      expect(html).toContain('taskml-card');
    });
  });

  describe('Tree view', () => {
    it('renders tree nodes', () => {
      const doc = parseDoc(`[ ] Task 1\n[ ] Task 2`);
      const html = render(doc, { view: 'tree' });
      expect(html).toContain('taskml-tree-node');
    });

    it('renders children with toggle indicator', () => {
      const doc = parseDoc(`[ ] Parent\n  [ ] Child`);
      const html = render(doc, { view: 'tree' });
      expect(html).toContain('taskml-tree-toggle');
      expect(html).toContain('▼');
    });
  });

  describe('Table view', () => {
    it('renders table headers', () => {
      const doc = parseDoc(`[ ] Task 1`);
      const html = render(doc, { view: 'table' });
      expect(html).toContain('<th');
      expect(html).toContain('Status');
      expect(html).toContain('Description');
    });

    it('renders table rows', () => {
      const doc = parseDoc(`[ ] Task 1\n[ ] Task 2`);
      const html = render(doc, { view: 'table' });
      expect(html).toContain('<tr>');
      expect(html).toContain('<td');
    });
  });

  describe('Timeline view', () => {
    it('renders timeline rows', () => {
      const doc = parseDoc(`[ ] Task 1\n[ ] Task 2`);
      const html = render(doc, { view: 'timeline' });
      expect(html).toContain('taskml-timeline-row');
    });

    it('renders estimate information', () => {
      const doc = parseDoc(`[ ] Task with estimate ~4h`);
      const html = render(doc, { view: 'timeline' });
      expect(html).toContain('4h');
    });
  });

  describe('Summary view', () => {
    it('renders stat cards', () => {
      const doc = parseDoc(`[ ] Task 1\n● Task 2`);
      const html = render(doc, { view: 'summary' });
      expect(html).toContain('Total Tasks');
      expect(html).toContain('Completed');
      expect(html).toContain('In Progress');
    });

    it('renders breakdown sections', () => {
      const doc = parseDoc(`[ ] Task 1 @alice !1`);
      const html = render(doc, { view: 'summary' });
      expect(html).toContain('By Status');
      expect(html).toContain('By Priority');
      expect(html).toContain('By Assignee');
    });
  });
});
