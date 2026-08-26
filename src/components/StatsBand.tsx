import React from 'react';
import { CHANNEL_COUNT, VOD_COUNT } from '../data/stats';

/**
 * The four figures the offer rests on, set as an espresso band directly under
 * the hero. It breaks the run of cream sections and gives the page a dark line
 * to rest on before the channel wall starts.
 */

const STATS: { value: string; label: string; detail: string }[] = [
  { value: CHANNEL_COUNT, label: 'Canali live', detail: 'Rai, Mediaset, Sky, DAZN, La7' },
  { value: VOD_COUNT, label: 'Film e serie', detail: 'On demand, sempre disponibili' },
  { value: '4K', label: 'Fino a 4K, 8K e HDR', detail: 'Sport a 60 fps, senza scatti' },
  { value: '24/7', label: 'Assistenza in italiano', detail: 'Su WhatsApp, di solito in 2 minuti' }
];

export const StatsBand: React.FC = () => (
  <section className="relative overflow-hidden bg-ink text-white">
    <span aria-hidden="true" className="glow-azzurro absolute inset-0 pointer-events-none" />
    <span aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center lg:text-left ${
              index > 0 ? 'lg:border-l lg:border-white/12 lg:pl-6' : ''
            }`}
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-4xl sm:text-5xl font-extrabold leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="mt-3 block font-display text-[13px] sm:text-sm font-extrabold uppercase tracking-[0.14em] text-brand-light">
                {stat.label}
              </span>
              <span className="mt-1.5 block text-xs sm:text-[13px] font-medium text-white/55">
                {stat.detail}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
