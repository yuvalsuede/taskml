import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskML - AI Agent Task Visualization',
  description: 'The text-based protocol for AI agent task visualization. Simple syntax, powerful views.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
