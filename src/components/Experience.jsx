import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CERTS, EDUCATION, EXPERIENCE } from '../data';
import { lockScroll } from '../lib/scroll';
import { Close } from './Icons';
import Reveal from './Reveal';
import './experience.css';

export default function Experience() {
  const [cert, setCert] = useState(null);
  const trigger = useRef(null);

  const openCert = (e, item) => {
    trigger.current = e.currentTarget;
    setCert(item);
  };

  return (
    <section id="experience" className="experience section" aria-labelledby="exp-title">
      <div className="container">
        <Reveal>
          <h2 id="exp-title" className="h2">
            Where I have done it
          </h2>
        </Reveal>

        <ol className="timeline">
          {EXPERIENCE.map((x, i) => (
            <Reveal as="li" key={x.role + x.period} delay={i * 0.05} className="tl-row" data-current={x.current || undefined}>
              <p className="tl-period mono">
                {x.current && <span className="tl-now">Now</span>}
                {x.period}
              </p>
              <div>
                <h3 className="tl-role">{x.role}</h3>
                <p className="tl-org">{x.org}</p>
              </div>
              <ul className="tl-points">
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <div className="edu">
          <Reveal>
            <h3 className="edu-title">Education</h3>
          </Reveal>
          <ol className="timeline">
            {EDUCATION.map((x, i) => (
              <Reveal as="li" key={x.title} delay={i * 0.05} className="tl-row">
                <p className="tl-period mono">{x.period}</p>
                <div>
                  <h3 className="tl-role">{x.title}</h3>
                  <p className="tl-org">{x.org}</p>
                </div>
                <div className="edu-grade">
                  {x.grade && <span className="edu-grade-value">{x.grade}</span>}
                  {x.note && <p className="edu-note">{x.note}</p>}
                  {x.cert && (
                    <button className="text-link edu-cert" onClick={(e) => openCert(e, x)} aria-haspopup="dialog" data-cursor="view">
                      View certificate
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="certs">
            <p className="mono certs-label">Certifications</p>
            <ul>
              {CERTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Lightbox
        item={cert}
        onClose={() => {
          setCert(null);
          trigger.current?.focus();
        }}
      />
    </section>
  );
}

function Lightbox({ item, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!item) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} certificate`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.img
            src={item.cert}
            alt={`${item.title} certificate, ${item.grade}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ transform: 'scale(0.96)' }}
            animate={{ transform: 'scale(1)' }}
            exit={{ transform: 'scale(0.97)' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          />
          <button ref={closeRef} className="drawer-close lightbox-close" onClick={onClose} aria-label="Close certificate" data-cursor="close">
            <Close />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
