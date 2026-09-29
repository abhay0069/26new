import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  Dna,
  LayoutGrid,
  MousePointerClick,
  Palette,
  Trash2,
  TriangleAlert,
  Type,
  Waves,
} from 'lucide-react';

import { Thumb } from '@/components/Thumb';
import { Notice, Button, Kicker, Tag } from '@/components/ui';
import { useToast } from '@/components/Toast';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLibrary } from '@/state/LibraryContext';
import { EMPTY_FIELDS, isCustomized, resolvePrompt, type CustomFields } from '@/lib/prompt';
import { accessibleTextOn, cn, formatMonth, hashString, safeHex } from '@/lib/utils';
import type { DnaKey, Inspiration } from '@/types';

/* ------------------------------------------------------------------ */
/* Clipboard with a fallback for non-secure contexts                   */
/* ------------------------------------------------------------------ */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Prompt panel — dark code-like surface with copy state               */
/* ------------------------------------------------------------------ */
export function PromptPanel({
  label,
  prompt,
  footnote,
}: {
  label: string;
  prompt: string;
  footnote?: string;
}) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const ok = await copyText(prompt);
    if (ok) {
      setCopied(true);
      toast.push('Prompt copied to clipboard', 'copy');
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } else {
      toast.push('Copy failed — select the text manually', 'info');
    }
  };

  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-[#0c0c0b]">
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-white/[0.02] px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-bright">{label}</p>
        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-display text-xs font-medium tracking-wide transition-all duration-200 active:scale-95',
            copied
              ? 'border-acid/60 bg-acid/10 text-acid'
              : 'border-hairline bg-white/[0.03] text-bone hover:border-white/25',
          )}
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap break-words px-5 py-5 font-mono text-[13px] leading-relaxed text-bone-dim">
        {prompt}
      </pre>
      {footnote && (
        <p className="border-t border-hairline px-5 py-3 text-[11px] leading-relaxed text-fog">
          {footnote}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Design DNA                                                          */
/* ------------------------------------------------------------------ */
const DNA_META: Array<{ key: DnaKey; label: string; icon: typeof Type }> = [
  { key: 'typography', label: 'Typography', icon: Type },
  { key: 'color', label: 'Color', icon: Palette },
  { key: 'layout', label: 'Layout', icon: LayoutGrid },
  { key: 'motion', label: 'Motion', icon: Waves },
  { key: 'interaction', label: 'Interaction', icon: MousePointerClick },
];

function DesignDNA({ dna }: { dna: Inspiration['dna'] }) {
  return (
    <section aria-labelledby="dna-heading">
      <Kicker className="mb-2 flex items-center gap-2">
        <Dna className="h-3.5 w-3.5 text-acid" aria-hidden />
        Design DNA
      </Kicker>
      <h2 id="dna-heading" className="display mb-6 font-display text-bone">
        Five decisions that define it
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DNA_META.map(({ key, label, icon: Icon }) => (
          <div key={key} className="panel panel-hover p-5">
            <p className="flex items-center gap-2 font-display text-sm font-medium text-bone">
              <Icon className="h-4 w-4 text-acid" aria-hidden />
              {label}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-fog-bright">{dna[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Make it yours                                                       */
/* ------------------------------------------------------------------ */
const TONE_SUGGESTIONS = [
  'Restrained & cinematic',
  'Warm & human',
  'Technical & precise',
  'Playful & bold',
  'Editorial & calm',
  'Deadpan scientific',
];

function MakeItYours({
  entry,
  fields,
  onChange,
}: {
  entry: Inspiration;
  fields: CustomFields;
  onChange: (fields: CustomFields) => void;
}) {
  const set = (patch: Partial<CustomFields>) => onChange({ ...fields, ...patch });
  const colorValue = safeHex(fields.primaryColor, entry.customization.accent);
  const contrast = accessibleTextOn(colorValue);
  const customized = isCustomized(fields);

  const inputProps = (key: keyof CustomFields) => ({
    value: fields[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set({ [key]: e.target.value }),
  });

  return (
    <section aria-labelledby="miy-heading">
      <Kicker className="mb-2">Adaptation</Kicker>
      <h2 id="miy-heading" className="display mb-3 font-display text-bone">
        Make it yours
      </h2>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-fog-bright">
        Fill in any field and the build prompt rewrites itself in real time — brand, industry,
        accent color, tone, and focus are folded into a customized brief.
      </p>

      <div className="panel mb-6 grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <label htmlFor="miy-brand" className="kicker mb-1.5 block">
            Brand name
          </label>
          <input id="miy-brand" type="text" className="input-base" placeholder={entry.customization.brand} {...inputProps('brand')} />
        </div>
        <div>
          <label htmlFor="miy-industry" className="kicker mb-1.5 block">
            Industry
          </label>
          <input id="miy-industry" type="text" className="input-base" placeholder={entry.customization.industry} {...inputProps('industry')} />
        </div>
        <div>
          <label htmlFor="miy-color" className="kicker mb-1.5 block">
            Primary color
          </label>
          <div className="flex items-center gap-2">
            <input
              id="miy-color"
              type="color"
              value={colorValue}
              onChange={(e) => set({ primaryColor: e.target.value })}
              className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-hairline bg-transparent p-1"
              aria-label="Pick primary color"
            />
            <input
              type="text"
              className="input-base font-mono text-xs"
              placeholder={entry.customization.accent}
              spellCheck={false}
              {...inputProps('primaryColor')}
            />
          </div>
          <p className="mt-1.5 font-mono text-[10px] tracking-wide text-fog">
            Pair with {contrast.text} · ≈ {contrast.ratio.toFixed(1)}:1 contrast
          </p>
        </div>
        <div>
          <label htmlFor="miy-tone" className="kicker mb-1.5 block">
            Tone
          </label>
          <input id="miy-tone" type="text" className="input-base" list="tone-options" placeholder={entry.customization.tone} {...inputProps('tone')} />
          <datalist id="tone-options">
            {TONE_SUGGESTIONS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="miy-product" className="kicker mb-1.5 block">
            Product / service
          </label>
          <input id="miy-product" type="text" className="input-base" placeholder={entry.customization.product} {...inputProps('product')} />
        </div>
      </div>

      <PromptPanel
        label={customized ? 'Customized build prompt · live' : 'Customized build prompt'}
        prompt={resolvePrompt(entry, fields)}
        footnote={
          customized
            ? undefined
            : 'This is the original direction with default values. Fill any field above to adapt it in real time.'
        }
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Detail view                                                         */
/* ------------------------------------------------------------------ */
export interface DetailViewProps {
  entryId: string;
  onBack: () => void;
}

export function DetailView({ entryId, onBack }: DetailViewProps) {
  const { allEntries, isSaved, toggleSave, deleteReference } = useLibrary();
  const toast = useToast();
  const entry = allEntries.find((e) => e.id === entryId);
  useDocumentTitle(entry?.title ?? 'Reference');

  const [fields, setFields] = useState<CustomFields>(EMPTY_FIELDS);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setFields(EMPTY_FIELDS);
    setConfirmingDelete(false);
    headingRef.current?.focus();
  }, [entryId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  useEffect(() => {
    if (!confirmingDelete) return;
    const t = window.setTimeout(() => setConfirmingDelete(false), 3000);
    return () => window.clearTimeout(t);
  }, [confirmingDelete]);

  const prompt = useMemo(() => (entry ? resolvePrompt(entry) : ''), [entry]);

  if (!entry) {
    return (
      <main className="mx-auto max-w-xl px-4 pb-28 pt-36 text-center">
        <TriangleAlert className="mx-auto h-9 w-9 text-fog" aria-hidden />
        <h1 ref={headingRef} tabIndex={-1} className="display mt-5 font-display text-bone outline-none">
          Reference not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-fog-bright">
          It may have been removed from this browser's library.
        </p>
        <Button variant="ghost" className="mt-8" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to the library
        </Button>
      </main>
    );
  }

  const saved = isSaved(entry.id);
  const seed = hashString(entry.id);

  const handleSaveToggle = () => {
    toggleSave(entry.id);
    toast.push(saved ? 'Removed from saved' : 'Saved to your list', saved ? 'remove' : 'save');
  };

  const handleDelete = () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    deleteReference(entry.id);
    toast.push('Reference deleted', 'remove');
    onBack();
  };

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-24 sm:px-6 lg:pt-28">
      {/* top bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} aria-label="Back (Escape)">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-hairline px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-fog-bright">
            {entry.category}
          </span>
          <Button
            size="sm"
            variant={saved ? 'primary' : 'ghost'}
            onClick={handleSaveToggle}
            aria-pressed={saved}
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4" aria-hidden />
            ) : (
              <Bookmark className="h-4 w-4" aria-hidden />
            )}
            {saved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      {/* hero */}
      <div className="grid items-start gap-8 lg:grid-cols-5">
        <motion.div
          className="panel overflow-hidden lg:col-span-3"
          initial={false}
          aria-hidden
        >
          <Thumb
            spec={entry.thumb}
            seed={seed}
            letter={entry.title.charAt(0).toUpperCase()}
            className="aspect-[4/3] w-full lg:aspect-[16/10]"
          />
        </motion.div>

        <div className="lg:col-span-2">
          <Kicker className="mb-3">
            {entry.origin === 'user' ? 'Added by you ·' : 'Fictional reference ·'}{' '}
            {formatMonth(entry.createdAt)}
          </Kicker>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="display font-display text-bone outline-none"
          >
            {entry.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fog-bright">{entry.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-fog">{entry.analysis}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="mt-6 rounded-card border border-hairline bg-white/[0.02] p-4">
            <p className="kicker mb-2">Source inspiration</p>
            <a
              href={entry.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-bone underline decoration-acid/60 decoration-2 underline-offset-4 transition-colors hover:text-acid"
              title="External link placeholder"
            >
              {entry.source.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <p className="mt-2 text-xs text-fog">
              Credit — {entry.source.credit}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fog-faint">
              Placeholder link · entry is fictional
            </p>
          </div>
        </div>
      </div>

      {/* sections */}
      <div className="mt-16 space-y-16">
        <DesignDNA dna={entry.dna} />

        <section aria-labelledby="prompt-heading">
          <Kicker className="mb-2">Prompt</Kicker>
          <h2 id="prompt-heading" className="display mb-6 font-display text-bone">
            Original build prompt
          </h2>
          <PromptPanel
            label="Original build prompt"
            prompt={prompt}
            footnote="Written for this direction only — general visual patterns, no proprietary material."
          />
          <Notice className="mt-4">
            <p className="text-sm leading-relaxed text-bone">
              <span className="font-medium">Use this as inspiration.</span> Do not recreate the
              original site's proprietary branding, imagery, copy, or code.
            </p>
          </Notice>
        </section>

        <MakeItYours entry={entry} fields={fields} onChange={setFields} />

        {entry.origin === 'user' && (
          <section aria-labelledby="danger-heading" className="panel p-5">
            <h2 id="danger-heading" className="font-display text-sm font-medium text-bone">
              This is your reference
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog-bright">
              Visitor-added entries live only in this browser's storage. Deleting cannot be
              undone.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className={cn('mt-4', confirmingDelete && 'border-[#ff8f6b]/60 text-[#ff8f6b]')}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              {confirmingDelete ? 'Click again to confirm' : 'Delete reference'}
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
