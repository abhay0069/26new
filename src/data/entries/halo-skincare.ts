import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const haloSkincare: Inspiration = {
  id: 'halo-skincare',
  title: 'Halo Skincare',
  category: 'Luxury',
  tags: ['soft luxury', 'commerce', 'ambient light', 'gentle motion'],
  summary: 'Soft-luxury commerce staged like a spa at dusk — diffused light, slow breaths, and frictionless checkout.',
  analysis:
    'Commerce here is choreographed calm: products float in diffused halos of light, the palette hovers a few degrees above black, and every transition breathes (scale 1.02, 800ms). The conversion machinery is ruthlessly efficient beneath the softness — one-click adds, a persistent glass cart, zero page loads.',
  dna: {
    typography:
      'An elegant serif for product names (light weight, generous size) with a quiet sans for everything operational; prices in tabular figures so they never wiggle.',
    color:
      'Dusk base #0d0c0b, warm bone panels, blush #e8c9b8 and sage tints in the light halos; one deeper tone for the buy action.',
    layout:
      'Editorial commerce: alternating full-bleed rituals and trios of floating products; a persistent glass cart drawer (400px) slides from the right.',
    motion:
      'Breathing motion: halos pulse at a 6s rhythm (opacity 0.5→0.8), products settle with an 800ms ease and 1.02 scale on hover. Add-to-cart flies a small dot to the cart icon.',
    interaction:
      'Ingredient hotspots open small glass notes; the routine builder lets visitors stack products into a shelf with drag-and-swap; cart updates never navigate.',
  },
  buildPrompt: `Design an original e-commerce experience for {{brand}} — {{industry}} selling {{product}} — staged like a spa at dusk.

CONCEPT
Commerce as calm: products float in diffused halos of warm light, transitions breathe rather than snap, and the purchase path underneath is ruthlessly frictionless. Softness outside, efficiency inside.

LAYOUT & HIERARCHY
- Editorial commerce rhythm: alternating full-bleed "ritual" sections and floating trios of products on darkness.
- A persistent glass cart drawer (400px) slides from the right; add-to-cart never navigates, it flies a small dot into the cart icon and updates a count.
- Product detail is a single calm viewport: name, one-line promise, three ingredient notes, price, and one button.

VISUAL MOOD
A spa at dusk: warm darkness a few degrees above black, halos of diffused blush and sage light, soft shadows, and a faint grain like rice paper. Nothing clinical, nothing glossy-loud.

TYPOGRAPHY
An elegant serif at light weight for product names (32–44px); a quiet sans for all operational text; prices always in tabular figures. Microcopy stays short and warm — no exclamation marks anywhere.

COLOR
Dusk #0d0c0b base, bone #f4f1ea text, warm grey secondary, halos blended from {{accent}} into transparent, and a deeper tone reserved for the buy action.

MOTION & INTERACTION
Breathing rhythm: halos pulse between 0.5 and 0.8 opacity on a 6s cycle; cards settle at 1.02 scale over 800ms on hover. Ingredient hotspots open small glass notes. A routine builder lets visitors stack products onto a shelf (drag to reorder) that rolls up into the cart. Reduced motion replaces breathing with static soft gradients.

RESPONSIVE BEHAVIOR
Trios stack to single columns with halos intact; the cart drawer becomes a full-height sheet; the routine builder switches to tap-to-add with drag only as enhancement. Buttons hold 48px height on touch.

ACCESSIBILITY
Text contrast ≥ 4.5:1 everywhere; halo lighting never sits behind body copy without a scrim. Cart updates announced via aria-live. The entire purchase path is completable by keyboard alone.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion for the drawer, dot-flight, and shelf; halos as layered radial-gradient divs with blur — no WebGL, no video. A local cart store (context + localStorage) is enough for the prototype.

ORIGINALITY
Invent the product line, ingredient names, and ritual copy as original fiction; build all product visuals as CSS/gradient compositions rather than photographs of real goods. Do not reproduce any existing skincare brand's products, packaging, or code.`,
  customization: {
    brand: 'Halo',
    industry: 'a slow-skincare house',
    product: 'a four-step ritual collection',
    tone: 'warm and unhurried',
    accent: '#e8c9b8',
  },
  source: {
    label: 'halo-skincare.example',
    url: 'https://example.com/inspirations/halo-skincare',
    credit: 'Fictional credit — Maison Lente',
  },
  createdAt: '2026-07-10',
  baseSaves: 101,
  thumb: { variant: 'flow', palette: ['#0d0c0b', '#3a332c', '#e8c9b8'], ratio: 'portrait' },
  origin: 'seed',
};
