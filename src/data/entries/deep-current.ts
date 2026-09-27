import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const deepCurrent: Inspiration = {
  id: 'deep-current',
  title: 'Deep Current',
  category: 'Experimental',
  tags: ['scrollytelling', 'oceanic', 'depth parallax', 'ambient sound'],
  summary: 'A descent through ocean layers where scroll depth equals literal depth — light dies, pressure rises.',
  analysis:
    'The scroll bar is a depth gauge: each viewport is a named ocean layer, and the palette, particle density, and type scale all shift as you sink. The genius is coherence — one metaphor governs color, motion, copy, and even the sound design, so the piece feels engineered rather than decorated.',
  dna: {
    typography:
      'Wide-tracked uppercase layer names (e.g. "— 200 M: TWILIGHT") act as wayfinding; body copy is a calm sans at 17px; depth figures in a luminous mono.',
    color:
      'A vertical gradient system from sunlit teal #5fd4d0 at the surface to void #04070a at the trench — color itself communicates progress.',
    layout:
      'Single-column descent with full-viewport chapters; facts pinned to alternating edges; a fixed depth gauge on the right edge marks the layers.',
    motion:
      'Marine snow particles drift upward as you scroll down (parallax at 3 speeds); creatures cross as silhouettes; light attenuates smoothly via an overlay tied to scroll.',
    interaction:
      'Sonar pings on click reveal hidden facts; holding the spacebar (or a button) stops the descent and lets particles drift — a designed moment of stillness.',
  },
  buildPrompt: `Design an original scrollytelling piece for {{brand}} — {{industry}} presenting {{product}} — where scroll depth equals ocean depth.

CONCEPT
The scrollbar is a depth gauge. Each viewport is a named ocean layer; as the visitor sinks, light dies, pressure figures rise, particles thicken, and the palette cools from sunlit teal to trench void. One metaphor governs everything.

LAYOUT & HIERARCHY
- A single-column descent of full-viewport chapters, each opened by a wide-tracked layer name ("— 200 M: TWILIGHT").
- Facts pin to alternating edges as the column scrolls past; a fixed depth gauge on the right ticks current meters and layer names.
- The trench chapter is nearly empty: one sentence, one figure, one slow light pulse. Earn the emptiness.

VISUAL MOOD
Submersible documentary: marine-snow particles at three parallax speeds, silhouette shapes crossing occasionally, light attenuating through a scroll-linked overlay. Dark, patient, immense.

TYPOGRAPHY
Uppercase layer names with 0.35em tracking as wayfinding; 17px calm sans for body; luminous mono for depth figures and readings. Never more than 40 words per viewport.

COLOR
A vertical journey from {{accent}} teal at the surface through deep blue-greens to void #04070a — background color interpolates continuously with scroll. Text stays bone throughout, dimming slightly with depth but never below 4.5:1.

MOTION & INTERACTION
Particles drift upward as you scroll down (3 parallax planes, transform-only). Sonar pings: clicking anywhere emits one expanding ring and reveals a hidden fact nearby. Hold spacebar (or a button on touch) to stop and let the particles simply drift — a designed stillness. Reduced motion keeps all content, freezes particles, and uses discrete layer backgrounds.

RESPONSIVE BEHAVIOR
The gauge collapses to a thin top progress hairline on mobile; particle counts halve on small screens and quarter on low-power devices; pinned facts become inline blocks between chapters.

ACCESSIBILITY
Every fact, layer name, and figure exists in semantic HTML regardless of motion state; the piece must read top-to-bottom as a normal article. Depth gauge is aria-hidden with a text summary. All copy ≥ 4.5:1 at every depth.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion useScroll for color/overlay interpolation; particles as absolutely-positioned divs or a single lightweight canvas (no physics engine); optional ambient audio, off by default.

ORIGINALITY
Write all layer facts and copy as original research-flavored fiction, draw silhouettes as simple original SVG shapes, and synthesize any sound yourself. Do not reproduce footage, photography, or code from any documentary or site.`,
  customization: {
    brand: 'Deep Current',
    industry: 'an ocean-literacy foundation',
    product: 'an interactive descent through ocean layers',
    tone: 'reverent and precise',
    accent: '#5fd4d0',
  },
  source: {
    label: 'deep-current.example',
    url: 'https://example.com/inspirations/deep-current',
    credit: 'Fictional credit — Current Theory',
  },
  createdAt: '2026-06-24',
  baseSaves: 119,
  thumb: { variant: 'wave', palette: ['#070c0e', '#123339', '#5fd4d0'], ratio: 'tall' },
  origin: 'seed',
};
