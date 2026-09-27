import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Shared UI primitives                                                */
/* ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'ghost' | 'quiet';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
}

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl font-display font-medium tracking-wide transition-all duration-200 ease-out-expo disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-acid text-ink hover:bg-[#d4ff5e] shadow-[0_8px_30px_-12px_rgba(199,255,53,0.45)]',
  ghost: 'border border-hairline bg-white/[0.02] text-bone hover:border-white/25 hover:bg-white/[0.06]',
  quiet: 'text-fog-bright hover:text-bone',
};

const buttonSizes = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'grid h-10 w-10 place-items-center rounded-xl border border-hairline bg-white/[0.02] text-fog-bright transition-all duration-200 hover:border-white/25 hover:text-bone active:scale-95',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('kicker', className)}>{children}</p>;
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border border-hairline bg-white/[0.03] px-2 py-0.5 text-[11px] text-fog-bright',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Fixed callout used for the library's content rules. */
export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-card border border-acid/25 border-l-2 border-l-acid bg-acid/[0.04] px-5 py-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
