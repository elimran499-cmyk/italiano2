import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { MEDIA_ROWS } from '../data/media';
import { CONTACT_LINK } from '../data/contact';
import { CHANNEL_COUNT, VOD_COUNT } from '../data/stats';
import { useFeaturedRotation } from '../hooks/useFeaturedRotation';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LogoMark } from './Logo';

interface HeroProps {
  onOpenCheckoutModal: () => void;
}

/** Every title with artwork, de-duplicated by id. */
const POSTERS = Array.from(
  new Map(
    MEDIA_ROWS.flatMap((row) => row.items)
      .filter((item) => Boolean(item.poster))
      .map((item) => [item.id, item])
  ).values()
);

/** The titles that take the full frame, best-rated first. */
const FEATURED = [...POSTERS]
  .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  .slice(0, 6);

/** The rail along the foot. */
const RAIL = POSTERS.slice(0, 16);

const GUARANTEES = [
  `${CHANNEL_COUNT} canali live`,
  `${VOD_COUNT} film e serie`,
  'Attivo in 5 minuti'
];

/**
 * Cinematic hero, built to the streaming-app reference: full-bleed key art with
 * the title set large over it, a play affordance, and the catalogue rail along
 * the foot. The artwork is portrait, so the phone takes it full-bleed while the
 * wide frame runs it blurred behind a sharp card — a portrait still would crop
 * to nothing across a landscape screen.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenCheckoutModal }) => {
  const { index, armed } = useFeaturedRotation(FEATURED.length);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black">
      {/* Key art */}
      <div className="absolute inset-0">
        {FEATURED.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            {armed.includes(i) && (
              <img
                src={item.poster}
                alt=""
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'low'}
                className={`h-full w-full object-cover ${i === index ? 'hero-kenburns' : ''}`}
                style={{ objectPosition: '50% 28%', filter: 'brightness(1.1) saturate(1.05)' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Grades: light enough to keep the still bright, heavy enough to hold type */}
      <div className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-black/90 via-black/45 to-transparent sm:h-32 sm:from-black/80" />
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black via-black/88 to-transparent" />
      {/* A centred composition needs an even grade, not a one-sided one */}
      <div className="absolute inset-0 bg-black/45 sm:bg-black/50" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-5 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8">
        {/* The name holds the centre of the frame; the artwork behind it rotates */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <LogoMark className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />

          <h1
            className="hero-title-in mt-5 font-display font-bold leading-[0.9] tracking-[-0.05em] text-white text-[3.25rem] sm:text-7xl lg:text-[6rem]"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)' }}
          >
            italia<span className="text-brand-light">iptv</span>
          </h1>

          <p className="mt-4 max-w-xl font-display text-lg sm:text-2xl lg:text-3xl font-medium tracking-[-0.02em] text-white/90">
            Tutta la TV italiana, su ogni schermo
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light animate-pulse" />
            {CHANNEL_COUNT} canali · {VOD_COUNT} film e serie
          </span>

          <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onOpenCheckoutModal}
              id="hero-btn-pacchetti"
              className="glass-brand flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white hover:brightness-110 transition-all active:scale-[0.98]"
            >
              <Layers className="h-4 w-4" />
              Vedi i pacchetti
            </button>

            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-btn-contatti"
              className="flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/12 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 active:bg-white/20"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ordina su WhatsApp
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/65">
            {GUARANTEES.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-light" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Foot: which title is on screen, and the rail it comes from */}
        <div className="mt-auto hidden sm:block">
          <div className="mb-3 flex items-end justify-between">
            <p className="text-sm font-bold text-white/90 drop-shadow">
              Dalla libreria Italia IPTV
            </p>
            <div className="flex items-center gap-2">
              {FEATURED.map((item, i) => (
                <span
                  key={item.id}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    i === index ? 'w-8 bg-brand-light' : 'w-4 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 overflow-hidden [mask-image:linear-gradient(to_right,#000_82%,transparent)]">
            {RAIL.map((item) => (
              <img
                key={item.id}
                src={item.poster}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[120px] w-[80px] shrink-0 rounded-lg object-cover shadow-xl shadow-black/60 ring-1 ring-white/10 transition-transform duration-300 hover:scale-105 lg:h-[132px] lg:w-[88px]"
              />
            ))}
          </div>
        </div>

        {/* Phone: a hint that the page continues */}
        <div className="mt-auto flex justify-center sm:hidden">
          <span className="h-9 w-5 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <span className="h-1.5 w-1 rounded-full bg-white/70" />
          </span>
        </div>
      </div>

    </section>
  );
};
