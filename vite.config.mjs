import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths, like CRA's "homepage": ".", so the build works under
  // the /portfolio/ GitHub Pages path.
  base: './',
  build: {
    // gh-pages publishes this directory (see the deploy script).
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: true,
  },
});
