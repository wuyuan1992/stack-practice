/// <reference types="vitest" />

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import replaceImageUrl from 'vite-plugin-replace-image-url';
import svgr from 'vite-plugin-svgr';

const env = loadEnv('prod', process.cwd(), '');

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    replaceImageUrl({
      publicPath: env.ASSET_BASE_URL,
      sourceDir: path.resolve(__dirname, './src/assets'),
      include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
      exclude: ['**/logo.png'],
      verbose: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        paths: {
          react: 'https://esm.sh/react@18',
          'react-dom': 'https://esm.sh/react-dom@18',
        },
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.names?.[0] ?? assetInfo.name;

          if (assetName === 'index.html') return 'index.html';
          if (assetName?.endsWith('.css')) return 'css/[name].[hash].[ext]';
          return '[name].[hash].[ext]';
        },
        // Tips: split chunks
        // manualChunks: {},
      },
    },
  },

  // Tips: another way to replace image url
  // experimental: {
  //   renderBuiltUrl(
  //     filename: string,
  //     { hostId, hostType, type }: { hostId: string; hostType: 'js' | 'css' | 'html'; type: 'public' | 'asset' },
  //   ) {
  //     return `${env.ASSET_BASE_URL}/${filename}`;
  //   },
  // },
});
