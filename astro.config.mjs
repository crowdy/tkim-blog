import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://crowdy.github.io',
  base: '/tkim-blog',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ko',
        locales: { ko: 'ko-KR', ja: 'ja-JP', en: 'en-US' },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
