/**
 * AppShell - Main application container
 * Modern Mermaid-inspired layout
 */

'use client';

import { useEffect } from 'react';
import { Header } from './Header';
import { ResizablePanes } from './ResizablePanes';
import { MobileNav } from './MobileNav';
import { EditorPanel } from '../editor/EditorPanel';
import { Preview } from '../preview/Preview';
import { ErrorPanel } from '../panels/ErrorPanel';
import { ShareDialog } from '../dialogs/ShareDialog';
import { ExportDialog } from '../dialogs/ExportDialog';
import { ExamplesDialog } from '../dialogs/ExamplesDialog';
import { SettingsDialog } from '../dialogs/SettingsDialog';
import { ShortcutsDialog } from '../dialogs/ShortcutsDialog';
import { DiagramsDialog } from '../dialogs/DiagramsDialog';
import { SaveDialog } from '../dialogs/SaveDialog';
import { useUIStore } from '../../stores';
import { useIsMobile, useURLSync, useTaskML, useTheme, useKeyboardShortcuts } from '../../hooks';

export function AppShell() {
  const isMobile = useIsMobile();
  const setIsMobile = useUIStore((s) => s.setIsMobile);
  const activeMobileTab = useUIStore((s) => s.activeMobileTab);
  const activeDialog = useUIStore((s) => s.activeDialog);
  const showErrorPanel = useUIStore((s) => s.showErrorPanel);

  // Initialize hooks
  useURLSync();
  useTaskML();
  useTheme();
  useKeyboardShortcuts();

  // Track mobile state
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  return (
    <div className="h-screen flex flex-col bg-midnight">
      <Header />

      <main className="flex-1 overflow-hidden">
        {isMobile ? (
          // Mobile: Tabbed layout
          <div className="h-full pb-14">
            {activeMobileTab === 'editor' ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <EditorPanel />
                </div>
                {showErrorPanel && <ErrorPanel />}
              </div>
            ) : (
              <Preview />
            )}
          </div>
        ) : (
          // Desktop: Split panes
          <ResizablePanes
            left={
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <EditorPanel />
                </div>
                {showErrorPanel && <ErrorPanel />}
              </div>
            }
            right={<Preview />}
          />
        )}
      </main>

      {isMobile && <MobileNav />}

      {/* Dialogs */}
      {activeDialog === 'share' && <ShareDialog />}
      {activeDialog === 'export' && <ExportDialog />}
      {activeDialog === 'examples' && <ExamplesDialog />}
      {activeDialog === 'settings' && <SettingsDialog />}
      {activeDialog === 'shortcuts' && <ShortcutsDialog />}
      {activeDialog === 'diagrams' && <DiagramsDialog />}
      {activeDialog === 'save' && <SaveDialog />}
    </div>
  );
}
