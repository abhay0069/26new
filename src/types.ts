/**
 * Atmos Library — core data model.
 * Every reference is an original, editorially written record: no scraped
 * imagery, no third-party branding. Thumbnails are generated in CSS.
 */

export const CATEGORIES = [
  '3D',
  'Editorial',
  'Minimal',
  'Luxury',
  'Experimental',
  'SaaS',
  'Portfolio',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const SORT_OPTIONS = ['newest', 'saved', 'alpha'] as const;
export type SortKey = (typeof SORT_OPTIONS)[number];

export const DNA_KEYS = ['typography', 'color', 'layout', 'motion', 'interaction'] as const;
export type DnaKey = (typeof DNA_KEYS)[number];
export type DesignDNA = Record<DnaKey, string>;

export type ThumbVariant =
  | 'strata'
  | 'orbit'
  | 'glyph'
  | 'flow'
  | 'field'
  | 'grid'
  | 'wave'
  | 'shard'
  | 'beam';

export type ThumbRatio = 'portrait' | 'tall' | 'square' | 'wide';

export interface ThumbSpec {
  /** Which CSS art generator renders the thumbnail */
  variant: ThumbVariant;
  /** [base, mid, accent] — dark base, secondary tone, signature accent */
  palette: [string, string, string];
  /** Aspect ratio used in the masonry gallery for rhythm */
  ratio: ThumbRatio;
}

export interface SourceRef {
  /** Placeholder label shown in the UI — the entry is fictional */
  label: string;
  /** External link placeholder (example.com) — never a real third-party page */
  url: string;
  /** Who to credit for the inspiration direction */
  credit: string;
}

export interface CustomizationDefaults {
  brand: string;
  industry: string;
  product: string;
  tone: string;
  accent: string;
}

export interface Inspiration {
  id: string;
  title: string;
  category: Category;
  /** Motion / style tags, e.g. "scroll-driven", "kinetic type" */
  tags: string[];
  /** One-line editorial summary */
  summary: string;
  /** Longer design analysis of the visual direction */
  analysis: string;
  /** Design DNA — five focused notes */
  dna: DesignDNA;
  /**
   * The original build prompt. May contain {{brand}} {{industry}}
   * {{product}} {{tone}} {{accent}} tokens which are resolved for display
   * and re-written live in "Make it yours".
   */
  buildPrompt: string;
  /** Sensible defaults used to resolve the prompt tokens */
  customization: CustomizationDefaults;
  source: SourceRef;
  /** ISO date used by the "Newest" sort */
  createdAt: string;
  /** Fictional baseline popularity used by the "Most saved" sort */
  baseSaves: number;
  thumb: ThumbSpec;
  /** Where this record came from */
  origin: 'seed' | 'user';
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  entryIds: string[];
  accent: string;
}

export type Route =
  | { name: 'discover' }
  | { name: 'collections' }
  | { name: 'collection'; id: string }
  | { name: 'saved' }
  | { name: 'detail'; id: string };
