import React, { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBand } from './components/StatsBand';
import { MobileNav } from './components/MobileNav';
import { SplashIntro } from './components/SplashIntro';

/*
 * Only the hero and the band under it are needed to paint. Everything below is
 * split out, so the first load carries the frame and the artwork instead of the
 * whole page — the pricing grid alone pulls in the animation library.
 */
const ChannelShowcase = lazy(() =>
  import('./components/ChannelShowcase').then((m) => ({ default: m.ChannelShowcase }))
);
const FilmsSeries = lazy(() =>
  import('./components/FilmsSeries').then((m) => ({ default: m.FilmsSeries }))
);
const Features = lazy(() => import('./components/Features').then((m) => ({ default: m.Features })));
const DeviceCompatibility = lazy(() =>
  import('./components/DeviceCompatibility').then((m) => ({ default: m.DeviceCompatibility }))
);
const SpeedCheckWidget = lazy(() =>
  import('./components/SpeedCheckWidget').then((m) => ({ default: m.SpeedCheckWidget }))
);
const Pricing = lazy(() => import('./components/Pricing').then((m) => ({ default: m.Pricing })));
const SetupSteps = lazy(() =>
  import('./components/SetupSteps').then((m) => ({ default: m.SetupSteps }))
);
const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const FaqSection = lazy(() =>
  import('./components/FaqSection').then((m) => ({ default: m.FaqSection }))
);
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
const WhatsAppFloating = lazy(() =>
  import('./components/WhatsAppFloating').then((m) => ({ default: m.WhatsAppFloating }))
);

/** Holds the scroll position while a section's chunk arrives. */
const SectionFallback: React.FC = () => <div className="min-h-[40vh]" />;

export default function App() {
  // Gli ordini passano da WhatsApp: ogni CTA "vedi i pacchetti" porta
  // semplicemente alla griglia dei prezzi, dove stanno i pulsanti d'ordine.
  const handleViewPlans = () => {
    document.getElementById('prezzi')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-brand selection:text-white">

      {/* Brand intro, plays on every load */}
      <SplashIntro />

      {/* Sticky Top Navigation */}
      <Navbar onOpenCheckoutModal={handleViewPlans} />

      {/* Hero Banner with Smart TV & Mobile Mockups */}
      <main id="main-content">
        <Hero onOpenCheckoutModal={() => handleViewPlans()} />

        {/* The four headline figures, on a band under the hero */}
        <StatsBand />

        <Suspense fallback={<SectionFallback />}>

        {/* Channel Showcase & Live Guide */}
        <ChannelShowcase onOpenCheckoutModal={() => handleViewPlans()} />

        {/* Films & Series VOD Library */}
        <FilmsSeries onOpenCheckoutModal={() => handleViewPlans()} />

        {/* Pricing Cards */}
        <Pricing onOpenCheckoutModal={handleViewPlans} />

        {/* Features Grid */}
        <Features />

        {/* Interactive Network & Device Compatibility Check Widget */}
        <SpeedCheckWidget onOpenCheckoutModal={() => handleViewPlans()} />

        {/* Device Compatibility & App Setup */}
        <DeviceCompatibility />

        {/* 3-Step Simple Setup */}
        <SetupSteps onOpenCheckoutModal={() => handleViewPlans()} />

        {/* Customer Testimonials / Trustpilot Rating */}
        <Testimonials />

        {/* FAQ Accordion Section */}
        <FaqSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<SectionFallback />}>
        <Footer onOpenCheckoutModal={() => handleViewPlans()} />
        <WhatsAppFloating />
      </Suspense>

      {/* Floating bottom navigation, phones and tablets only */}
      <MobileNav />

    </div>
  );
}
