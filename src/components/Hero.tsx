import React from 'react';
import { Play, MessageCircle, Check } from 'lucide-react';
import { LogoMark } from './Logo';
import { MEDIA_ROWS } from '../data/media';
import { CONTACT_LINK } from '../data/contact';
import { CHANNEL_COUNT, VOD_COUNT } from '../data/stats';

interface HeroProps {
  onOpenCheckoutModal: () => void;
}

/** Poster pool for the marquee, de-duplicated by id. */
const POSTERS = Array.from(
  new Map(
    MEDIA_ROWS.flatMap((row) => row.items)
      .filter((item) => Boolean(item.poster))
      .map((item) => [item.id, item])
  ).values()
).slice(0, 20);

/** Row one leads, row two trails — split so the phone's two rows never align. */
const ROWS = [
  POSTERS.filter((_, index) => index % 2 === 0),
  POSTERS.filter((_, index) => index % 2 === 1)
];

const PROOF = ['Attivo in 5 minuti', 'Senza contratto', 'Fino a 4K e 60 fps'];

/**
 * Centred hero: the claim first, the catalogue underneath as a single band of
 * artwork running edge to edge. Where the first identity built a wordmark out
 * of the brand name, this one leads with the offer.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenCheckoutModal }) => (
  <section className="relative flex flex-col overflow-hidden pt-20 pb-0 sm:pt-28 lg:pt-36">
    {/* Azzurro light thrown from behind the headline */}
    <span aria-hidden="true" className="glow-azzurro absolute inset-x-0 -top-40 h-[38rem] pointer-events-none" />

    <div className="relative order-last sm:order-first max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <LogoMark className="w-14 h-14 sm:w-16 sm:h-16 mx-auto" />

      {/* The site's own name, set as the centrepiece */}
      <h1 className="mt-5 font-display font-bold text-ink leading-[0.9] tracking-[-0.05em] text-[3.25rem] sm:text-7xl lg:text-[5.5rem]">
        italia<span className="text-brand">iptv</span>
      </h1>

      <p className="mt-4 font-display text-lg sm:text-2xl lg:text-3xl font-medium tracking-[-0.02em] text-ink">
        Tutta la TV italiana, <span className="hl-pill">su ogni schermo</span>
      </p>

      <span className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand/35 bg-brand/10 text-brand text-[12px] font-semibold tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        {CHANNEL_COUNT} canali · {VOD_COUNT} film e serie
      </span>

      <p className="mt-5 mx-auto max-w-2xl text-[15px] sm:text-lg leading-relaxed text-ink-soft">
        Rai, Mediaset, Sky, DAZN e La7 in diretta, più una libreria on demand che si aggiorna ogni
        giorno. Nessuna parabola, nessun decoder — solo la tua connessione.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <button
          onClick={onOpenCheckoutModal}
          id="hero-btn-pacchetti"
          className="glass-brand group px-7 py-4 rounded-full text-white font-bold text-[15px] hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2.5"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Vedi i pacchetti</span>
        </button>
        <a
          href={CONTACT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          id="hero-btn-contatti"
          className="glass px-7 py-4 rounded-full text-ink font-bold text-[15px] hover:brightness-[0.98] transition-all flex items-center justify-center gap-2.5"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Parla con noi</span>
        </a>
      </div>

      <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
        {PROOF.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-ink-soft">
            <Check className="w-4 h-4 text-brand" strokeWidth={3} />
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/*
      Catalogue band. Two rows on a phone, running against each other, so the
      artwork reads as a moving wall on a narrow screen instead of a single thin
      strip; one wider row from sm up, where a phone's height is not the
      constraint.
    */}
    <div
      className="relative order-first sm:order-last mb-10 sm:mb-0 sm:mt-16 lg:mt-20 space-y-3 sm:space-y-0 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      aria-hidden="true"
    >
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex w-max gap-3 sm:gap-4 ${
            rowIndex === 0 ? 'marquee-left' : 'marquee-right sm:hidden'
          }`}
          style={
            { '--marquee-duration': rowIndex === 0 ? '34s' : '40s' } as React.CSSProperties
          }
        >
          {[0, 1].map((pass) => (
            <div key={pass} className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
              {row.map((item, index) => (
                <div
                  key={`${pass}-${item.id}`}
                  className="group relative w-32 sm:w-36 lg:w-44 aspect-2/3 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-ink/5 shadow-sm"
                >
                  <img
                    src={item.poster}
                    alt=""
                    loading={rowIndex === 0 && pass === 0 && index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Quality mark, as on the cards further down the page */}
                  <span className="absolute top-1.5 right-1.5 rounded-md bg-ink/70 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white backdrop-blur-sm">
                    4K
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Leading the page on a phone the band fades downward into the name;
          trailing it from sm up, it sinks into the section below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  </section>
);
