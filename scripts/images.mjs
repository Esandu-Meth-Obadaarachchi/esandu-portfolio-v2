// One-off image pipeline: source photos -> WebP at display size in public/img.
// Run with `node scripts/images.mjs` after replacing a source photo.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const ROOT = '..';
const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

const jobs = [
  { src: `${ROOT}/my proffessional pic 2.png`, out: 'portrait', width: 1100 },
  { src: `${ROOT}/my proffessional pic 1.png`, out: 'portrait-front', width: 900 },
  { src: `${ROOT}/my pic 1.jpeg`, out: 'casual-1', width: 720 },
  { src: `${ROOT}/my pic 2.jpeg`, out: 'casual-2', width: 720 },
  { src: `${ROOT}/award 1 cpm.jpeg`, out: 'bmpc-2025-team', width: 1280, cropBottom: 0.09 },
  { src: `${ROOT}/award 1 cpm pic2.jpeg`, out: 'bmpc-2025-stage', width: 960 },
  { src: `${ROOT}/award 3 cpm 2026.jpeg`, out: 'bmpc-2026', width: 837 },
  { src: `${ROOT}/site/assets/award4.jpg`, out: 'iit-excellence-2025', width: 828 },
  { src: `${ROOT}/site/assets/award5.jpg`, out: 'npme-2025', width: 828 },
  // Certificates: crop off the bottom strip that carries candidate and certificate numbers.
  { src: `${ROOT}/a level certificate.jpeg`, out: 'cert-a-level', width: 900, cropBottom: 0.2 },
  { src: `${ROOT}/o level certificate.jpeg`, out: 'cert-o-level', width: 900, cropBottom: 0.2 },
];

for (const j of jobs) {
  let img = sharp(j.src).rotate();
  if (j.cropBottom) {
    const { width, height } = await img.metadata();
    img = img.extract({ left: 0, top: 0, width, height: Math.round(height * (1 - j.cropBottom)) });
  }
  const info = await img
    .resize({ width: j.width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${OUT}/${j.out}.webp`);
  console.log(j.out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
