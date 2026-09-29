/**
 * Bundles the production build into ONE self-contained HTML file:
 * - inlines the JS bundle and CSS
 * - base64-inlines the core (latin) woff2 font faces
 * - inlines the favicon as a data URI
 * The result runs offline with zero server. Usage: node scripts/make-standalone.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url).pathname;
const assets = readdirSync(`${dist}assets`);

const jsFile = assets.find((a) => a.startsWith('index-') && a.endsWith('.js'));
const cssFile = assets.find((a) => a.startsWith('index-') && a.endsWith('.css'));
if (!jsFile || !cssFile) throw new Error('Run `npm run build` first.');

// --- CSS + latin font faces ------------------------------------------------
let css = readFileSync(`${dist}assets/${cssFile}`, 'utf8');
const FONT_RE = /^[a-z-]+-latin-wght-(normal|italic)-[A-Za-z0-9_-]+\.woff2$/;
let fontBytes = 0;
for (const f of assets) {
  if (!FONT_RE.test(f)) continue;
  const b64 = readFileSync(`${dist}assets/${f}`).toString('base64');
  fontBytes += b64.length;
  css = css.split(`/assets/${f}`).join(`data:font/woff2;base64,${b64}`);
}

// --- favicon ---------------------------------------------------------------
const favicon = readFileSync(new URL('../public/favicon.svg', import.meta.url)).toString('base64');

// --- JS (guard against </script> inside the bundle) -------------------------
const js = readFileSync(`${dist}assets/${jsFile}`, 'utf8').replace(/<\/script>/g, '<\\/script>');

let html = readFileSync(`${dist}index.html`, 'utf8');
html = html.replace(/<link rel="icon"[^>]*>/, () => `<link rel="icon" href="data:image/svg+xml;base64,${favicon}" />`);
html = html.replace(/<link rel="stylesheet"[^>]*>/, () => `<style>${css}</style>`);
html = html.replace(/<script type="module"[^>]*><\/script>/, () => `<script type="module">${js}</script>`);

const out = new URL('../atmos-library.html', import.meta.url).pathname;
writeFileSync(out, html);
console.log(
  `Wrote ${out} (${(html.length / 1024).toFixed(0)} kB, fonts ${(fontBytes / 1024).toFixed(0)} kB base64)`,
);
