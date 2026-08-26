import React from 'react';
import boltUrl from '../assets/logo-bolt-256.png';

/**
 * Italia IPTV mark: the bolt, filled with the tricolore running top to bottom.
 *
 * Shipped as a PNG rather than inline vector so the same file backs the page,
 * the tab icon, the app icon and the Open Graph card — one asset a crawler can
 * fetch and index directly.
 *
 * The mark's middle band is white, so on light ground it sits on a frosted ink
 * tile — dark enough to hold the white, translucent enough to take the colour
 * of whatever passes behind it. `inverted` drops the tile for dark ground.
 */

interface MarkProps {
  /** Drops the tile, for dark backgrounds. */
  inverted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoMark: React.FC<MarkProps> = ({ inverted = false, className = '', style }) => (
  <span
    className={`inline-flex items-center justify-center shrink-0 ${
      inverted ? '' : 'glass-ink rounded-[26%]'
    } ${className}`}
    style={style}
  >
    <img
      src={boltUrl}
      alt=""
      aria-hidden="true"
      width={256}
      height={256}
      decoding="async"
      className={`block object-contain ${inverted ? 'w-full h-full' : 'w-[72%] h-[72%]'}`}
    />
  </span>
);

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
