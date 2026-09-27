import type { Category, Inspiration } from '@/types';

import { monolithProtocol } from './entries/monolith-protocol';
import { solaceObjects } from './entries/solace-objects';
import { strataSystems } from './entries/strata-systems';
import { tidalType } from './entries/tidal-type';
import { emberMotors } from './entries/ember-motors';
import { quietForm } from './entries/quiet-form';
import { axiomFinance } from './entries/axiom-finance';
import { orbitalArchive } from './entries/orbital-archive';
import { fieldNotes } from './entries/field-notes';
import { kineticStudio } from './entries/kinetic-studio';
import { haloSkincare } from './entries/halo-skincare';
import { deepCurrent } from './entries/deep-current';
import { vectorOne } from './entries/vector-one';
import { casaNera } from './entries/casa-nera';
import { observatory } from './entries/observatory';
import { afterlight } from './entries/afterlight';

/** The seeded library — all entries fictional and original. */
export const SEED_ENTRIES: Inspiration[] = [
  afterlight,
  monolithProtocol,
  observatory,
  solaceObjects,
  casaNera,
  kineticStudio,
  haloSkincare,
  deepCurrent,
  emberMotors,
  tidalType,
  vectorOne,
  quietForm,
  orbitalArchive,
  fieldNotes,
  axiomFinance,
  strataSystems,
];

export function entryCountFor(category: Category, extra: Inspiration[] = []): number {
  return [...SEED_ENTRIES, ...extra].filter((e) => e.category === category).length;
}
