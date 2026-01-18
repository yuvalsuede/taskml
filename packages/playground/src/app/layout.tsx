import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '../components/ui';

export const metadata: Metadata = {
  title: {
    default: 'TaskML - The Markup Language for Tasks',
    template: '%s | TaskML',
  },
  description: 'Simple syntax. Multiple views. Perfect for AI agents and humans alike. Turn plain text into beautiful task visualizations.',
  keywords: ['TaskML', 'task management', 'visualization', 'AI agents', 'markup language', 'kanban', 'todo'],
  authors: [{ name: 'TaskML' }],
  openGraph: {
    title: 'TaskML - The Markup Language for Tasks',
    description: 'Simple syntax. Multiple views. Perfect for AI agents and humans alike.',
    type: 'website',
    siteName: 'TaskML',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskML - The Markup Language for Tasks',
    description: 'Simple syntax. Multiple views. Perfect for AI agents and humans alike.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
