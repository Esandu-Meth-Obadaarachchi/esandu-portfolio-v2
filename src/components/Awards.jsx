import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { AWARDS, PHOTOS } from '../data';
import { ArrowLeft, ArrowRight } from './Icons';
import Reveal from './Reveal';
import './awards.css';

// Three.js only loads when the section is close, and only renders while visible.
const Trophy = lazy(() => import('./Trophy'));

export default function Awards() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const preload = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '800px 0px' });
    const view = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    preload.observe(el);
    view.observe(el);
    return () => {
      preload.disconnect();
      view.disconnect();
    };
  }, []);

  return (
    <section id="awards" className="awards section" aria-labelledby="awards-title">
      <div className="container awards-grid">
        <div ref={ref} className="trophy-wrap">
          <div className="trophy-glow" aria-hidden="true" />
          {near && (
            <Suspense fallback={null}>
              <Trophy active={visible} reduce={reduce} />
            </Suspense>
          )}
          <p className="trophy-hint mono" aria-hidden="true">
            Drag to turn it
          </p>
          <span className="sr-only">A 3D model of the BMPC award: a gold thumbs-up on a black pillar.</span>
        </div>

        <div className="awards-copy">
          <Reveal>
            <h2 id="awards-title" className="h2">
              Four national awards. Two products.
            </h2>
            <p className="lede">Both were AI platforms I led from first commit to production at SLT Telecom.</p>
          </Reveal>
          <ol className="awards-list">
            {AWARDS.map((a, i) => (
              <Reveal as="li" key={a.title + a.year} delay={i * 0.05}>
                <span className="awards-year mono">{a.year}</span>
                <div>
                  <h3 className="awards-title">{a.title}</h3>
                  <p className="awards-body">{a.body}</p>
                </div>
                <span className="chip awards-project">{a.project}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <PhotoStrip />
    </section>
  );
}

// Horizontal strip. Arrow buttons make it obvious it scrolls sideways, and
// disable themselves at each end.
function PhotoStrip() {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const step = (dir) => {
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="photos-wrap">
      <div className="container photos-bar">
        <p className="mono photos-hint">
          Scroll for more <ArrowRight width="14" height="14" />
        </p>
        <div className="photos-nav">
          <button className="photos-btn" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous photos" data-cursor="back">
            <ArrowLeft />
          </button>
          <button className="photos-btn" onClick={() => step(1)} disabled={edge.end} aria-label="Next photos" data-cursor="next">
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="photos-viewport" data-end={edge.end}>
        <div ref={ref} className="photos" role="region" aria-label="Photos from the award nights" tabIndex={0}>
          <ul className="photos-track">
            {PHOTOS.map((p) => (
              <li key={p.src}>
                <figure style={{ '--ar': p.w / p.h }}>
                  <img src={p.src} alt={p.caption} width={p.w} height={p.h} loading="lazy" decoding="async" />
                  <figcaption className="mono">{p.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
