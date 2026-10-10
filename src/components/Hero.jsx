import { useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { PROFILE, PROOF } from '../data';
import { createAgentField } from '../lib/agentField';
import { go } from './Nav';
import { ArrowDown, Download } from './Icons';
import './hero.css';

// Signature moment (see DESIGN.md): the hero opens like doors on load and closes
// from the sides on scroll. The surname is squeezed by the doors: its width axis
// runs from 125% to 62% as the panel narrows. Open and close share one path.
export default function Hero() {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const canvas = useRef(null);
  const nameRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });

  // 1 = fully closed. The intro runs 1 -> 0; scrolling pushes it back toward 1.
  const intro = useMotionValue(reduce ? 0 : 1);
  const scrollClose = useTransform(scrollYProgress, [0, 0.78], [0, 1], { clamp: true });
  const closed = useTransform([intro, scrollClose], ([a, b]) => Math.max(a, b));

  const clipPath = useTransform(closed, (c) => {
    const e = c * c * (3 - 2 * c); // smoothstep, so the doors ease at both ends
    const side = e * 50;
    const top = e * 7;
    return `inset(${top}% ${side}% ${top}% ${side}% round ${Math.round(e * 32)}px)`;
  });
  const stretch = useTransform(closed, (c) => `${125 - Math.min(1, c / 0.85) * 63}%`);
  const nameOpacity = useTransform(closed, [0.55, 0.8], [1, 0]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const chromeY = useTransform(scrollYProgress, [0, 0.18], ['0px', '-24px']);
  const proofOpacity = useTransform(scrollYProgress, [0.38, 0.7], [0, 1]);
  const proofScale = useTransform(scrollYProgress, [0.38, 0.95], [0.92, 1]);

  // Size the surname so it fills the panel at full width (125%).
  useLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const fit = () => {
      const measure = (text) => {
        const probe = document.createElement('span');
        probe.className = 'hero-name-probe';
        probe.textContent = text;
        document.body.appendChild(probe);
        const width = probe.getBoundingClientRect().width; // at 100px
        probe.remove();
        return width;
      };
      const natural = measure(PROFILE.last);
      const naturalFirst = measure(PROFILE.first);
      const panel = el.closest('.hero-panel');
      const cs = getComputedStyle(panel);
      const avail = panel.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.parentElement.style.setProperty('--name-size', `${Math.min((avail / natural) * 100, 260)}px`);
      // On phones the first name gets its own, larger fit (used by hero.css).
      el.parentElement.style.setProperty('--first-size', `${(avail / naturalFirst) * 100}px`);
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    if (!canvas.current) return;
    return createAgentField(canvas.current, { reduce });
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    let controls;
    let cancelled = false;
    // Wait for the display face so the doors open on the real type, not a fallback.
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      controls = animate(intro, 0, { duration: 1.5, delay: 0.15, ease: [0.77, 0, 0.175, 1] });
    });
    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [intro, reduce]);

  return (
    <section id="top" ref={wrap} className="hero" data-reduce={reduce || undefined} aria-label="Introduction">
      <div className="hero-stage">
        <div className="hero-proof-wrap" aria-hidden={!reduce}>
          <motion.ul className="hero-proof" style={reduce ? undefined : { opacity: proofOpacity, scale: proofScale }}>
            {PROOF.map((p) => (
              <li key={p.label}>
                <span className="hero-proof-value">{p.value}</span>
                <span className="hero-proof-label">{p.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div className="hero-panel" style={reduce ? undefined : { clipPath }}>
          <canvas ref={canvas} className="hero-field" aria-hidden="true" />

          <motion.p className="hero-now mono" style={reduce ? undefined : { opacity: chromeOpacity, y: chromeY }}>
            <span className="hero-live" aria-hidden="true" />
            Now: {PROFILE.current.title}, {PROFILE.current.company}
          </motion.p>

          <motion.h1 className="hero-name" style={reduce ? undefined : { opacity: nameOpacity }}>
            <motion.span className="hero-first" style={reduce ? undefined : { fontStretch: stretch }}>
              {PROFILE.first}
            </motion.span>
            <motion.span ref={nameRef} className="hero-last" style={reduce ? undefined : { fontStretch: stretch }}>
              {PROFILE.last}
            </motion.span>
            <span className="sr-only">, AI engineer</span>
          </motion.h1>

          <motion.div className="hero-foot" style={reduce ? undefined : { opacity: chromeOpacity, y: chromeY }}>
            <p className="hero-sub">
              I build <em>AI agents</em> and ship them to production. On time, at scale, award-winning.
            </p>
            <div className="hero-ctas">
              <a href="#work" className="btn btn-primary" onClick={(e) => go(e, 'work')}>
                See the work <ArrowDown />
              </a>
              <a href={PROFILE.cv} download className="btn btn-ghost">
                Download CV <Download />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
