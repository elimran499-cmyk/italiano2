import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
