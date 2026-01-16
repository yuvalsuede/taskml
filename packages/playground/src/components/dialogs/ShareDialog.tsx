/**
 * ShareDialog - Copy shareable link and embed code
 */

'use client';

import { useState, useMemo } from 'react';
import { Copy, Check, Link, Code2, ExternalLink } from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { Button } from '../ui';
import { useEditorStore, usePreviewStore } from '../../stores';
import { buildURL, buildEmbedURL, generateEmbedCode } from '../../lib/url-state';
import { copyToClipboard } from '../../lib/export';

const HEIGHT_OPTIONS = [
  { label: 'Small (300px)', value: 300 },
  { label: 'Medium (400px)', value: 400 },
  { label: 'Large (600px)', value: 600 },
  { label: 'Auto', value: 'auto' },
];

export function ShareDialog() {
  const content = useEditorStore((s) => s.content);
  const viewType = usePreviewStore((s) => s.viewType);
  const theme = usePreviewStore((s) => s.theme);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [embedHeight, setEmbedHeight] = useState<number | 'auto'>(400);
  const [hideHeader, setHideHeader] = useState(false);

  const shareURL = buildURL({ content, view: viewType, theme });

  const embedURL = useMemo(() => {
    const url = buildEmbedURL({ content, view: viewType, theme });
    return hideHeader ? `${url}&hideHeader=true` : url;
  }, [content, viewType, theme, hideHeader]);

  const embedCode = useMemo(() => {
    const height = embedHeight === 'auto' ? '100%' : embedHeight;
    return `<iframe
  src="${embedURL}"
  width="100%"
  height="${height}"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="TaskML Diagram"
  loading="lazy"
></iframe>`;
  }, [embedURL, embedHeight]);

  const handleCopyLink = async () => {
    await copyToClipboard(shareURL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = async () => {
    await copyToClipboard(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <DialogWrapper title="Share" width="lg">
      <div className="space-y-6">
        {/* Share Link */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Link className="w-4 h-4" />
            Share Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareURL}
              className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-mono"
            />
            <Button onClick={handleCopyLink}>
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Anyone with this link can view and edit this TaskML document.
          </p>
        </div>

        {/* Embed Code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Code2 className="w-4 h-4" />
              Embed Code
            </label>
            <a
              href={embedURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Preview embed
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Embed options */}
          <div className="flex flex-wrap gap-4 mb-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Height
              </label>
              <select
                value={embedHeight}
                onChange={(e) => setEmbedHeight(e.target.value === 'auto' ? 'auto' : parseInt(e.target.value))}
                className="px-2 py-1 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
              >
                {HEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hideHeader}
                onChange={(e) => setHideHeader(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hide header
              </span>
            </label>
          </div>

          <div className="relative">
            <textarea
              readOnly
              value={embedCode}
              rows={5}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-mono resize-none"
            />
            <Button
              className="absolute top-2 right-2"
              size="sm"
              onClick={handleCopyEmbed}
            >
              {copiedEmbed ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Embed this read-only preview in your website, blog, or documentation.
          </p>
        </div>
      </div>
    </DialogWrapper>
  );
}
