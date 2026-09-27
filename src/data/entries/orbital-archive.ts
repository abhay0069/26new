import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const orbitalArchive: Inspiration = {
  id: 'orbital-archive',
  title: 'Orbital Archive',
  category: 'Portfolio',
  tags: ['sci-fi systems', 'orbital UI', 'sparse type', 'index-driven'],
  summary: 'A science-fiction portfolio that presents projects as archived satellites orbiting a dark index.',
  analysis:
    'The conceit is a fictional archive: each project is a catalogued object with registry numbers and orbital metadata, navigable as a constellation or as a strict table. The dual access — poetic canvas plus bureaucratic index — is what elevates it past skin-deep sci-fi.',
  dna: {
    typography:
      'A technical mono for registry data and a neutral grotesk for titles; all-caps labels at 10px/0.3em tracking; registry numbers set like plate engravings.',
    color:
      'Void #07080a, instrument-panel greens and ice-white strokes; one hazard accent for warnings and the current selection.',
    layout:
      'Two synchronized views of the same data — an orbital canvas and a dense index table. Selecting in one highlights in the other; detail panels slide from the right edge.',
    motion:
      'Satellites drift on slow elliptical paths (60–120s periods); selection pings a single expanding ring; panels translate in with a 240ms spring, 8px overshoot.',
    interaction:
      'Full keyboard navigation: arrow keys move between objects in orbital order. Hovering an index row dims unrelated satellites to 15%.',
  },
  buildPrompt: `Design an original portfolio for {{brand}} — {{industry}} archiving {{product}} — staged as a science-fiction catalogue of orbiting objects.

CONCEPT
Each project is a catalogued satellite with a registry number, class, and orbital metadata. Visitors navigate a slow constellation or a bureaucratic index — two synchronized views of the same archive.

LAYOUT & HIERARCHY
- Main view: a dark orbital canvas where project markers drift on elliptical paths; a right-edge panel (360px) opens the selected object's dossier.
- Bottom drawer: the index — a dense, sortable table of registry no. / title / year / class / status.
- Selecting anywhere (canvas, table, keyboard) keeps both views synchronized; the other view highlights the same record.

VISUAL MOOD
Instrument panel of a quiet research vessel: void-dark space, luminous thin strokes, tiny instrument readouts, restrained sci-fi. No lens flares, no starfield clutter — maybe forty dim stars total.

TYPOGRAPHY
A technical mono for registry data and readouts; a neutral grotesk for titles at 22–28px; 10px all-caps labels at 0.3em tracking throughout. Registry numbers set large, like plate engravings, on dossier covers.

COLOR
Void #07080a, ice-white strokes, panel-green instrument accents, and {{accent}} marking the current selection and warnings only.

MOTION & INTERACTION
Satellites drift on 60–120s elliptical periods (pure CSS transforms); selection emits a single expanding ring; dossiers translate in with a 240ms spring and 8px overshoot. Hovering an index row dims unrelated satellites to 15%. Everything keyboard-first: arrows move object-to-object in orbital order, Enter opens the dossier, Esc returns.

RESPONSIVE BEHAVIOR
Under 768px the canvas becomes a vertical "orbital strip" of drifting markers above a full-width index; dossiers become full-screen sheets. Touch targets and marker hit-areas stay at 44px minimum.

ACCESSIBILITY
The index table is the accessible source of truth — the canvas is aria-hidden decoration with a text alternative. Focus is trapped in the open dossier and returned on close. All readouts above 4.5:1.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; orbiting via CSS animations on nested transforms; dossier panels with Framer Motion; SVG for rings and markers. No WebGL — orbital mechanics this slow do not need a render loop.

ORIGINALITY
Invent the archive's registry system, object classes, and all project descriptions as original fiction. Do not reproduce NASA/SpaceX assets, existing sci-fi UI from film or games, or any portfolio's brand and code.`,
  customization: {
    brand: 'Orbital',
    industry: 'a speculative design practice',
    product: 'ten years of concept work',
    tone: 'deadpan scientific',
    accent: '#9fd6ff',
  },
  source: {
    label: 'orbital-archive.example',
    url: 'https://example.com/inspirations/orbital-archive',
    credit: 'Fictional credit — Archive 9',
  },
  createdAt: '2026-03-17',
  baseSaves: 93,
  thumb: { variant: 'orbit', palette: ['#07080a', '#16211c', '#8fb7a8'], ratio: 'tall' },
  origin: 'seed',
};
