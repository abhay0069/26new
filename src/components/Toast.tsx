import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookmarkCheck, Check, Info, PlusCircle, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Toasts — small confirmation stack, polite to screen readers.        */
/* ------------------------------------------------------------------ */

export type ToastIcon = 'save' | 'copy' | 'add' | 'remove' | 'info';

interface ToastItem {
  id: number;
  message: string;
  icon: ToastIcon;
}

const ToastContext = createContext<{ push: (message: string, icon?: ToastIcon) => void } | null>(
  null,
);

const ICONS: Record<ToastIcon, typeof Check> = {
  save: BookmarkCheck,
  copy: Check,
  add: PlusCircle,
  remove: Trash2,
  info: Info,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const push = useCallback((message: string, icon: ToastIcon = 'info') => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, message, icon }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 left-1/2 z-[110] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.icon];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl border border-hairline bg-ink-raise/95 px-4 py-2.5',
                  'text-sm text-bone shadow-lift backdrop-blur-md',
                )}
              >
                <Icon className="h-4 w-4 shrink-0 text-acid" aria-hidden />
                <span>{t.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
