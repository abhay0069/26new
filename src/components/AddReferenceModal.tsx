import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ShieldAlert, X } from 'lucide-react';

import { Thumb } from '@/components/Thumb';
import { Button, Notice } from '@/components/ui';
import { useToast } from '@/components/Toast';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { buildUserPrompt } from '@/lib/prompt';
import { autoThumbFor, THUMB_VARIANTS } from '@/lib/thumbs';
import { cn, safeHex, slugify } from '@/lib/utils';
import { useLibrary } from '@/state/LibraryContext';
import { CATEGORIES, type Category, type Inspiration, type ThumbVariant } from '@/types';

interface FormState {
  title: string;
  url: string;
  credit: string;
  category: Category | '';
  tags: string;
  notes: string;
  accent: string;
  style: ThumbVariant;
  permission: boolean;
}

const INITIAL: FormState = {
  title: '',
  url: '',
  credit: '',
  category: '',
  tags: '',
  notes: '',
  accent: '#c7ff35',
  style: 'strata',
  permission: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.title.trim()) errors.title = 'A title is required.';
  if (!form.url.trim()) {
    errors.url = 'A source URL is required.';
  } else {
    try {
      const parsed = new URL(form.url.trim());
      if (!/^https?:$/.test(parsed.protocol)) errors.url = 'Use a full http(s) URL.';
    } catch {
      errors.url = 'That does not look like a valid URL.';
    }
  }
  if (!form.credit.trim()) errors.credit = 'Credit the source — even an anonymous one.';
  if (!form.category) errors.category = 'Pick a category.';
  if (!form.permission) errors.permission = 'Please confirm before adding.';
  return errors;
}

export function AddReferenceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addReference } = useLibrary();
  const toast = useToast();
  const trapRef = useFocusTrap<HTMLDivElement>(open, true);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});

  // Reset each time the modal opens.
  useEffect(() => {
    if (open) {
      setForm(INITIAL);
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const previewSpec = useMemo(() => {
    const auto = autoThumbFor(form.title || 'Untitled reference', form.category || 'Editorial', safeHex(form.accent, '#c7ff35'));
    return { ...auto, variant: form.style };
  }, [form.title, form.category, form.accent, form.style]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (Object.keys(nextErrors) as Array<keyof FormState>)[0];
      document.getElementById(`add-${firstInvalid}`)?.focus();
      return;
    }

    const title = form.title.trim();
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 6);
    const notes = form.notes.trim();
    const accent = safeHex(form.accent, '#c7ff35');
    const host = (() => {
      try {
        return new URL(form.url.trim()).host;
      } catch {
        return form.url.trim();
      }
    })();
    const date = new Date().toISOString().slice(0, 10);

    const entry: Inspiration = {
      id: `${slugify(title) || 'reference'}-${Date.now().toString(36)}`,
      title,
      category: form.category as Category,
      tags: tags.length > 0 ? tags : ['visitor-added'],
      summary: notes
        ? notes.split(/(?<=[.!?])\s/)[0].slice(0, 140)
        : `Visitor-added reference — a ${String(form.category).toLowerCase()} direction worth adapting.`,
      analysis: notes
        ? `Your notes: ${notes}`
        : 'No analysis captured yet. Open a few sessions with this reference and write what holds it together — type, color, layout, motion, interaction.',
      dna: {
        typography: 'Not yet analysed — capture the type direction in your notes.',
        color: 'Not yet analysed — note the palette logic as you study it.',
        layout: 'Not yet analysed — sketch the grid and hierarchy.',
        motion: 'Not yet analysed — describe the signature motion moment.',
        interaction: 'Not yet analysed — note the hover, scroll, and focus behaviors.',
      },
      buildPrompt: buildUserPrompt({
        title,
        brand: title,
        category: String(form.category),
        tone: '',
        notes,
        accent,
      }),
      customization: {
        brand: title,
        industry: 'an independent studio',
        product: 'a new immersive site',
        tone: 'restrained and cinematic',
        accent,
      },
      source: {
        label: `${host} (your reference)`,
        url: form.url.trim(),
        credit: form.credit.trim(),
      },
      createdAt: date,
      baseSaves: 0,
      thumb: previewSpec,
      origin: 'user',
    };

    addReference(entry);
    toast.push('Reference added to your library', 'add');
    onClose();
  };

  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <p role="alert" className="mt-1.5 text-xs text-[#ff8f6b]">
        {errors[key]}
      </p>
    ) : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="flex min-h-full items-start justify-center p-4 sm:p-8">
            <motion.div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-ref-title"
              tabIndex={-1}
              className="w-full max-w-2xl rounded-card border border-hairline bg-ink-soft shadow-lift"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* header */}
              <div className="flex items-center justify-between gap-4 border-b border-hairline px-6 py-4">
                <div>
                  <h2 id="add-ref-title" className="font-display text-lg font-medium text-bone">
                    Add reference
                  </h2>
                  <p className="mt-0.5 text-xs text-fog">
                    Stored locally · assigned an original generated visual
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-hairline text-fog-bright transition-colors hover:border-white/25 hover:text-bone"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate className="px-6 py-5">
                {/* live generated preview */}
                <div className="mb-5 flex items-center gap-4">
                  <Thumb
                    spec={previewSpec}
                    seed={form.title.length + 7}
                    letter={(form.title || 'A').charAt(0).toUpperCase()}
                    className="h-20 w-32 shrink-0 rounded-lg border border-hairline"
                  />
                  <p className="text-xs leading-relaxed text-fog">
                    <span className="text-bone">Generated thumbnail.</span> Atmos never stores
                    scraped imagery — your entry gets an original CSS composition in the style
                    you pick below.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="add-title" className="kicker mb-1.5 block">
                      Title <span className="text-acid">*</span>
                    </label>
                    <input
                      id="add-title"
                      type="text"
                      className={cn('input-base', errors.title && 'border-[#ff8f6b]/60')}
                      value={form.title}
                      onChange={(e) => set('title', e.target.value)}
                      aria-invalid={!!errors.title}
                      placeholder="e.g. Night Harbor"
                    />
                    {fieldError('title')}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="add-url" className="kicker mb-1.5 block">
                      Inspiration source URL <span className="text-acid">*</span>
                    </label>
                    <input
                      id="add-url"
                      type="url"
                      inputMode="url"
                      className={cn('input-base', errors.url && 'border-[#ff8f6b]/60')}
                      value={form.url}
                      onChange={(e) => set('url', e.target.value)}
                      aria-invalid={!!errors.url}
                      placeholder="https://…"
                    />
                    {fieldError('url')}
                  </div>

                  <div>
                    <label htmlFor="add-credit" className="kicker mb-1.5 block">
                      Creator / source credit <span className="text-acid">*</span>
                    </label>
                    <input
                      id="add-credit"
                      type="text"
                      className={cn('input-base', errors.credit && 'border-[#ff8f6b]/60')}
                      value={form.credit}
                      onChange={(e) => set('credit', e.target.value)}
                      aria-invalid={!!errors.credit}
                      placeholder="Studio or creator name"
                    />
                    {fieldError('credit')}
                  </div>

                  <div>
                    <label htmlFor="add-category" className="kicker mb-1.5 block">
                      Category <span className="text-acid">*</span>
                    </label>
                    <select
                      id="add-category"
                      className={cn('input-base', errors.category && 'border-[#ff8f6b]/60')}
                      value={form.category}
                      onChange={(e) => set('category', e.target.value as Category | '')}
                      aria-invalid={!!errors.category}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {fieldError('category')}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="add-tags" className="kicker mb-1.5 block">
                      Tags <span className="ml-1 font-normal text-fog-faint">(comma separated)</span>
                    </label>
                    <input
                      id="add-tags"
                      type="text"
                      className="input-base"
                      value={form.tags}
                      onChange={(e) => set('tags', e.target.value)}
                      placeholder="scroll-driven, glassy, kinetic type"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="add-notes" className="kicker mb-1.5 block">
                      Notes
                    </label>
                    <textarea
                      id="add-notes"
                      rows={3}
                      className="input-base resize-y"
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      placeholder="What is the feeling? What should be borrowed — and what must not be?"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="add-accent" className="kicker mb-1.5 block">
                      Accent color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="add-accent"
                        type="color"
                        value={safeHex(form.accent, '#c7ff35')}
                        onChange={(e) => set('accent', e.target.value)}
                        className="h-10 w-12 cursor-pointer rounded-lg border border-hairline bg-transparent p-1"
                      />
                      <input
                        type="text"
                        className="input-base max-w-[140px] font-mono text-xs"
                        value={form.accent}
                        onChange={(e) => set('accent', e.target.value)}
                        spellCheck={false}
                        aria-label="Accent color hex value"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="kicker mb-2" id="style-picker-label">
                      Visual style
                    </p>
                    <div
                      role="group"
                      aria-labelledby="style-picker-label"
                      className="grid grid-cols-3 gap-2 sm:grid-cols-5"
                    >
                      {THUMB_VARIANTS.map((variant) => {
                        const active = form.style === variant;
                        return (
                          <button
                            key={variant}
                            type="button"
                            aria-pressed={active}
                            onClick={() => set('style', variant)}
                            className={cn(
                              'overflow-hidden rounded-lg border transition-all duration-200',
                              active
                                ? 'border-acid ring-1 ring-acid/50'
                                : 'border-hairline opacity-70 hover:opacity-100',
                            )}
                          >
                            <Thumb
                              spec={{ ...previewSpec, variant }}
                              seed={9}
                              letter="A"
                              className="aspect-[4/3] w-full"
                            />
                            <span className="block bg-white/[0.03] px-1 py-1 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-fog-bright">
                              {variant}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Notice className="mt-5">
                  <div className="flex gap-3">
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-acid" aria-hidden />
                    <div>
                      <p className="text-sm leading-relaxed text-bone">
                        You are responsible for having permission to upload or use any reference
                        imagery.
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-fog">
                        Atmos Library stores only the text you type and generates an original
                        CSS visual — nothing is uploaded, scraped, or hotlinked.
                      </p>
                    </div>
                  </div>
                </Notice>

                <div className="mt-4">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-hairline bg-white/[0.02] p-4">
                    <input
                      id="add-permission"
                      type="checkbox"
                      checked={form.permission}
                      onChange={(e) => set('permission', e.target.checked)}
                      aria-invalid={!!errors.permission}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#c7ff35]"
                    />
                    <span className="text-xs leading-relaxed text-fog-bright">
                      I confirm this reference is described in my own words and that I have the
                      right to use anything connected to it.
                    </span>
                  </label>
                  {fieldError('permission')}
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Check className="h-4 w-4" aria-hidden />
                    Add to library
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
