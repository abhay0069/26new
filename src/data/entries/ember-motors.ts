import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const emberMotors: Inspiration = {
  id: 'ember-motors',
  title: 'Ember Motors',
  category: '3D',
  tags: ['product reveal', 'light choreography', 'scroll scrub', 'sound cues'],
  summary: 'A cinematic product reveal where light itself performs the launch — darkness first, machine second.',
  analysis:
    'The launch sequence is choreographed like a stage play: total darkness, one ember-colored light drawing the silhouette, then a full reveal scrubbed by scroll. The interface is a thin caption system over a full-bleed stage, which keeps the machine the undisputed protagonist.',
  dna: {
    typography:
      'A wide industrial grotesk in extended uppercase for the marque; technical specs in a condensed mono; a single italic serif line reserved for the tagline.',
    color:
      'Charcoal #0c0908 stage, ember #ff5a1f light choreography, warm grey steel mid-tones; the palette is essentially two colors plus black.',
    layout:
      'Full-bleed stage with captions in the corners; a horizontal timeline scrubber along the bottom edge marks reveal chapters; specs appear in a slide-out technical panel.',
    motion:
      'Scroll scrubs the light rig: exposure, angle, and color temperature interpolate with scroll progress. The final reveal settles with a 600ms ease and a subtle camera push.',
    interaction:
      'A "watch the reveal" button auto-plays the sequence with optional sound design; dragging the timeline scrubs frames. Hovering hotspots on the machine opens spec callouts.',
  },
  buildPrompt: `Design an original cinematic launch site for {{brand}} — {{industry}} unveiling {{product}} — where light performs the reveal.

CONCEPT
The page is a stage. It opens in total darkness; a single ember-colored light traces the machine's silhouette; scroll scrubs the full reveal — exposure, angle, and color temperature rising until the product stands fully lit.

LAYOUT & HIERARCHY
- A full-bleed stage owns every viewport; UI is a thin caption system pinned to the corners.
- A horizontal timeline scrubber along the bottom edge marks the chapters of the reveal (00 Silence, 01 Spark, 02 Form, 03 Standing).
- Technical detail lives in a slide-out panel — dimensions, materials, performance — set like a spec sheet, not a feature grid.

VISUAL MOOD
Automotive noir: charcoal darkness, hot ember accents, brushed steel mid-tones, faint atmospheric haze. Two colors plus black; every frame should work as a film still.

TYPOGRAPHY
An extended industrial grotesk in uppercase for the marque; condensed mono for technical values; one italic serif line used once, for the tagline. Headline lockups never exceed three words per line.

COLOR
Stage #0c0908, ember {{accent}} for all light choreography and the primary CTA, steel greys for surfaces, bone for captions.

MOTION & INTERACTION
Scroll scrubs the light rig with interpolation on opacity, transform, and a CSS variable for exposure. "Play reveal" auto-runs the sequence in 6 seconds with an optional subtle sound design (muted by default). Hotspots on the machine open spec callouts with a 200ms fade. Hold 60fps — pre-render stages as layered compositions rather than live 3D if needed.

RESPONSIVE BEHAVIOR
On mobile the stage becomes a vertical scrub with haptic-friendly timeline drag; captions stack into a lower third; the spec panel becomes a bottom sheet. The experience degrades to an elegant static poster plus text chapters on low-power devices.

ACCESSIBILITY
The full narrative exists as semantic text — the visuals enhance, never carry, the story. Timeline is a real slider (keyboard arrows scrub). Contrast for captions above 4.5:1. Reduced motion gets an instant, fully lit presentation.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; Framer Motion useScroll for scrubbing; layered PNG-style compositions or CSS-lit silhouettes; Web Audio for optional sound. Three.js only if the product genuinely needs orbiting 3D — otherwise cinematic lighting beats geometry.

ORIGINALITY
Design the machine, the light choreography, and all copy from scratch. Do not reproduce any real vehicle, brand, film, or site — this is a direction, not a copy.`,
  customization: {
    brand: 'Ember',
    industry: 'an electric performance marque',
    product: 'a first concept machine',
    tone: 'confident and cinematic',
    accent: '#ff5a1f',
  },
  source: {
    label: 'ember-motors.example',
    url: 'https://example.com/inspirations/ember-motors',
    credit: 'Fictional credit — ODE Works',
  },
  createdAt: '2026-06-09',
  baseSaves: 126,
  thumb: { variant: 'flow', palette: ['#0c0908', '#38221a', '#ff5a1f'], ratio: 'wide' },
  origin: 'seed',
};
