import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { DEMOS } from '../data';
import { scrollToY } from '../lib/scroll';
import { ArrowUpRight, SoundOff, SoundOn } from './Icons';
import './demos.css';

const N = DEMOS.length;

// The demo theatre. The laptop lid opens as the section scrolls in, then the
// section pins and scrolling changes what is on screen. Every demo autoplays
// muted; the only control anyone needs is the sound button.
export default function Demos() {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const stage = useRef(null);
  const videos = useRef([]);
  const bars = useRef([]);
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  // Lid opens while the section travels up into view.
  const { scrollYProgress: enter } = useScroll({ target: wrap, offset: ['start end', 'start start'] });
  const lid = useTransform(enter, [0.3, 1], [-92, 10], { clamp: true });
  const scale = useTransform(enter, [0.2, 1], [0.84, 1], { clamp: true });
  const screenOn = useTransform(enter, [0.7, 1], [0, 1], { clamp: true });

  // Once pinned, the scroll is split evenly between the demos.
  const { scrollYProgress: pinned } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  useMotionValueEvent(pinned, 'change', (v) => {
    const i = Math.min(N - 1, Math.floor(v * N));
    setActive((cur) => (cur === i ? cur : i));
  });

  // Load the files only when the section is close; play only while it is on screen.
  useEffect(() => {
    const el = wrap.current;
    const pre = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '1200px 0px' });
    const vis = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    pre.observe(el);
    vis.observe(stage.current);
    return () => {
      pre.disconnect();
      vis.disconnect();
    };
  }, []);

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      v.muted = !sound;
      if (i === active && visible) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, visible, sound, near]);

  // Progress bars and the ambient glow, written straight to the DOM each frame.
  useEffect(() => {
    if (!visible) return;
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 9;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let raf = 0;
    let last = 0;
    const tick = (t) => {
      videos.current.forEach((v, i) => {
        const bar = bars.current[i];
        if (v && bar && v.duration) bar.style.transform = `scaleX(${v.currentTime / v.duration})`;
      });
      const v = videos.current[active];
      if (v && v.readyState >= 2 && t - last > 250) {
        last = t;
        try {
          ctx.drawImage(v, 0, 0, 16, 9);
          const d = ctx.getImageData(0, 0, 16, 9).data;
          let r = 0, g = 0, b = 0;
          for (let k = 0; k < d.length; k += 4) {
            r += d[k];
            g += d[k + 1];
            b += d[k + 2];
          }
          const n = d.length / 4;
          stage.current?.style.setProperty('--glow', `${Math.round(r / n)}, ${Math.round(g / n)}, ${Math.round(b / n)}`);
        } catch {
          /* frame not ready */
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, active]);

  const jump = (i) => {
    const el = wrap.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    scrollToY(top + run * ((i + 0.08) / N));
  };

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    const v = videos.current[active];
    if (v) {
      v.muted = !next;
      v.play().catch(() => {});
    }
  };

  const d = DEMOS[active];

  return (
    <section id="demos" className="demos" aria-labelledby="demos-title">
      <div ref={wrap} className="demos-pin" style={{ height: `${100 + N * 85}vh` }}>
        <div ref={stage} className="demos-stage">
          <div className="demos-ambient" aria-hidden="true" />

          <div className="container demos-head">
            <h2 id="demos-title" className="h2">
              See it running
            </h2>
            <ol className="demos-tabs" aria-label="Demos">
              {DEMOS.map((x, i) => (
                <li key={x.id}>
                  <button className="demos-tab" aria-current={i === active ? 'true' : undefined} onClick={() => jump(i)} data-cursor>
                    <span className="demos-tab-name">{x.name}</span>
                    <span className="demos-tab-track" aria-hidden="true">
                      <span className="demos-tab-bar" ref={(el) => (bars.current[i] = el)} />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <motion.div className="laptop" style={reduce ? undefined : { scale }}>
            <motion.div className="laptop-lid" style={reduce ? undefined : { rotateX: lid }}>
              <div className="laptop-bezel">
                <span className="laptop-cam" aria-hidden="true" />
                <motion.div className="laptop-screen" style={reduce ? undefined : { opacity: screenOn }}>
                  {DEMOS.map((x, i) => (
                    <video
                      key={x.id}
                      ref={(el) => (videos.current[i] = el)}
                      className="laptop-video"
                      data-active={i === active}
                      src={near ? x.src : undefined}
                      poster={x.poster}
                      muted
                      loop
                      playsInline
                      preload={near ? 'auto' : 'none'}
                      aria-label={`${x.name} product demo`}
                    />
                  ))}
                  <span className="laptop-glare" aria-hidden="true" />
                </motion.div>
              </div>
            </motion.div>
            {/* Keyboard deck, lying flat and seen from slightly above. */}
            <div className="laptop-deck" aria-hidden="true">
              <div className="laptop-keys" />
              <div className="laptop-pad" />
              <div className="laptop-lip">
                <span className="laptop-notch" />
              </div>
            </div>
            <div className="laptop-floor" aria-hidden="true" />
          </motion.div>

          <div className="container demos-info">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={d.id}
                className="demos-copy"
                initial={{ opacity: 0, transform: 'translateY(10px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateY(-8px)' }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="demos-kicker mono">{d.kicker}</p>
                <p className="demos-line">
                  <strong>{d.name}.</strong> {d.line}
                </p>
                {d.link && (
                  <a href={d.link.href} target="_blank" rel="noreferrer" className="text-link demos-link">
                    {d.link.label} <ArrowUpRight width="16" height="16" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
            <button className="demos-sound" onClick={toggleSound} aria-pressed={sound} data-cursor>
              {sound ? <SoundOn /> : <SoundOff />}
              {sound ? 'Sound on' : 'Turn sound on'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
