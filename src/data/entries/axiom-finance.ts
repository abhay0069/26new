import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const axiomFinance: Inspiration = {
  id: 'axiom-finance',
  title: 'Axiom Finance',
  category: 'Editorial',
  tags: ['editorial fintech', 'tabular rhythm', 'serif headlines', 'quiet data'],
  summary: 'Fintech dressed as a financial journal — serif headlines, tabular rhythm, and data that whispers.',
  analysis:
    'Instead of dashboards and neon charts, this direction treats money like journalism: broadsheet headlines, ruled tables, footnotes, and figures that animate once and settle. Trust is manufactured through editorial grammar — kickers, deck lines, and bylines — rather than gradient badges.',
  dna: {
    typography:
      'Broadsheet serif headlines with real italics; a workhorse sans for body; tabular figures and a mono for every number. Deck lines at 20px serif regular under each headline.',
    color:
      'Paper-on-ink inversion: near-black ground, bone type, ledger green #c7ff35 confined to rules, deltas, and the single primary action.',
    layout:
      'Front-page hierarchy — lead story 8 columns, secondary 4, ruled dividers throughout; data presented as typeset tables with hairline rules, never as chart junk.',
    motion:
      'Numbers count once on entry (600ms), table rows rise 6px in a 40ms stagger, and one sparkline draws itself per story. Nothing loops; nothing pulses.',
    interaction:
      'Stories expand like newspaper columns continuing below; hovering a row reveals its source footnote; a reading-time label sits on every deck.',
  },
  buildPrompt: `Design an original editorial-style site for {{brand}} — {{industry}} explaining {{product}} — that borrows its authority from financial journalism.

CONCEPT
Money as journalism: broadsheet headlines, ruled tables, footnoted figures. The page earns trust through editorial grammar — kickers, decks, bylines — not badges and gradient banners.

LAYOUT & HIERARCHY
- Front-page logic: lead story spans 8 of 12 columns, two secondary stories fill 4; hairline rules divide everything.
- Every story carries a kicker (11px uppercase), a serif headline, a 20px deck line, and a reading-time label.
- Data lives in typeset tables with tabular figures and hairline rules; each figure footnotes its source in 12px.

VISUAL MOOD
A financial journal after dark: near-black ground, bone type, quiet confidence. One ledger-green accent does all the signaling. No gauge clusters, no neon charts, no coin iconography.

TYPOGRAPHY
Broadsheet serif headlines with a true italic for emphasis; a workhorse sans for body at 16–17px/1.6; all numerals in tabular figures with mono for codes and tickers. Deck lines in serif regular at 20px.

COLOR
Ink #0a0b0a ground, bone #f4f1ea type, warm grey #8f8a7e secondary, {{accent}} strictly for rules, positive deltas, and the single primary button.

MOTION & INTERACTION
Figures count up exactly once on entry (600ms ease-out); table rows rise 6px with a 40ms stagger; one sparkline draws itself per story via stroke-dashoffset. Stories expand into their continuation columns; hovering a row reveals its footnote inline.

RESPONSIVE BEHAVIOR
Below 800px the front page restacks as a single column in strict reading order; tables convert to stacked key–value rows with the same hairline discipline; footnotes become tappable inline markers.

ACCESSIBILITY
All text above 4.5:1; the green is never used for small text on dark unless it passes contrast — test it. Tables use real <table> semantics with scoped headers; counted figures have their final value present in the DOM for screen readers from the start.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion for counted figures and staggered rows; sparklines as hand-drawn SVG paths; no charting library — the typeset table is the design.

ORIGINALITY
Invent the institution's name patterns, story copy, figures, and footnotes as fiction — clearly your own. Do not reproduce any real publication's masthead, articles, data, or any fintech brand's UI.`,
  customization: {
    brand: 'Axiom',
    industry: 'a research-led fintech',
    product: 'a transparent investing framework',
    tone: 'editorial and level-headed',
    accent: '#c7ff35',
  },
  source: {
    label: 'axiom-finance.example',
    url: 'https://example.com/inspirations/axiom-finance',
    credit: 'Fictional credit — The Ledger Room',
  },
  createdAt: '2026-02-10',
  baseSaves: 69,
  thumb: { variant: 'field', palette: ['#0a0b0a', '#20241c', '#c7ff35'], ratio: 'wide' },
  origin: 'seed',
};
