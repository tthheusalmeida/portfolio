// Infinite decorative animations (hero light, carousel...) keep the browser
// producing frames even when nobody sees them. One shared IntersectionObserver
// marks elements that left the screen with data-offscreen="true", and a rule in
// globals.css pauses the animations inside them. Use it as a ref callback:
//   <div ref={pauseOffscreen}>
let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        (target as HTMLElement).dataset.offscreen = isIntersecting ? "false" : "true";
      }
    },
    { rootMargin: "100px" }
  );
  return observer;
}

export function pauseOffscreen(element: Element | null) {
  if (!element || typeof IntersectionObserver === "undefined") return;
  const io = getObserver();
  io.observe(element);
  return () => {
    io.unobserve(element);
    delete (element as HTMLElement).dataset.offscreen;
  };
}
