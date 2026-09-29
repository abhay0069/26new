import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const fieldNotes: Inspiration = {
  id: 'field-notes',
  title: 'Field Notes',
  category: 'Editorial',
  tags: ['earthy palette', 'longform', 'margin annotations', 'slow reading'],
  summary: 'An earthy longform journal where essays read like annotated notebooks — margins, footnotes, and all.',
  analysis:
    'A reading-first direction: 65-character measures, marginalia, drop caps, and a soil-toned palette that reduces screen glare. The design system is essentially a well-made paperback transported to the browser, with progress indicated by a growing root-line rather than a bar.',
  dna: {
    typography:
      'A bookish serif for body at 19px/1.75; small caps for the opening line; handwritten-style annotations only in the margins, never in flow.',
    color:
      'Soil and paper: deep loam #12100c ground, unbleached paper panels, moss #a4c964 for links and the growing progress root.',
    layout:
      'Single 34ch measure with a wide right margin (30% viewport) holding sidenotes, figures, and footnote markers; chapter openers own a full quiet viewport.',
    motion:
      'Almost none by design: sidenotes fade in as they enter the viewport; the progress root-line grows with scroll. That is the entire motion budget.',
    interaction:
      'Footnote markers expand inline; a "margins" toggle hides annotations for a purer read; text size control (3 steps) persists to localStorage.',
  },
  buildPrompt: `Design an original longform reading experience for {{brand}} — {{industry}} publishing {{product}} — engineered for deep, comfortable reading.

CONCEPT
A well-made paperback, transported to the browser: annotated margins, footnotes, drop caps, and a soil-toned palette that lowers glare. Reading is the entire product.

LAYOUT & HIERARCHY
- A single 34-character measure on the left; a wide margin (roughly 30% of viewport) holds sidenotes, small figures, and footnote markers.
- Chapter openers get one full quiet viewport — chapter number in small caps, title, and a single epigraph line.
- A thin "root line" grows down the left edge with reading progress — the only progress indicator on the page.

VISUAL MOOD
Field journal at golden hour: deep loam background, unbleached paper reading panels, pressed-flower restraint. Texture comes from a faint paper grain, never from decoration.

TYPOGRAPHY
A bookish serif at 19px/1.75 for body; small caps for opening lines; sidenotes at 13px with generous leading. Headlines are simply larger body type — no display font, no bold shouting.

COLOR
Loam #12100c ground, paper #efe9db panels, bark grey-brown secondary text, {{accent}} for links, footnote markers, and the growing root line.

MOTION & INTERACTION
Motion budget is deliberately tiny: sidenotes fade in on viewport entry (400ms), the root line grows with scroll, footnotes expand inline with a 200ms height ease. A "margins" toggle hides annotations; a three-step text-size control persists to localStorage.

RESPONSIVE BEHAVIOR
Under 900px, margin notes become inline footnote blocks between paragraphs, numbered identically; the measure widens to 100% minus 20px padding; controls dock into a reading menu sheet.

ACCESSIBILITY
Aim for WCAG AAA on body text (loam vs. paper easily clears 7:1). Real article semantics with a single h1; footnotes as proper anchor links; reading position restored on return via localStorage.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; typography with fluid clamp() sizing and a modular scale; Framer Motion only for the two micro-fades; zero images required — diagrams can be inline SVG line drawings.

ORIGINALITY
Write all essays, epigraphs, and notes as original work (or clearly fictional placeholders), and draw any figures yourself. Do not reproduce any publication's articles, masthead, or code.`,
  customization: {
    brand: 'Field Notes',
    industry: 'an independent journal of place',
    product: 'a season of longform essays',
    tone: 'patient and literary',
    accent: '#a4c964',
  },
  source: {
    label: 'field-notes.example',
    url: 'https://example.com/inspirations/field-notes',
    credit: 'Fictional credit — Meridian Press',
  },
  createdAt: '2026-02-27',
  baseSaves: 58,
  thumb: { variant: 'wave', palette: ['#0a0c09', '#22301f', '#a4c964'], ratio: 'tall' },
  origin: 'seed',
};
