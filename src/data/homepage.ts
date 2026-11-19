import { CDN_BASE_URL } from 'astro:env/server';
import type { Locale } from './routes';

const cdnAsset = (path: string) => new URL(path, CDN_BASE_URL).toString();

export interface HomePageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    headingPrefix: string;
    phrases: readonly string[];
    subtitle: string;
    ctaLabel: string;
    emailLabel: string;
    marketingDisclaimer: string;
    media: {
      posterUrl: string;
      posterAlt: string;
      desktopWebm?: string;
      mobileWebm?: string;
    };
  };
}

const HOME_CONTENT = {
  en: {
    seo: {
      title: 'Shopify',
      description: 'Dream big and build fast on Shopify. The world’s best commerce platform.',
    },
    hero: {
      headingPrefix: 'Be the next',
      phrases: [
        'AI all-star',
        'household name',
        'solo-preneur',
        'category creator',
        'global empire',
        'store they line up for',
        'big thing',
      ],
      subtitle: 'Dream big and build fast on Shopify. The world’s best commerce platform.',
      ctaLabel: 'Start for free',
      emailLabel: 'Enter your email address',
      marketingDisclaimer: 'You agree to receive marketing emails.',
      media: {
        posterUrl: cdnAsset(
          '/b/shopify-brochure2-assets/7ecd57f2fa3d7b997d29181a62c954ee.png?originalWidth=1920&originalHeight=1080',
        ),
        posterAlt: '',
      },
    },
  },
  pl: {
    seo: {
      title: 'Shopify Polska',
      description: 'Mierz wysoko i buduj szybko z Shopify. Najlepszą platformą commerce na świecie.',
    },
    hero: {
      headingPrefix: 'Zostań kolejnym',
      phrases: [
        'liderem AI',
        'znanym brandem',
        'solo-przedsiębiorcą',
        'twórcą kategorii',
        'globalnym imperium',
        'sklepem z kolejkami',
        'wielkim hitem',
      ],
      subtitle: 'Mierz wysoko i buduj szybko z Shopify. Najlepszą platformą commerce na świecie.',
      ctaLabel: 'Zacznij za darmo',
      emailLabel: 'Podaj swój adres e-mail',
      marketingDisclaimer: 'Wyrażasz zgodę na otrzymywanie wiadomości marketingowych.',
      media: {
        posterUrl: cdnAsset(
          '/b/shopify-brochure2-assets/7ecd57f2fa3d7b997d29181a62c954ee.png?originalWidth=1920&originalHeight=1080',
        ),
        posterAlt: '',
      },
    },
  },
} as const satisfies Record<Locale, HomePageContent>;

export function getHomePageContent(locale: Locale): HomePageContent {
  return HOME_CONTENT[locale];
}