/**
 * DialogWrapper - Base dialog component
 * TaskML branded - see BRANDBOOK.md
 */

'use client';

import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui';
import { useUIStore } from '../../stores';

interface DialogWrapperProps {
  title: string;
  children: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const widthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

export function DialogWrapper({ title, children, width = 'md' }: DialogWrapperProps) {
  const closeDialog = useUIStore((s) => s.closeDialog);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDialog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeDialog]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeDialog}
      />

      {/* Dialog */}
      <div
        className={`
          relative w-full ${widthClasses[width]} mx-4
          bg-midnight-elevated
          border border-midnight-border
          rounded-xl shadow-lg-dark
          animate-in fade-in zoom-in-95 duration-normal
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-midnight-border">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <Button variant="ghost" size="icon" onClick={closeDialog}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
