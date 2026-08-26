import React from 'react';
import { Tv, Zap, Trophy, Smartphone, Film, Headphones, CheckCircle } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { VOD_COUNT } from '../data/stats';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: Tv,
      title: 'Qualità 4K e Ultra HD',
      description: 'Immagine nitidissima su ogni schermo, con supporto a 60 FPS per gli eventi sportivi in diretta.',
      badge: '4K 60FPS'
    },
    {
      icon: Zap,
      title: 'Tecnologia Anti-Freeze™ v9.0',
      description: 'I nostri cluster di server dedicati in Europa garantiscono il 99,9% di uptime. Mai più buffering durante le partite che contano.',
      badge: '99,9% Uptime'
    },
    {
      icon: Trophy,
      title: 'Tutto lo Sport in Diretta Incluso',
      description: 'Non perdere un secondo di Serie A, Champions League, Formula 1, MotoGP e Premier League con Sky Sport, DAZN ed Eurosport.',
      badge: 'Sky Sport & DAZN'
    },
    {
      icon: Smartphone,
      title: 'Installazione Facile e Veloce',
      description: 'Funziona senza intoppi su Smart TV (Samsung, LG), Amazon Fire Stick, Android TV, Apple TV, iOS, Windows, Mac ed Enigma2.',
      badge: 'In 5 minuti'
    },
    {
      icon: Film,
      title: `${VOD_COUNT} Film e Serie On Demand`,
      description: 'Aggiornamenti quotidiani con le ultime uscite al cinema e le serie del momento di Netflix e HBO Max, in italiano o sottotitolate.',
      badge: 'Sub ITA'
    },
    {
      icon: Headphones,
      title: 'Assistenza in Italiano 24/7',
      description: 'Il nostro supporto tecnico è a disposizione giorno e notte su WhatsApp e via e-mail per rispondere subito a ogni domanda.',
      badge: 'WhatsApp 24/7'
    }
  ];

  return (
    <section id="vantaggi" className="py-14 sm:py-20 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          label="Perché Italia IPTV"
          title={<>Costruito per la <span className="hl-pill">migliore</span> esperienza di visione in Italia</>}
          intro="Uniamo la tecnologia di streaming Ultra HD più recente a server europei di altissimo livello, per una visione senza interruzioni."
        />

        {/* Features Light Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {featuresList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-paper p-6 sm:p-8 rounded-xl border border-ink/10 hover:border-brand shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
              >
                {/* Accent rule that fills in as the card is hovered */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-lg bg-brand/15 text-brand-deep flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-brand/10 text-brand-deep border border-brand/25">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-ink-soft text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/8 flex items-center text-xs font-bold text-brand-deep gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-deep" />
                  <span>Incluso e garantito</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
