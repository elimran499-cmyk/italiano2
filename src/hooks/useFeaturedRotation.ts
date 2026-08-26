import { useEffect, useState } from 'react';

/** How long each featured title holds before the crossfade to the next. */
export const SLIDE_MS = 4500;

/**
 * Cycles the featured-title index and tracks which slides are allowed to fetch
 * their artwork: the page opens with one image, and the next is prefetched
 * during the current slide's hold, well ahead of its crossfade.
 */
export function useFeaturedRotation(count: number) {
  const [index, setIndex] = useState(0);
  const [armed, setArmed] = useState<number[]>([0, 1]);

  useEffect(() => {
    if (count < 2) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  useEffect(() => {
    const next = (index + 1) % count;
    setArmed((prev) => (prev.includes(next) ? prev : [...prev, next]));
  }, [index, count]);

  return { index, armed };
}
