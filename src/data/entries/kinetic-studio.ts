import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const kineticStudio: Inspiration = {
  id: 'kinetic-studio',
  title: 'Kinetic Studio',
  category: 'Portfolio',
  tags: ['motion agency', 'showreel logic', 'cursor choreography', 'bold grotesk'],
  summary: 'A motion studio portfolio that behaves like a showreel — the cursor conducts, the grid dances.',
  analysis:
    'The studio proves its craft in the interface itself: headlines that scatter and reform, thumbnails that tilt in perspective toward the cursor, and a marquee of disciplines that changes speed with scroll velocity. Crucially, every effect has a static, reduced-motion equivalent so the work still reads.',
  dna: {
    typography:
      'A heavy grotesk at 10vw for statements, remixed per section — outlined, filled, split, stacked; discipline names in a compact mono marquee.',
    color:
      'Carbon #0b0b0a with bone type and acid #c7ff35 as the exclusive signal color — used for cursors, active states, and one word per headline, maximum.',
    layout:
      'A loose 4-column collage where project tiles intentionally break their gutters; full-bleed video-style loops are replaced with CSS-animated poster compositions.',
    motion:
      'Spring physics everywhere (stiffness 300, damping 30): headlines scatter 12px on approach and reform on leave; tiles rotate up to 4° in 3D toward the cursor; marquee velocity couples to scroll speed.',
    interaction:
      'Pressing and holding any tile "plays" it — the CSS composition animates through 3 keyframes; releasing pauses. A discipline filter re-deals the grid like cards.',
  },
  buildPrompt: `Design an original portfolio for {{brand}} — {{industry}} promoting {{product}} — where the interface itself demonstrates the craft.

CONCEPT
A showreel you can touch: headlines scatter and reform, tiles tilt toward the cursor in perspective, and a discipline marquee accelerates with scroll velocity. The studio's motion skill is proven by the UI, not claimed in copy.

LAYOUT & HIERARCHY
- A loose 4-column collage; project tiles deliberately break their gutters and overlap by design (with safe overlaps that never obscure controls).
- Statements at 10vw anchor each section; a compact mono marquee of disciplines runs between sections, its speed coupled to scroll velocity.
- Project detail: a full-height case panel with role, year, and a 3-frame "motion poster" that animates on press-and-hold.

VISUAL MOOD
Rehearsal space at night: carbon darkness, hard bone type, one acid signal doing all the conducting. Energetic but never noisy — at any frozen moment the layout must still compose like a poster.

TYPOGRAPHY
One heavy grotesk remixed per section — outlined, filled, split, stacked; 10vw statements with −0.04em tracking; mono microcopy for roles, years, and indexes.

COLOR
Carbon #0b0b0a, bone #f4f1ea, {{accent}} for the custom cursor, active filters, and at most one word per headline. Two neutrals, one signal — that's the palette.

MOTION & INTERACTION
Springs everywhere (stiffness ~300, damping ~30). Headlines scatter 12px on pointer approach and reform on leave. Tiles rotate up to 4° toward the cursor with subtle perspective. Press-and-hold plays a tile's 3-keyframe motion loop; release pauses. Filtering re-deals tiles with a 30ms stagger. All animation on transform/opacity only.

RESPONSIVE BEHAVIOR
Touch replaces hover-choreography with scroll-linked effects and tap-to-play tiles; the collage becomes a confident single column with generous thumbnails; the marquee slows to a fixed calm speed.

ACCESSIBILITY
prefers-reduced-motion (and a visible "still mode" toggle) replaces all springs with instant states and static posters — the portfolio must fully communicate in still mode. Focus styles are high-contrast; the custom cursor never hides the system cursor.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion springs and whileHover/whileTap; CSS keyframe motion-posters; pointer position via a single rAF-throttled listener shared through context.

ORIGINALITY
All case studies, names, and motion posters are original constructions — build them in CSS/SVG, write all copy, and invent your own choreography. Do not reproduce any studio's reels, brand, or code.`,
  customization: {
    brand: 'Kinetic',
    industry: 'a motion design studio',
    product: 'selected motion work',
    tone: 'energetic and precise',
    accent: '#c7ff35',
  },
  source: {
    label: 'kinetic-studio.example',
    url: 'https://example.com/inspirations/kinetic-studio',
    credit: 'Fictional credit — Studio Volt',
  },
  createdAt: '2026-07-22',
  baseSaves: 154,
  thumb: { variant: 'glyph', palette: ['#0b0b0a', '#2a2d1c', '#c7ff35'], ratio: 'wide' },
  origin: 'seed',
};
