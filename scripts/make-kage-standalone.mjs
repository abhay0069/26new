/**
 * Packs the authored Kage landing page into ONE self-contained HTML file
 * that runs offline in any browser: fonts.css and three.min.js are
 * inlined, and every secret-pathways-assets/ reference becomes a data URI.
 * Usage: node scripts/make-kage-standalone.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../public/landing-pages/', import.meta.url).pathname;
const MIME = {
  '.webp': 'image/webp',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

let html = readFileSync(`${root}kage.html`, 'utf8');

// 1. Inline the stylesheet link.
html = html.replace(
  /<link rel="stylesheet" href="secret-pathways-assets\/fonts.css">/,
  () => `<style>${readFileSync(`${root}secret-pathways-assets/fonts.css`, 'utf8')}</style>`,
);

// 2. Inline the Three.js runtime (guard against </script> inside the bundle).
html = html.replace(
  /<script src="secret-pathways-assets\/three\.min.js"><\/script>/,
  () => `<script>${readFileSync(`${root}secret-pathways-assets/three.min.js`, 'utf8').replace(/<\/script>/g, '<\\/script>')}</script>`,
);

// 3. Replace every remaining asset reference with a data URI.
// (A prose comment in the source also mentions the asset folder without a
// filename — refs without a file extension are left untouched.)
const refs = [...new Set(html.match(/secret-pathways-assets\/[A-Za-z0-9/._-]+\.[A-Za-z0-9]+/g) ?? [])];
for (const ref of refs) {
  const ext = ref.slice(ref.lastIndexOf('.'));
  const mime = MIME[ext];
  if (!mime) throw new Error(`Unknown asset type: ${ref}`);
  const b64 = readFileSync(`${root}${ref}`).toString('base64');
  html = html.split(ref).join(`data:${mime};base64,${b64}`);
}

const leftover = html.match(/secret-pathways-assets\/[A-Za-z0-9/._-]+\.[A-Za-z0-9]+/g);
if (leftover) throw new Error(`${leftover.length} unresolved asset reference(s) remain.`);

const out = new URL('../kage-standalone.html', import.meta.url).pathname;
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024 / 1024).toFixed(2)} MB, ${refs.length} assets inlined)`);
