import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const quietForm: Inspiration = {
  id: 'quiet-form',
  title: 'Quiet Form',
  category: 'Minimal',
  tags: ['whitespace', 'concrete tones', 'slow crossfades', 'archival'],
  summary: 'An architecture studio portfolio built from silence — planes, margins, and a dozen disciplined photographs.',
  analysis:
    'Every decision removes rather than adds: a single column of projects, crossfades instead of movement, captions set like museum labels. The sophistication comes from proportion — a 61.8% content column, a strict baseline, and the confidence to leave entire viewports empty.',
  dna: {
    typography:
      'One quiet grotesk in two sizes and two weights, nothing else; project titles at 28px medium, everything else 15px regular with a 1.7 line-height.',
    color:
      'Bone-light surfaces #f1ede4 with ink #171613 type inverts the usual dark mode — the one section on dark is the studio manifesto.',
    layout:
      'A golden-ratio column (61.8%) holds all content; projects listed as full-width rows that expand in place; an archive index uses a strict four-column text table.',
    motion:
      'Crossfades only: 700ms image dissolves, 250ms underline reveals. One subtle exception — a 2% scale settle on image hover.',
    interaction:
      'Project rows expand accordion-style, revealing a label-plated image and a two-line description. The cursor disappears over images; the image is the cursor.',
  },
  buildPrompt: `Design an original portfolio for {{brand}} — {{industry}} presenting {{product}} — built almost entirely from restraint.

CONCEPT
An architecture of silence: planes, margins, and museum-label captions. The site should feel like walking through a quiet building where each project gets a room of its own.

LAYOUT & HIERARCHY
- A golden-ratio column (61.8% of the viewport) holds all content, optically centered left.
- Projects are full-width rows — title, year, location — expanding in place to a single label-plated image and a two-line description. One project visible at a time, never a dense grid.
- A separate archive index presents every project as a four-column text table: year / name / type / status.

VISUAL MOOD
Gallery daylight: bone-light surfaces, soft shadows cast by layout rather than effects, enormous margins. A single manifesto section flips to near-black to mark the studio's voice.

TYPOGRAPHY
One quiet grotesk, two sizes, two weights — nothing else. Titles at 28px medium; body at 15px with 1.7 line-height; captions at 12px with 0.08em tracking. No italics, no all-caps headlines.

COLOR
Bone #f1ede4 surface, ink #171613 type, concrete grey #b5afa2 for rules and secondary text, and {{accent}} used once per page — the active project marker.

MOTION & INTERACTION
Crossfades only: 700ms image dissolves, 250ms underline reveals on links, a 2% scale settle on image hover. Accordion expansion runs 350ms ease-out with height auto-measured for smoothness. Reduced motion renders everything instantly.

RESPONSIVE BEHAVIOR
The golden column becomes full-width minus 24px margins under 640px; the archive table collapses to stacked definition lists; the accordion remains the primary navigation at every size.

ACCESSIBILITY
Ink on bone measures far above 7:1. Every accordion row is a button with aria-expanded and aria-controls; images carry descriptive alt text naming project, material, and year. Focus follows the expanded row.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion for height-animated accordions and crossfades; CSS only for imagery treatment (grain via SVG overlay, shadows via box-shadow). No WebGL, no canvas — the discipline is the design.

ORIGINALITY
Write the manifesto, project names, and descriptions as original content and generate or commission all imagery honestly. Do not reproduce any existing studio's projects, floor plans, brand, or code.`,
  customization: {
    brand: 'Quiet Form',
    industry: 'an architecture studio',
    product: 'built and unbuilt works',
    tone: 'calm and exacting',
    accent: '#b5afa2',
  },
  source: {
    label: 'quiet-form.example',
    url: 'https://example.com/inspirations/quiet-form',
    credit: 'Fictional credit — Atelier Muro',
  },
  createdAt: '2026-04-11',
  baseSaves: 74,
  thumb: { variant: 'shard', palette: ['#0d0d0c', '#3a372f', '#e8e2d3'], ratio: 'square' },
  origin: 'seed',
};
