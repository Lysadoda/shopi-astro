// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.shopify.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
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
      display: 'optional',
      unicodeRange: [
        'U+0000-00FF',
        'U+0131',
        'U+0152-0153',
        'U+02BB-02BC',
        'U+02C6',
        'U+02DA',
        'U+02DC',
        'U+0304',
        'U+0308',
        'U+0329',
        'U+2000-206F',
        'U+20AC',
        'U+2122',
        'U+2191',
        'U+2193',
        'U+2212',
        'U+2215',
        'U+FEFF',
        'U+FFFD',
      ],
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-wght-normal.woff2'],
          },
        ],
      },
    },
    {
      name: 'Shopify-Inter',
      cssVariable: '--font-inter-ext',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: false,
      unicodeRange: [
        'U+0100-02AF',
        'U+0304',
        'U+0308',
        'U+0329',
        'U+1E00-1E9F',
        'U+1EF2-1EFF',
        'U+2020',
        'U+20A0-20AB',
        'U+20AD-20C0',
        'U+2113',
        'U+2C60-2C7F',
        'U+A720-A7FF',
      ],
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-ext-wght-normal.woff2'],
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