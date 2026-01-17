/**
 * Export functionality - PNG, SVG, JSON, YAML, TaskML, HTML
 */

import { toPng, toSvg } from 'html-to-image';
import { toJSON, toYAML } from 'taskml';
import type { Document, ExportFormat } from '../types';

interface ExportOptions {
  filename?: string;
  quality?: number;
  backgroundColor?: string;
}

/**
 * Export preview as PNG
 */
export async function exportPNG(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const { filename = 'taskml-export', quality = 0.95, backgroundColor = '#ffffff' } = options;

  try {
    const dataUrl = await toPng(element, {
      quality,
      backgroundColor,
      pixelRatio: 2, // High DPI
    });

    downloadDataUrl(dataUrl, `${filename}.png`);
  } catch (error) {
    console.error('PNG export failed:', error);
    throw new Error('Failed to export PNG');
  }
}

/**
 * Export preview as SVG
 */
export async function exportSVG(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const { filename = 'taskml-export', backgroundColor = '#ffffff' } = options;

  try {
    const dataUrl = await toSvg(element, {
      backgroundColor,
    });

    downloadDataUrl(dataUrl, `${filename}.svg`);
  } catch (error) {
    console.error('SVG export failed:', error);
    throw new Error('Failed to export SVG');
  }
}

/**
 * Export document as JSON
 */
export function exportJSON(doc: Document, options: ExportOptions = {}): void {
  const { filename = 'taskml-export' } = options;

  const json = toJSON(doc);
  const content = JSON.stringify(json, null, 2);

  downloadText(content, `${filename}.json`, 'application/json');
}

/**
 * Export document as YAML
 */
export function exportYAML(doc: Document, options: ExportOptions = {}): void {
  const { filename = 'taskml-export' } = options;

  const yaml = toYAML(doc);

  downloadText(yaml, `${filename}.yaml`, 'text/yaml');
}

/**
 * Export raw TaskML source
 */
export function exportTaskML(content: string, options: ExportOptions = {}): void {
  const { filename = 'taskml-export' } = options;

  downloadText(content, `${filename}.tml`, 'text/plain');
}

/**
 * Export as standalone HTML
 */
export function exportHTML(
  renderedHTML: string,
  options: ExportOptions = {}
): void {
  const { filename = 'taskml-export' } = options;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskML Export</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  ${renderedHTML}
</body>
</html>`;

  downloadText(html, `${filename}.html`, 'text/html');
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

// Helper functions
function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

function downloadText(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
