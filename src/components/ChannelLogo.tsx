import React from 'react';
import { Channel } from '../types';

/**
 * Channel tiles on the scrolling wall.
 *
 * Two ways a tile can be drawn:
 *
 *  1. Real artwork. Drop a file at src/assets/logos/<channel id>.* and it is
 *     matched on id — see that folder's README — and drawn on the plain tile.
 *  2. A designed ident. Every other channel gets a coloured block carrying its
 *     wordmark, tinted to the broadcaster it belongs to, so the wall reads as a
 *     wall of logos rather than a list of names.
 *
 * Broadcaster names are trademarks of their owners; they are shown here to
 * identify the channels carried.
 */

/** "Sky Sport Uno 4K" -> "Sky Sport Uno" */
const wordmark = (name: string): string =>
  name
    .replace(/\s*\(VOD[^)]*\)/gi, '')
    .replace(/\s*\b(4K Ultra HD|4K UHD|4K|UHD|Full HD|HD|60\s?fps|60\s?FPS)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

/**
 * Splits a wordmark into a lead token and the rest, so "Rai 1" sets the number
 * apart from the name the way a channel ident does.
 */
const splitMark = (text: string): { lead: string; tail: string } => {
  const match = text.match(/^(.*?)\s+([0-9]+|[IVX]+|Uno|Due|Jr\.?)$/i);
  if (match) return { lead: match[1], tail: match[2] };
  return { lead: text, tail: '' };
};

/**
 * Ident colour per channel. Exact ids win; otherwise the first matching prefix
 * does, so a new Sky or Rai channel is tinted correctly without an entry here.
 */
const IDENT_BY_ID: Record<string, string> = {
  // Rai
  'rai-gulp': '#0f8a4d',
  'rai-yoyo': '#d4581f',
  // Mediaset
  'canale-5': '#12326e',
  'italia-1': '#1a4fa0',
  'rete-4': '#0f4c81',
  'venti-mediaset': '#2b3a67',
  iris: '#4a2f6b',
  la5: '#a3235e',
  cine34: '#8e1b1b',
  focus: '#0e6ba8',
  'top-crime': '#37373d',
  'mediaset-extra': '#54388c',
  'italia-2': '#1f7a8c',
  tgcom24: '#0a2c5a',
  // La7 e altri generalisti
  la7: '#c8102e',
  la7d: '#8e2a5e',
  nove: '#1f7a4d',
  'real-time': '#b3236b',
  dmax: '#1e3a5f',
  giallo: '#6b3f2a',
  'food-network': '#a8322a',
  hgtv: '#1f7a6e',
  'motor-trend': '#c14b1e',
  'warner-tv': '#2b3f8c',
  // Squadre
  'inter-tv': '#0068a8',
  'milan-tv': '#b3001b',
  'juventus-tv': '#141414',
  'roma-tv': '#8e1f2f',
  'lazio-style': '#3f86bd',
  // Sport terzi
  'eurosport-1': '#0c2340',
  'eurosport-2': '#0c2340',
  supertennis: '#0e7a5f',
  sportitalia: '#0b4f9e',
  // Bambini
  boing: '#d4581f',
  cartoonito: '#7b3fb5',
  k2: '#1f7a8c',
  frisbee: '#c2185b',
  super: '#d63b26',
  // On demand
  'vod-prime': '#0f5c8c',
  'vod-disney': '#0b2b6b',
  'vod-now': '#22224a'
};

/** Prefix fallbacks, longest first so "sky-sport" beats "sky". */
const IDENT_BY_PREFIX: [string, string][] = [
  ['sky-cinema', '#22224a'],
  ['sky-sport', '#0a1b3d'],
  ['zona-dazn', '#141414'],
  ['dazn', '#141414'],
  ['rai', '#0b3d91'],
  ['sky', '#052a5c']
];

const identColour = (channel: Channel): string => {
  const exact = IDENT_BY_ID[channel.id];
  if (exact) return exact;
  const prefix = IDENT_BY_PREFIX.find(([start]) => channel.id.startsWith(start));
  if (prefix) return prefix[1];
  return channel.category === 'kids' ? '#7b3fb5' : '#37373d';
};

/** Longer names step down a size so every wordmark fits the ident block. */
const markSize = (text: string): string => {
  if (text.length <= 6) return 'text-[1.6rem] sm:text-3xl';
  if (text.length <= 11) return 'text-lg sm:text-xl';
  if (text.length <= 17) return 'text-sm sm:text-[0.95rem]';
  return 'text-[0.7rem] sm:text-xs';
};

interface ChannelLogoProps {
  channel: Channel;
}

export const ChannelLogo: React.FC<ChannelLogoProps> = ({ channel }) => {
  const mark = wordmark(channel.name);
  const { lead, tail } = splitMark(mark);
  const is4K = channel.quality === '4K Ultra HD';
  const qualityLabel = is4K ? '4K' : channel.quality === '60 FPS' ? '60' : 'HD';
  const colour = identColour(channel);

  return (
    <div
      className="group relative shrink-0 w-40 sm:w-44 h-24 sm:h-28 rounded-2xl border border-ink/10 bg-paper shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex items-center justify-center px-3"
      aria-label={
        channel.currentProgram ? `${channel.name} — ${channel.currentProgram}` : channel.name
      }
    >
      {/* Quality chip */}
      <span className="absolute top-2 right-2 z-10 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-ink/8 text-ink-soft">
        {qualityLabel}
      </span>

      {/* Lazy: the wall carries a hundred channels across three rows, and each
          row is rendered twice for the loop — eager loading meant fetching two
          hundred logos before the page could settle. The tile reserves its own
          space, so nothing reflows as they arrive. */}
      {channel.logoSrc ? (
        <span className="flex flex-col items-center justify-center gap-1 w-full">
          <img
            src={channel.logoSrc}
            alt={channel.name}
            loading="lazy"
            decoding="async"
            className={`${
              channel.logoCaption ? 'max-h-10' : 'max-h-14'
            } max-w-[86%] object-contain group-hover:scale-105 transition-transform`}
          />
          {/* Sister channels share a family mark, so the name goes underneath */}
          {channel.logoCaption && (
            <span className="font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft leading-none">
              {channel.logoCaption}
            </span>
          )}
        </span>
      ) : (
        <span
          className="flex items-baseline gap-1.5 max-w-[88%] px-3 py-2 rounded-xl text-center shadow-sm group-hover:scale-[1.04] transition-transform"
          style={{ backgroundColor: colour }}
        >
          <span
            className={`font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-white ${markSize(lead)}`}
          >
            {lead}
          </span>
          {tail && (
            <span
              className={`font-display font-extrabold leading-none text-white/80 ${
                lead.length <= 6 ? 'text-[1.6rem] sm:text-3xl' : 'text-lg'
              }`}
            >
              {tail}
            </span>
          )}
        </span>
      )}

      {/* Accent rule, revealed on hover */}
      <span
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ backgroundColor: colour }}
      />
    </div>
  );
};
