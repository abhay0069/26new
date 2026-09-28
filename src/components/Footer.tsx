import { LogoMark } from '@/components/LogoMark';
import type { Route } from '@/types';

interface FooterProps {
  navigate: (route: Route) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-hairline">
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-7 w-7" />
            <span className="font-display text-sm font-semibold tracking-[0.08em] text-bone">
              ATMOS
              <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.32em] text-fog">
                Library
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-fog">
            A private inspiration-to-prompt collection for high-end immersive website ideas.
            Local-first — nothing leaves your browser.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="kicker mb-3">Library</p>
          <ul className="space-y-2 text-sm">
            {(
              [
                ['Discover', { name: 'discover' }],
                ['Collections', { name: 'collections' }],
                ['Saved', { name: 'saved' }],
                ['Kage scene', { name: 'kage' }],
              ] as Array<[string, Route]>
            ).map(([label, route]) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => navigate(route)}
                  className="text-fog-bright transition-colors hover:text-bone"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kicker mb-3">The rules</p>
          <p className="text-xs leading-relaxed text-fog">
            Every seeded entry is fictional and original — prompts describe general visual
            patterns only. Thumbnails are generated in CSS; nothing is scraped or hotlinked.
            You are responsible for holding rights to anything you add.
          </p>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fog-faint sm:px-6 lg:px-10">
          <span>© 2026 Atmos Library</span>
          <span>React · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
