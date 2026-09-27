import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const monolithProtocol: Inspiration = {
  id: 'monolith-protocol',
  title: 'Monolith Protocol',
  category: '3D',
  tags: ['scroll-driven', 'dark 3D', 'cinematic', 'chaptered story'],
  summary: 'A scroll-bound descent past a monolithic 3D form — one chapter per viewport, lit like a film.',
  analysis:
    'This direction borrows its pacing from cinema rather than web design: a single monolithic form sits in fog while scrolling does the editing — rotating the camera, racking focus, and revealing one sentence at a time. Negative space does most of the talking, and the interface appears only as hairline captions pinned to the edges of the frame.',
  dna: {
    typography:
      'One condensed grotesk at poster scale, tightly tracked to −3%, paired with 11px uppercase scene captions at 0.28em tracking. Chapter indices in tabular figures.',
    color:
      'Near-black #0a0a09 base, warm graphite mids, bone text, and a single acid signal reserved for the progress rail and the active chapter mark.',
    layout:
      'A strict centered column for statements; captions hug the viewport edges on a 12-column grid. Each chapter owns exactly one viewport — no half-scrolls.',
    motion:
      'Camera framing is driven by scroll progress, never by time. Text enters with a 12px rise and a 40ms stagger, easing out over 500ms.',
    interaction:
      'The only hover state that matters is the next-chapter marker: it dilates slightly and previews the chapter title. The cursor becomes a thin crosshair over the stage.',
  },
  buildPrompt: `Create an original immersive one-page site for {{brand}} — {{industry}} presenting {{product}}.

CONCEPT
A single monumental 3D form staged in fog on a near-black set. The page reads like a film: each scroll chapter rotates or dollies the camera around the form and reveals one statement at a time.

LAYOUT & HIERARCHY
- One viewport per chapter; statements centered in a strict column, captions pinned to the frame edges on a 12-column grid.
- A hairline vertical progress rail lists chapters 01–05; the active mark is filled, the rest sit at 30% opacity.
- Reserve one full-viewport "quiet frame" holding a single sentence — negative space is the luxury here.

VISUAL MOOD
Cinematic and monastic: deep shadows, soft volumetric falloff, faint film grain, zero decorative clutter. The form should feel carved, not rendered — matte surfaces, one cool rim light.

TYPOGRAPHY
A condensed grotesk at poster scale (clamp 3rem–7rem, letter-spacing −0.03em) for statements; 11px uppercase captions with 0.28em tracking for labels; tabular figures for indices.

COLOR
Base #0a0a09, graphite #1c1c1a surfaces, bone #f4f1ea text, and {{accent}} used only for the progress rail, the active chapter mark, and one underline per chapter.

MOTION & INTERACTION
Drive all camera movement from scroll progress — never time-based autoplay. Text enters with a 12px rise and 40ms stagger easing out at 500ms. The next-chapter marker dilates on hover. Animate transform and opacity only to hold 60fps.

RESPONSIVE BEHAVIOR
Below 768px, simplify to a layered 2.5D composition (blurred CSS planes with gentle parallax) so mobile GPUs stay cool; captions stack beneath statements; the progress rail becomes a top hairline.

ACCESSIBILITY
Body copy at 4.5:1 contrast minimum, display at 3:1. The full story must read as plain semantic HTML with the 3D layer aria-hidden. Ship a reduced-motion variant that crossfades chapters without camera moves.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion (useScroll / useTransform) for scroll orchestration and text reveals; reach for Three.js only if the geometry truly needs it — otherwise fake depth with CSS 3D transforms and blurred planes.

ORIGINALITY
Model, light, and art-direct the form from scratch and write every chapter line as original copy. Do not reproduce any existing site's branding, imagery, copy, or code.`,
  customization: {
    brand: 'Monolith',
    industry: 'an interactive film studio',
    product: 'a five-chapter scroll experience',
    tone: 'monastic and cinematic',
    accent: '#c7ff35',
  },
  source: {
    label: 'monolith-protocol.example',
    url: 'https://example.com/inspirations/monolith-protocol',
    credit: 'Fictional credit — Studio Ansel',
  },
  createdAt: '2026-09-08',
  baseSaves: 138,
  thumb: { variant: 'beam', palette: ['#0b0b0a', '#23251c', '#c7ff35'], ratio: 'tall' },
  origin: 'seed',
};
