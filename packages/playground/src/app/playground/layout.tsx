import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Interactive TaskML playground. Write task markup and see it render in real-time as kanban boards, timelines, tables, trees, and more.',
  openGraph: {
    title: 'TaskML Playground - Interactive Task Visualization',
    description: 'Write TaskML and see it render in real-time. Switch between 7 different views: list, kanban, timeline, table, tree, graph, summary.',
    url: 'https://taskml.dev/playground',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TaskML Playground',
      },
    ],
  },
  twitter: {
    title: 'TaskML Playground - Interactive Task Visualization',
    description: 'Write TaskML and see it render in real-time. 7 different views available.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://taskml.dev/playground',
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
