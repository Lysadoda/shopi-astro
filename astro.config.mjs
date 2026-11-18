// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://cdn.shopify.com",
        "media-src 'self' https://cdn.shopify.com",
        "font-src 'self' data:",
        "connect-src 'self'",
      ],
    },
  },

  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false
    }
  },

  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-wght-normal.woff2'],
          },
          {
            weight: '100 900',
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-ext-wght-normal.woff2'],
          },
          // Add only if you use italic text:
          // {
          //   weight: '100 900',
          //   style: 'italic',
          //   src: ['./src/assets/fonts/inter-latin-ext-wght-italic.woff2'],
          // },
        ],
      },
    },
  ],

  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.shopify.com' }],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  experimental: {
    svgOptimizer: svgoOptimizer(),
    parallelPrerender: true,
    clientPrerender: true,
    incrementalBuild: true,
    chromeDevtoolsWorkspace: true,
  },

  integrations: [svelte()]
});