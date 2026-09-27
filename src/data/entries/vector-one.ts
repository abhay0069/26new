import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const vectorOne: Inspiration = {
  id: 'vector-one',
  title: 'Vector One',
  category: 'SaaS',
  tags: ['industrial', 'schematic UI', 'mono grids', 'safety-orange'],
  summary: 'Industrial technology with the confidence of a control room — schematics, stamp plates, and safety orange.',
  analysis:
    'Heavy industry translated into interface language: steel-grey grids, stamped metal nameplates, schematic drawings that assemble on scroll, and hazard-orange used with the discipline of actual safety signage. It sells precision by looking manufactured rather than marketed.',
  dna: {
    typography:
      'A squarish industrial grotesk for headings, stenciled and uppercase; a dense mono for part numbers, torque values, and every spec; labels riveted like nameplates.',
    color:
      'Gunmetal #0c0c0b and machined greys with safety-orange #ffb03a for hazard-stripe accents, active states, and the one CTA — signage discipline, never decoration.',
    layout:
      'A rigid 8-column shop-floor grid with visible construction lines; sections numbered like drawing sheets (SHT-01, SHT-02); a riveted header bar carries revision data.',
    motion:
      'Schematics assemble line-by-line on scroll (stroke-dashoffset, 900ms); stamped numbers press in with a 150ms scale; everything else is bolted down.',
    interaction:
      'Part hotspots open spec plates; an interactive torque/spec calculator lives in the footer; hovering a drawing sheet tilts it 1.5° like lifting a Mylar sheet.',
  },
  buildPrompt: `Design an original industrial-technology site for {{brand}} — {{industry}} manufacturing {{product}} — with the confidence of a control room.

CONCEPT
Interface as manufacturing: steel-grey grids, stamped nameplates, schematic drawings that assemble themselves, and hazard-orange applied with the discipline of real safety signage. The site should feel machined, not marketed.

LAYOUT & HIERARCHY
- A rigid 8-column shop-floor grid with visible construction lines and section numbers styled as drawing sheets (SHT-01, SHT-02).
- A riveted header bar carries fictional revision data (REV C · 2026-06) and a running stock-status readout.
- One interactive spec calculator (load, span, finish → suggested part) anchors the page — real logic, real feedback.

VISUAL MOOD
Factory floor at second shift: gunmetal darkness, machined surfaces, stencil markings, a single orange doing exactly what safety paint does — marking the things that matter.

TYPOGRAPHY
A squarish industrial grotesk, uppercase and lightly stenciled, for headings; dense mono for part numbers, tolerances, and specs; labels presented as stamped nameplates with 1px bevel borders.

COLOR
Gunmetal #0c0c0b, machined greys at several steps, bone markings, {{accent}} safety-orange strictly for hazard stripes, the CTA, and active states.

MOTION & INTERACTION
Schematics assemble line-by-line on scroll via stroke-dashoffset (900ms, once); stamped numbers press in with a 150ms scale-settle; drawing sheets tilt 1.5° on hover like lifted Mylar. Part hotspots open spec plates anchored to the drawing. Nothing floats, nothing glows.

RESPONSIVE BEHAVIOR
The 8-column grid steps down to 4 then 2; drawing sheets scroll horizontally within their plates on small screens; the calculator stacks vertically with full-width inputs; hazard stripes thin but never vanish.

ACCESSIBILITY
Orange-on-gunmetal is validated for every size it is used at (≥ 3:1 for large, ≥ 4.5:1 for small). All specs available as text tables alongside schematics; the calculator is a real labeled form with keyboard support and inline validation.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; hand-drawn SVG schematics with Framer Motion whileInView assembly; nameplates as bordered CSS components; calculator as plain typed state — no chart or form library needed.

ORIGINALITY
Invent the part numbering system, spec values, and schematic geometry as original engineering fiction. Do not copy any real manufacturer's catalogs, drawings, marks, or code.`,
  customization: {
    brand: 'Vector One',
    industry: 'an industrial robotics manufacturer',
    product: 'a modular actuator line',
    tone: 'stamped and matter-of-fact',
    accent: '#ffb03a',
  },
  source: {
    label: 'vector-one.example',
    url: 'https://example.com/inspirations/vector-one',
    credit: 'Fictional credit — Foundry & Co',
  },
  createdAt: '2026-04-30',
  baseSaves: 66,
  thumb: { variant: 'grid', palette: ['#0c0c0b', '#262624', '#ffb03a'], ratio: 'wide' },
  origin: 'seed',
};
