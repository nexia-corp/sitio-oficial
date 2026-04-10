'use client';

import {
  Navigation,
  Hero,
  TechLogos,
  ProblemSection,
  Services,
  Process,
  Stats,
  WhiteLabel,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
  CustomCursor,
  FloatingWhatsApp,
  AIAnalyzerWidget,
} from './components';

export default function Home() {
  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Tech Logos */}
        <TechLogos />

        {/* Problem Section */}
        <ProblemSection />

        {/* Services */}
        <Services />

        {/* Process */}
        <Process />

        {/* Stats */}
        <Stats />

        {/* Final CTA - Strategic Position */}
        <FinalCTA />

        {/* WhiteLabel Demo */}
        <WhiteLabel />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating Widgets */}
      <AIAnalyzerWidget />
      <FloatingWhatsApp />
    </>
  );
}
