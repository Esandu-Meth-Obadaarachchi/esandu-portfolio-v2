import { STACK } from '../data';
import Reveal from './Reveal';
import './stack.css';

// The layers of an AI product, model at the top, infrastructure at the bottom.
// Each band steps in a little, so the whole reads as one stack.
export default function Stack() {
  return (
    <section id="stack" className="stack section" aria-labelledby="stack-title">
      <div className="container">
        <Reveal>
          <h2 id="stack-title" className="h2">
            Every layer, AI first
          </h2>
          <p className="lede">An agent is only useful once it sits inside a real product, on real infrastructure. I work across all four layers, and spend most of my time in the second one.</p>
        </Reveal>
        <ol className="layers">
          {STACK.map((l, i) => (
            <Reveal as="li" key={l.layer} delay={i * 0.07} className="layer" data-hot={i === 1 || undefined} style={{ '--i': i }}>
              <div className="layer-head">
                <h3 className="layer-name">{l.layer}</h3>
                <p className="layer-note mono">{l.note}</p>
              </div>
              <p className="layer-items">
                {l.items.map((it, j) => (
                  <span key={it}>
                    {it}
                    {j < l.items.length - 1 && <span className="layer-sep" aria-hidden="true"> / </span>}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
