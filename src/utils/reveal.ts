// One IntersectionObserver shared by every element that reveals on scroll.
// It is cheaper than one observer (and one React state) per element, and the
// callback only touches the DOM, so no component re-renders.
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver() {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const callback = callbacks.get(entry.target);
      callbacks.delete(entry.target);
      observer?.unobserve(entry.target);
      callback?.();
    }
  });

  return observer;
}

// Runs `callback` once, the first time `element` enters the viewport.
// Returns a cleanup function.
export function onceInView(element: Element, callback: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }

  callbacks.set(element, callback);
  getObserver().observe(element);

  return () => {
    callbacks.delete(element);
    observer?.unobserve(element);
  };
}
