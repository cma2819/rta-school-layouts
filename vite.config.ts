import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodecg from './vite/vite-plugin-nodecg';
import rollupEsbuild from 'rollup-plugin-esbuild';
import rollupExternals from 'rollup-plugin-node-externals';

export default defineConfig({
  clearScreen: false,
  plugins: [
    react(),
    nodecg({
      bundleName: 'rta-school-layouts',
      dashboard: './src/browser/dashboard/pages/*.tsx',
      graphics: './src/browser/graphics/pages/*.tsx',
      extension: {
        input: './src/extension/index.ts',
        plugins: [rollupEsbuild(), rollupExternals()],
      },
    }),
  ],
});
