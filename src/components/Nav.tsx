import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Plus, Search, X } from 'lucide-react';

import { LogoMark } from '@/components/LogoMark';
import { Button, IconButton } from '@/components/ui';
import { useLibrary } from '@/state/LibraryContext';
import { cn } from '@/lib/utils';
import type { Route } from '@/types';

interface NavProps {
  route: Route;
  navigate: (route: Route) => void;
  onAddClick: () => void;
  onSearchClick: () => void;
}

const LINKS: Array<{ label: string; route: Route; match: Route['name'][] }> = [
  { label: 'Discover', route: { name: 'discover' }, match: ['discover', 'detail'] },
  { label: 'Collections', route: { name: 'collections' }, match: ['collections', 'collection'] },
  { label: 'Saved', route: { name: 'saved' }, match: ['saved'] },
];

export function Nav({ route, navigate, onAddClick, onSearchClick }: NavProps) {
  const { savedIds } = useLibrary();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const isActive = (match: Route['name'][]) => match.includes(route.name);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-ink/75 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
      >
        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate({ name: 'discover' })}
          className="flex items-center gap-3 rounded-lg"
          aria-label="Atmos Library — go to Discover"
        >
          <LogoMark className="h-8 w-8" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-[15px] font-semibold tracking-[0.08em] text-bone">
              ATMOS
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fog">
              Library
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => navigate(link.route)}
                aria-current={isActive(link.match) ? 'page' : undefined}
                className={cn(
                  'group relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm transition-colors duration-200',
                  isActive(link.match) ? 'text-bone' : 'text-fog-bright hover:text-bone',
                )}
              >
                {isActive(link.match) && (
                  <motion.span
                    layoutId="nav-dot"
                    className="h-1.5 w-1.5 rounded-full bg-acid"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
                {link.label === 'Saved' && savedIds.length > 0 && (
                  <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-fog-bright">
                    {savedIds.length}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <IconButton label="Search references" onClick={onSearchClick}>
            <Search className="h-[18px] w-[18px]" aria-hidden />
          </IconButton>
          <Button size="sm" onClick={onAddClick} className="hidden sm:inline-flex">
            <Plus className="h-4 w-4" aria-hidden />
            Add reference
          </Button>
          <IconButton
            label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-[18px] w-[18px]" aria-hidden /> : <Menu className="h-[18px] w-[18px]" aria-hidden />}
          </IconButton>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigate(link.route)}
                    aria-current={isActive(link.match) ? 'page' : undefined}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base transition-colors',
                      isActive(link.match)
                        ? 'bg-white/[0.05] text-bone'
                        : 'text-fog-bright hover:bg-white/[0.03] hover:text-bone',
                    )}
                  >
                    {link.label}
                    {link.label === 'Saved' && savedIds.length > 0 && (
                      <span className="font-mono text-xs text-fog">{savedIds.length}</span>
                    )}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    onAddClick();
                  }}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                  Add reference
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
