/**
 * Content figures quoted across the site.
 *
 * Single source of truth: marketing copy and the pricing packs previously drifted
 * apart (the site claimed 20.000 channels while the cheapest pack claimed 25.000),
 * so every number now comes from here.
 *
 * Site-wide copy quotes the top-tier totals — that is the full catalogue on offer.
 * Per-pack figures live in TIER_STATS and are what each tier actually includes.
 */

export const TIER_STATS = {
  basis: {
    channels: '25.000+',
    vod: '140.000+'
  },
  premium: {
    channels: '80.000+',
    vod: '200.000+'
  }
} as const;

/** Head-line channel count, used in general copy. */
export const CHANNEL_COUNT = TIER_STATS.premium.channels;

/** Head-line films & series count, used in general copy. */
export const VOD_COUNT = TIER_STATS.premium.vod;
