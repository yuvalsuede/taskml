'use client';

/**
 * Tooltip - Hover tooltip component
 */

import { useState, type ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  shortcut?: string;
}

const positionStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Tooltip({
  content,
  children,
  position = 'top',
  shortcut,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`
            absolute z-50 px-2 py-1
            text-xs font-medium
            text-white bg-gray-900 dark:bg-gray-700
            rounded shadow-lg
            whitespace-nowrap
            pointer-events-none
            ${positionStyles[position]}
          `}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="ml-2 px-1.5 py-0.5 bg-gray-700 dark:bg-gray-600 rounded text-gray-300">
              {shortcut}
            </kbd>
          )}
        </div>
      )}
    </div>
  );
}
