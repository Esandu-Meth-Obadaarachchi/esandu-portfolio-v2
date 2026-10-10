import './flow.css';

// Minimal flow-diagram renderer. Nodes are boxes at centre points; edges are
// orthogonal paths that carry moving packets (a CSS dash animation).
const W = 112;
const H = 44;

function port(n, side) {
  const w = (n.w ?? W) / 2;
  const h = H / 2;
  return {
    l: [n.x - w, n.y],
    r: [n.x + w, n.y],
    t: [n.x, n.y - h],
    b: [n.x, n.y + h],
  }[side];
}

// Picks sides automatically: straight when aligned, elbow otherwise.
export function edgePath(a, b) {
  if (Math.abs(a.y - b.y) < 2) {
    const [x1, y1] = port(a, b.x > a.x ? 'r' : 'l');
    const [x2] = port(b, b.x > a.x ? 'l' : 'r');
    return `M ${x1} ${y1} H ${x2}`;
  }
  if (Math.abs(a.x - b.x) < 2) {
    const [x1, y1] = port(a, b.y > a.y ? 'b' : 't');
    const [, y2] = port(b, b.y > a.y ? 't' : 'b');
    return `M ${x1} ${y1} V ${y2}`;
  }
  const [x1, y1] = port(a, b.x > a.x ? 'r' : 'l');
  const [x2, y2] = port(b, b.x > a.x ? 'l' : 'r');
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} H ${mx} V ${y2} H ${x2}`;
}

export function Node({ n }) {
  const w = n.w ?? W;
  return (
    <g className="flow-node" data-kind={n.kind}>
      <rect x={n.x - w / 2} y={n.y - H / 2} width={w} height={H} rx={H / 2} />
      <text x={n.x} y={n.sub ? n.y - 3 : n.y + 4.5} textAnchor="middle" className="flow-label">
        {n.label}
      </text>
      {n.sub && (
        <text x={n.x} y={n.y + 12} textAnchor="middle" className="flow-sub">
          {n.sub}
        </text>
      )}
    </g>
  );
}

export function Edge({ d, kind, delay = 0 }) {
  return (
    <g className="flow-edge" data-kind={kind}>
      <path d={d} className="flow-edge-base" />
      <path d={d} className="flow-edge-run" style={{ animationDelay: `${delay}s` }} />
    </g>
  );
}

export default function Flow({ nodes, edges, extra, title, label, viewBox = '0 0 520 360' }) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <svg className="flow" viewBox={viewBox} role="img" aria-label={label}>
      <title>{title}</title>
      {edges.map((e, i) => (
        <Edge key={i} d={e.d ?? edgePath(byId[e.from], byId[e.to])} kind={e.kind} delay={i * 0.25} />
      ))}
      {extra}
      {nodes.map((n) => (
        <Node key={n.id} n={n} />
      ))}
    </svg>
  );
}
