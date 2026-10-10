import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CATEGORIES, FEATURED, PROJECTS } from '../data';
import { lockScroll } from '../lib/scroll';
import { DIAGRAMS } from './diagrams';
import { ArrowUpRight, Close, Plus } from './Icons';
import Reveal from './Reveal';
import './work.css';

export default function Work() {
  return (
    <section id="work" className="work section" aria-labelledby="work-title">
      <div className="container">
        <Reveal>
          <h2 id="work-title" className="h2">
            Work that shipped
          </h2>
          <p className="lede">Four systems that went from idea to people using them. AI at the core of each, full stack around it.</p>
        </Reveal>
      </div>
      <FeaturedStack />
      <ProjectIndex />
    </section>
  );
}

function FeaturedStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="container feat-list">
      {FEATURED.map((f, i) => (
        <FeaturedCard key={f.id} f={f} i={i} n={FEATURED.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function FeaturedCard({ f, i, n, progress }) {
  const reduce = useReducedMotion();
  // Cards underneath recede a little as the next one lands on top.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.035]);
  const Diagram = DIAGRAMS[f.diagram];
  return (
    <div className="feat-slot" style={{ '--i': i }}>
      <motion.article className="feat-card" style={reduce ? undefined : { scale }} aria-labelledby={`feat-${f.id}`}>
        <div className="feat-copy">
          <p className="feat-kicker mono">{f.kicker}</p>
          <h3 id={`feat-${f.id}`} className="feat-name">
            {f.name}
          </h3>
          <p className="feat-summary">{f.summary}</p>
          <p className="feat-did">{f.did}</p>
          <dl className="feat-metrics">
            {f.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="feat-stack" aria-label="Stack">
            {f.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
          {f.links.length > 0 && (
            <div className="feat-links">
              {f.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-link">
                  {l.label} <ArrowUpRight width="16" height="16" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="feat-visual">
          <Diagram />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectIndex() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const lastTrigger = useRef(null);
  const list = useMemo(() => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter]);
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c, PROJECTS.filter((p) => p.category === c).length])), []);

  const show = (p, e) => {
    lastTrigger.current = e.currentTarget;
    setOpen(p);
  };
  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <div className="container idx">
      <Reveal className="idx-head">
        <h3 className="idx-title">Every project</h3>
        <div className="idx-filters" role="group" aria-label="Filter projects">
          {['All', ...CATEGORIES].map((c) => (
            <button key={c} className="idx-filter" aria-pressed={filter === c} onClick={() => setFilter(c)} data-cursor="filter">
              {c}
              <span className="idx-count">{c === 'All' ? PROJECTS.length : counts[c]}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <ul className="idx-list">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <button className="idx-row" onClick={(e) => show(p, e)} aria-haspopup="dialog" data-cursor="read">
                <span className="idx-name">{p.name}</span>
                <span className="idx-line">{p.line}</span>
                <span className="idx-meta mono">{p.category}</span>
                <span className="idx-where mono">{p.where}</span>
                <Plus className="idx-plus" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Drawer project={open} onClose={close} />
    </div>
  );
}

function Drawer({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="drawer-scrim"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            data-lenis-prevent
            initial={{ transform: 'translateX(100%)' }}
            animate={{ transform: 'translateX(0%)' }}
            exit={{ transform: 'translateX(100%)' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <button ref={closeRef} className="drawer-close" onClick={onClose} aria-label="Close project details" data-cursor="close">
              <Close />
            </button>
            <p className="mono drawer-meta">
              {project.category}
              <span aria-hidden="true"> / </span>
              {project.where}
            </p>
            <h3 id="drawer-title" className="drawer-title">
              {project.name}
            </h3>
            <p className="drawer-line">{project.line}</p>
            <p className="drawer-body">{project.body}</p>
            <h4 className="drawer-sub mono">Built with</h4>
            <ul className="feat-stack">
              {project.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
            {project.links.length > 0 && (
              <div className="drawer-links">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
