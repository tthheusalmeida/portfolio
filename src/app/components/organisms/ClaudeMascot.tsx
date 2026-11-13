"use client";

import { useEffect, useRef } from "react";
import { HAND_HEIGHT, HAND_X, type MascotAction } from "@/mascot/createMascot";
import { advancePerch, firstPerch, hopPoint } from "@/mascot/perch";

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
const HEADER = 64; // height of the fixed header (px)
const SHOULDER = { x: 0.8, y: 0.33 }; // where on the cover photo the shoulder is
const CLICK_ACTIONS: MascotAction[] = ["flip", "spin", "dance", "squish", "wave"];

type Kind = "shoulder" | "stand" | "title" | "hang" | "press" | "ground";
type Point = { x: number; y: number };
type Perch = Point & {
  el: Element;
  kind: Kind;
  /** y used to decide when to leave/enter this perch (viewport px). */
  gate: number;
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

/** Box of the element's text, or only of its last character. */
function textBox(el: Element, lastChar: boolean): DOMRect {
  const node = lastTextNode(el);
  if (!node) return el.getBoundingClientRect();
  const range = document.createRange();
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
  const boxRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<() => void>(() => {});

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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
        const resize = () => {
          size = sizeFor(window.innerWidth);
          box.style.width = box.style.height = `${size}px`;
          renderer.setSize(size, size, false);
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

        const collect = (): Perch[] => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const ppu = size / VIEW_HEIGHT;
          // Keep the whole body (arms included) clear of the floating buttons column.
          const bodyHalf = 1.5 * ppu;
          const maxX = Math.max(size * 0.3, vw - BUTTONS_CLEARANCE - bodyHalf);
          const clampX = (x: number) => Math.min(maxX, Math.max(size * 0.3, x));
          const perches: Perch[] = [];

          document
            .querySelectorAll("[data-mascot-shoulder],[data-mascot-perch]")
            .forEach((el) => {
              if (el.getClientRects().length === 0) return;
              const value = el.getAttribute("data-mascot-perch");
              const r = el.getBoundingClientRect();

              if (el.hasAttribute("data-mascot-shoulder")) {
                const y = r.top + r.height * SHOULDER.y;
                perches.push({ el, kind: "shoulder", x: clampX(r.left + r.width * SHOULDER.x), y, gate: y, scale: 0.8 });
              } else if (value === "title") {
                const t = textBox(el, false);
                const y = t.top + t.height * 0.2;
                perches.push({ el, kind: "title", x: clampX(t.left + t.width * 0.85), y, gate: y, scale: 1 });
              } else if (value === "hang" || value === "hang-end") {
                // Hangs by the hands from the top of the last character.
                const c = textBox(el, true);
                const scale = value === "hang" ? 0.75 : 0.85;
                const anchorX = c.left + c.width / 2;
                const anchorY = c.top + c.height * (value === "hang" ? GRIP_YEAR : GRIP_QUESTION);
                perches.push({
                  el,
                  kind: "hang",
                  // The gripping hand is to the side of the body, so shift the body over.
                  x: clampX(anchorX - HAND_X * ppu * scale),
                  y: anchorY + HAND_HEIGHT * ppu * scale,
                  // Reachable only when the feet (not just the hand) fit on screen.
                  gate: anchorY + HAND_HEIGHT * ppu * scale - 20,
                  scale,
                });
              } else if (value === "press") {
                const y = r.top + 2;
                perches.push({ el, kind: "press", x: clampX(r.right - 40), y, gate: y, scale: 1 });
              } else if (value === "ground") {
                perches.push({
                  el,
                  kind: "ground",
                  x: clampX(vw),
                  y: vh - 6,
                  gate: r.bottom + 50 - 90,
                  scale: 1,
                });
              } else {
                // "stand-right": only cards in the right-hand column (or full-width ones).
                if (value === "stand-right" && r.left + r.width / 2 < vw * 0.5 - 8) return;
                const y = r.top + 2;
                perches.push({
                  el,
                  kind: "stand",
                  x: clampX(r.right - Math.min(64, r.width / 4)),
                  y,
                  gate: y,
                  scale: 1,
                });
              }
            });
          // Stable reading order = DOM order. Sorting by on-screen position would
          // reshuffle them every frame once sticky cards stick (same top).
          return perches.sort((a, b) =>
            a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
          );
        };

        let current: Perch | null = null;
        let pos: Point = { x: 0, y: 0 };
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
        const pressed = new WeakSet<Element>();
        const timers: number[] = [];
        let raf = 0;

        const frame = () => {
          timer.update();
          const t = timer.getElapsed();
          const dt = Math.min(0.05, Math.max(0, t - lastT));
          lastT = t;
          const vh = window.innerHeight;
          const perches = collect();
          if (perches.length === 0) {
            box.style.opacity = "0";
            if (!reduceMotion) raf = requestAnimationFrame(frame);
            return;
          }

          const gates = perches.map((p) => p.gate);
          let index = perches.findIndex((p) => p.el === current?.el);
          if (index === -1) {
            index = firstPerch(gates, vh);
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
            const next = advancePerch(gates, index, vh);
            if (next !== index) {
              const target = perches[next];
              const from = { x: pos.x, y: Math.min(vh - 40, Math.max(HEADER + size * 0.3, pos.y)) };
              const dist = Math.hypot(target.x - from.x, target.y - from.y);
              hop = reduceMotion
                ? null
                : {
                    from,
                    start: t,
                    // crouch (15%) -> flight (70%) -> landing squash (15%)
                    duration: 0.7 + Math.min(0.3, dist / 3000),
                    arc: Math.min(120, 30 + dist * 0.18),
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
          let hopping: number | null = null;
          if (hop) {
            const p = (t - hop.start) / hop.duration;
            if (p >= 1) hop = null;
            else {
              hopping = p;
              // Stays crouched in place first, then flies on a parabola.
              pos = hopPoint(hop.from, target, (p - 0.15) / 0.7, hop.arc);
            }
          }
          if (hopping === null) {
            // Scrolling runs off the main thread, so the perch's position is one
            // frame behind the page. Following it with a damped ease (instead of
            // snapping) turns that mismatch into a smooth glide, not a jitter.
            if (snap || reduceMotion) {
              pos = { x: target.x, y: target.y };
              snap = false;
            } else {
              const k = 1 - Math.exp(-dt * 30);
              pos = { x: pos.x + (target.x - pos.x) * k, y: pos.y + (target.y - pos.y) * k };
            }
          }

          // The color transformation starts with the first scroll, while the mascot
          // is still on screen on the shoulder (a later hop would be too late to see).
          if (!transformStarted && target.kind === "shoulder" && window.scrollY > 10) {
            transformStarted = true;
            if (reduceMotion) mascot.setThemed();
            else mascot.transform(t);
          }

          // The year it hangs from turns light, like on hover.
          const markEl = hopping === null && target.kind === "hang" ? target.el : null;
          if (markEl !== marked) {
            marked?.removeAttribute("data-mascot-on");
            markEl?.setAttribute("data-mascot-on", "");
            marked = markEl;
          }

          // While hanging it goes behind the page content (the year / title it
          // holds on to sit above it), so it never covers the text.
          box.style.zIndex = target.kind === "hang" ? "20" : "30";

          // Arrival reactions.
          if (hopping === null && landed !== target.el) {
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
          if (target.kind === "ground" && hopping === null && !reduceMotion && t >= nextWave) {
            mascot.play("wave", t);
            nextWave = t + 4.5;
          }

          // Where is it looking?
          let yaw: number;
          if (hopping !== null) {
            yaw = Math.sign(target.x - (hop?.from.x ?? target.x)) * 0.8;
          } else {
            const lookAtPointer =
              pointerX === null ? 0 : Math.max(-1, Math.min(1, (pointerX - pos.x) / (window.innerWidth / 2))) * 0.6;
            yaw = lookAtPointer + Math.sin(t * 0.5) * 0.12;
          }

          // Intro on the shoulder: look at the laptop, turn to the screen, wave.
          const onScreen = pos.y > 80 && pos.y < vh - 40;
          if (intro < 2 && target.kind === "shoulder" && onScreen && hopping === null) {
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

          // Fade out gradually as it leaves the screen, instead of popping. The feet
          // can sit at the very bottom (footer), so the fade only starts past it.
          // The top fade is based on the head, so it never sits under the fixed header.
          const headY = pos.y - HAND_HEIGHT * (size / VIEW_HEIGHT) * target.scale;
          const edge = Math.min((headY - (HEADER - 32)) / 32, (vh + 70 - pos.y) / 60);
          const wanted = hopping !== null ? 1 : Math.max(0, Math.min(1, edge));
          opacity = reduceMotion ? wanted : opacity + (wanted - opacity) * (1 - Math.exp(-dt * 12));
          box.style.opacity = opacity.toFixed(3);
          box.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size * (1 - FEET)}px, 0)`;

          mascot.update({
            time: t,
            yaw,
            hop: hopping,
            sit: target.kind === "shoulder" && hopping === null ? 1 : 0,
            hang: target.kind === "hang" && hopping === null ? 1 : 0,
            scale: target.scale,
          });
          renderer.render(scene, camera);
          if (!reduceMotion) raf = requestAnimationFrame(frame);
        };
        frame();

        window.addEventListener("resize", resize);
        if (reduceMotion) window.addEventListener("scroll", frame, { passive: true });

        cleanup = () => {
          cancelAnimationFrame(raf);
          timers.forEach((id) => window.clearTimeout(id));
          marked?.removeAttribute("data-mascot-on");
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
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 opacity-0 will-change-transform"
    >
      {/* Only the character itself is clickable, not the whole canvas. */}
      <div
        onClick={() => clickRef.current()}
        className="pointer-events-auto absolute bottom-[16%] left-[30%] h-[34%] w-[40%] cursor-pointer"
      />
    </div>
  );
}
