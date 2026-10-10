// Ambient agent graph for the hero: nodes drift, packets travel along edges, and
// now and then a red "lead" packet runs a longer path, like a step in an agent
// run. Pure canvas, outside React. Pauses when off screen; draws one still
// frame under reduced motion.

const BONE = '233,234,227';
const RED = '232,67,46';

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function createAgentField(canvas, { reduce = false } = {}) {
  const ctx = canvas.getContext('2d');
  const rand = rng(7);
  let w = 0;
  let h = 0;
  let dpr = 1;
  let nodes = [];
  let edges = [];
  let packets = [];
  let raf = 0;
  let running = false;
  let last = 0;
  const pointer = { x: -9999, y: -9999 };

  function build() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Jittered grid gives even coverage without looking like a grid.
    const cell = w < 700 ? 120 : 150;
    const cols = Math.ceil(w / cell) + 1;
    const rows = Math.ceil(h / cell) + 1;
    nodes = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rand() < 0.28) continue;
        const bx = c * cell + (rand() - 0.5) * cell * 0.8;
        const by = r * cell + (rand() - 0.5) * cell * 0.8;
        nodes.push({ bx, by, x: bx, y: by, phase: rand() * Math.PI * 2, r: rand() < 0.12 ? 3.2 : 1.8, glow: 0 });
      }
    }
    // Connect each node to its two nearest neighbours.
    const seen = new Set();
    edges = [];
    nodes.forEach((n, i) => {
      const near = nodes
        .map((m, j) => ({ j, d: (m.bx - n.bx) ** 2 + (m.by - n.by) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      near.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
    });
    packets = [];
  }

  function spawn(lead = false) {
    if (!edges.length) return;
    const e = edges[Math.floor(rand() * edges.length)];
    const forward = rand() < 0.5;
    packets.push({ from: forward ? e[0] : e[1], to: forward ? e[1] : e[0], t: 0, speed: lead ? 0.9 : 0.35 + rand() * 0.3, lead, hops: lead ? 6 : 1 });
  }

  function nextHop(p) {
    const options = edges.filter(([a, b]) => a === p.to || b === p.to).map(([a, b]) => (a === p.to ? b : a)).filter((n) => n !== p.from);
    if (!options.length) return false;
    p.from = p.to;
    p.to = options[Math.floor(rand() * options.length)];
    p.t = 0;
    return true;
  }

  function frame(now) {
    const dt = Math.min((now - (last || now)) / 1000, 0.05);
    last = now;
    const time = now / 1000;
    ctx.clearRect(0, 0, w, h);

    nodes.forEach((n) => {
      n.x = n.bx + Math.sin(time * 0.3 + n.phase) * 6;
      n.y = n.by + Math.cos(time * 0.25 + n.phase) * 6;
      const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
      n.glow += ((d < 160 ? 1 - d / 160 : 0) - n.glow) * 0.08;
    });

    ctx.lineWidth = 1;
    edges.forEach(([a, b]) => {
      const A = nodes[a];
      const B = nodes[b];
      const g = Math.max(A.glow, B.glow);
      ctx.strokeStyle = `rgba(${BONE},${0.07 + g * 0.25})`;
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
    });

    nodes.forEach((n) => {
      ctx.fillStyle = `rgba(${BONE},${0.22 + n.glow * 0.6})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + n.glow * 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduce) {
      if (packets.length < 14 && Math.random() < 0.08) spawn(false);
      if (!packets.some((p) => p.lead) && Math.random() < 0.01) spawn(true);
      packets = packets.filter((p) => {
        p.t += p.speed * dt;
        if (p.t >= 1) {
          p.hops -= 1;
          nodes[p.to].glow = Math.min(1, nodes[p.to].glow + (p.lead ? 0.9 : 0.3));
          if (p.hops <= 0 || !nextHop(p)) return false;
        }
        const A = nodes[p.from];
        const B = nodes[p.to];
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const col = p.lead ? RED : BONE;
        if (p.lead) {
          ctx.strokeStyle = `rgba(${RED},0.6)`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${col},${p.lead ? 1 : 0.75})`;
        ctx.beginPath();
        ctx.arc(x, y, p.lead ? 3 : 1.8, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
    }

    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduce) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const onResize = () => {
    build();
    if (reduce || !running) frame(performance.now());
  };
  const onPointer = (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  };
  const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()));

  build();
  frame(performance.now());
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointer, { passive: true });
  io.observe(canvas);

  return () => {
    stop();
    io.disconnect();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointer);
  };
}
