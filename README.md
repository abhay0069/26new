# Atmos Library

**Collect the feeling. Build something original.**

A private, local-first inspiration-to-prompt collection for high-end immersive website
ideas. Atmos Library curates fictional design references the way an editorial desk
would — then distills each one into a detailed, original **build prompt** you can copy
and adapt for your own work.

> Every seeded entry is fictional. Every thumbnail is generated in CSS. Nothing is
> scraped, hotlinked, or copied from any real site.

---

## Stack

- **React 18 + TypeScript** (strict mode)
- **Vite 5** — dev server & build
- **Tailwind CSS 3** — near-black `#090909` / off-white `#f4f1ea` / warm grey / acid-lime `#c7ff35` theme
- **Framer Motion** — page transitions, staggered grid entrances, hover choreography
- **Lucide React** — icons
- Self-hosted variable fonts via Fontsource (Space Grotesk, Inter, Fraunces, JetBrains Mono)

No backend. Saved references and visitor-added entries persist in `localStorage`.

## Getting started

```bash
npm install
npm run dev      # → http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npm run smoke    # build + boot every route in jsdom and assert real content renders
```

## What's inside

### Pages

| Route | Purpose |
| --- | --- |
| `#/discover` | Full-screen hero, filter bar (category / search / sort), masonry gallery |
| `#/collections` | Five curated editorial groupings with stacked generated thumbnails |
| `#/collections/:id` | A single collection as a masonry grid |
| `#/saved` | Your shortlist, persisted in `localStorage`, with empty state + suggestions |
| `#/reference/:id` | Full detail view: generated visual, Design DNA, original build prompt, live "Make it yours" customizer |

Hash routing keeps browser back/forward working — including closing a detail view.

### Highlights

- **Original CSS-generated thumbnails.** Nine art generators (strata, orbit, glyph,
  flow, field, grid, wave, shard, beam) compose gradients, blurs, clipped shapes, and
  slow keyframe animation from a per-entry palette + seed. No imagery exists anywhere
  in the app.
- **Original build prompts.** Each of the 16 seeded references carries a structured
  prompt (layout, mood, typography, color, motion, responsive, accessibility, tech
  direction, originality). Tokens like `{{brand}}` / `{{accent}}` are resolved for
  display and rewritten live by the **Make it yours** fields, including a computed
  WCAG contrast recommendation for your chosen brand color.
- **Add Reference modal.** Validated fields, a visual-style picker with a live
  generated preview, and an explicit permission acknowledgment. User entries get a
  deterministic generated thumbnail and a full synthesized build prompt.
- **Accessibility.** Keyboard-reachable cards, filters, and modals; focus trap +
  focus restore in dialogs; `aria-pressed`/`aria-current`/`aria-live` where relevant;
  semantic landmarks; and `prefers-reduced-motion` disables every non-essential
  animation (thumbnail motion, grain shift, entrance choreography).
- **Honest states.** Skeleton loading on first visit, empty states for search and the
  saved list, a not-found state for missing references, and a dismissible banner if
  `localStorage` is unavailable.

## Content rules (important)

1. Every gallery entry ships an original CSS-generated thumbnail — never a
   screenshot, logo, video, or illustration from any third party.
2. Source links are `example.com` **placeholders**; the credits are fictional.
3. Build prompts describe general visual patterns only. The UI repeats the rule:
   *use as inspiration — do not recreate proprietary branding, imagery, copy, or code.*
4. When adding your own references you confirm you hold the rights to whatever you
   attach; Atmos stores only your text.

## Project structure

```
src/
├── App.tsx                  # shell: routing, boot splash, storage banner
├── main.tsx                 # fonts + mount
├── types.ts                 # Inspiration / Collection / Route model
├── data/
│   ├── inspirations.ts      # the 16 seeded fictional references
│   ├── collections.ts       # curated groupings
│   └── entries/             # one file per reference (analysis, DNA, prompt)
├── lib/
│   ├── prompt.ts            # token resolution + live customization + user prompts
│   ├── thumbs.ts            # variant registry, palettes, deterministic assignment
│   ├── storage.ts           # defensive localStorage read/write
│   └── utils.ts             # cn, hashing, color math (contrast)
├── hooks/                   # hash router, focus trap, document title, load state
├── state/LibraryContext.tsx # saves + user references + storage errors
├── components/
│   ├── Thumb.tsx            # the CSS art engine (9 variants)
│   ├── Nav / Hero / FilterBar / InspirationCard / GalleryGrid
│   ├── DiscoverPage / CollectionsPage / SavedPage / DetailView
│   ├── AddReferenceModal / Toast / EmptyStates / ui primitives
scripts/smoke.mjs             # jsdom route smoke test against the built bundle
```

## Notes

- Runs from 320px up to large desktop; the nav condenses to a sheet on small screens
  and the masonry collapses to one column.
- All data stays in your browser. Clearing site data resets the library.
