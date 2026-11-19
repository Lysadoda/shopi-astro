// @ts-check
import { defineConfig, envField, fontProviders, svgoOptimizer } from 'astro/config';
import process from 'node:process';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const SITE_URL = env.SITE_URL || 'https://www.shopify.com';
const CDN_BASE_URL = env.CDN_BASE_URL || 'https://cdn.shopify.com';

const cdnUrl = new URL(CDN_BASE_URL);
const cdnOrigin = cdnUrl.origin;
const cdnProtocol = cdnUrl.protocol === 'http:' ? 'http' : 'https';

export default defineConfig({
  site: SITE_URL,
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SITE_URL: envField.string({
        context: 'server',
        access: 'public',
        url: true,
        default: 'https://www.shopify.com',
      }),
      CDN_BASE_URL: envField.string({
        context: 'server',
        access: 'public',
        url: true,
        default: 'https://cdn.shopify.com',
      }),
      SIGNUP_BASE_URL: envField.string({
        context: 'server',
        access: 'public',
        url: true,
        default: 'https://admin.shopify.com/signup',
      }),
      SIGNUP_PAGE_ORIGIN: envField.string({
        context: 'server',
        access: 'public',
        url: true,
        default: 'https://www.shopify.com',
      }),
    },
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        `img-src 'self' data: ${cdnOrigin}`,
        `media-src 'self' ${cdnOrigin}`,
        "font-src 'self' data:",
        "connect-src 'self'",
      ],
    },
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
        ],
      },
    },
  ],
  image: {
    remotePatterns: [{ protocol: cdnProtocol, hostname: cdnUrl.hostname }],
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
});