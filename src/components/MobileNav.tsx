import React, { useEffect, useState } from 'react';
import { Menu, X, Tv, Film, Tag, Sparkles, HelpCircle, BookOpen } from 'lucide-react';
import { CONTACT_LINK } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

/**
 * The phone menu: a single floating button that opens a stack of frosted pills
 * above it, one per section, and turns into a close button while it is open.
 * Replaces both the bottom tab bar and the full-screen overlay.
 */

interface Item {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITEMS: Item[] = [
  { id: 'canali', label: 'Canali', icon: Tv },
  { id: 'film', label: 'Film & Serie', icon: Film },
  { id: 'prezzi', label: 'Prezzi', icon: Tag },
  { id: 'vantaggi', label: 'Vantaggi', icon: Sparkles },
  { id: 'guida', label: 'Guida', icon: BookOpen },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Escape closes it, the same as tapping the scrim.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const go = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Scrim, so a tap anywhere closes the stack */}
      {isOpen && (
        <button
          aria-label="Chiudi il menu"
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px]"
        />
      )}

      <div className="lg:hidden fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
        {isOpen && (
          <>
            {ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  style={{ animationDelay: `${index * 35}ms` }}
                  className="menu-pill-in glass-ink flex items-center gap-2.5 rounded-2xl px-4 py-3 text-white text-sm font-semibold active:scale-95 transition-transform"
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              style={{ animationDelay: `${ITEMS.length * 35}ms` }}
              className="menu-pill-in glass-brand flex items-center gap-2.5 rounded-2xl px-4 py-3 text-white text-sm font-semibold active:scale-95 transition-transform"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </>
        )}

        <button
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Chiudi il menu' : 'Apri il menu'}
          className="glass-ink w-14 h-14 rounded-full grid place-items-center text-white active:scale-95 transition-transform"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
};
