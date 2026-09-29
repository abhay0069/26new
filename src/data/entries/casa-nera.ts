import type { Inspiration } from '@/types';

/** Fictional reference — written by the Atmos editorial desk. */
export const casaNera: Inspiration = {
  id: 'casa-nera',
  title: 'Casa Nera',
  category: 'Minimal',
  tags: ['interiors', 'travertine tones', 'room-to-room', 'editorial pauses'],
  summary: 'An interiors studio site structured as a house — each project a room you walk through, door by door.',
  analysis:
    'Navigation is architectural: projects are rooms, transitions are doorways (a 400ms iris wipe through a growing aperture), and the cursor becomes a faint floor-plan dot. Travertine and coal tones keep it material, while a floor-plan minimap makes the structure legible without a single traditional menu.',
  dna: {
    typography:
      'An elegant transitional serif for room names; wayfinding captions in letterspaced caps (STANZA 02 — CUCINA); body copy minimal, set at 16px with wide leading.',
    color:
      'Coal #0d0c0b walls, travertine #c8b89a surfaces, warm shadow mid-tones; brass door hardware as the single metallic accent.',
    layout:
      'Full-viewport "rooms" with one hero surface per room; a fixed floor-plan minimap (bottom-left) shows progress and allows direct room jumps.',
    motion:
      'Doorway iris wipes between rooms (aperture opens from the cursor position, 400ms); surfaces parallax 3% for depth; furniture-grade objects settle with soft shadows.',
    interaction:
      'Hovering hotspots on a room reveals material notes; the minimap pulses the current room; pressing M toggles the full floor plan overlay.',
  },
  buildPrompt: `Design an original interiors-studio site for {{brand}} — {{industry}} presenting {{product}} — structured as a house you walk through.

CONCEPT
Navigation as architecture: each project is a room, each transition a doorway. An iris wipe opens from your cursor like a door swinging wide; a floor-plan minimap keeps the whole house legible. You don't scroll a feed — you move through spaces.

LAYOUT & HIERARCHY
- Full-viewport rooms, one hero surface each, with material hotspots (stone, textile, wood) that open small notes.
- A fixed floor-plan minimap in the lower-left shows rooms as outlined shapes; the current room pulses; clicking jumps directly.
- An "atelier" room holds the studio's philosophy as a single column of text — the only traditional page in the house.

VISUAL MOOD
Evening apartment: coal-dark walls, travertine-warm surfaces, pools of warm lamp light, long soft shadows. Material honesty over decoration — the grain of stone and plaster rendered through subtle CSS texture.

TYPOGRAPHY
An elegant transitional serif for room names at 34–48px; wayfinding captions in letterspaced caps ("STANZA 02 — CUCINA"); body at 16px with 1.8 leading. Numbered rooms like a gallery guide.

COLOR
Coal #0d0c0b, travertine #c8b89a, warm shadow greys, bone text, and {{accent}} brass reserved for door hardware details, active hotspots, and the minimap pulse.

MOTION & INTERACTION
Doorway iris wipe between rooms: a circular clip-path aperture opens from the pointer position over 400ms ease-out. Surfaces parallax 3% inside each room for depth. Hotspots bloom on hover; M toggles a full floor-plan overlay. Reduced motion swaps iris wipes for simple fades and keeps the minimap static.

RESPONSIVE BEHAVIOR
Rooms keep full-viewport height but reduce to one surface plus a swipeable material tray on mobile; the minimap shrinks to a corner button opening the plan overlay; iris origin falls back to screen center on touch.

ACCESSIBILITY
Room order is a logical DOM sequence — the site works entirely as next/previous navigation with real headings. The minimap is a <nav> with aria-current; iris effects are decorative. Text contrast ≥ 4.5:1 against every surface, verified per material tone.

TECHNICAL DIRECTION
React + TypeScript + Tailwind; clip-path animation via Framer Motion; minimap as inline SVG with keyboard-focusable room shapes; materials as CSS gradient/texture compositions — no photography required.

ORIGINALITY
Design every room, material palette, and floor plan as original work; write all project narratives yourself. Do not reproduce any real interior, photographer's images, or an existing studio's site.`,
  customization: {
    brand: 'Casa Nera',
    industry: 'an interior architecture studio',
    product: 'residential and hospitality rooms',
    tone: 'warm and composed',
    accent: '#c8b89a',
  },
  source: {
    label: 'casa-nera.example',
    url: 'https://example.com/inspirations/casa-nera',
    credit: 'Fictional credit — Studio Pietra',
  },
  createdAt: '2026-08-05',
  baseSaves: 84,
  thumb: { variant: 'shard', palette: ['#0d0c0b', '#2f2b27', '#c8b89a'], ratio: 'portrait' },
  origin: 'seed',
};
