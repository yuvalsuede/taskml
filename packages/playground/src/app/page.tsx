'use client';

import {
  Hero,
  Features,
  SyntaxShowcase,
  ViewTypes,
  Integrations,
  OpenSource,
  Footer,
} from '../components/landing';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <SyntaxShowcase />
      <ViewTypes />
      <Integrations />
      <OpenSource />
      <Footer />
    </main>
  );
}
