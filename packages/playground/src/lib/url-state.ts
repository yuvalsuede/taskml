/**
 * URL State - Encode/decode playground state in URL
 * Uses lz-string compression (same as TypeScript Playground)
 */

import LZString from 'lz-string';
import type { ViewType, ThemeMode } from '../types';

export interface URLState {
  content: string;
  view?: ViewType;
  theme?: ThemeMode;
  readonly?: boolean;
  embed?: boolean;
}

/**
 * Compress content for URL hash
 */
export function encodeContent(content: string): string {
  return LZString.compressToEncodedURIComponent(content);
}

/**
 * Decompress content from URL hash
 */
export function decodeContent(encoded: string): string {
  try {
    return LZString.decompressFromEncodedURIComponent(encoded) || '';
  } catch {
    return '';
  }
}

/**
 * Build a shareable URL from state
 */
export function buildURL(state: URLState): string {
  const url = new URL(window.location.origin + window.location.pathname);

  // Query params for settings (only non-default values)
  if (state.view && state.view !== 'list') {
    url.searchParams.set('view', state.view);
  }
  if (state.theme && state.theme !== 'auto') {
    url.searchParams.set('theme', state.theme);
  }
  if (state.readonly) {
    url.searchParams.set('readonly', 'true');
  }
  if (state.embed) {
    url.searchParams.set('embed', 'true');
  }

  // Hash for compressed code
  if (state.content) {
    url.hash = `code/${encodeContent(state.content)}`;
  }

  return url.toString();
}

/**
 * Parse state from current URL
 */
export function parseURL(): Partial<URLState> {
  const url = new URL(window.location.href);
  const state: Partial<URLState> = {};

  // Query params
  const view = url.searchParams.get('view');
  if (view && isValidView(view)) {
    state.view = view as ViewType;
  }

  const theme = url.searchParams.get('theme');
  if (theme && isValidTheme(theme)) {
    state.theme = theme as ThemeMode;
  }

  if (url.searchParams.get('readonly') === 'true') {
    state.readonly = true;
  }

  if (url.searchParams.get('embed') === 'true') {
    state.embed = true;
  }

  // Hash (code)
  const hash = url.hash;
  if (hash.startsWith('#code/')) {
    const encoded = hash.slice(6); // Remove '#code/'
    const content = decodeContent(encoded);
    if (content) {
      state.content = content;
    }
  }

  return state;
}

/**
 * Update URL without navigation
 */
export function updateURL(state: URLState): void {
  const url = buildURL(state);
  window.history.replaceState(null, '', url);
}

/**
 * Generate embed URL using the dedicated /embed route
 */
export function buildEmbedURL(state: URLState): string {
  const url = new URL(window.location.origin + '/embed');

  // Compress content for query param
  if (state.content) {
    url.searchParams.set('c', encodeContent(state.content));
  }

  // View type
  if (state.view && state.view !== 'list') {
    url.searchParams.set('view', state.view);
  }

  // Theme (default to light for embeds)
  if (state.theme && state.theme !== 'auto') {
    url.searchParams.set('theme', state.theme === 'dark' ? 'dark' : 'light');
  }

  return url.toString();
}

/**
 * Generate embed code for iframe
 */
export function generateEmbedCode(state: URLState, width = '100%', height = 400): string {
  const url = buildEmbedURL(state);
  return `<iframe
  src="${url}"
  width="${width}"
  height="${height}"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="TaskML Diagram"
  loading="lazy"
></iframe>`;
}

// Validation helpers
const VALID_VIEWS = ['list', 'kanban', 'tree', 'timeline', 'table', 'graph', 'summary'];
const VALID_THEMES = ['light', 'dark', 'auto'];

function isValidView(view: string): boolean {
  return VALID_VIEWS.includes(view);
}

function isValidTheme(theme: string): boolean {
  return VALID_THEMES.includes(theme);
}
