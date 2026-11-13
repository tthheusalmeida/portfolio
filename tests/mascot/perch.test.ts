import { describe, expect, it } from "vitest";
import { advancePerch, firstPerch, hopPoint } from "@/mascot/perch";

const VH = 800;

describe("advancePerch", () => {
  it("stays on the current perch while it is on screen", () => {
    expect(advancePerch([300, 500, 900], 0, VH)).toBe(0);
  });

  it("moves on once the current perch left and the next is visible", () => {
    expect(advancePerch([50, 500, 900], 0, VH)).toBe(1);
  });

  it("waits when the next perch is still below the fold", () => {
    expect(advancePerch([50, 900], 0, VH)).toBe(0);
  });

  it("goes back when scrolling up past the current perch", () => {
    expect(advancePerch([100, 500, 850], 2, VH)).toBe(1);
  });

  it("does not go back to a perch hidden under the header", () => {
    expect(advancePerch([60, 900], 1, VH)).toBe(1);
  });

  it("handles an empty list", () => {
    expect(advancePerch([], 0, VH)).toBe(-1);
  });
});

describe("firstPerch", () => {
  it("picks the first visible perch, or the end of the page", () => {
    expect(firstPerch([200, 500], VH)).toBe(0);
    expect(firstPerch([-900, -400], VH)).toBe(1);
    expect(firstPerch([1200, 1500], VH)).toBe(0);
  });
});

describe("hopPoint", () => {
  it("starts and ends on the endpoints and rises in between", () => {
    const from = { x: 0, y: 100 };
    const to = { x: 200, y: 100 };
    expect(hopPoint(from, to, 0, 80)).toEqual(from);
    expect(hopPoint(from, to, 1, 80)).toEqual(to);
    expect(hopPoint(from, to, 0.5, 80).y).toBeLessThan(100);
  });
});
