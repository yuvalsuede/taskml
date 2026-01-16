import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '../components/ui';

export const metadata: Metadata = {
  title: 'TaskML Playground',
  description: 'Interactive playground for TaskML - AI agent task visualization and management',
  keywords: ['TaskML', 'task management', 'visualization', 'AI agents', 'playground'],
  authors: [{ name: 'TaskML' }],
  openGraph: {
    title: 'TaskML Playground',
    description: 'Interactive playground for TaskML - AI agent task visualization',
    type: 'website',
    siteName: 'TaskML',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskML Playground',
    description: 'Interactive playground for TaskML - AI agent task visualization',
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
