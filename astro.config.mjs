import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    sitemap(),
  ],
  site: 'https://affiliate-blog-pi.vercel.app',
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
});
