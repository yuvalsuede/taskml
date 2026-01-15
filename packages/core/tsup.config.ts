import { defineConfig } from 'tsup';

export default defineConfig([
  // Node.js builds (CJS + ESM)
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
  },
  // Browser build (IIFE)
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'TaskML',
    outDir: 'dist',
    outExtension: () => ({ js: '.browser.js' }),
    minify: true,
    sourcemap: true,
    platform: 'browser',
  },
]);
