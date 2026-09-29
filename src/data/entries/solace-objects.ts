import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const solaceObjects: Inspiration = {
  id: 'solace-objects',
  title: 'Solace Objects',
  category: 'Luxury',
  tags: ['editorial layout', 'slow reveals', 'serif accents', 'stillness'],
  summary: 'A slow, gallery-like catalogue of sculptural objects where every scroll feels like turning a page.',
  analysis:
    'Luxury here is restraint plus patience: enormous margins, one object per viewport, and crossfades measured in seconds. Typography carries the brand — an oversized serif numeral system and letterspaced captions — while imagery behaves like still-life photography staged by an archivist.',
  dna: {
    typography:
      'A high-contrast serif for display with true italics for one editorial flourish; caption lines set in 11px uppercase with 0.32em tracking; oversized index numerals as graphic objects.',
    color:
      'Warm near-black #0d0c0a, parchment #ece6d8 panels, and a restrained brass #d9a441 for hairlines, numerals, and hover states only.',
    layout:
      'Full-bleed object studies alternate with two-column editorial spreads on a strict 8-point baseline; margins breathe at 8vw minimum.',
    motion:
      'Slow 900ms crossfades and 20px settles. Objects parallax at 4% against their captions. Nothing bounces; nothing spins.',
    interaction:
      'Hovering an object nudges it 6px toward the cursor and warms its caption to brass. The index list filters the catalogue with a fade, not a jump.',
  },
  buildPrompt: `Design an original digital catalogue for {{brand}} — {{industry}} presenting a collection of {{product}} — with the patience of a printed monograph.

CONCEPT
One object per viewport, staged like still-life photography. The visitor turns pages; the site never pushes content at them.

LAYOUT & HIERARCHY
- Alternate full-bleed object studies with two-column editorial spreads on a strict 8-pt baseline grid.
- Margins breathe at 8vw minimum; captions sit far from their objects to create quiet tension.
- An index page lists every object as a text-only table — number, name, material — which filters the collection in place.

VISUAL MOOD
Museum-at-night luxury: warm near-black rooms, one soft key light per object, deep but soft shadows, a faint grain of analog film.

TYPOGRAPHY
A high-contrast serif for display sizes with a true italic used exactly once per spread; 11px uppercase captions at 0.32em tracking; oversized serif numerals (01–12) used as graphic anchors.

COLOR
Warm near-black #0d0c0a base, parchment #ece6d8 panels, graphite secondary text, and {{accent}} restricted to hairlines, numerals, and hover states.

MOTION & INTERACTION
Slow is the point: 900ms crossfades, 20px settles, objects parallaxing 4% against their captions. Hovering an object leans it 6px toward the cursor and warms its caption. Nothing bounces, nothing spins.

RESPONSIVE BEHAVIOR
From 320px the spreads stack — object, then caption — with margins reduced to 6vw. The index table becomes a stacked list with sticky headers. Touch targets never drop below 44px.

ACCESSIBILITY
Bone-on-black body text comfortably above 4.5:1; brass reserved for large elements passing 3:1. All controls keyboard-reachable; the page-turn interaction also works with arrow keys.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion AnimatePresence for page-turn crossfades; CSS blend modes and box-shadow for lighting. Canvas unnecessary — achieve richness with typography and light.

ORIGINALITY
Art-direct every object study as an original CSS or WebGL composition and write all object names, materials, and editorial copy from scratch. Do not reproduce any existing brand's objects, photography, wordmarks, or code.`,
  customization: {
    brand: 'Solace',
    industry: 'a collectible design gallery',
    product: 'twelve sculptural objects',
    tone: 'hushed and assured',
    accent: '#d9a441',
  },
  source: {
    label: 'solace-objects.example',
    url: 'https://example.com/inspirations/solace-objects',
    credit: 'Fictional credit — Atelier Verre',
  },
  createdAt: '2026-08-21',
  baseSaves: 112,
  thumb: { variant: 'strata', palette: ['#0d0c0a', '#332a1c', '#d9a441'], ratio: 'portrait' },
  origin: 'seed',
};
