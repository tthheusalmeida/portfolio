import { describe, expect, it } from "vitest";
import { advancePerch, firstPerch, hopPoint, reachLine, topLine } from "@/mascot/perch";

// 800px viewport: the head line is at 208 (25% + margin), the reach line at 740.
const VH = 800;
const top = topLine(VH);
const reach = reachLine(VH);

describe("lines", () => {
  it("puts the top line at 25% of the screen and the reach line near the fold", () => {
    expect(top).toBe(208);
    expect(reach).toBe(740);
  });
});

describe("advancePerch", () => {
  it("stays on the current perch while its head is below the top line", () => {
    expect(advancePerch([300, 500], [360, 560], 0, top, reach)).toBe(0);
  });

  it("hops to the next perch as soon as the head reaches the top line", () => {
    expect(advancePerch([150, 450], [210, 500], 0, top, reach)).toBe(1);
  });

  it("waits while the next perch is not on screen yet", () => {
    expect(advancePerch([150, 800], [210, 860], 0, top, reach)).toBe(0);
  });

  it("skips perches that are all above the top line", () => {
    expect(advancePerch([100, 120, 400], [160, 180, 460], 0, top, reach)).toBe(2);
  });

  it("goes back when scrolling up past the current perch", () => {
    expect(advancePerch([300, 500, 800], [360, 560, 860], 2, top, reach)).toBe(1);
  });

  it("does not go back to a perch that is still above the top line", () => {
    expect(advancePerch([100, 800], [160, 860], 1, top, reach)).toBe(1);
  });

  it("does not bounce between two perches", () => {
    const heads = [250, 800];
    const feet = [310, 860];
    const back = advancePerch(heads, feet, 1, top, reach);
    expect(back).toBe(0);
    expect(advancePerch(heads, feet, back, top, reach)).toBe(back);
  });

  it("handles an empty list", () => {
    expect(advancePerch([], [], 0, top, reach)).toBe(-1);
  });
});

describe("firstPerch", () => {
  it("picks the first perch whose head is not above the top line, or the last one", () => {
    expect(firstPerch([250, 500], top)).toBe(0);
    expect(firstPerch([-900, -400], top)).toBe(1);
    expect(firstPerch([100, 900], top)).toBe(1);
    expect(firstPerch([], top)).toBe(-1);
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
