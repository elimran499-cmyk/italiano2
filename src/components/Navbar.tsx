import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { CONTACT_LINK } from '../data/contact';

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The overlay owns the screen while it is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const go = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-canvas/80 backdrop-blur-xl border-b border-ink/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 lg:h-18 flex items-center justify-between gap-4">
            <a href="#" className="shrink-0" id="nav-logo" aria-label="Italia IPTV">
              <Logo />
            </a>

            {/* Links sit in their own recessed track */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-ink/5 border border-ink/10">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  id={`nav-link-${link.id}`}
                  className="px-4 py-2 rounded-full text-[13px] font-semibold text-ink-soft hover:text-ink hover:bg-ink/8 transition-colors"
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
                className="hidden sm:inline-flex px-4 py-2.5 rounded-full text-[13px] font-semibold text-ink-soft hover:text-ink border border-ink/12 hover:border-ink/25 transition-colors"
                id="nav-btn-contatti"
              >
                Contatti
              </a>
              <button
                onClick={() => onOpenCheckoutModal()}
                id="nav-btn-pacchetti"
                className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-brand hover:bg-brand-deep text-white text-[13px] font-bold shadow-lg shadow-brand/25 transition-colors"
              >
                <span>Pacchetti</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Apri il menu"
                aria-expanded={isOpen}
                className="lg:hidden w-10 h-10 grid place-items-center rounded-full border border-ink/12 text-ink"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen menu, phones and tablets */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-canvas/97 backdrop-blur-xl flex flex-col">
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-ink/10">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Chiudi il menu"
              className="w-10 h-10 grid place-items-center rounded-full border border-ink/12 text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
            {LINKS.map((link, index) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="group flex items-baseline gap-4 py-4 border-b border-ink/8 text-left"
              >
                <span className="font-display text-xs font-bold text-brand tabular-nums">
                  0{index + 1}
                </span>
                <span className="font-display text-3xl font-bold tracking-[-0.03em] text-ink group-hover:text-brand transition-colors">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="px-6 pb-10 pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCheckoutModal();
              }}
              className="w-full py-4 rounded-full bg-brand text-white font-bold text-sm shadow-lg shadow-brand/25"
            >
              Vedi i pacchetti
            </button>
            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full border border-ink/15 text-ink font-bold text-sm text-center"
            >
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};
