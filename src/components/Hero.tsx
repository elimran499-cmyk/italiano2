import React from 'react';
import { Play, Layers, CheckCircle2 } from 'lucide-react';
import { MEDIA_ROWS } from '../data/media';
import { CONTACT_LINK } from '../data/contact';
import { CHANNEL_COUNT, VOD_COUNT } from '../data/stats';
import { useFeaturedRotation } from '../hooks/useFeaturedRotation';
import { WhatsAppIcon } from './WhatsAppIcon';

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

const metaOf = (item: (typeof FEATURED)[number]) =>
  [item.year, item.genre, item.quality].filter(Boolean).join(' • ');

/**
 * Cinematic hero, built to the streaming-app reference: full-bleed key art with
 * the title set large over it, a play affordance, and the catalogue rail along
 * the foot. The artwork is portrait, so the phone takes it full-bleed while the
 * wide frame runs it blurred behind a sharp card — a portrait still would crop
 * to nothing across a landscape screen.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenCheckoutModal }) => {
  const { index, armed } = useFeaturedRotation(FEATURED.length);
  const active = FEATURED[index];

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
                className={`h-full w-full object-cover sm:scale-110 sm:blur-2xl ${
                  i === index ? 'hero-kenburns' : ''
                }`}
                style={{ objectPosition: '50% 28%', filter: 'brightness(1.1) saturate(1.05)' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Grades: light enough to keep the still bright, heavy enough to hold type */}
      <div className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-black/90 via-black/45 to-transparent sm:h-32 sm:from-black/80" />
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black via-black/88 to-transparent" />
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black via-black/75 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pt-20 pb-24 sm:px-6 sm:pt-32 sm:pb-10 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between sm:gap-10">
          {/* Title block */}
          <div className="sm:max-w-2xl">
            <p
              key={active.id}
              className="hero-title-in font-display text-[2.1rem] font-bold uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
              style={{ textShadow: '0 2px 18px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.6)' }}
            >
              {active.title}
            </p>

            <p className="mt-2.5 text-[12px] font-medium text-white/60 sm:mt-4 sm:text-sm">
              {metaOf(active)}
            </p>

            <div className="mt-3.5 h-[3px] w-9 rounded-full bg-brand sm:mt-5 sm:w-12" />

            <div className="mt-6 flex items-center gap-4 sm:mt-7">
              <button
                type="button"
                onClick={onOpenCheckoutModal}
                aria-label="Vedi i pacchetti"
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-white/70 transition-colors active:bg-white/15 hover:bg-white/10 sm:h-14 sm:w-14"
              >
                <Play className="h-[18px] w-[18px] translate-x-[2px] fill-white text-white sm:h-5 sm:w-5" />
              </button>

              <button
                type="button"
                onClick={onOpenCheckoutModal}
                id="hero-btn-pacchetti"
                className="glass-brand hidden sm:inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white hover:brightness-110 transition-all"
              >
                <Layers className="h-4 w-4" />
                Tutti i pacchetti
              </button>
            </div>

            <div className="mt-7 hidden sm:flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-white/65">
              {GUARANTEES.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-light" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* The sharp still, for the wide frame the blurred fill sits behind */}
          <div className="hidden sm:block shrink-0">
            <img
              key={active.id}
              src={active.poster}
              alt=""
              decoding="async"
              className="hero-title-in h-[300px] w-[200px] rounded-2xl object-cover shadow-2xl shadow-black/70 ring-1 ring-white/15 lg:h-[380px] lg:w-[254px]"
            />
          </div>
        </div>

        {/* Foot */}
        <div className="mt-auto">
          {/* Phone: the two ways in */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={onOpenCheckoutModal}
              className="glass-brand flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white"
            >
              <Layers className="h-4 w-4" />
              Vedi i pacchetti
            </button>

            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/12 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors active:bg-white/20"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ordina su WhatsApp
            </a>
          </div>

          {/* Wide: collection label, progress markers, poster rail */}
          <div className="hidden sm:block">
            <div className="mb-3 flex items-end justify-between">
              <p className="text-sm font-bold text-white drop-shadow">
                Dalla libreria Italia IPTV
              </p>
              <div className="flex items-center gap-2">
                {FEATURED.map((item, i) => (
                  <span
                    key={item.id}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === index ? 'w-8 bg-brand' : 'w-4 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 overflow-hidden">
              {RAIL.map((item) => (
                <img
                  key={item.id}
                  src={item.poster}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-[132px] w-[88px] shrink-0 rounded-lg object-cover shadow-xl shadow-black/60 ring-1 ring-white/10 transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
