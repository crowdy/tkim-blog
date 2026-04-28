import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://crowdy.github.io',
  base: '/tkim-blog',
  output: 'static',
  trailingSlash: 'ignore',
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
