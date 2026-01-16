/**
 * ShareDialog - Copy shareable link and embed code
 */

'use client';

import { useState } from 'react';
import { Copy, Check, Link, Code2 } from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { Button } from '../ui';
import { useEditorStore, usePreviewStore } from '../../stores';
import { buildURL, generateEmbedCode } from '../../lib/url-state';
import { copyToClipboard } from '../../lib/export';

export function ShareDialog() {
  const content = useEditorStore((s) => s.content);
  const viewType = usePreviewStore((s) => s.viewType);
  const theme = usePreviewStore((s) => s.theme);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const shareURL = buildURL({ content, view: viewType, theme });
  const embedCode = generateEmbedCode({ content, view: viewType, theme });

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
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Code2 className="w-4 h-4" />
            Embed Code
          </label>
          <div className="relative">
            <textarea
              readOnly
              value={embedCode}
              rows={4}
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
            Embed this read-only preview in your website or documentation.
          </p>
        </div>
      </div>
    </DialogWrapper>
  );
}
