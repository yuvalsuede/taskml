/**
 * EditorPanel - Mermaid-style tabbed editor with header
 */

'use client';

import { useState } from 'react';
import { Code, Settings2, FileText, RefreshCw, Copy, Check, Wand2 } from 'lucide-react';
import { Editor } from './Editor';
import { Button, Tooltip } from '../ui';
import { useEditorStore, useSettingsStore } from '../../stores';
import { formatTaskML } from '../../lib/format';

type EditorTab = 'code' | 'config';

// Tab button component
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors
        ${active
          ? 'bg-signal text-white'
          : 'text-gray-400 hover:text-white hover:bg-midnight-surface'
        }`}
    >
      {children}
    </button>
  );
}

// Auto sync toggle
function AutoSyncToggle() {
  const autoRender = useSettingsStore((s) => s.autoRender);
  const setAutoRender = useSettingsStore((s) => s.setAutoRender);

  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
        Auto Sync
      </span>
      <button
        role="switch"
        aria-checked={autoRender}
        onClick={() => setAutoRender(!autoRender)}
        className={`relative w-8 h-4 rounded-full transition-colors
          ${autoRender ? 'bg-signal' : 'bg-midnight-surface border border-midnight-border'}`}
      >
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform
            ${autoRender ? 'translate-x-4' : 'translate-x-0.5'}`}
        />
      </button>
    </label>
  );
}

// Config panel content
function ConfigPanel() {
  const fontSize = useSettingsStore((s) => s.fontSize);
  const setFontSize = useSettingsStore((s) => s.setFontSize);
  const tabSize = useSettingsStore((s) => s.tabSize);
  const setTabSize = useSettingsStore((s) => s.setTabSize);
  const wordWrap = useSettingsStore((s) => s.wordWrap);
  const setWordWrap = useSettingsStore((s) => s.setWordWrap);
  const minimap = useSettingsStore((s) => s.minimap);
  const setMinimap = useSettingsStore((s) => s.setMinimap);

  return (
    <div className="h-full overflow-auto p-4 bg-midnight">
      <div className="space-y-4 max-w-sm">
        <h3 className="text-sm font-medium text-white mb-4">Editor Settings</h3>

        {/* Font Size */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-2 py-1 text-sm bg-midnight-surface border border-midnight-border rounded text-white"
          >
            {[12, 13, 14, 15, 16, 18, 20].map((size) => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>
        </div>

        {/* Tab Size */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Tab Size</label>
          <select
            value={tabSize}
            onChange={(e) => setTabSize(Number(e.target.value))}
            className="px-2 py-1 text-sm bg-midnight-surface border border-midnight-border rounded text-white"
          >
            {[2, 4].map((size) => (
              <option key={size} value={size}>{size} spaces</option>
            ))}
          </select>
        </div>

        {/* Word Wrap */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Word Wrap</label>
          <button
            role="switch"
            aria-checked={wordWrap}
            onClick={() => setWordWrap(!wordWrap)}
            className={`relative w-10 h-5 rounded-full transition-colors
              ${wordWrap ? 'bg-signal' : 'bg-midnight-surface border border-midnight-border'}`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform
                ${wordWrap ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </button>
        </div>

        {/* Minimap */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Minimap</label>
          <button
            role="switch"
            aria-checked={minimap}
            onClick={() => setMinimap(!minimap)}
            className={`relative w-10 h-5 rounded-full transition-colors
              ${minimap ? 'bg-signal' : 'bg-midnight-surface border border-midnight-border'}`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform
                ${minimap ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditorPanel() {
  const [activeTab, setActiveTab] = useState<EditorTab>('code');
  const [copied, setCopied] = useState(false);
  const content = useEditorStore((s) => s.content);
  const setContent = useEditorStore((s) => s.setContent);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    const formatted = formatTaskML(content);
    if (formatted !== content) {
      setContent(formatted);
    }
  };

  return (
    <div className="h-full flex flex-col bg-midnight">
      {/* Header with tabs */}
      <div className="flex items-center justify-between px-3 h-10 border-b border-midnight-border bg-midnight-elevated">
        {/* Tabs */}
        <div className="flex items-center gap-1">
          <TabButton
            active={activeTab === 'code'}
            onClick={() => setActiveTab('code')}
          >
            <Code className="w-3.5 h-3.5" />
            Code
          </TabButton>
          <TabButton
            active={activeTab === 'config'}
            onClick={() => setActiveTab('config')}
          >
            <Settings2 className="w-3.5 h-3.5" />
            Config
          </TabButton>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {activeTab === 'code' && (
            <>
              <Tooltip content="Format code (Shift+Alt+F)">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFormat}
                  className="text-gray-500 hover:text-white h-7 w-7"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                </Button>
              </Tooltip>
              <Tooltip content="Copy code">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-white h-7 w-7"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </Tooltip>
              <div className="w-px h-4 bg-midnight-border mx-1" />
              <AutoSyncToggle />
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'code' ? <Editor /> : <ConfigPanel />}
      </div>
    </div>
  );
}
