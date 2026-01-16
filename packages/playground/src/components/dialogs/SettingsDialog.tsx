/**
 * SettingsDialog - Editor and preview preferences
 */

'use client';

import { RotateCcw } from 'lucide-react';
import { DialogWrapper } from './DialogWrapper';
import { Button, Select } from '../ui';
import { useSettingsStore } from '../../stores';

export function SettingsDialog() {
  const {
    fontSize,
    setFontSize,
    tabSize,
    setTabSize,
    wordWrap,
    setWordWrap,
    minimap,
    setMinimap,
    lineNumbers,
    setLineNumbers,
    autoRender,
    setAutoRender,
    renderDelay,
    setRenderDelay,
    resetSettings,
  } = useSettingsStore();

  return (
    <DialogWrapper title="Settings" width="md">
      <div className="space-y-6">
        {/* Editor Settings */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Editor
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Font Size
              </label>
              <Select
                options={[
                  { value: '12', label: '12px' },
                  { value: '14', label: '14px' },
                  { value: '16', label: '16px' },
                  { value: '18', label: '18px' },
                  { value: '20', label: '20px' },
                ]}
                value={String(fontSize)}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Tab Size
              </label>
              <Select
                options={[
                  { value: '2', label: '2 spaces' },
                  { value: '4', label: '4 spaces' },
                ]}
                value={String(tabSize)}
                onChange={(e) => setTabSize(Number(e.target.value))}
              />
            </div>

            <Toggle
              label="Word Wrap"
              checked={wordWrap}
              onChange={setWordWrap}
            />

            <Toggle
              label="Line Numbers"
              checked={lineNumbers}
              onChange={setLineNumbers}
            />

            <Toggle
              label="Minimap"
              checked={minimap}
              onChange={setMinimap}
            />
          </div>
        </div>

        {/* Preview Settings */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Preview
          </h3>
          <div className="space-y-4">
            <Toggle
              label="Auto Render"
              checked={autoRender}
              onChange={setAutoRender}
            />

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Render Delay
              </label>
              <Select
                options={[
                  { value: '100', label: '100ms' },
                  { value: '300', label: '300ms' },
                  { value: '500', label: '500ms' },
                  { value: '1000', label: '1s' },
                ]}
                value={String(renderDelay)}
                onChange={(e) => setRenderDelay(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" onClick={resetSettings}>
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
            transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}
