import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ShoppingCart } from 'lucide-react';
import { Logo, LogoMark } from './Logo';
import { CONTACT_LINK } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onOpenCheckoutModal: (planId?: string) => void;
}

const LINKS: { id: string; label: string }[] = [
  { id: 'canali', label: 'Canali' },
  { id: 'film', label: 'Film & Serie' },
  { id: 'prezzi', label: 'Prezzi' },
  { id: 'vantaggi', label: 'Vantaggi' },
  { id: 'guida', label: 'Guida' },
  { id: 'faq', label: 'FAQ' }
];

/**
 * A slim bar pinned to the top edge, dark and glassy, with the links riding in
 * their own inset track in the middle. On phones the links move into a
 * full-screen overlay behind a single button.
 */
export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckoutModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 inset-x-0 z-50 py-2.5 sm:py-0 transition-colors duration-300 ${
          isScrolled
            ? 'sm:bg-canvas/80 sm:backdrop-blur-xl sm:border-b sm:border-ink/10'
            : 'sm:bg-transparent sm:border-b sm:border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Phone bar. A single floating pill rather than a full-width chrome
            bar: it sits over the hero artwork and over the white sections
            further down, so the tint is dark and the marks are light. Nothing
            about it changes on scroll.
          */}
          {/*
            Phone bar. Over the hero it is one floating glass pill; once the
            page moves the bar itself dissolves and its three controls go on
            alone — order on the left, the mark in the middle, WhatsApp on the
            right — each carrying its own ground so it reads on whatever
            scrolls underneath.
          */}
          <div
            className={`sm:hidden relative flex items-center justify-between gap-1 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'border border-transparent bg-transparent px-0 py-0 shadow-none backdrop-blur-none'
                : 'border border-white/20 bg-ink/45 px-2 py-1.5 shadow-lg shadow-ink/25 backdrop-blur-xl'
            }`}
          >
            <button
              onClick={() => onOpenCheckoutModal()}
              id="nav-btn-ordina-mobile"
              aria-label="Vedi i pacchetti e ordina"
              className={`glass-brand flex items-center gap-1.5 rounded-full pl-2.5 pr-3 text-[12px] font-bold text-white transition-all duration-300 ${
                isScrolled ? 'h-11 shadow-xl shadow-brand/30' : 'h-9'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Ordina</span>
            </button>

            <a
              href="#"
              aria-label="Italia IPTV"
              className={`flex items-center gap-2 ${
                isScrolled ? 'absolute left-1/2 -translate-x-1/2' : ''
              }`}
            >
              <LogoMark
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-11 h-11 shadow-xl shadow-ink/25 ring-1 ring-white/60' : 'w-[30px] h-[30px]'
                }`}
              />
              {!isScrolled && (
                <span className="font-display text-[17px] font-bold leading-none tracking-[-0.03em] text-white">
                  italia<span className="text-brand-light">iptv</span>
                </span>
              )}
            </a>

            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrivici su WhatsApp"
              className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'h-11 w-11 bg-canvas text-ink shadow-xl shadow-ink/20 ring-1 ring-ink/10'
                  : 'h-9 w-9 text-white active:bg-white/15'
              }`}
            >
              <WhatsAppIcon className="w-[21px] h-[21px]" />
            </a>
          </div>

          <div className="hidden sm:flex h-16 lg:h-18 items-center justify-between gap-4">
            <a href="#" className="shrink-0" id="nav-logo" aria-label="Italia IPTV">
              <Logo />
            </a>

            {/* Links sit in their own recessed track */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full glass">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  id={`nav-link-${link.id}`}
                  className="px-4 py-2 rounded-full text-[13px] font-semibold text-ink-soft hover:text-ink hover:bg-ink/6 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={CONTACT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass hidden sm:inline-flex px-4 py-2.5 rounded-full text-[13px] font-semibold text-ink-soft hover:text-ink transition-colors"
                id="nav-btn-contatti"
              >
                Contatti
              </a>
              <button
                onClick={() => onOpenCheckoutModal()}
                id="nav-btn-pacchetti"
                className="glass-brand group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-white text-[13px] font-bold hover:brightness-110 transition-all"
              >
                <span>Pacchetti</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

    </>
  );
};
