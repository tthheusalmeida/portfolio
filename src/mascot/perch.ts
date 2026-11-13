// Pure helpers for the mascot's "perch" logic (no DOM, no Three.js).
// A perch is a spot the mascot stands on: the author's shoulder, then the top
// edge of cards, titles, years..., in reading order.
//
// The mascot always stays on its perch (the page scrolls it). These lines only
// decide WHEN it hops: as soon as its head reaches a line at 25% of the viewport
// height (the top of the central half of the screen) it jumps to the next perch,
// which must already be on screen. Nothing here ever moves it. `head` is the top
// of the figure, `feet` where it stands; all values are viewport y, in px.

export const TOP_REGION = 0.25;
export const MARGIN_TOP = 8;
export const ENTER_BOTTOM = 60; // a perch must be this far above the fold to be reached

/** Line (viewport y) its head reaches when it is time to hop to the next perch. */
export function topLine(viewportHeight: number) {
  return viewportHeight * TOP_REGION + MARGIN_TOP;
}

/** Line (viewport y) a perch's feet must be above for the mascot to hop onto it. */
export function reachLine(viewportHeight: number) {
  return viewportHeight - ENTER_BOTTOM;
}

/**
 * Which perch the mascot should be on. It stays on the current one until its head
 * reaches the top line, then hops to the next one if that is on screen (reachable).
 * Scrolling up it goes back to the previous one once the current perch fell below
 * the reach line and the previous one is back below the top line (never to one
 * that is still above the screen, where it would be hidden under the header).
 */
export function advancePerch(
  heads: number[],
  feet: number[],
  index: number,
  top: number,
  reach: number
): number {
  const last = heads.length - 1;
  if (last < 0) return -1;
  let i = Math.min(Math.max(index, 0), last);

  while (i < last && heads[i] < top && feet[i + 1] < reach) i++;
  while (i > 0 && feet[i] > reach && heads[i - 1] >= top) i--;
  return i;
}

/** First perch to use when the page loads (or the list changes) at some scroll. */
export function firstPerch(heads: number[], top: number): number {
  if (heads.length === 0) return -1;
  const found = heads.findIndex((head) => head >= top);
  return found === -1 ? heads.length - 1 : found;
}

/**
 * Position along a hop from `from` to `to` (p in 0..1): constant horizontal
 * speed and a parabolic arc, like a real jump (easing it would look like gliding).
 */
export function hopPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  p: number,
  arc: number
) {
  const t = Math.min(1, Math.max(0, p));
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t - arc * 4 * t * (1 - t),
  };
}
