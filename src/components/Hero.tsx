import React from 'react';
import { Play, MessageCircle, Check } from 'lucide-react';
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
).slice(0, 14);

const PROOF = ['Attivo in 5 minuti', 'Senza contratto', 'Fino a 4K e 60 fps'];

/**
 * Centred hero: the claim first, the catalogue underneath as a single band of
 * artwork running edge to edge. Where the first identity built a wordmark out
 * of the brand name, this one leads with the offer.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenCheckoutModal }) => (
  <section className="relative overflow-hidden pt-28 pb-0 lg:pt-36">
    {/* Azzurro light thrown from behind the headline */}
    <span aria-hidden="true" className="glow-azzurro absolute inset-x-0 -top-40 h-[38rem] pointer-events-none" />
    <span aria-hidden="true" className="pattern-majolica absolute inset-0 pointer-events-none opacity-60" />

    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand/35 bg-brand/10 text-brand-light text-[12px] font-semibold tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        {CHANNEL_COUNT} canali · {VOD_COUNT} film e serie
      </span>

      <h1 className="mt-7 font-display font-bold text-ink leading-[0.95] tracking-[-0.045em] text-[2.75rem] sm:text-6xl lg:text-[5.25rem]">
        Tutta la TV italiana,
        <br />
        <span className="hl-pill">su ogni schermo</span>
      </h1>

      <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-ink-soft">
        Rai, Mediaset, Sky, DAZN e La7 in diretta, più una libreria on demand che si aggiorna ogni
        giorno. Nessuna parabola, nessun decoder — solo la tua connessione.
      </p>

      <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
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

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
        {PROOF.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-ink-soft">
            <Check className="w-4 h-4 text-brand" strokeWidth={3} />
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Catalogue band: one row of artwork, edge to edge, fading into the page */}
    <div
      className="relative mt-16 lg:mt-20 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      aria-hidden="true"
    >
      <div className="flex w-max gap-3 sm:gap-4 marquee-left" style={{ '--marquee-duration': '52s' } as React.CSSProperties}>
        {[0, 1].map((pass) => (
          <div key={pass} className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
            {POSTERS.map((item, index) => (
              <div
                key={`${pass}-${item.id}`}
                className="relative w-28 sm:w-36 lg:w-44 aspect-2/3 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-ink/5"
              >
                <img
                  src={item.poster}
                  alt=""
                  loading={pass === 0 && index < 5 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* The band sinks into the section below it */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  </section>
);
