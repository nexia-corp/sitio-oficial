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

        {/* WhiteLabel Demo */}
        <WhiteLabel />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTA />

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </>
  );
}
