import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { LOOP } from '../data';
import useMedia from '../lib/useMedia';
import Reveal from './Reveal';
import './loop.css';

const CX = 300;
const CY = 300;
const R = 210;
const N = LOOP.length;
const angleOf = (i) => -90 + (i * 360) / N;
const pt = (deg, r = R) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};

// How he works, drawn as what it is: a closed agent loop. Scroll drives a
// pulse around it; each node it reaches becomes the current step.
export default function Loop() {
  const desktop = useMedia('(min-width: 900px)');
  const reduce = useReducedMotion();
  return (
    <section id="loop" className="loop" aria-labelledby="loop-title">
      {desktop && !reduce ? <PinnedLoop /> : <ListLoop />}
    </section>
  );
}

function Heading() {
  return (
    <>
      <h2 id="loop-title" className="h2">
        The loop
      </h2>
      <p className="loop-intro">How a slow business process becomes a shipped AI system. Every step below happened on a real project.</p>
    </>
  );
}

function PinnedLoop() {
  const wrap = useRef(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  // Leave a little dwell at both ends.
  const p = useTransform(scrollYProgress, [0.04, 0.94], [0, 1], { clamp: true });

  useMotionValueEvent(p, 'change', (v) => {
    const s = Math.min(N - 1, Math.floor(v * N + 0.0001));
    setStep((cur) => (cur === s ? cur : s));
  });

  const pulseX = useTransform(p, (v) => pt(-90 + v * 360)[0]);
  const pulseY = useTransform(p, (v) => pt(-90 + v * 360)[1]);
  const done = useTransform(p, (v) => v > 0.995);
  const [complete, setComplete] = useState(false);
  useMotionValueEvent(done, 'change', setComplete);

  const s = LOOP[step];

  return (
    <div ref={wrap} className="loop-pin" style={{ height: `${N * 75 + 100}vh` }}>
      <div className="loop-stage">
        <div className="container loop-grid">
          <div className="loop-copy">
            <Heading />
            <div className="loop-step" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, transform: 'translateY(14px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                  transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="loop-count mono">
                    Step {step + 1} of {N}
                  </p>
                  <h3 className="loop-verb">{s.verb}</h3>
                  <p className="loop-line">{s.line}</p>
                  <p className="loop-body">{s.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <svg className="loop-svg" viewBox="0 0 600 600" role="img" aria-label="A loop of six steps: understand, digitise, build the agent, evaluate, ship, scale, then back to understand.">
            <circle cx={CX} cy={CY} r={R} className="loop-base" />
            <motion.circle
              cx={CX}
              cy={CY}
              r={R}
              className="loop-progress"
              style={{ pathLength: p, rotate: -90, transformOrigin: '300px 300px' }}
            />
            {complete && (
              <g className="loop-orbit">
                <circle cx={CX} cy={CY - R} r="4" />
              </g>
            )}

            {LOOP.map((l, i) => {
              const [x, y] = pt(angleOf(i));
              const [lx, ly] = pt(angleOf(i), R + 40);
              const state = i < step || complete ? 'done' : i === step ? 'live' : 'idle';
              const cos = Math.cos((angleOf(i) * Math.PI) / 180);
              const anchor = Math.abs(cos) < 0.2 ? 'middle' : cos > 0 ? 'start' : 'end';
              return (
                <g key={l.id} className="loop-node" data-state={state}>
                  <circle cx={x} cy={y} r="16" className="loop-node-halo" />
                  <circle cx={x} cy={y} r="8" className="loop-node-dot" />
                  <text x={lx} y={ly + 5} textAnchor={anchor} className="loop-label">
                    {l.verb}
                  </text>
                </g>
              );
            })}

            <motion.circle r="7" className="loop-pulse" cx={pulseX} cy={pulseY} />

            <text x={CX} y={CY - 8} textAnchor="middle" className="loop-center">
              {String(step + 1).padStart(2, '0')}
            </text>
            <text x={CX} y={CY + 34} textAnchor="middle" className="loop-center-sub">
              {complete ? 'and again' : LOOP[step].verb.toLowerCase()}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ListLoop() {
  return (
    <div className="section">
      <div className="container">
      <Heading />
      <ol className="loop-list">
        {LOOP.map((l, i) => (
          <Reveal as="li" key={l.id} delay={0.03 * i}>
            <span className="loop-list-node" aria-hidden="true" />
            <p className="loop-count mono">
              Step {i + 1} of {N}
            </p>
            <h3 className="loop-verb">{l.verb}</h3>
            <p className="loop-line">{l.line}</p>
            <p className="loop-body">{l.body}</p>
          </Reveal>
        ))}
        <li className="loop-list-again mono" aria-hidden="true">
          Back to step 1
        </li>
      </ol>
      </div>
    </div>
  );
}
