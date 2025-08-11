// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  css: {
    postcss: {
      plugins: [
        postcssPlugin(),  // uses @tailwindcss/postcss plugin
        autoprefixer(),
      ],
    },
  },
});

