// vite.config.ts
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // small plugin: copy sitemap.xml from project root -> dist/
  const copySitemapPlugin = {
    name: 'copy-sitemap',
    closeBundle() {
      const src = path.resolve(process.cwd(), 'sitemap.xml');
      const dest = path.resolve(process.cwd(), 'dist', 'sitemap.xml');

      if (!fs.existsSync(src)) {
        console.warn('⚠️ sitemap.xml not found in project root — skipping copy.');
        return;
      }

      try {
        // Ensure dist exists
        const distDir = path.dirname(dest);
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

        fs.copyFileSync(src, dest);
        console.log('✅ Copied sitemap.xml -> dist/sitemap.xml');
      } catch (err) {
        console.error('Failed to copy sitemap.xml:', err);
      }
    }
  };

  return {
    server: {
      port: 3000,
      host: '0.0.0.0'
    },
    plugins: [
      react(),
      // add the sitemap copier plugin
      copySitemapPlugin
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.')
      }
    }
  };
});
