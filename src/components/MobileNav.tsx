import React, { useEffect, useState } from 'react';
import { Home, Tv, Film, Tag, MessageCircle } from 'lucide-react';
import { CONTACT_LINK } from '../data/contact';

/**
 * Navigazione flottante in basso per telefoni e tablet, al posto del menu a
 * tendina. Le sezioni sono seguite allo scroll, così la pillola attiva segue
 * la pagina.
 */

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITEMS: NavItem[] = [
  { id: 'top', label: 'Home', icon: Home },
  { id: 'canali', label: 'Canali', icon: Tv },
  { id: 'film', label: 'Film', icon: Film },
  { id: 'prezzi', label: 'Prezzi', icon: Tag }
];

export const MobileNav: React.FC = () => {
  const [active, setActive] = useState<string>('top');

  useEffect(() => {
    const onScroll = () => {
      // The section whose top has passed 45% of the viewport is the active one.
      const line = window.scrollY + window.innerHeight * 0.45;
      let current = 'top';
      for (const item of ITEMS) {
        if (item.id === 'top') continue;
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= line) current = item.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Navigazione principale"
      className="lg:hidden fixed bottom-4 inset-x-4 z-40 bg-ink rounded-full shadow-2xl shadow-ink/40 px-2 py-2 flex items-center justify-around overflow-hidden"
    >
      <span aria-hidden="true" className="glow-azzurro absolute inset-0 pointer-events-none" />

      {ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'true' : undefined}
            className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
              isActive ? 'text-white bg-brand' : 'text-white/65 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}

      {/* Contact sits last, matching the top bar's WhatsApp action */}
      <a
        href={CONTACT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contatto via WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 rounded-full text-white/65 hover:text-white transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </nav>
  );
};
