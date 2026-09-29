import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const strataSystems: Inspiration = {
  id: 'strata-systems',
  title: 'Strata Systems',
  category: 'SaaS',
  tags: ['glass panels', 'system diagrams', 'technical', 'ambient data'],
  summary: 'Futuristic infrastructure marketing that reads like a well-set engineering document — glassy, precise, calm.',
  analysis:
    'The direction rejects SaaS clichés: no gradient blobs, no cartoon mascots. Instead, a drafting-table aesthetic — blueprint linework, glassy spec panels, and small ambient data motions — makes the product feel like serious machinery. Hierarchy comes from an almost-print discipline of rules, labels, and numbering.',
  dna: {
    typography:
      'A neutral grotesk with excellent tabular figures for data; section labels in 11px uppercase tracking; code and values set in a crisp mono with generous line-height.',
    color:
      'Blueprint dark #0a0c0e, steel-blue hairlines, ice #9fd6ff for diagrams, and one warm signal color for alerts — never more than one accent per viewport.',
    layout:
      'A 12-column spec-sheet grid: headline spans 7, live diagram spans 5, spec tables full-width below, numbered like an engineering document (1.0, 1.1, 1.2).',
    motion:
      'Diagrams draw themselves in (SVG stroke-dashoffset) over 1.2s when scrolled into view; counters tick once; panels fade 8px upward. Everything else stays still.',
    interaction:
      'Spec rows expand like accordions with a 200ms ease. Hovering a diagram node highlights its connected edges and dims the rest to 20%.',
  },
  buildPrompt: `Design an original marketing site for {{brand}} — {{industry}} launching {{product}} — that reads like a beautifully set engineering document.

CONCEPT
A drafting-table aesthetic: blueprint linework, glassy spec panels, and small ambient data motions. The product should feel like precision machinery, not a cartoon dashboard.

LAYOUT & HIERARCHY
- A 12-column spec-sheet grid: headline spans 7 columns, a live diagram spans 5; full-width numbered spec tables below (1.0, 1.1, 1.2).
- Every section opens with a hairline rule, an uppercase kicker, and a one-sentence promise — no paragraph longer than 3 lines above the fold.
- One persistent side rail shows system status as tiny mono text; it is decorative, aria-hidden, and honest-looking but calm.

VISUAL MOOD
Cool, exact, and calm. Deep blueprint dark, thin luminous linework, soft glass panels with 1px borders and 2% white fills. No glow blobs, no 3D clouds, no confetti.

TYPOGRAPHY
A neutral grotesk with tabular figures for data and metrics; 11px uppercase kickers at 0.28em tracking; values and code snippets in a crisp mono at 13px with relaxed line-height.

COLOR
Blueprint dark #0a0c0e base, steel hairlines at 8–14% white, ice #9fd6ff for diagram strokes, and {{accent}} as a single warm signal for the primary CTA and active states only.

MOTION & INTERACTION
Diagrams draw themselves via SVG stroke-dashoffset over 1.2s on first view; stat counters tick exactly once; panels settle 8px upward with a 300ms ease-out. Hovering a diagram node highlights connected edges and dims the rest to 20%. Spec rows expand as 200ms accordions.

RESPONSIVE BEHAVIOR
Below 900px the grid collapses to a single column in document order — headline, diagram, then tables. The side rail becomes a bottom-fixed status strip on mobile and hides under 400px. Tables scroll horizontally inside their panels.

ACCESSIBILITY
All diagram information duplicated as an accessible text summary list. Focus rings visible on every control; accordions are real buttons with aria-expanded. Contrast held at 4.5:1 for body, 3:1 for large text and diagram strokes.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion whileInView for staged reveals; hand-built SVG diagrams with CSS-drawn grids. No chart library needed — draw the few data motifs yourself so they stay on-brand.

ORIGINALITY
Invent the product's terminology, node names, and metrics as original content, and draw every diagram from scratch. Do not reproduce any existing product's UI, copy, diagrams, or code.`,
  customization: {
    brand: 'Strata',
    industry: 'a cloud infrastructure company',
    product: 'a distributed compute platform',
    tone: 'precise and understated',
    accent: '#9fd6ff',
  },
  source: {
    label: 'strata-systems.example',
    url: 'https://example.com/inspirations/strata-systems',
    credit: 'Fictional credit — Bureau Nord',
  },
  createdAt: '2026-01-22',
  baseSaves: 87,
  thumb: { variant: 'grid', palette: ['#0a0c0e', '#1d2b38', '#9fd6ff'], ratio: 'wide' },
  origin: 'seed',
};
