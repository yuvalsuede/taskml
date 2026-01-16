/**
 * EmptyState - Placeholder when no content to show
 */

import { FileText, AlertCircle, Inbox } from 'lucide-react';

type IconType = 'empty' | 'error' | 'default';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: IconType;
}

const icons: Record<IconType, typeof FileText> = {
  empty: Inbox,
  error: AlertCircle,
  default: FileText,
};

export function EmptyState({ title, description, icon = 'default' }: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <Icon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        {description}
      </p>
    </div>
  );
}
