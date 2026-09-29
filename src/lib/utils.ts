/** Small shared utilities. */

/** Join class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Deterministic 32-bit string hash — used to seed generated thumbnails. */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic 0..1 pseudo-random from a seed number. */
export function seededRandom(seed: number, salt = 0): number {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Format an ISO date as "Sep 2026". */
export function formatMonth(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** Parse "#rgb" / "#rrggbb" to [r,g,b]; returns null when unparseable. */
export function parseHexColor(value: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  let hex = m[1];
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const lin = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

export function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Given a brand color, recommend which Atmos neutral to set text to,
 * with the approximate WCAG contrast ratio.
 */
export function accessibleTextOn(color: string): { text: string; ratio: number } {
  const rgb = parseHexColor(color) ?? [199, 255, 53];
  const ink = contrastRatio(rgb, [9, 9, 9]);
  const bone = contrastRatio(rgb, [244, 241, 234]);
  return bone >= ink
    ? { text: '#f4f1ea (off-white)', ratio: bone }
    : { text: '#090909 (near-black)', ratio: ink };
}

/** Clamp a hex string to a valid value, else return the fallback. */
export function safeHex(value: string, fallback: string): string {
  const rgb = parseHexColor(value);
  if (!rgb) return fallback;
  return `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48);
}
