/**
 * Smoke test: boots the built bundle inside jsdom and walks the main
 * routes, asserting real content renders at each step.
 *
 * Usage: node scripts/smoke.mjs
 */
import { JSDOM } from 'jsdom';
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const bundlePath = readdirSync(new URL('../dist/assets/', import.meta.url))
  .filter((f) => f.startsWith('index-') && f.endsWith('.js'))
  .map((f) => new URL(`../dist/assets/${f}`, import.meta.url).pathname)[0];
if (!bundlePath) throw new Error('Built bundle not found — run `npm run build` first.');

const routes = [
  ['#/discover', 'Collect the feeling'],
  ['#/collections', 'Curated groupings'],
  ['#/collections/dark-dimensional', 'Dark &amp; Dimensional'],
  ['#/saved', 'Nothing saved yet'],
  ['#/reference/monolith-protocol', 'Original build prompt'],
  ['#/reference/does-not-exist', 'Reference not found'],
];

let failures = 0;
let run = 0;

for (const [hash, expected] of routes) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: `http://localhost/${hash}`,
    pretendToBeVisual: true,
  });

  const { window } = dom;
  window.scrollTo = () => {};
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.ResizeObserver =
    window.ResizeObserver ||
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  window.MutationObserver =
    window.MutationObserver ||
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    };

  // jsdom's AbortSignal conversion chokes on framer-motion's listener
  // options; strip `signal` when it is not a real AbortSignal.
  const nativeAddEventListener = window.EventTarget.prototype.addEventListener;
  window.EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (options && typeof options === 'object' && typeof window.AbortSignal !== 'undefined' && !(options.signal instanceof window.AbortSignal)) {
      const { signal, ...rest } = options;
      void signal;
      return nativeAddEventListener.call(this, type, listener, rest);
    }
    return nativeAddEventListener.call(this, type, listener, options);
  };

  global.window = window;
  global.document = window.document;
  Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
  global.localStorage = window.localStorage;
  global.MutationObserver = window.MutationObserver;
  global.SVGElement = window.SVGElement;
  global.SVGSVGElement = window.SVGSVGElement ?? window.SVGElement;
  global.CustomEvent = window.CustomEvent;
  global.HTMLElement = window.HTMLElement;
  global.Element = window.Element;
  global.Node = window.Node;
  global.getComputedStyle = window.getComputedStyle;
  global.requestAnimationFrame = window.requestAnimationFrame.bind(window);
  global.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);

  const consoleError = console.error;
  let errors = '';
  console.error = (...args) => {
    errors += args.join(' ') + '\n';
  };

  try {
    // Cache-busted import → a fresh app instance per route.
    await import(`${pathToFileURL(bundlePath).href}?run=${run++}`);
    // let effects + framer flush
    await new Promise((r) => setTimeout(r, 1100));
    const html = window.document.getElementById('root').innerHTML;
    const ok = html.includes(expected);
    if (ok) {
      console.log(`PASS ${hash} → contains "${expected}"`);
    } else {
      failures++;
      console.log(`FAIL ${hash} → missing "${expected}"`);
      console.log(html.slice(0, 600));
    }
    if (/Error|error occurred/i.test(errors) && !errors.includes('not found')) {
      console.log(`  console errors: ${errors.split('\n').slice(0, 4).join(' | ')}`);
    }
  } catch (err) {
    failures++;
    console.log(`CRASH ${hash}: ${err.message}`);
  } finally {
    console.error = consoleError;
    window.close();
  }
}

console.log(failures === 0 ? '\nAll smoke routes passed.' : `\n${failures} smoke route(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
