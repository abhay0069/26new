import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TriangleAlert, X } from 'lucide-react';

import { AddReferenceModal } from '@/components/AddReferenceModal';
import { CollectionPage, CollectionsPage } from '@/components/CollectionsPage';
import { DiscoverPage } from '@/components/DiscoverPage';
import { DetailView } from '@/components/DetailView';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { SavedPage } from '@/components/SavedPage';
import { LogoMark } from '@/components/LogoMark';
import { ToastProvider } from '@/components/Toast';
import { useHashRoute, routeKey } from '@/hooks/useHashRoute';
import { LibraryProvider, useLibrary } from '@/state/LibraryContext';

/* ------------------------------------------------------------------ */
/* Storage error banner                                                */
/* ------------------------------------------------------------------ */
function StorageBanner() {
  const { storageError, dismissStorageError } = useLibrary();
  return (
    <AnimatePresence>
      {storageError && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-x-0 top-16 z-40 border-b border-[#ff8f6b]/30 bg-[#1a0f0b]/95 px-4 py-2.5 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-0 sm:px-6 lg:px-10">
            <TriangleAlert className="h-4 w-4 shrink-0 text-[#ff8f6b]" aria-hidden />
            <p className="flex-1 text-xs leading-relaxed text-bone-dim">{storageError}</p>
            <button
              type="button"
              onClick={dismissStorageError}
              aria-label="Dismiss warning"
              className="grid h-6 w-6 place-items-center rounded-md text-fog hover:text-bone"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Boot splash — the app's brief "loading" moment                      */
/* ------------------------------------------------------------------ */
function BootSplash() {
  const [booted, setBooted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(() => setBooted(true), reduced ? 150 : 850);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!booted && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={reduced ? false : { scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoMark className="h-12 w-12" />
            </motion.div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog">
              Atmos Library
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* App shell                                                           */
/* ------------------------------------------------------------------ */
function AppShell() {
  const { route, navigate, back } = useHashRoute();
  const [addOpen, setAddOpen] = useState(false);

  const handleSearchClick = () => {
    const needsNav = route.name !== 'discover';
    if (needsNav) navigate({ name: 'discover' });
    window.setTimeout(
      () => window.dispatchEvent(new CustomEvent('atmos:focus-search')),
      needsNav ? 180 : 0,
    );
  };

  const renderPage = () => {
    switch (route.name) {
      case 'discover':
        return <DiscoverPage onBrowseCollections={() => navigate({ name: 'collections' })} />;
      case 'collections':
        return <CollectionsPage onOpenCollection={(id) => navigate({ name: 'collection', id })} />;
      case 'collection':
        return (
          <CollectionPage id={route.id} onBack={() => navigate({ name: 'collections' })} />
        );
      case 'saved':
        return <SavedPage />;
      case 'detail':
        return <DetailView entryId={route.id} onBack={() => back({ name: 'discover' })} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink text-bone">
      <Nav
        route={route}
        navigate={navigate}
        onAddClick={() => setAddOpen(true)}
        onSearchClick={handleSearchClick}
      />
      <StorageBanner />

      <div className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={routeKey(route)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer navigate={navigate} />
      <AddReferenceModal open={addOpen} onClose={() => setAddOpen(false)} />
      <div className="grain-overlay" aria-hidden="true" />
      <BootSplash />
    </div>
  );
}

export default function App() {
  return (
    <LibraryProvider>
      <ToastProvider>
        <AppShell />
      </ToastProvider>
    </LibraryProvider>
  );
}
