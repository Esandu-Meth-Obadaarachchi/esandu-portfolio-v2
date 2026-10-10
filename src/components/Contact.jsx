import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../data';
import { go } from './Nav';
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn } from './Icons';
import Reveal from './Reveal';
import './contact.css';

const YEAR = new Date().getFullYear();

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div>
          <Reveal>
            <h2 id="contact-title" className="contact-title">
              Got a slow process? <span className="accent">Let’s ship the agent</span> that fixes it.
            </h2>
            <p className="lede contact-lede">Open to AI engineering roles, freelance builds and research collaborations.</p>
          </Reveal>

          <Reveal delay={0.08} className="contact-email-row">
            <a href={`mailto:${PROFILE.email}`} className="contact-email">
              {PROFILE.email}
            </a>
            <button className="btn btn-ghost contact-copy" onClick={copy} data-cursor={copied ? 'copied' : 'copy'}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'y' : 'n'}
                  className="contact-copy-inner"
                  initial={{ opacity: 0, transform: 'translateY(6px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-6px)' }}
                  transition={{ duration: 0.16 }}
                >
                  {copied ? <Check /> : <Copy />}
                  {copied ? 'Copied' : 'Copy email'}
                </motion.span>
              </AnimatePresence>
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied' : ''}
            </span>
          </Reveal>

          <Reveal delay={0.14}>
            <ul className="contact-links">
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
                  <Download width="18" height="18" /> CV (PDF)
                </a>
              </li>
              <li>
                <a href={PROFILE.phoneHref} data-cursor="call">
                  {PROFILE.phone}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="contact-photo">
          <img src="/img/casual-1.webp" alt="Esandu outdoors in a green shirt" width="720" height="1280" loading="lazy" />
        </Reveal>
      </div>

      <footer className="container footer">
        <p className="mono">
          © {YEAR} {PROFILE.name}. Designed and built by me, in React, Three.js and Motion.
        </p>
        <a href="#top" className="mono footer-top" onClick={(e) => go(e, 'top')}>
          Back to top
        </a>
      </footer>
    </section>
  );
}
