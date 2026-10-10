import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import './cursor.css';

// The cursor is an agent node: a dot that tracks the pointer 1:1 and a ring that
// follows on a spring, joined by an edge. Over anything interactive the ring opens
// and names the action. Fine pointers only; touch and reduced motion keep the
// native cursor.
const INTERACTIVE = 'a, button, [role="button"], [data-cursor], summary, label';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ hover: false, label: '', hidden: true, down: false, text: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 420, damping: 38, mass: 0.6 };
  const rx = useSpring(x, spring);
  const ry = useSpring(y, spring);

  // Edge from dot to ring, as length + angle.
  const len = useTransform([x, y, rx, ry], ([a, b, c, d]) => Math.hypot(c - a, d - b));
  const angle = useTransform([x, y, rx, ry], ([a, b, c, d]) => (Math.atan2(d - b, c - a) * 180) / Math.PI);
  const edgeOpacity = useTransform(len, [4, 18, 140], [0, 0.55, 0.25]);
  const edgeTransform = useTransform(
    [x, y, len, angle],
    ([a, b, l, an]) => `translate3d(${a}px, ${b}px, 0) rotate(${an}deg) scaleX(${l})`
  );
  const dotTransform = useTransform([x, y], ([a, b]) => `translate3d(${a}px, ${b}px, 0)`);
  const ringTransform = useTransform([rx, ry], ([a, b]) => `translate3d(${a}px, ${b}px, 0)`);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    // Latest values live here so the listeners bind once and only call
    // setState when something visible actually changes.
    const live = { hit: null, hidden: true, text: false };
    const patch = (p) => setState((s) => ({ ...s, ...p }));

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      const hit = target?.closest(INTERACTIVE) ?? null;
      const text = !!target?.closest('input, textarea, [contenteditable="true"]');
      if (hit !== live.hit || live.hidden || text !== live.text) {
        live.hit = hit;
        live.hidden = false;
        live.text = text;
        const label = hit ? hit.getAttribute('data-cursor') ?? defaultLabel(hit) : '';
        patch({ hover: !!hit, label, hidden: false, text });
      }
    };
    const onDown = () => patch({ down: true });
    const onUp = () => patch({ down: false });
    const hideNow = () => {
      live.hidden = true;
      patch({ hidden: true });
    };
    // Keyboard users get the native focus ring; the custom cursor steps aside.
    const onKey = (e) => {
      if (e.key === 'Tab') hideNow();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', hideNow);
    window.addEventListener('keydown', onKey);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', hideNow);
      window.removeEventListener('keydown', onKey);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hide = state.hidden || state.text;
  const ringScale = state.hover ? 1.35 : 1;

  return (
    <div className="cursor" aria-hidden="true" data-hidden={hide}>
      <motion.div className="cursor-edge" style={{ transform: edgeTransform, opacity: edgeOpacity }} />
      <motion.div className="cursor-ring-pos" style={{ transform: ringTransform }}>
        <motion.div
          className="cursor-ring"
          data-hover={state.hover}
          animate={{ scale: state.down ? ringScale * 0.86 : ringScale }}
          transition={{ type: 'spring', stiffness: 520, damping: 34 }}
        />
      </motion.div>
      <motion.div className="cursor-dot-pos" style={{ transform: dotTransform }}>
        <div className="cursor-dot" data-hover={state.hover} />
      </motion.div>
    </div>
  );
}

function defaultLabel(el) {
  if (el.tagName === 'A') {
    const href = el.getAttribute('href') || '';
    if (href.startsWith('mailto:')) return 'email';
    if (href.endsWith('.pdf')) return 'save';
    if (href.startsWith('#')) return 'go';
    return 'open';
  }
  return '';
}
