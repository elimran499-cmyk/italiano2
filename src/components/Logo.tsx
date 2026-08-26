import React, { useId } from 'react';

/**
 * Italia IPTV mark, second identity.
 *
 * A hard-cornered chevron pair — the fast-forward cue — cut out of a rounded
 * tile, with the tricolore running through the cut and an azzurro tile behind
 * it. Geometric where the first identity was a hand-drawn star.
 */

interface MarkProps {
  /** Lightens the tile, for use on the deepest grounds. */
  inverted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoMark: React.FC<MarkProps> = ({ inverted = false, className = '', style }) => {
  // Unique per instance: a shared id would break the moment the first holder
  // of the definition unmounted.
  const uid = useId().replace(/:/g, '');

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={style}
    >
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`tile-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={inverted ? '#1d2735' : '#2b7fff'} />
            <stop offset="100%" stopColor={inverted ? '#121824' : '#1a5fd6'} />
          </linearGradient>
          <linearGradient id={`flag-${uid}`} x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#00c46a" />
            <stop offset="34%" stopColor="#00c46a" />
            <stop offset="46%" stopColor="#ffffff" />
            <stop offset="58%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#ff3b4e" />
            <stop offset="100%" stopColor="#ff3b4e" />
          </linearGradient>
        </defs>

        {/* Tile */}
        <rect x="0" y="0" width="64" height="64" rx="18" fill={`url(#tile-${uid})`} />

        {/* Chevron pair, in the tricolore */}
        <path d="M14 18 L30 32 L14 46 L21.5 46 L37.5 32 L21.5 18 Z" fill={`url(#flag-${uid})`} />
        <path d="M32 18 L48 32 L32 46 L39.5 46 L55.5 32 L39.5 18 Z" fill={`url(#flag-${uid})`} opacity="0.55" />
      </svg>
    </span>
  );
};

interface LogoProps {
  inverted?: boolean;
  className?: string;
  /** Applied to the wordmark block, so the mark can stand alone. */
  wordmarkClassName?: string;
}

/** Mark plus wordmark, used in the header and footer. */
export const Logo: React.FC<LogoProps> = ({
  inverted = false,
  className = '',
  wordmarkClassName = ''
}) => (
  <span className={`flex items-center gap-3 ${className}`}>
    <LogoMark inverted={inverted} className="w-9 h-9" />
    <span className={`leading-none ${wordmarkClassName}`}>
      <span className="block font-display font-bold text-[19px] tracking-[-0.03em] text-ink">
        italia<span className="text-brand">iptv</span>
      </span>
      <span className="mt-1 block font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-ink-soft">
        Streaming 4K
      </span>
    </span>
  </span>
);
