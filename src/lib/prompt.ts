/**
 * Prompt composition engine.
 *
 * Seeded prompts contain {{brand}} {{industry}} {{product}} {{tone}}
 * {{accent}} tokens. `resolvePrompt` swaps them for the entry defaults or
 * the visitor's "Make it yours" fields, and appends a live brief block
 * (including an accessibility note computed from the chosen brand color)
 * when any field is customized.
 */

import type { Inspiration } from '@/types';
import { accessibleTextOn, parseHexColor } from './utils';

export interface CustomFields {
  brand: string;
  industry: string;
  primaryColor: string;
  tone: string;
  product: string;
}

export const EMPTY_FIELDS: CustomFields = {
  brand: '',
  industry: '',
  primaryColor: '',
  tone: '',
  product: '',
};

export function isCustomized(fields: CustomFields): boolean {
  return Object.values(fields).some((v) => v.trim() !== '');
}

function resolveValues(entry: Inspiration, fields: CustomFields) {
  return {
    brand: fields.brand.trim() || entry.customization.brand,
    industry: fields.industry.trim() || entry.customization.industry,
    product: fields.product.trim() || entry.customization.product,
    tone: fields.tone.trim() || entry.customization.tone,
    accent: fields.primaryColor.trim() || entry.customization.accent,
  };
}

/** Build the fully resolved prompt text for a detail view. */
export function resolvePrompt(entry: Inspiration, fields: CustomFields = EMPTY_FIELDS): string {
  const vals = resolveValues(entry, fields);
  const body = entry.buildPrompt.replace(/\{\{(brand|industry|product|tone|accent)\}\}/g, (_, key: string) => {
    return vals[key as keyof typeof vals] ?? '';
  });

  if (!isCustomized(fields)) return body;

  const on = parseHexColor(vals.accent)
    ? accessibleTextOn(vals.accent)
    : { text: '#f4f1ea (off-white)', ratio: 15 };

  const brief = [
    '',
    '————————————————————————————————————',
    'ADAPTED BRIEF — applied to the direction above',
    '————————————————————————————————————',
    `Brand:            ${vals.brand}`,
    `Industry:         ${vals.industry}`,
    `Product / focus:  ${vals.product}`,
    `Tone of voice:    ${vals.tone}`,
    `Primary color:    ${vals.accent}`,
    '',
    `Use ${vals.accent} as the single accent against a near-black base, and set text over it in ${on.text} — that pairing measures roughly ${on.ratio.toFixed(1)}:1 contrast, past WCAG AA.`,
    'Re-voice every headline and microcopy line to match the adapted tone, and rebuild all imagery from scratch so nothing carries over from any existing site.',
  ].join('\n');

  return body + brief;
}

/**
 * Prompt factory for visitor-added references. Produces a genuinely
 * usable direction from the fields captured in the Add Reference modal.
 */
export function buildUserPrompt(input: {
  title: string;
  brand: string;
  category: string;
  tone: string;
  notes: string;
  accent: string;
}): string {
  const brand = input.brand || input.title;
  const tone = input.tone || 'restrained and cinematic';
  const accent = input.accent || '#c7ff35';
  const notes = input.notes.trim();

  const lines = [
    `Design an original immersive website for ${brand} — a ${input.category.toLowerCase()} direction with a ${tone} voice.`,
    '',
    'LAYOUT & HIERARCHY',
    'Open on a near-black hero with one oversized statement headline, a short supporting line, and a single clear call to action. Use an asymmetric grid: generous outer margins, a strong vertical rule, and content that breaks the column deliberately at two or three moments. Keep the homepage to one idea per viewport.',
    '',
    'VISUAL MOOD',
    'Cinematic and editorial: deep shadows, soft light sources, hairline borders, glassy translucent panels, and a subtle film-grain texture. Everything should feel considered and quiet rather than busy.',
    '',
    'TYPOGRAPHY',
    'Pair a characterful grotesk for display sizes with a neutral humanist sans for body copy. Tighten display letter-spacing (-2%), keep body line-length near 65 characters, and reserve italics for a single editorial flourish.',
    '',
    'COLOR',
    `Near-black base #090909, off-white text #f4f1ea, warm grey secondary #8f8a7e, and ${accent} as the only accent. No gradients across hues; the accent appears in underlines, cursors, and active states only.`,
    '',
    'MOTION & INTERACTION',
    'Fast, subtle transitions (250–400ms, ease-out). Cards rise a few pixels on hover and reveal a metadata layer. Entrance animations stagger by 40–60ms. Add one signature motion moment — a scroll-driven reveal or a cursor-aware tilt — but keep 60fps by animating transform and opacity only.',
    '',
    'RESPONSIVE BEHAVIOR',
    'Fluid type with clamp() from 320px to large desktop. The masonry gallery collapses to a single column; the navigation condenses to a menu sheet. Touch targets stay at 44px minimum.',
    '',
    'ACCESSIBILITY',
    'Keep body text at 4.5:1 contrast minimum and large display text at 3:1. All interactive elements need visible focus rings, real button semantics, and full keyboard reachability. Respect prefers-reduced-motion by disabling non-essential animation.',
    '',
    'TECHNICAL DIRECTION',
    'React + TypeScript + Tailwind CSS; Framer Motion for interface animation; CSS gradients, blur, and translucent layers for richness before reaching for canvas or Three.js. Ship semantic HTML throughout.',
    '',
    'ORIGINALITY',
    'Create every headline, illustration, texture, and asset from scratch. Do not reproduce any existing site’s branding, copy, imagery, or code — this direction is about the visual language only.',
  ];

  if (notes) lines.push('', 'ADDITIONAL NOTES', notes);

  return lines.join('\n');
}
