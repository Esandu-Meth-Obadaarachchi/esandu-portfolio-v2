import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE, SECTIONS } from '../data';
import { lockScroll, scrollToId } from '../lib/scroll';
import { Close, Menu } from './Icons';
import './nav.css';

const LINKS = SECTIONS.filter((s) => ['work', 'awards', 'research', 'stack', 'experience'].includes(s.id));

export function go(e, id) {
  e.preventDefault();
  scrollToId(id);
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const jump = (e, id) => {
    setOpen(false);
    go(e, id);
  };

  return (
    <>
    <header className="nav">
      <a href="#top" className="nav-mark" onClick={(e) => jump(e, 'top')} data-cursor="top">
        <span className="nav-mono" aria-hidden="true">EO</span>
        <span className="nav-name">{PROFILE.name}</span>
      </a>

      <nav aria-label="Primary" className="nav-links">
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => jump(e, l.id)}>
            {l.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="btn btn-ghost nav-cta" onClick={(e) => jump(e, 'contact')}>
        Hire me
      </a>

      <button
        className="nav-burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <Close /> : <Menu />}
      </button>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
          >
            {SECTIONS.slice(1).map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => jump(e, l.id)}
                initial={{ opacity: 0, transform: 'translateY(16px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
