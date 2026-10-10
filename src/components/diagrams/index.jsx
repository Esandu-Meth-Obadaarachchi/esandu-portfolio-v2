import Flow from './Flow';

// Each drawing is the project's actual mechanism, not a mock screenshot.

function Lune() {
  const nodes = [
    { id: 'q', x: 70, y: 60, w: 96, label: 'Query' },
    { id: 'rw', x: 190, y: 60, w: 104, label: 'Rewrite' },
    { id: 'rt', x: 316, y: 60, w: 112, label: 'Retrieve', sub: 'Pinecone' },
    { id: 'rr', x: 446, y: 60, w: 112, label: 'Rerank', sub: 'cross-encoder' },
    { id: 'g', x: 446, y: 186, w: 112, label: 'Grade' },
    { id: 'gc', x: 446, y: 300, w: 112, label: 'Grounded?', sub: 'every claim' },
    { id: 'a', x: 230, y: 300, w: 150, label: 'Cited answer', kind: 'hot' },
  ];
  const edges = [
    { from: 'q', to: 'rw' },
    { from: 'rw', to: 'rt' },
    { from: 'rt', to: 'rr' },
    { from: 'rr', to: 'g' },
    { from: 'g', to: 'gc' },
    { from: 'gc', to: 'a' },
    { d: 'M 390 186 H 190 V 82', kind: 'retry' },
  ];
  return (
    <Flow
      title="Lune AI retrieval graph"
      label="Lune AI retrieval graph: query, rewrite, retrieve from Pinecone, rerank with a cross-encoder, grade. A weak grade loops back to rewrite. A good grade goes to a groundedness check, then a cited answer."
      nodes={nodes}
      edges={edges}
      extra={
        <>
          <text x="290" y="176" textAnchor="middle" className="flow-note" data-hot>
            weak grade: retry
          </text>
          <text x="20" y="352" className="flow-note">
            Inner graph of a LangGraph ReAct agent
          </text>
        </>
      }
    />
  );
}

function PowerProx() {
  const nodes = [
    { id: 'e', x: 76, y: 80, w: 128, label: 'Field engineer', sub: 'fault on site' },
    { id: 'ag', x: 262, y: 180, w: 120, label: 'Agent', sub: 'RAG + tools', kind: 'hot' },
    { id: 'm', x: 448, y: 70, w: 120, label: 'Manuals', sub: 'retrieval' },
    { id: 'db', x: 448, y: 180, w: 120, label: 'Asset records', sub: '12,000+ assets' },
    { id: 'nav', x: 448, y: 290, w: 120, label: 'App navigation', sub: 'drives the UI' },
    { id: 'f', x: 76, y: 280, w: 128, label: 'Step-by-step fix', kind: 'done' },
  ];
  const edges = [
    { from: 'e', to: 'ag' },
    { from: 'ag', to: 'm' },
    { from: 'ag', to: 'db' },
    { from: 'ag', to: 'nav' },
    { from: 'ag', to: 'f' },
  ];
  return (
    <Flow
      title="SLT PowerProx troubleshooting agent"
      label="SLT PowerProx: a field engineer reports a fault, the agent consults manuals, asset records and app navigation, and returns a step-by-step fix."
      nodes={nodes}
      edges={edges}
      extra={
        <text x="20" y="352" className="flow-note">
          300+ locations, rolling out nationwide
        </text>
      }
    />
  );
}

// Deterministic signal with one injected spike, for the illustration.
function series() {
  const pts = [];
  let s = 11;
  for (let i = 0; i <= 60; i++) {
    s = (s * 9301 + 49297) % 233280;
    const noise = (s / 233280 - 0.5) * 16;
    const base = 250 - Math.sin(i / 6) * 22 - Math.sin(i / 2.3) * 6;
    pts.push([30 + i * 7.7, i === 41 ? 150 : base + noise]);
  }
  return pts;
}

function PowerZenith() {
  const nodes = [
    { id: 's', x: 66, y: 50, w: 100, label: 'IoT sensors' },
    { id: 'i', x: 188, y: 50, w: 100, label: 'InfluxDB' },
    { id: 'l', x: 318, y: 50, w: 116, label: 'Lag features' },
    { id: 'x', x: 452, y: 50, w: 100, label: 'XGBoost', kind: 'hot' },
  ];
  const edges = [
    { from: 's', to: 'i' },
    { from: 'i', to: 'l' },
    { from: 'l', to: 'x' },
  ];
  const pts = series();
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const [sx, sy] = pts[41];
  return (
    <Flow
      title="SLT PowerZenith anomaly pipeline"
      label="SLT PowerZenith: IoT sensors stream into InfluxDB, lag features feed an XGBoost model, which flags consumption spikes on a live chart."
      nodes={nodes}
      edges={edges}
      extra={
        <>
          <path d="M 452 72 V 112" className="flow-edge-base" style={{ fill: 'none' }} />
          <path d={d} fill="none" stroke="rgba(233,234,227,0.75)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="30" x2="492" y1="300" y2="300" stroke="rgba(233,234,227,0.15)" />
          <circle cx={sx} cy={sy} r="7" fill="var(--signal)" />
          <circle cx={sx} cy={sy} r="15" fill="none" stroke="var(--signal)" strokeOpacity="0.5" />
          <text x={sx + 20} y={sy + 4} className="flow-note" data-hot>
            flagged
          </text>
          <text x="20" y="340" className="flow-note">
            Illustration of the method, not production data
          </text>
        </>
      }
    />
  );
}

function CycleGAN() {
  const nodes = [
    { id: 'ct', x: 96, y: 150, w: 108, label: 'CT', sub: 'brain scan' },
    { id: 'mri', x: 424, y: 150, w: 108, label: 'MRI', sub: 'synthesised', kind: 'hot' },
  ];
  return (
    <Flow
      title="MA-CycleGAN"
      label="MA-CycleGAN: generator G maps CT to MRI, generator F maps MRI back to CT, and a first-order MAML outer loop meta-learns both from five examples."
      nodes={nodes}
      edges={[
        { d: 'M 150 132 C 220 60, 300 60, 370 132' },
        { d: 'M 370 168 C 300 240, 220 240, 150 168' },
      ]}
      extra={
        <>
          <text x="260" y="70" textAnchor="middle" className="flow-label">
            G
          </text>
          <text x="260" y="244" textAnchor="middle" className="flow-label">
            F
          </text>
          <text x="260" y="156" textAnchor="middle" className="flow-note">
            cycle SSIM 0.9545
          </text>
          <rect x="40" y="270" width="440" height="52" rx="26" fill="none" stroke="rgba(232,67,46,0.5)" strokeDasharray="4 5" />
          <text x="260" y="301" textAnchor="middle" className="flow-note" data-hot>
            FOMAML outer loop, 5 training examples
          </text>
        </>
      }
    />
  );
}

export const DIAGRAMS = { lune: Lune, powerprox: PowerProx, powerzenith: PowerZenith, cyclegan: CycleGAN };
