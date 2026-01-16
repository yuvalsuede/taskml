/**
 * Header - Main application header
 * TaskML branded - see BRANDBOOK.md
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
import { useUIStore } from '../../stores';
import { useTheme } from '../../hooks';

export function Header() {
  const openDialog = useUIStore((s) => s.openDialog);
  const { theme, toggleTheme, isDark } = useTheme();

  const ThemeIcon = theme === 'auto' ? Monitor : isDark ? Moon : Sun;
  const themeLabel = theme === 'auto' ? 'Auto' : isDark ? 'Dark' : 'Light';

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-midnight-border bg-midnight-elevated">
      {/* Left: Logo and Navigation */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl">📋</span>
          <span className="text-xl font-semibold text-white">TaskML</span>
          <span className="text-xs font-medium px-2 py-0.5 bg-signal/20 text-signal rounded">
            Playground
          </span>
        </a>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
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
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Theme Toggle */}
        <Tooltip content={`Theme: ${themeLabel}`} shortcut="Ctrl+D">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <ThemeIcon className="w-5 h-5" />
          </Button>
        </Tooltip>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-1.5">
          {/* Save - Primary action (Signal Orange) */}
          <Tooltip content="Save" shortcut="Ctrl+S">
            <Button
              variant="primary"
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

          {/* Divider */}
          <div className="w-px h-5 bg-midnight-border mx-1" />

          <Tooltip content="Keyboard shortcuts" shortcut="?">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openDialog('shortcuts')}
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Settings" shortcut="Ctrl+,">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openDialog('settings')}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
