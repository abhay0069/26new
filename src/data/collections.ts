import type { Collection } from '@/types';

/**
 * Curated groupings. Collections reference seeded entries only;
 * visitor-added references join via search and filters.
 */
export const COLLECTIONS: Collection[] = [
  {
    id: 'dark-dimensional',
    title: 'Dark & Dimensional',
    description:
      'References that build worlds in near-black — staged light, depth on scroll, and interfaces that behave like film.',
    entryIds: ['monolith-protocol', 'ember-motors', 'deep-current', 'orbital-archive', 'vector-one'],
    accent: '#c7ff35',
  },
  {
    id: 'type-as-image',
    title: 'Type as Image',
    description:
      'When letterforms carry the entire design: kinetic variable fonts, poster-scale headlines, editorial grammar.',
    entryIds: ['tidal-type', 'kinetic-studio', 'axiom-finance', 'afterlight'],
    accent: '#5fd4d0',
  },
  {
    id: 'quiet-luxury',
    title: 'Quiet Luxury',
    description:
      'Restraint as the flex — patience, margins, material tones, and commerce that never raises its voice.',
    entryIds: ['solace-objects', 'halo-skincare', 'casa-nera', 'quiet-form'],
    accent: '#d9a441',
  },
  {
    id: 'living-systems',
    title: 'Living Systems',
    description:
      'Data, schematics, and ambient motion — technical directions that feel engineered rather than decorated.',
    entryIds: ['strata-systems', 'observatory', 'field-notes', 'vector-one'],
    accent: '#9fd6ff',
  },
];

export function collectionById(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}
