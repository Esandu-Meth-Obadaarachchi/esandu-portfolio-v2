import { PAPERS } from '../data';
import { ArrowUpRight } from './Icons';
import Reveal from './Reveal';
import './research.css';

export default function Research() {
  return (
    <section id="research" className="research section" aria-labelledby="research-title">
      <div className="container">
        <Reveal>
          <h2 id="research-title" className="h2">
            Research
          </h2>
          <p className="lede">The model side, properly. Published on IEEE Xplore as an undergraduate, then a thesis that needed five examples instead of thousands.</p>
        </Reveal>
        <div className="papers">
          {PAPERS.map((p, i) => (
            <Reveal as="article" key={p.title} delay={i * 0.08} className="paper" data-variant={i}>
              <p className="paper-kind mono">{p.kind}</p>
              <h3 className="paper-title">{p.title}</h3>
              <p className="paper-authors">{p.authors}</p>
              <p className="paper-abstract">{p.abstract}</p>
              <dl className="paper-metrics">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
              <a href={p.link.href} target="_blank" rel="noreferrer" className="text-link paper-link">
                {p.link.label} <ArrowUpRight width="16" height="16" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
