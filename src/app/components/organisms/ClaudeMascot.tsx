"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import usePortal from "@/hooks/usePortal";
import { isLowPowerDevice } from "@/utils/devicePower";
import { HAND_HEIGHT, HAND_X, type MascotAction } from "@/mascot/createMascot";
import { advancePerch, firstPerch, hopPoint, reachLine, topLine } from "@/mascot/perch";

// The character must never exceed 100px in width or height in any pose (arms
// out, perspective included, is ~3.6 units wide), so it is drawn at ~28px per
// world unit (~24px on mobile); scales above 1 are not allowed on any perch.
// The canvas is much bigger than the character (7.4 units across) so that no
// pose, like the wide swing while hanging, is clipped by the canvas edge.
const CAMERA_DISTANCE = 12.96;
const VIEW_HEIGHT = 2 * CAMERA_DISTANCE * Math.tan((16 * Math.PI) / 180); // world units across the box
const sizeFor = (width: number) => Math.round(VIEW_HEIGHT * (width < 640 ? 24.2 : 28.1));
// Fraction of the box under the feet. Needs room: hanging by one hand, the legs swing
// ~0.4 units below the feet line, and flips dip below it too.
const FEET = 0.165;
// Where the hand grips the last character, as a fraction of its text box from the top:
// the bottom edge of a year digit, the top of the "?" hook.
const GRIP_YEAR = 0.75;
const GRIP_QUESTION = 0.27;
// Width of the column taken by the floating WhatsApp / back-to-top buttons.
const BUTTONS_CLEARANCE = 100;
const SHOULDER = { x: 0.8, y: 0.33 }; // where on the cover photo the shoulder is
const CLICK_ACTIONS: MascotAction[] = ["flip", "spin", "dance", "squish", "wave"];

type Kind = "shoulder" | "stand" | "title" | "hang" | "press" | "ground";
type Point = { x: number; y: number };

// All coordinates are DOCUMENT coordinates (viewport + scroll), not viewport ones.
// While it stands on a perch the mascot is drawn in an absolutely positioned
// layer, so the browser scrolls it together with the page (on the compositor,
// with zero lag) and we do not write anything while the page scrolls.
type Perch = Point & {
  el: Element;
  kind: Kind;
  /** `y` is where the feet stand. `head` is the top of the figure. */
  head: number;
  /** Where the perch is "reached" from below (the footer's top for the ground). */
  reach: number;
  scale: number;
};

const textNodes = new WeakMap<Element, Text | null>();

function lastTextNode(el: Element): Text | null {
  const cached = textNodes.get(el);
  if (cached && cached.isConnected) return cached;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last: Text | null = null;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.textContent?.trim()) last = n as Text;
  }
  textNodes.set(el, last);
  return last;
}

let sharedRange: Range | null = null;

/** Box of the element's text, or only of its last character. */
function textBox(el: Element, lastChar: boolean): DOMRect {
  const node = lastTextNode(el);
  if (!node) return el.getBoundingClientRect();
  const range = (sharedRange ??= document.createRange()); // reused: no allocation per frame
  if (lastChar) {
    const end = (node.textContent ?? "").trimEnd().length;
    range.setStart(node, Math.max(0, end - 1));
    range.setEnd(node, end);
  } else {
    range.selectNodeContents(el);
  }
  return range.getBoundingClientRect();
}

// Decorative 3D mascot (Claude Code). It sits on the author's shoulder, turns
// to the screen and waves, then transforms to the theme color and hops through
// the page by "perches" marked in the markup (data-mascot-shoulder and
// data-mascot-perch): section titles, right-column cards, timeline years
// (hanging), the postgraduate row (it pushes it open), the "?" of the contact
// title (hanging) and finally the bottom of the screen, waving goodbye.
// Clicking it plays a random reaction. Three.js loads lazily when idle.
export default function ClaudeMascot() {
  const portal = usePortal("claude-mascot-layer");
  const boxRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<() => void>(() => {});

  useEffect(() => {
    const box = boxRef.current;
    if (!portal || !box) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Weak devices: no antialiasing, pixel ratio 1, lower frame rates.
    const lowPower = isLowPowerDevice();
    let cancelled = false;
    let cleanup = () => {};

    const start = async () => {
      try {
        const [THREE, { createMascot }] = await Promise.all([
          import("three"),
          import("@/mascot/createMascot"),
        ]);
        if (cancelled) return;

        const themeColor =
          getComputedStyle(document.documentElement).getPropertyValue("--action").trim() ||
          "#ffae23";
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: !lowPower,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(lowPower ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
        const canvas = renderer.domElement;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        box.prepend(canvas);

        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xffffff, 1.6));
        const sun = new THREE.DirectionalLight(0xffffff, 2.2);
        sun.position.set(3, 5, 6);
        scene.add(sun);

        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
        camera.position.set(0, 2.895, CAMERA_DISTANCE);
        camera.lookAt(0, 2.525, 0);

        const mascot = createMascot(themeColor);
        scene.add(mascot.root);
        // THREE.Clock is deprecated. Timer only advances on update() and, once
        // connected, ignores the time spent in a hidden tab.
        const timer = new THREE.Timer();
        timer.connect(document);

        let size = sizeFor(window.innerWidth);
        let dirty = true; // perch geometry must be measured again
        const resize = () => {
          size = sizeFor(window.innerWidth);
          box.style.width = box.style.height = `${size}px`;
          renderer.setSize(size, size, false);
          dirty = true;
        };
        resize();

        let pointerX: number | null = null;
        const onPointer = (e: PointerEvent) => (pointerX = e.clientX);
        window.addEventListener("pointermove", onPointer, { passive: true });

        let lastAction = -1;
        clickRef.current = () => {
          if (reduceMotion) return;
          let next = lastAction;
          while (next === lastAction) next = Math.floor(Math.random() * CLICK_ACTIONS.length);
          lastAction = next;
          mascot.play(CLICK_ACTIONS[next], timer.getElapsed());
        };

        /** Measures one perch element, in document coordinates (null: not on the page). */
        const measure = (el: Element): Perch | null => {
          if (el.getClientRects().length === 0) return null;
          const vw = window.innerWidth;
          const sx = window.scrollX;
          const sy = window.scrollY;
          const ppu = size / VIEW_HEIGHT;
          // Keep the whole body (arms included) clear of the floating buttons column.
          const bodyHalf = 1.5 * ppu;
          const maxX = Math.max(size * 0.3, vw - BUTTONS_CLEARANCE - bodyHalf);
          const clampX = (x: number) => Math.min(maxX, Math.max(size * 0.3, x)) + sx;
          const value = el.getAttribute("data-mascot-perch");
          const r = el.getBoundingClientRect();
          const figure = (scale: number) => HAND_HEIGHT * ppu * scale;
          const make = (kind: Kind, x: number, y: number, scale: number, reach = y): Perch => ({
            el,
            kind,
            x: clampX(x),
            y,
            head: y - figure(scale),
            reach,
            scale,
          });

          if (el.hasAttribute("data-mascot-shoulder")) {
            return make("shoulder", r.left + r.width * SHOULDER.x, r.top + r.height * SHOULDER.y + sy, 0.8);
          }
          if (value === "title") {
            const t = textBox(el, false);
            return make("title", t.left + t.width * 0.85, t.top + t.height * 0.2 + sy, 1);
          }
          if (value === "hang" || value === "hang-end") {
            // Hangs by one hand from the last character.
            const c = textBox(el, true);
            const scale = value === "hang" ? 0.75 : 0.85;
            const anchorY = c.top + c.height * (value === "hang" ? GRIP_YEAR : GRIP_QUESTION) + sy;
            // The gripping hand is to the side of the body, so shift the body over.
            return make("hang", c.left + c.width / 2 - HAND_X * ppu * scale, anchorY + figure(scale), scale);
          }
          if (value === "press") return make("press", r.right - 40, r.top + 2 + sy, 1);
          if (value === "ground") {
            // Glued to the bottom of the screen (drawn fixed to it); reached once the
            // footer is on screen.
            return make("ground", vw, window.innerHeight - 6 + sy, 1, r.bottom + 50 - 90 + sy);
          }
          // "stand-right": only cards in the right-hand column (or full-width ones).
          if (value === "stand-right" && r.left + r.width / 2 < vw * 0.5 - 8) return null;
          return make("stand", r.right - Math.min(64, r.width / 4), r.top + 2 + sy, 1);
        };

        // Stable reading order = DOM order. Sorting by on-screen position would
        // reshuffle them every frame once sticky cards stick (same top).
        const collect = (): Perch[] => {
          const list: Perch[] = [];
          document.querySelectorAll("[data-mascot-shoulder],[data-mascot-perch]").forEach((el) => {
            const perch = measure(el);
            if (perch) list.push(perch);
          });
          list.sort((a, b) =>
            a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
          );
          // Projects are split into two DOM columns (even / odd) that stack into one on
          // mobile, so DOM order is not reading order. Those cards say their real
          // position in data-mascot-order: put them back in order, in the same slots.
          const slots = list.map((p, i) => i).filter((i) => list[i].el.hasAttribute("data-mascot-order"));
          const ordered = slots
            .map((i) => list[i])
            .sort(
              (a, b) =>
                Number(a.el.getAttribute("data-mascot-order")) -
                Number(b.el.getAttribute("data-mascot-order"))
            );
          slots.forEach((slot, n) => (list[slot] = ordered[n]));
          return list;
        };

        // Perch geometry is measured only now and then (layout changes, resize), not
        // every frame. Only the perch it stands on is measured every frame, to follow
        // sticky cards and entrance animations.
        let perches: Perch[] = [];
        let docHeight = 0;
        let lastCollect = -10;
        const watchLayout = new ResizeObserver(() => (dirty = true));
        watchLayout.observe(document.body);

        // It stands on `current` and hops to the next perch.
        let current: Perch | null = null;
        let pos: Point = { x: 0, y: 0 }; // document coordinates of the feet
        let shown: Point = { x: 0, y: 0 }; // viewport coordinates of the feet, as drawn
        let hop: { from: Point; start: number; duration: number; arc: number } | null = null;
        let intro: 0 | 1 | 2 = 2;
        let introAt = 0;
        let introDecided = false;
        let landed: Element | null = null;
        let nextWave = 0;
        let marked: Element | null = null;
        let lastT = 0;
        let opacity = 0;
        let snap = true;
        let transformStarted = false;
        let isFixed = false;
        let lastPlace = "";
        let lastOpacity = "";
        let lastZ = "";
        let lastBusy = true;
        const headsBuf: number[] = [];
        const feetBuf: number[] = [];
        const indexOfEl = (el: Element | null | undefined) => {
          for (let i = 0; i < perches.length; i++) if (perches[i].el === el) return i;
          return -1;
        };
        const pressed = new WeakSet<Element>();
        const timers: number[] = [];
        let raf = 0;

        const frame = () => {
          timer.update();
          const t = timer.getElapsed();
          // Full rate only while something moves (hop, click action, transformation,
          // hanging swing); parked, the idle breathing and blinking do not need it.
          const interval = reduceMotion ? 0 : lastBusy ? (lowPower ? 1 / 30 : 0) : lowPower ? 1 / 20 : 1 / 30;
          if (interval && t - lastT < interval - 0.002) {
            raf = requestAnimationFrame(frame);
            return;
          }
          const dt = Math.min(0.05, Math.max(0, t - lastT));
          lastT = t;
          const vh = window.innerHeight;
          const sx = window.scrollX;
          const sy = window.scrollY;
          const headLine = topLine(vh);
          const reach = reachLine(vh);

          if (dirty || t - lastCollect > 1) {
            perches = collect();
            docHeight = document.body.offsetHeight;
            dirty = false;
            lastCollect = t;
          }
          if (perches.length === 0) {
            box.style.opacity = "0";
            lastOpacity = "0";
            if (!reduceMotion) raf = requestAnimationFrame(frame);
            return;
          }

          // Re-measure the perch it stands on (sticky cards, entrance animations).
          if (current) {
            const at = indexOfEl(current?.el);
            const fresh = at === -1 ? null : measure(current.el);
            if (fresh) perches[at] = fresh;
            else dirty = true;
          }

          // Viewport position of a perch's feet.
          const restOf = (p: Perch) => ({ x: p.x - sx, y: p.y - sy });

          const heads = headsBuf;
          const feet = feetBuf;
          heads.length = feet.length = perches.length;
          for (let i = 0; i < perches.length; i++) {
            heads[i] = perches[i].head - sy;
            feet[i] = perches[i].reach - sy;
          }
          let index = indexOfEl(current?.el);
          if (index === -1) {
            // First frame, or the perch left the page (layout changed): start over.
            index = firstPerch(heads, headLine);
            current = perches[index];
            hop = null;
            landed = null;
            snap = true;
            if (!introDecided) {
              introDecided = true;
              // The intro (sit, look, wave, transform) only makes sense from the top of the page.
              intro = !reduceMotion && current.kind === "shoulder" ? 0 : 2;
              if (current.kind !== "shoulder") mascot.setThemed();
            }
          } else {
            const next = advancePerch(heads, feet, index, headLine, reach);
            if (next !== index) {
              const target = perches[next];
              const to = restOf(target);
              const dist = Math.hypot(to.x - shown.x, to.y - shown.y);
              hop = reduceMotion
                ? null
                : {
                    from: { ...shown },
                    start: t,
                    // crouch (15%) -> flight (70%) -> landing squash (15%)
                    duration: 0.7 + Math.min(0.3, dist / 3000),
                    arc: Math.min(70, 24 + dist * 0.1),
                  };
              if (current?.kind === "shoulder") {
                if (reduceMotion) mascot.setThemed();
                else mascot.transform(t);
              }
              current = target;
              index = next;
            }
          }

          const target = perches[index];
          current = target;
          const rest = restOf(target);
          let hopping: number | null = null;
          if (hop) {
            const p = (t - hop.start) / hop.duration;
            if (p >= 1) hop = null;
            else {
              hopping = p;
              // Stays crouched in place first, then flies on a parabola.
              const v = hopPoint(hop.from, rest, (p - 0.15) / 0.7, hop.arc);
              pos = { x: v.x + sx, y: v.y + sy };
            }
          }
          // Attached: standing on its perch, drawn in document coordinates (the page
          // scrolls it). Otherwise drawn fixed to the screen: flying, or on the ground
          // perch.
          const attached = hopping === null && target.kind !== "ground";
          if (hopping === null) {
            if (!attached || snap || reduceMotion) {
              pos = { x: rest.x + sx, y: rest.y + sy };
              snap = false;
            } else {
              // Only a layout change (entrance animation, sticky card, hover resize)
              // moves it, and then it eases there instead of snapping.
              const k = 1 - Math.exp(-dt * 30);
              const dx = target.x - pos.x;
              const dy = target.y - pos.y;
              pos =
                Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2
                  ? { x: target.x, y: target.y }
                  : { x: pos.x + dx * k, y: pos.y + dy * k };
            }
          }
          shown = { x: pos.x - sx, y: pos.y - sy };

          // The color transformation starts with the first scroll, while the mascot
          // is still on screen on the shoulder.
          if (!transformStarted && target.kind === "shoulder" && sy > 10) {
            transformStarted = true;
            if (reduceMotion) mascot.setThemed();
            else mascot.transform(t);
          }

          // The year it hangs from turns light, like on hover.
          const markEl = attached && target.kind === "hang" ? target.el : null;
          if (markEl !== marked) {
            marked?.removeAttribute("data-mascot-on");
            markEl?.setAttribute("data-mascot-on", "");
            marked = markEl;
          }

          // While hanging it goes behind the page content (the year / title it
          // holds on to sit above it), so it never covers the text.
          const z = attached && target.kind === "hang" ? "20" : "30";
          if (z !== lastZ) {
            box.style.zIndex = z;
            lastZ = z;
          }

          // Arrival reactions.
          const settled = hopping === null;
          if (settled && landed !== target.el) {
            landed = target.el;
            if (target.kind === "ground") nextWave = t + 0.3;
            if (target.kind === "press" && !reduceMotion && !pressed.has(target.el)) {
              const button = target.el.querySelector("button");
              if (button && button.getAttribute("aria-expanded") === "false") {
                pressed.add(target.el);
                mascot.play("stomp", t);
                timers.push(
                  window.setTimeout(() => {
                    if (button.getAttribute("aria-expanded") === "false") button.click();
                  }, 1000)
                );
              }
            }
          }
          if (target.kind === "ground" && settled && !reduceMotion && t >= nextWave) {
            mascot.play("wave", t);
            nextWave = t + 4.5;
          }

          // Where is it looking?
          let yaw: number;
          if (hopping !== null) {
            yaw = Math.sign(rest.x - (hop?.from.x ?? rest.x)) * 0.8;
          } else {
            const lookAtPointer =
              pointerX === null ? 0 : Math.max(-1, Math.min(1, (pointerX - shown.x) / (window.innerWidth / 2))) * 0.6;
            yaw = lookAtPointer + Math.sin(t * 0.5) * 0.12;
          }

          // Intro on the shoulder: look at the laptop, turn to the screen, wave.
          if (intro < 2 && target.kind === "shoulder" && settled) {
            if (intro === 0) {
              intro = 1;
              introAt = t;
            }
            if (t - introAt < 1.1) yaw = -0.9;
            else {
              intro = 2;
              mascot.play("wave", t);
            }
          } else if (intro < 2 && target.kind !== "shoulder") {
            intro = 2;
          }

          // Placement: document coordinates when attached, screen coordinates otherwise
          // (fixed also means the box never grows the page below its end).
          const fixed = !attached;
          if (fixed !== isFixed) {
            box.style.position = fixed ? "fixed" : "absolute";
            isFixed = fixed;
            lastPlace = "";
          }
          const left = (fixed ? shown.x : pos.x) - size / 2;
          let top = (fixed ? shown.y : pos.y) - size * (1 - FEET);
          if (!fixed) top = Math.min(top, Math.max(0, docHeight - size));
          const place = `${left.toFixed(1)},${top.toFixed(1)}`;
          if (place !== lastPlace) {
            box.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            lastPlace = place;
          }

          // It only fades in when the page loads; it never fades out.
          opacity = reduceMotion ? 1 : Math.min(1, opacity + dt * 3);
          const opacityText = opacity.toFixed(2);
          if (opacityText !== lastOpacity) {
            box.style.opacity = opacityText;
            lastOpacity = opacityText;
          }

          // Nothing to update or draw while its box is outside the screen.
          const boxTop = shown.y - size * (1 - FEET);
          const onScreen = hopping !== null || (boxTop < vh && boxTop + size > 0);
          if (onScreen) {
            mascot.update({
              time: t,
              yaw,
              hop: hopping,
              sit: target.kind === "shoulder" && attached ? 1 : 0,
              hang: target.kind === "hang" && attached ? 1 : 0,
              scale: target.scale,
            });
            renderer.render(scene, camera);
          }
          lastBusy = onScreen && (hopping !== null || mascot.isBusy() || (target.kind === "hang" && attached));
          if (!reduceMotion) raf = requestAnimationFrame(frame);
        };
        frame();

        window.addEventListener("resize", resize);
        // The page scrolls the mascot by itself; the scroll only matters for
        // switching perches and fading, which reduced-motion mode does here.
        if (reduceMotion) window.addEventListener("scroll", frame, { passive: true });

        cleanup = () => {
          cancelAnimationFrame(raf);
          timers.forEach((id) => window.clearTimeout(id));
          marked?.removeAttribute("data-mascot-on");
          watchLayout.disconnect();
          window.removeEventListener("resize", resize);
          window.removeEventListener("scroll", frame);
          window.removeEventListener("pointermove", onPointer);
          clickRef.current = () => {};
          timer.dispose();
          mascot.dispose();
          renderer.dispose();
          canvas.remove();
        };
      } catch {
        // No WebGL (or the chunk failed to load): the page works without it.
      }
    };

    let idleId = 0;
    let timeoutId = 0;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 3000 });
    } else {
      timeoutId = window.setTimeout(start, 1500);
    }

    return () => {
      cancelled = true;
      if (idleId) window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
      cleanup();
    };
  }, [portal]);

  if (!portal) return null;

  // Rendered into a layer on <body>, outside the page layout, so it is
  // positioned against the document (see the Perch type).
  return createPortal(
    <div
      ref={boxRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 opacity-0 will-change-transform"
    >
      {/* Only the character itself is clickable, not the whole canvas. */}
      <div
        onClick={() => clickRef.current()}
        className="pointer-events-auto absolute bottom-[16%] left-[30%] h-[34%] w-[40%] cursor-pointer"
      />
    </div>,
    portal
  );
}
