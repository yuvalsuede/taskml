import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '../components/ui';

export const metadata: Metadata = {
  metadataBase: new URL('https://taskml.dev'),
  title: {
    default: 'TaskML - The Markup Language for Tasks',
    template: '%s | TaskML',
  },
  description: 'A lightweight markup language for task management. Write tasks in simple syntax, render as kanban boards, timelines, tables, and more. Zero dependencies, 15KB, perfect for AI agents.',
  keywords: [
    'TaskML',
    'task management',
    'markup language',
    'kanban board',
    'project management',
    'AI agents',
    'Claude',
    'ChatGPT',
    'todo list',
    'task visualization',
    'typescript',
    'open source',
  ],
  authors: [{ name: 'Yuval Suede', url: 'https://twitter.com/paborito' }],
  creator: 'Yuval Suede',
  publisher: 'TaskML',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'TaskML - The Markup Language for Tasks',
    description: 'Write tasks in simple syntax, render as kanban boards, timelines, tables, and more. Perfect for AI agents and humans alike.',
    url: 'https://taskml.dev',
    siteName: 'TaskML',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TaskML - The task markup language',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskML - The Markup Language for Tasks',
    description: 'Write tasks in simple syntax, render as kanban boards, timelines, tables, and more. Perfect for AI agents.',
    creator: '@paborito',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://taskml.dev',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TaskML',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  description: 'A lightweight markup language for task management. Write tasks in simple syntax, render as kanban boards, timelines, tables, and more.',
  url: 'https://taskml.dev',
  author: {
    '@type': 'Person',
    name: 'Yuval Suede',
    url: 'https://twitter.com/paborito',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  license: 'https://opensource.org/licenses/MIT',
  codeRepository: 'https://github.com/yuvalsuede/taskml',
  programmingLanguage: 'TypeScript',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
