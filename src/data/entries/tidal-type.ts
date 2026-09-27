import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const tidalType: Inspiration = {
  id: 'tidal-type',
  title: 'Tidal Type',
  category: 'Experimental',
  tags: ['kinetic type', 'variable fonts', 'cursor-reactive', 'brutalist grid'],
  summary: 'Typography treated as water — headlines swell, ripple, and drag behind the cursor like a fluid.',
  analysis:
    'A type-first direction where the letterforms are the entire show: variable font axes respond to cursor velocity, headlines wrap around a brutalist grid, and every other element demurs. It is loud but disciplined — the system only ever animates type, weight, and spacing.',
  dna: {
    typography:
      'A single variable grotesk used from 100 to 900 weight; headlines at 12vw that ripple by animating font-variation-settings per glyph; mono microcopy for coordinates and timestamps.',
    color:
      'Ink base #070c0e with sea-glass #5fd4d0 highlights behind the glyphs; 90% of the canvas is pure typography on black.',
    layout:
      'Brutalist: headlines overflow the grid deliberately, body columns are narrow (38ch), and a fixed frame of hairlines and corner ticks makes the chaos feel authored.',
    motion:
      'Weight waves propagate through headlines like ripples (60–80ms per glyph). Cursor movement drags nearby glyphs up to 0.4em off-baseline with springy return.',
    interaction:
      'Selecting any text plays a slow weight oscillation. A "calm mode" toggle (also auto-on for reduced motion) freezes all ripples to static editorial type.',
  },
  buildPrompt: `Design an original typography-led experimental site for {{brand}} — {{industry}} promoting {{product}} — where the type itself is the interface.

CONCEPT
Letterforms behave like water. Variable-font axes respond to cursor velocity; headlines swell, ripple, and settle. Everything else on the page demurs so the type can perform.

LAYOUT & HIERARCHY
- Brutalist grid with headlines at 12vw that intentionally overflow their columns; body columns capped at 38ch.
- A fixed frame of hairlines and corner ticks with mono coordinate readouts makes the chaos feel authored.
- One section per typographic "study": ripple, drag, stack, collapse — each demonstrated live on real copy.

VISUAL MOOD
Ink-black water at night: high contrast, sea-glass highlights glinting off glyph edges, generous darkness between studies. No imagery at all — type, hairlines, and grain only.

TYPOGRAPHY
A single variable grotesk exercised across its full 100–900 weight range; per-glyph animation via font-variation-settings; 10px mono microcopy for coordinates, timestamps, and axis labels.

COLOR
Ink base #070c0e, bone type, and {{accent}} for glints, active axis labels, and the cursor trail. Everything else is black, white, and discipline.

MOTION & INTERACTION
Weight waves propagate through headlines at 60–80ms per glyph; cursor proximity drags glyphs up to 0.4em off-baseline with a springy return. Selection triggers a slow weight oscillation. All effects run on rAF with transform/opacity/font-axes only — no layout thrash.

RESPONSIVE BEHAVIOR
On touch devices, replace cursor-reactivity with scroll-velocity-driven ripples and tap-to-trigger studies. Headlines step from 12vw to a 2-line lockup under 380px. All studies remain fully readable with effects disabled.

ACCESSIBILITY
A persistent, obvious "Calm mode" toggle freezes every effect; it also switches on automatically for prefers-reduced-motion. Body text stays at 4.5:1; animated headlines are duplicated for screen readers as plain text.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; variable font (e.g. a wght-axis grotesk) with Framer Motion springs or direct rAF interpolation on font-variation-settings; zero canvas required.

ORIGINALITY
Choose or license a typeface properly, write every headline and study description yourself, and invent your own ripple behaviors. Do not imitate any existing site's type animations, brand, copy, or code.`,
  customization: {
    brand: 'Tidal',
    industry: 'a type foundry showcase',
    product: 'a variable-font release',
    tone: 'assured and playful',
    accent: '#5fd4d0',
  },
  source: {
    label: 'tidal-type.example',
    url: 'https://example.com/inspirations/tidal-type',
    credit: 'Fictional credit — Studio Kessler',
  },
  createdAt: '2026-05-19',
  baseSaves: 145,
  thumb: { variant: 'glyph', palette: ['#070c0e', '#123339', '#5fd4d0'], ratio: 'portrait' },
  origin: 'seed',
};
