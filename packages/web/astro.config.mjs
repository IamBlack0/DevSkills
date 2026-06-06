import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  integrations: [tailwind(), sitemap()],
  site: process.env.SITE || 'https://IamBlack0.github.io',
  base: process.env.BASE_PATH || '/devskills',
});
