import React from 'react';

/**
 * Hand-drawn line-art marks scattered around the hero wordmark.
 * All IPTV motifs — screen, remote, signal, streaming badges — and all stroke,
 * no fill, so they inherit colour from the surrounding text.
 */

const base = 'stroke-current fill-none';

/** Television with a play triangle on screen. */
export const DoodleTv: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" className={className} strokeWidth={1.6} aria-hidden="true">
    <rect x="5" y="12" width="38" height="26" rx="3" className={base} />
    <path d="M18 12l-5-6M30 12l5-6" className={base} strokeLinecap="round" />
    <path d="M20.5 20.5v9l8-4.5-8-4.5Z" className={base} strokeLinejoin="round" />
    <path d="M17 42h14" className={base} strokeLinecap="round" />
  </svg>
);

/** Remote control with a d-pad and buttons. */
export const DoodleRemote: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" className={className} strokeWidth={1.6} aria-hidden="true">
    <rect x="16" y="4" width="16" height="40" rx="6" className={base} />
    <circle cx="24" cy="14" r="4.5" className={base} />
    <path d="M24 11.5v5M21.5 14h5" className={base} strokeLinecap="round" />
    <circle cx="20.5" cy="26" r="1.6" className={base} />
    <circle cx="27.5" cy="26" r="1.6" className={base} />
    <circle cx="20.5" cy="33" r="1.6" className={base} />
    <circle cx="27.5" cy="33" r="1.6" className={base} />
  </svg>
);

/** Streaming signal arcs — the "no dish needed" idea. */
export const DoodleSignal: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" className={className} strokeWidth={1.6} aria-hidden="true">
    <circle cx="24" cy="34" r="3" className={base} />
    <path d="M16 28a11 11 0 0 1 16 0" className={base} strokeLinecap="round" />
    <path d="M10.5 21.5a19 19 0 0 1 27 0" className={base} strokeLinecap="round" />
    <path d="M5 15a27 27 0 0 1 38 0" className={base} strokeLinecap="round" />
  </svg>
);

/** Cluster: 4K tag, play badge and a sparkle. */
export const DoodleCluster: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 48" className={className} strokeWidth={1.6} aria-hidden="true">
    {/* 4K tag */}
    <rect x="2" y="6" width="22" height="14" rx="4" className={base} />
    <path d="M7 10v4h5M11 10v6M15.5 10v6M19.5 10l-4 3 4 3" className={base} strokeLinecap="round" />
    {/* Play badge */}
    <circle cx="38" cy="12" r="9" className={base} />
    <path d="M35.5 8l6 4-6 4V8Z" className={base} strokeLinejoin="round" />
    {/* Film strip */}
    <rect x="24" y="28" width="20" height="14" rx="3" className={base} />
    <path d="M28 28v14M40 28v14" className={base} />
    {/* Sparkle */}
    <path d="M54 24l2.2 5.3L61.5 31l-5.3 2.2L54 38.5l-2.2-5.3L46.5 31l5.3-1.7L54 24Z" className={base} strokeLinejoin="round" />
  </svg>
);
