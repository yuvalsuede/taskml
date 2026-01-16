/**
 * MobileNav - Bottom navigation for mobile devices
 */

'use client';

import { Code2, Eye } from 'lucide-react';
import { useUIStore } from '../../stores';
import type { MobileTab } from '../../types';

export function MobileNav() {
  const activeMobileTab = useUIStore((s) => s.activeMobileTab);
  const setMobileTab = useUIStore((s) => s.setMobileTab);

  const tabs: { id: MobileTab; label: string; icon: typeof Code2 }[] = [
    { id: 'editor', label: 'Editor', icon: Code2 },
    { id: 'preview', label: 'Preview', icon: Eye },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeMobileTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className={`
              flex-1 flex flex-col items-center justify-center gap-1
              transition-colors
              ${isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
