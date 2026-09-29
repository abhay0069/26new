import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // DEPLOY_BASE lets CI build for a subpath (e.g. GitHub Pages /26new/)
  // while local dev stays at the root.
  base: process.env.DEPLOY_BASE || '/',
  // STANDALONE=1 folds lazy chunks into one JS file so
  // scripts/make-standalone.mjs can inline the whole app.
  build: process.env.STANDALONE
    ? { rollupOptions: { output: { inlineDynamicImports: true } } }
    : undefined,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // The app is served through a sandboxed preview proxy; accept its host.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
