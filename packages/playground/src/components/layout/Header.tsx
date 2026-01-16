/**
 * Header - Main application header
 */

'use client';

import {
  Share2,
  Download,
  Settings,
  Menu,
  Moon,
  Sun,
  Monitor,
  BookOpen,
  Keyboard,
  Save,
  FolderOpen,
} from 'lucide-react';
import { Button, Tooltip } from '../ui';
import { useUIStore, usePreviewStore } from '../../stores';
import { useTheme } from '../../hooks';

export function Header() {
  const openDialog = useUIStore((s) => s.openDialog);
  const { theme, toggleTheme, isDark } = useTheme();

  const ThemeIcon = theme === 'auto' ? Monitor : isDark ? Moon : Sun;
  const themeLabel = theme === 'auto' ? 'Auto' : isDark ? 'Dark' : 'Light';

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Left: Logo and Examples */}
      <div className="flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <span className="text-2xl">📋</span>
          <span>TaskML</span>
          <span className="text-xs font-normal px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
            Playground
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          <Tooltip content="Templates" shortcut="Ctrl+O">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('examples')}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden lg:inline">Templates</span>
            </Button>
          </Tooltip>

          <Tooltip content="My Diagrams" shortcut="Ctrl+L">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('diagrams')}
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden lg:inline">My Diagrams</span>
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <Tooltip content={`Theme: ${themeLabel}`}>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <ThemeIcon className="w-5 h-5" />
          </Button>
        </Tooltip>

        <div className="hidden sm:flex items-center gap-1">
          <Tooltip content="Save" shortcut="Ctrl+S">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('save')}
            >
              <Save className="w-4 h-4" />
              <span className="hidden lg:inline">Save</span>
            </Button>
          </Tooltip>

          <Tooltip content="Share" shortcut="Ctrl+Shift+S">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('share')}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden lg:inline">Share</span>
            </Button>
          </Tooltip>

          <Tooltip content="Export" shortcut="Ctrl+E">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('export')}
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline">Export</span>
            </Button>
          </Tooltip>

          <Tooltip content="Keyboard shortcuts" shortcut="?">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openDialog('shortcuts')}
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Settings">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openDialog('settings')}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
