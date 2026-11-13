// Pure helpers for the mascot's "perch" logic (no DOM, no Three.js).
// A perch is a spot the mascot stands on: the author's shoulder, then the top
// edge of cards, in reading order.

export const LEAVE_TOP = 120; // a perch above this line (px) is "left behind"
export const ENTER_BOTTOM = 60; // a perch must be this far above the fold to be reachable

/**
 * Which perch the mascot should stand on. It stays on the current one while
 * it is on screen and moves to the next one only after the current one scrolled
 * away and the next one is visible (or back to the previous one when scrolling
 * up, once that one is visible again).
 * `tops` are the perches' top edges in viewport px, in reading order.
 */
export function advancePerch(tops: number[], index: number, viewportHeight: number): number {
  const last = tops.length - 1;
  if (last < 0) return -1;
  let i = Math.min(Math.max(index, 0), last);
  const reachable = viewportHeight - ENTER_BOTTOM;

  while (i < last && tops[i] < LEAVE_TOP && tops[i + 1] < reachable) i++;
  // Going back needs the previous perch to be visible, not hidden under the header.
  while (i > 0 && tops[i] > reachable && tops[i - 1] >= LEAVE_TOP) i--;
  return i;
}

/** First perch to use when the page loads (or the list changes) at some scroll. */
export function firstPerch(tops: number[], viewportHeight: number): number {
  if (tops.length === 0) return -1;
  const found = tops.findIndex((top) => top >= LEAVE_TOP && top < viewportHeight - ENTER_BOTTOM);
  return found === -1 ? (tops[0] > viewportHeight ? 0 : tops.length - 1) : found;
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
