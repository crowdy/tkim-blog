import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://crowdy.github.io',
  base: '/crowdy-blog',
  output: 'static',
  trailingSlash: 'ignore',
});
