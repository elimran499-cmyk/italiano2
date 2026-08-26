import React, { useEffect, useState } from 'react';
import { LogoMark } from './Logo';

/**
 * Full-screen brand intro shown on every page load.
 *
 * The mark scales in, the wordmark letters stagger up after it, then the whole
 * overlay fades out and unmounts. Skipped entirely for visitors who ask for
 * reduced motion, and page scroll is locked only while it is on screen.
 */

const WORD = 'Italia\u00a0IPTV';

/** ms from mount until the overlay starts fading. */
const HOLD_MS = 1600;
/** ms the fade itself takes. */
const FADE_MS = 550;

export const SplashIntro: React.FC = () => {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setPhase('done');
      return;
    }

    document.body.style.overflow = 'hidden';
    const toOut = window.setTimeout(() => setPhase('out'), HOLD_MS);
    const toDone = window.setTimeout(() => setPhase('done'), HOLD_MS + FADE_MS);

    return () => {
      window.clearTimeout(toOut);
      window.clearTimeout(toDone);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (phase === 'done') document.body.style.overflow = '';
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center gap-6"
      style={
        phase === 'out'
          ? { animation: `splash-out ${FADE_MS}ms ease-out forwards` }
          : undefined
      }
    >
      <LogoMark
        inverted
        className="w-20 h-20 sm:w-24 sm:h-24"
        style={{ animation: 'splash-mark-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
      />

      <div className="flex items-baseline">
        {WORD.split('').map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            className="font-display font-extrabold text-white text-3xl sm:text-4xl tracking-tight"
            style={{
              animation: 'splash-letter-in 420ms ease-out both',
              animationDelay: `${380 + i * 55}ms`
            }}
          >
            {letter}
          </span>
        ))}
        <span
          className="font-display font-extrabold text-brand-light text-3xl sm:text-4xl"
          style={{
            animation: 'splash-letter-in 420ms ease-out both',
            animationDelay: `${380 + WORD.length * 55}ms`
          }}
        >
          .
        </span>
      </div>

      <span
        className="h-[3px] w-28 rounded-full origin-left bg-gradient-to-r from-brand via-brand-light to-teal-400"
        style={{
          animation: 'splash-rule-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
          animationDelay: '760ms'
        }}
      />

      <span
        className="font-display text-[11px] font-extrabold tracking-[0.28em] uppercase text-white/50"
        style={{ animation: 'splash-letter-in 420ms ease-out both', animationDelay: '900ms' }}
      >
        Streaming 4K Premium
      </span>
    </div>
  );
};
