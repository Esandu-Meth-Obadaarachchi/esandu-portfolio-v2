import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// The BMPC award, rebuilt from primitives: a cast-gold thumbs-up on a cream
// and black pillar.
// Drag to spin; it keeps the flick's momentum and settles back into a slow idle
// turn. Lit by local light-formers only, so nothing is fetched at runtime.

// Satin gold, like the cast hand on the real award (not a mirror finish).
const GOLD = { color: '#e2b23c', metalness: 0.92, roughness: 0.34 };
const CREAM = '#efe7cc';

function texture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

// Front face: cream, with the award's red mark and wordmark.
function drawFront(g, w, h) {
  g.fillStyle = CREAM;
  g.fillRect(0, 0, w, h);
  // tricolour ticks, top right and bottom right
  [['#1f3a7a', 0], ['#d8452e', 14], ['#222', 28]].forEach(([c, dx]) => {
    g.fillStyle = c;
    g.fillRect(w - 110 + dx, 40, 7, 90);
    g.fillRect(w - 150 + dx, h - 190, 7, 130);
  });
  // red swirl mark
  g.strokeStyle = '#d8452e';
  g.lineWidth = 16;
  g.lineCap = 'round';
  g.beginPath();
  g.arc(220, 470, 78, Math.PI * 0.2, Math.PI * 1.55);
  g.stroke();
  g.fillStyle = '#d8452e';
  g.beginPath();
  g.moveTo(300, 400);
  g.lineTo(385, 385);
  g.lineTo(350, 470);
  g.closePath();
  g.fill();
  g.textAlign = 'center';
  g.font = '800 64px "Archivo Variable", system-ui, sans-serif';
  g.fillText('BEST', 256, 640);
  g.font = '700 34px "Archivo Variable", system-ui, sans-serif';
  g.fillText('MANAGEMENT', 256, 686);
  g.fillText('PRACTICES', 256, 726);
  g.fillStyle = '#55524a';
  g.font = '500 22px "Geist Variable", system-ui, sans-serif';
  g.fillText('COMPANY AWARDS', 256, 764);
  // engraved plate lines
  g.fillStyle = 'rgba(40,40,40,0.55)';
  g.fillRect(96, 250, 200, 10);
  g.fillRect(96, 272, 260, 6);
  g.fillRect(96, 286, 220, 6);
  // code block, bottom left (decorative pattern, not a real QR)
  let seed = 5;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      if (seed / 233280 > 0.5) {
        g.fillStyle = '#b9a56a';
        g.fillRect(70 + x * 13, h - 190 + y * 13, 12, 12);
      }
    }
  }
}

// Side face: black with the vertical wordmark.
function drawSide(g, w, h) {
  g.fillStyle = '#121413';
  g.fillRect(0, 0, w, h);
  g.save();
  g.translate(w / 2 + 50, h / 2 + 120);
  g.rotate(-Math.PI / 2);
  g.textAlign = 'center';
  g.fillStyle = '#e9eae3';
  g.font = '800 170px "Archivo Variable", system-ui, sans-serif';
  g.fillText('BMPC', 0, 0);
  g.fillStyle = '#8d978f';
  g.font = '500 34px "Geist Variable", system-ui, sans-serif';
  g.fillText('AWARDS', 0, 60);
  g.restore();
}

// Tapered thumb: narrow at the joint, fuller at the pad, rounded tip.
const THUMB_PROFILE = [
  [0.0, 0],
  [0.128, 0],
  [0.132, 0.1],
  [0.118, 0.22],
  [0.104, 0.33],
  [0.11, 0.42],
  [0.112, 0.5],
  [0.098, 0.57],
  [0.066, 0.62],
  [0.0, 0.64],
].map(([r, y]) => new THREE.Vector2(r, y));

function Hand() {
  const gold = <meshStandardMaterial {...GOLD} />;
  // bottom to top: little finger to index
  const fingers = [
    { r: 0.078, len: 0.22, x: -0.13 },
    { r: 0.086, len: 0.26, x: -0.15 },
    { r: 0.09, len: 0.28, x: -0.16 },
    { r: 0.084, len: 0.25, x: -0.14 },
  ];
  return (
    <group scale={1.12}>
      {/* palm */}
      <mesh position={[0.07, 0.36, -0.03]} scale={[0.31, 0.32, 0.25]}>
        <sphereGeometry args={[1, 48, 32]} />
        {gold}
      </mesh>
      {/* back of the hand, flattens the silhouette behind the fingers */}
      <mesh position={[-0.02, 0.36, -0.1]} scale={[0.3, 0.3, 0.17]}>
        <sphereGeometry args={[1, 40, 28]} />
        {gold}
      </mesh>
      {/* curled fingers: one roll each, knuckle and tip rounded off */}
      {fingers.map((f, i) => {
        const y = 0.135 + i * 0.148;
        return (
          <group key={i} position={[f.x, y, 0.1]}>
            <mesh rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 1.22]}>
              <capsuleGeometry args={[f.r, f.len, 12, 24]} />
              {gold}
            </mesh>
            {/* fingertip tucking into the palm */}
            <mesh position={[f.len / 2 + 0.03, -0.005, -0.02]} scale={[1, 0.92, 1.05]}>
              <sphereGeometry args={[f.r * 0.98, 24, 18]} />
              {gold}
            </mesh>
            {/* knuckle */}
            <mesh position={[-f.len / 2 - 0.02, 0, -0.06]} scale={[1, 0.95, 1.2]}>
              <sphereGeometry args={[f.r * 1.02, 24, 18]} />
              {gold}
            </mesh>
          </group>
        );
      })}
      {/* thenar: the muscle at the base of the thumb */}
      <mesh position={[0.2, 0.47, 0.05]} scale={[0.2, 0.27, 0.2]} rotation={[0, 0, -0.25]}>
        <sphereGeometry args={[1, 40, 28]} />
        {gold}
      </mesh>
      {/* thumb */}
      <mesh position={[0.12, 0.56, -0.01]} rotation={[-0.06, 0, 0.12]} scale={[1.3, 0.9, 1.22]}>
        <latheGeometry args={[THUMB_PROFILE, 40]} />
        {gold}
      </mesh>
      {/* wrist stub */}
      <mesh position={[0.37, 0.29, -0.03]} rotation={[0, 0, Math.PI / 2 - 0.12]} scale={[1.08, 1, 0.9]}>
        <capsuleGeometry args={[0.185, 0.1, 12, 28]} />
        {gold}
      </mesh>
    </group>
  );
}

function Award({ drag, reduce }) {
  const group = useRef();
  const front = useMemo(() => texture(512, 1280, drawFront), []);
  const side = useMemo(() => texture(512, 1280, drawSide), []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = drag.current;
    if (!d.active) {
      // Momentum decays exponentially, then idle turn takes over.
      d.velocity *= Math.pow(0.04, dt);
      const idle = reduce ? 0 : 0.35;
      d.rotation += (d.velocity + idle) * dt;
    }
    g.rotation.y = d.rotation;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, d.tilt, 6, dt);
    if (!reduce) g.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.9) * 0.04;
  });

  const W = 0.74;
  const H = 1.9;
  const D = 0.54;
  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Pillar: cream front and back, black sides, as on the real award.
          Material order is +x, -x, +y, -y, +z, -z. */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial attach="material-0" map={side} roughness={0.4} metalness={0.2} />
        <meshStandardMaterial attach="material-1" map={side} roughness={0.4} metalness={0.2} />
        <meshStandardMaterial attach="material-2" color={CREAM} roughness={0.5} />
        <meshStandardMaterial attach="material-3" color="#121413" roughness={0.6} />
        <meshStandardMaterial attach="material-4" map={front} roughness={0.45} />
        <meshStandardMaterial attach="material-5" map={front} roughness={0.45} />
      </mesh>
      <group position={[-0.03, 0.655, 0]}>
        <Hand />
      </group>
    </group>
  );
}

export default function Trophy({ active, reduce }) {
  const drag = useRef({ active: false, rotation: 0.5, velocity: 0, tilt: 0, lastX: 0, lastT: 0 });
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const d = drag.current;
    const down = (e) => {
      el.setPointerCapture(e.pointerId);
      d.active = true;
      d.velocity = 0;
      d.lastX = e.clientX;
      d.lastT = performance.now();
    };
    const move = (e) => {
      if (!d.active) return;
      const now = performance.now();
      const dx = e.clientX - d.lastX;
      const dtm = Math.max(now - d.lastT, 1);
      d.rotation += dx * 0.012;
      // Track release velocity (rad/s), lightly smoothed.
      d.velocity = d.velocity * 0.5 + ((dx * 0.012) / dtm) * 1000 * 0.5;
      d.tilt = THREE.MathUtils.clamp((e.offsetY / el.clientHeight - 0.5) * 0.3, -0.15, 0.15);
      d.lastX = e.clientX;
      d.lastT = now;
    };
    const up = () => {
      d.active = false;
      d.tilt = 0;
      // A pause before release means no flick.
      if (performance.now() - d.lastT > 80) d.velocity = 0;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <div ref={wrap} className="trophy-canvas" data-cursor="drag">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ position: [0, 0.9, 7.9], fov: 30 }}
        onCreated={({ camera }) => camera.lookAt(0, 0.2, 0)}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} color="#fff4dc" />
        <directionalLight position={[-4, 1, -3]} intensity={0.35} color="#e8432e" />
        <Award drag={drag} reduce={reduce} />
        <ContactShadows position={[0, -1.42, 0]} opacity={0.55} scale={5} blur={2.6} far={2} color="#000" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} color="#fff1d0" position={[0, 3, 2]} scale={[7, 2, 1]} />
          <Lightformer form="rect" intensity={2} color="#ffe9b8" position={[2, 1, 4]} scale={[3, 3, 1]} />
          <Lightformer form="rect" intensity={1.6} position={[-3, 0.5, 1]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={0.5} color="#e8432e" position={[3, 0, -2]} rotation-y={-Math.PI / 2} scale={[3, 1.5, 1]} />
          <Lightformer form="ring" intensity={2} position={[0, 1, -4]} scale={2.5} />
        </Environment>
      </Canvas>
    </div>
  );
}
