/**
 * Generated-thumbnail registry.
 * Thumbnails are 100% CSS/SVG — no external imagery anywhere in the app.
 */

import type { Category, ThumbRatio, ThumbSpec, ThumbVariant } from '@/types';
import { hashString, seededRandom } from './utils';

export const THUMB_VARIANTS: ThumbVariant[] = [
  'strata',
  'orbit',
  'glyph',
  'flow',
  'field',
  'grid',
  'wave',
  'shard',
  'beam',
];

export const VARIANT_META: Record<ThumbVariant, { label: string; hint: string }> = {
  strata: { label: 'Strata', hint: 'Layered translucent bands' },
  orbit: { label: 'Orbit', hint: 'Concentric rings and satellites' },
  glyph: { label: 'Glyph', hint: 'Monumental cropped letterform' },
  flow: { label: 'Flow', hint: 'Drawn ribbon curves' },
  field: { label: 'Field', hint: 'Breathing particle grid' },
  grid: { label: 'Grid', hint: 'Receding technical blueprint' },
  wave: { label: 'Wave', hint: 'Topographic line drift' },
  shard: { label: 'Shard', hint: 'Glass polygon composition' },
  beam: { label: 'Beam', hint: 'Light shaft through slats' },
};

/** Curated dark palettes — base / mid / accent. No purple anywhere. */
export const PALETTES: Array<{ name: string; colors: [string, string, string] }> = [
  { name: 'Acid on carbon', colors: ['#0b0b0a', '#2a2d1c', '#c7ff35'] },
  { name: 'Bone minimal', colors: ['#0d0d0c', '#3a372f', '#e8e2d3'] },
  { name: 'Ember', colors: ['#0c0908', '#38221a', '#ff5a1f'] },
  { name: 'Deep current', colors: ['#070c0e', '#123339', '#5fd4d0'] },
  { name: 'Signal ice', colors: ['#0a0c0e', '#1d2b38', '#9fd6ff'] },
  { name: 'Moss field', colors: ['#0a0c09', '#22301f', '#a4c964'] },
  { name: 'Warm brass', colors: ['#0c0b09', '#332a1c', '#d9a441'] },
  { name: 'Rust signal', colors: ['#0d0a09', '#3a231d', '#e07a4f'] },
  { name: 'Studio grey', colors: ['#0b0b0b', '#2e2e2c', '#b8b4a8'] },
];

const RATIO_BY_HASH: ThumbRatio[] = ['portrait', 'tall', 'square', 'wide', 'tall', 'portrait'];

/**
 * Deterministically assign a variant + palette to a user-added reference
 * so every entry gets an original generated thumbnail for free.
 */
export function autoThumbFor(title: string, category: Category, accent?: string): ThumbSpec {
  const seed = hashString(title.toLowerCase() + category);
  const variant = THUMB_VARIANTS[seed % THUMB_VARIANTS.length];
  const paletteSeed = Math.floor(seededRandom(seed, 7) * PALETTES.length);
  const palette = [...PALETTES[paletteSeed].colors] as [string, string, string];
  if (accent) palette[2] = accent;
  const ratio = RATIO_BY_HASH[Math.floor(seededRandom(seed, 3) * RATIO_BY_HASH.length)];
  return { variant, palette, ratio };
}

export function ratioClass(ratio: ThumbRatio): string {
  switch (ratio) {
    case 'portrait':
      return 'aspect-[3/4]';
    case 'tall':
      return 'aspect-[4/5]';
    case 'square':
      return 'aspect-square';
    case 'wide':
      return 'aspect-[4/3]';
  }
}
