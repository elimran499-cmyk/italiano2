import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBand } from './components/StatsBand';
import { ChannelShowcase } from './components/ChannelShowcase';
import { FilmsSeries } from './components/FilmsSeries';
import { Features } from './components/Features';
import { DeviceCompatibility } from './components/DeviceCompatibility';
import { SpeedCheckWidget } from './components/SpeedCheckWidget';
import { Pricing } from './components/Pricing';
import { SetupSteps } from './components/SetupSteps';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { MobileNav } from './components/MobileNav';
import { SplashIntro } from './components/SplashIntro';

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

        {/* The four headline figures, on a dark band under the hero */}
        <StatsBand />

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
      </main>

      {/* Footer */}
      <Footer onOpenCheckoutModal={() => handleViewPlans()} />

      <WhatsAppFloating />

      {/* Floating bottom navigation, phones and tablets only */}
      <MobileNav />

    </div>
  );
}
