import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const afterlight: Inspiration = {
  id: 'afterlight',
  title: 'Afterlight',
  category: 'Portfolio',
  tags: ['creative portfolio', 'dusk gradients', 'case-study depth', 'quiet confidence'],
  summary: 'A creative portfolio shot entirely at golden hour — long shadows, warm haze, and case studies told slowly.',
  analysis:
    'The portfolio holds one exposure across every page: dusk. Warm haze gradients (small, directional — never blobs) sit behind oversized case numerals, and the case-study template itself is the star: a disciplined editorial rhythm of image, aside, and pull-quote that makes modest work feel cinematic.',
  dna: {
    typography:
      'A refined grotesk for titles with a serif italic for pull-quotes; case numerals (01–08) set at 120px as graphic anchors; captions in 12px warm grey.',
    color:
      'Dusk neutrals: #0c0b09 base warming to #d9a441 haze near the horizon of each section; text never competes with the glow.',
    layout:
      'Case studies follow a fixed editorial template — hero numeral, statement, image, aside, pull-quote, next — predictable like chapters in a well-set book.',
    motion:
      'Haze drifts laterally at 20s cycles; sections wipe with a 500ms soft-light fade; numerals slide behind the content column on scroll (8% parallax).',
    interaction:
      'A "next case" footer previews the following study with a slow warm fade; hovering list items casts a long synthetic shadow; a theme hour slider (dusk ↔ night) retunes the whole palette.',
  },
  buildPrompt: `Design an original creative portfolio for {{brand}} — {{industry}} presenting {{product}} — exposed entirely at golden hour.

CONCEPT
One consistent exposure across the whole site: dusk. Small directional haze gradients warm the horizon of each section, oversized case numerals anchor the composition, and a disciplined case-study template makes the work feel cinematic without shouting.

LAYOUT & HIERARCHY
- A fixed case template — hero numeral, statement, full image, aside, pull-quote, next-case footer — repeated with rhythm, like chapters of a well-set book.
- Case numerals (01–08) at 120px sit behind the content column, parallaxing 8% on scroll.
- The index page lists projects as large text rows; hovering casts a long synthetic shadow across the row.

VISUAL MOOD
The last twenty minutes of daylight: warm haze low on the horizon, long shadows, dust in the air. Gradients are small, directional, and photographic in logic — horizon glows, never decorative blobs.

TYPOGRAPHY
A refined grotesk for titles; a serif italic reserved for pull-quotes; 12px warm-grey captions with dates and roles; numerals in the same grotesk at display scale.

COLOR
Dusk base #0c0b09 warming toward {{accent}} near each section's horizon; bone text; a "hour" slider lets visitors retune the scene from dusk toward deep night, shifting every surface color together.

MOTION & INTERACTION
Haze drifts laterally on 20s cycles; sections crossfade with a 500ms soft-light wipe; the next-case footer previews with a slow warm fade. Everything at transform/opacity; reduced motion presents static warm frames with all content intact.

RESPONSIVE BEHAVIOR
Numerals scale down and step behind content gracefully; the case template holds its order on a single column; the hour slider docks into a settings sheet on mobile; index rows keep generous 56px touch height.

ACCESSIBILITY
Every text color is validated against both ends of the hour slider — the theme must never drop below 4.5:1. Case studies are real articles with heading hierarchy; the hour slider is a labeled input with keyboard support.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; theme hours as CSS custom properties interpolated in one place; Framer Motion for parallax and fades; haze as layered linear-gradients with blur and blend modes — no images needed.

ORIGINALITY
All projects, numerals, statements, and pull-quotes are original; build every visual in CSS. Do not reproduce any real portfolio's work, photography, brand, or code.`,
  customization: {
    brand: 'Afterlight',
    industry: 'a creative director\'s studio',
    product: 'selected campaigns and identities',
    tone: 'warm and assured',
    accent: '#d9a441',
  },
  source: {
    label: 'afterlight.example',
    url: 'https://example.com/inspirations/afterlight',
    credit: 'Fictional credit — Studio Fadelight',
  },
  createdAt: '2026-09-18',
  baseSaves: 97,
  thumb: { variant: 'beam', palette: ['#0c0b09', '#332a1c', '#d9a441'], ratio: 'portrait' },
  origin: 'seed',
};
