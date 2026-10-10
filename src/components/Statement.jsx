import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { PROFILE } from '../data';
import { ArrowUpRight, Download, GitHub, LinkedIn } from './Icons';
import './statement.css';

// One paragraph, read at the pace you scroll. Each word lights as the reading
// line passes it. Marked words (wrapped in *) light in signal red.
const TEXT =
  'I take the slowest part of a business, turn it into data, wire an *AI agent* into it and *ship it to production.* At SLT Telecom that became two platforms, one running across 300+ locations, and *four national awards* between them. I started there as an intern and finished as the lead. Now I am doing it again at Digital T3.';

function tokens(text) {
  const out = [];
  let hot = false;
  text.split(' ').forEach((raw) => {
    let w = raw;
    const opens = w.startsWith('*');
    if (opens) {
      hot = true;
      w = w.slice(1);
    }
    const closes = w.endsWith('*') || w.endsWith('*.');
    w = w.replace('*', '');
    out.push({ w, hot });
    if (closes) hot = false;
  });
  return out;
}

const WORDS = tokens(TEXT);

function Word({ progress, range, word, hot }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="st-word" data-hot={hot || undefined} style={{ opacity }}>
      {word}{' '}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] });
  const n = WORDS.length;

  return (
    <section className="statement section" aria-label="About">
      <div className="container st-grid">
        <figure className="st-portrait">
          <img src="/img/portrait.webp" alt="Esandu Obadaarachchi in a black suit" width="1100" height="1100" loading="lazy" />
          <figcaption className="mono">Esandu Obadaarachchi. BSc (Hons) AI &amp; Data Science, First Class.</figcaption>
          <ul className="st-links" aria-label="Profiles and CV">
            <li>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn width="18" height="18" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
                <GitHub width="18" height="18" /> GitHub
              </a>
            </li>
            <li>
              <a href={PROFILE.links.ieee} target="_blank" rel="noreferrer">
                <ArrowUpRight width="18" height="18" /> IEEE paper
              </a>
            </li>
            <li>
              <a href={PROFILE.cv} download>
                <Download width="18" height="18" /> CV
              </a>
            </li>
            <li className="st-links-wide">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </li>
          </ul>
        </figure>

        <p ref={ref} className="st-text">
          {WORDS.map((t, i) =>
            reduce ? (
              <span key={i} className="st-word" data-hot={t.hot || undefined}>
                {t.w}{' '}
              </span>
            ) : (
              <Word key={i} progress={scrollYProgress} range={[i / n, (i + 1) / n]} word={t.w} hot={t.hot} />
            )
          )}
        </p>
      </div>
    </section>
  );
}
