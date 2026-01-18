/**
 * Header - Modern Mermaid-inspired header
 */

'use client';

import {
  Share2,
  Download,
  Settings,
  Menu,
  Moon,
  Sun,
  BookOpen,
  Keyboard,
  Save,
  FolderOpen,
  Github,
  ExternalLink,
} from 'lucide-react';
import { Button, Tooltip } from '../ui';
import { useUIStore } from '../../stores';
import { useTheme } from '../../hooks';
import { useState } from 'react';

// Theme toggle switch component
function ThemeSwitch() {
  const { isDark, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center w-14 h-7 rounded-full bg-midnight-surface border border-midnight-border
        hover:border-midnight-border-active transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track icons */}
      <Sun className="absolute left-1.5 w-4 h-4 text-amber-400" />
      <Moon className="absolute right-1.5 w-4 h-4 text-blue-400" />

      {/* Sliding indicator */}
      <div
        className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200
          ${isDark ? 'translate-x-7' : 'translate-x-1'}`}
      />
    </button>
  );
}

// Mobile menu dropdown
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = useUIStore((s) => s.openDialog);

  return (
    <div className="relative sm:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-lg
            bg-midnight-elevated border border-midnight-border shadow-xl z-50
            animate-in fade-in slide-down">
            <button
              onClick={() => { openDialog('examples'); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-midnight-surface"
            >
              <BookOpen className="w-4 h-4" />
              Templates
            </button>
            <button
              onClick={() => { openDialog('diagrams'); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-midnight-surface"
            >
              <FolderOpen className="w-4 h-4" />
              My Diagrams
            </button>
            <div className="h-px bg-midnight-border my-2" />
            <button
              onClick={() => { openDialog('save'); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-midnight-surface"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => { openDialog('share'); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-midnight-surface"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => { openDialog('export'); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-midnight-surface"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="h-px bg-midnight-border my-2" />
            <button
              onClick={() => { openDialog('shortcuts'); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-midnight-surface"
            >
              <Keyboard className="w-4 h-4" />
              Shortcuts
            </button>
            <button
              onClick={() => { openDialog('settings'); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-midnight-surface"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function Header() {
  const openDialog = useUIStore((s) => s.openDialog);

  return (
    <header className="h-12 flex items-center justify-between px-3 border-b border-midnight-border bg-midnight-elevated">
      {/* Left: Logo and Navigation */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <svg className="w-5 h-5 text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          <span className="text-lg font-semibold text-white tracking-tight">taskml</span>
          <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 bg-signal/20 text-signal rounded uppercase tracking-wider">
            Playground
          </span>
        </a>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-midnight-border" />

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Tooltip content="Templates" shortcut="Ctrl+O">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('examples')}
              className="text-gray-400 hover:text-white"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden lg:inline ml-1.5">Templates</span>
            </Button>
          </Tooltip>

          <Tooltip content="My Diagrams" shortcut="Ctrl+L">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('diagrams')}
              className="text-gray-400 hover:text-white"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden lg:inline ml-1.5">My Diagrams</span>
            </Button>
          </Tooltip>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <div className="hidden sm:block">
          <ThemeSwitch />
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {/* Divider */}
          <div className="w-px h-5 bg-midnight-border mx-1" />

          {/* Save - Primary action */}
          <Tooltip content="Save" shortcut="Ctrl+S">
            <Button
              variant="primary"
              size="sm"
              onClick={() => openDialog('save')}
            >
              <Save className="w-4 h-4" />
              <span className="hidden lg:inline ml-1">Save</span>
            </Button>
          </Tooltip>

          <Tooltip content="Share" shortcut="Ctrl+Shift+S">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('share')}
              className="text-gray-400 hover:text-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Export" shortcut="Ctrl+E">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDialog('export')}
              className="text-gray-400 hover:text-white"
            >
              <Download className="w-4 h-4" />
            </Button>
          </Tooltip>

          {/* Divider */}
          <div className="w-px h-5 bg-midnight-border mx-1" />

          <Tooltip content="Keyboard shortcuts" shortcut="?">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openDialog('shortcuts')}
              className="text-gray-400 hover:text-white"
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Settings" shortcut="Ctrl+,">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openDialog('settings')}
              className="text-gray-400 hover:text-white"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </Tooltip>

          {/* GitHub link */}
          <Tooltip content="View on GitHub">
            <a
              href="https://github.com/anthropics/taskml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </Tooltip>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
