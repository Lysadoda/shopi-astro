// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.shopify.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      name: 'Shopify-Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            display: 'optional',
            unicodeRange: [
              'U+0-19F, U+1B1-24F, U+250-2FF, U+300-36F, U+2000-218F, U+2190-22FF, U+2400-27BF, U+FB00-FB4F, U+FEFF, U+FFFD',
            ],
            src: ['./src/assets/fonts/inter-latin-wght-normal.woff2'],
          },
        ],
      },
    },
  ],
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.shopify.com' }],
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});