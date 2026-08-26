import { Logo } from './Logo';
import React from 'react';
import { Tv, ShieldCheck, Heart, Lock, CreditCard } from 'lucide-react';
import { CONTACT_LINK } from '../data/contact';
import { CHANNEL_COUNT, VOD_COUNT } from '../data/stats';

interface FooterProps {
  onOpenCheckoutModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCheckoutModal }) => {
  // Extra bottom padding on phones so the floating nav never covers content.
  return (
    <footer className="relative overflow-hidden bg-canvas text-ink-soft border-t border-ink/10 pt-16 pb-28 lg:pb-12">
      <span aria-hidden="true" className="glow-azzurro absolute inset-0 pointer-events-none opacity-80" />
      {/* Tricolore strip closing the page */}
      <span aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-ink/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Logo />
            </div>

            <p className="text-ink-soft text-sm leading-relaxed max-w-sm">
              Il provider IPTV 4K premium numero #1 in Italia. Oltre {CHANNEL_COUNT} canali TV in diretta, tutto il grande sport italiano e {VOD_COUNT} film &amp; serie on demand su tutti i tuoi dispositivi.
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-ink/5 px-3 py-1.5 rounded-lg w-fit border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>99,9% di uptime su server dedicati europei</span>
            </div>
          </div>

          {/* Nav Links Col 1 */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-ink font-extrabold text-sm uppercase tracking-wider">
              Navigazione Rapida
            </h4>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                <a href="#canali" className="hover:text-emerald-400 transition-colors">
                  Canali & Sport
                </a>
              </li>
              <li>
                <a href="#prezzi" className="hover:text-emerald-400 transition-colors">
                  Pacchetti & Prezzi
                </a>
              </li>
              <li>
                <a href="#vantaggi" className="hover:text-emerald-400 transition-colors">
                  Perché Italia IPTV
                </a>
              </li>
              <li>
                <a href="#guida" className="hover:text-emerald-400 transition-colors">
                  Guida all'Installazione
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Domande Frequenti
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Legal Col */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-ink font-extrabold text-sm uppercase tracking-wider">
              Assistenza & Contatti
            </h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              Domande su un pacchetto, su un canale o sull'installazione sulla tua TV? La nostra assistenza in italiano ti risponde su WhatsApp, di solito entro 2 minuti.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenCheckoutModal}
                className="glass-brand w-full py-2.5 px-4 text-white font-bold text-xs rounded-full hover:brightness-110 transition-all text-center"
              >
                Vedi i Pacchetti
              </button>
              <a
                href={CONTACT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass w-full py-2.5 px-4 text-ink font-bold text-xs rounded-full transition-all text-center"
              >
                Contattaci su WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-canvas-alt p-6 rounded-2xl border border-ink/8 text-xs text-ink-soft space-y-2 text-left">
          <div className="font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-ink-soft" />
            <span>Disclaimer e Informazioni Legali:</span>
          </div>
          <p className="leading-relaxed">
            Italia IPTV opera come fornitore di tecnologia e servizi di rete. Tutti i marchi, i loghi e i nomi dei canali (come Rai, Mediaset, Sky, DAZN e La7) appartengono ai rispettivi titolari. I nostri servizi sono destinati esclusivamente a scopi didattici e di rete personale, nel rispetto della normativa vigente.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft border-t border-ink/8 pt-6">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Italia IPTV. Tutti i diritti riservati.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-ink-soft font-medium">Pagamenti sicuri con:</span>
            <div className="flex items-center gap-2 font-bold text-ink">
              <span className="px-2 py-0.5 bg-ink/5 rounded text-[10px]">PayPal</span>
              <span className="px-2 py-0.5 bg-ink/5 rounded text-[10px]">Carta</span>
              <span className="px-2 py-0.5 bg-ink/5 rounded text-[10px]">Crypto</span>
              <span className="px-2 py-0.5 bg-ink/5 rounded text-[10px]">Apple Pay</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
