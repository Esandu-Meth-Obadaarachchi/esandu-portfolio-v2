import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SECTIONS } from '../data';
import { go } from './Nav';
import './runrail.css';

// The page as an agent run: every section is a node on a trace. Visited nodes
// fill, the current one is live. This is the section navigation, not decoration.
export default function RunRail() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    // A section is current while it crosses the middle line of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const i = SECTIONS.findIndex((s) => s.id === en.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Sections">
      <div className="rail-track" aria-hidden="true">
        <motion.div className="rail-fill" style={{ scaleY: fill }} />
      </div>
      <ol>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className="rail-node"
              data-state={i < active ? 'done' : i === active ? 'live' : 'idle'}
              aria-current={i === active ? 'location' : undefined}
              data-cursor="go"
            >
              <span className="rail-label">{s.label}</span>
              <span className="rail-dot" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
