import Lenis from 'lenis';

// One Lenis instance for the page. Lenis drives the native scroll position, so
// Motion's useScroll and IntersectionObserver keep working unchanged.
let lenis = null;

export function startSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || lenis) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.12, wheelMultiplier: 0.9 });
  return () => {
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  // Move focus for keyboard and screen reader users without a second jump.
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1 });
  else window.scrollTo(0, y);
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
