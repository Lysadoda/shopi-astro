import type { Locale, RouteKey } from './routes';
import { getRoutePath } from './routes';

export interface NavFeaturedItem {
  title: string;
  description: string;
  href: string;
  icon: string;
  image: string;
  image2x: string;
}

export interface NavAsideMediaItem {
  title: string;
  description: string;
  href: string;
  poster: string;
  webm: string;
  mp4: string;
  mobileImage: string;
  mobileImage2x?: string;
  mobileImageClass: string;
}

export interface NavProductGroup {
  heading: string;
  orderClass: string;
  items: {
    label: string;
    href: string;
    icon: string;
    external?: boolean;
  }[];
}

export interface NavBeltItem {
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

export function getWhyShopifyMenu(locale: Locale) {
  return {
    id: 'bk-nav-why-shopify',
    label: 'Why Shopify',
    featured: [
      {
        title: 'Get started fast',
        description: 'You could be selling by tomorrow.',
        href: getRoutePath('start', locale),
        icon: 'icon-drag-and-drop',
        image: 'https://cdn.shopify.com/b/shopify-brochure2-assets/35d24a52160348807e95f1d335e9e295.png?width=421',
        image2x: 'https://cdn.shopify.com/b/shopify-brochure2-assets/35d24a52160348807e95f1d335e9e295.png?width=842 2x',
      },
      {
        title: 'Switch to Shopify',
        description: 'Get more customers. Make more sales.',
        href: getRoutePath('sell', locale),
        icon: 'icon-boost',
        image: 'https://cdn.shopify.com/b/shopify-brochure2-assets/b4995abc3f73dd8442f579e10023a4df.png?width=421',
        image2x: 'https://cdn.shopify.com/b/shopify-brochure2-assets/b4995abc3f73dd8442f579e10023a4df.png?width=842 2x',
      },
      {
        title: 'Trusted by enterprise brands',
        description: 'No matter your size, complexity, or ambition.',
        href: getRoutePath('enterprise', locale),
        icon: 'icon-sales-up',
        image: 'https://cdn.shopify.com/b/shopify-brochure2-assets/91fd2e27323b7a94d9fdb2a7973e668e.png?width=421',
        image2x: 'https://cdn.shopify.com/b/shopify-brochure2-assets/91fd2e27323b7a94d9fdb2a7973e668e.png?width=842 2x',
      },
    ] satisfies NavFeaturedItem[],
    asideHeading: 'Built into every store',
    asideItems: [
      {
        title: "World's best checkout",
        description: 'Proven to convert better.',
        href: getRoutePath('checkout', locale),
        poster: 'https://cdn.shopify.com/b/shopify-brochure2-assets/07baf8219532d81f6d6725151f9e3482.png?width=434',
        webm: 'https://cdn.shopify.com/b/shopify-brochure2-assets/5a751065b0c61a7ef84271640431b54a.webm',
        mp4: 'https://cdn.shopify.com/b/shopify-brochure2-assets/6b1441a90dc0d0215f138f66d6dc18bb.mp4',
        mobileImage: 'https://cdn.shopify.com/b/shopify-brochure2-assets/ecabe88f01662a8048799d22f2c6aa99.svg',
        mobileImageClass:
          'relative z-10 w-[118px] aspect-[3.333] rounded max-sm:mt-auto sm:row-start-[span_2] sm:self-center sm:justify-self-end sm:w-[100px] sm:max-lg:justify-self-center max-lg:shadow-[0_8px_48px_0_rgba(24,24,27,0.24),_0_4px_8px_0_rgba(24,24,27,0.16)] md:w-[133px] lg:hidden',
      },
      {
        title: 'Sidekick',
        description: 'Your commerce-obsessed AI assistant.',
        href: getRoutePath('sidekick', locale),
        poster: 'https://cdn.shopify.com/b/shopify-brochure2-assets/89c9725d301503b2de05c561eb773134.png?width=434',
        webm: 'https://cdn.shopify.com/b/shopify-brochure2-assets/99ded60def529a689cecaea5a18e7284.webm',
        mp4: 'https://cdn.shopify.com/b/shopify-brochure2-assets/43fcd120ac3678f9c736c5e136f19456.mp4',
        mobileImage: 'https://cdn.shopify.com/b/shopify-brochure2-assets/bed4594e2c394553b2f03d9da43cb685.png?width=80',
        mobileImage2x: 'https://cdn.shopify.com/b/shopify-brochure2-assets/bed4594e2c394553b2f03d9da43cb685.png?width=160 2x',
        mobileImageClass:
          'relative z-10 w-[70px] aspect-square max-sm:translate-y-2.5 max-sm:-mt-2.5 sm:w-[80px] sm:self-center sm:justify-self-end sm:row-start-[span_2] sm:max-lg:justify-self-center lg:hidden',
      },
    ] satisfies NavAsideMediaItem[],
  };
}

export function getProductsMenu(locale: Locale) {
  const editionsHref = getRoutePath('editions-fall2026', locale);

  return {
    id: 'bk-nav-products',
    label: 'Products',
    groups: [
      {
        heading: 'Build your website',
        orderClass: 'md:order-1',
        items: [
          { label: 'Website Builder', href: getRoutePath('website-builder', locale), icon: 'icon-drag-and-drop' },
          { label: 'Themes', href: `https://themes.shopify.com/?locale=${locale}`, icon: 'icon-design', external: true },
          { label: 'Domains', href: getRoutePath('domains', locale), icon: 'icon-domain' },
          { label: 'Customer Accounts', href: getRoutePath('customer-accounts', locale), icon: 'icon-user-profile' },
          { label: 'Sidekick', href: getRoutePath('sidekick', locale), icon: 'icon-ai' },
        ],
      },
      {
        heading: 'Sell anywhere',
        orderClass: 'md:order-4 lg:order-3 lg:mb-10',
        items: [
          { label: 'Online', href: getRoutePath('online', locale), icon: 'icon-online' },
          { label: 'AI Chats', href: getRoutePath('agentic-storefronts', locale), icon: 'icon-ai-chats' },
          { label: 'Catalog', href: 'https://www.shopify.com/catalog', icon: 'icon-catalog', external: true },
          { label: 'Point of Sale', href: getRoutePath('pos', locale), icon: 'icon-pos-tick' },
          { label: 'Shop App', href: getRoutePath('shop', locale), icon: 'icon-shop-app' },
          { label: 'Social & Marketplaces', href: getRoutePath('channels', locale), icon: 'icon-social' },
          { label: 'Global', href: getRoutePath('international', locale), icon: 'icon-global' },
          { label: 'B2B', href: getRoutePath('solutions-b2b', locale), icon: 'icon-sales-up' },
          { label: 'Across Markets', href: getRoutePath('markets', locale), icon: 'icon-global-markets' },
        ],
      },
      {
        heading: 'Marketing & analytics',
        orderClass: 'md:order-5 lg:order-4',
        items: [
          { label: 'Advertising & Campaigns', href: getRoutePath('marketing', locale), icon: 'icon-marketing' },
          { label: 'Email & Customer Chat', href: getRoutePath('marketing-automation-tools', locale), icon: 'icon-users' },
          { label: 'Discounts', href: getRoutePath('discounts', locale), icon: 'icon-discount' },
          { label: 'Analytics', href: getRoutePath('analytics', locale), icon: 'icon-analytics' },
          { label: 'Test & Launch', href: getRoutePath('test-and-launch', locale), icon: 'icon-computer-tick' },
        ],
      },
      {
        heading: 'Run your business',
        orderClass: 'md:order-2',
        items: [
          { label: 'Orders & Inventory', href: getRoutePath('orders', locale), icon: 'icon-inventory-synced' },
          { label: 'Shipping', href: getRoutePath('shipping', locale), icon: 'icon-shipping' },
          { label: 'Workflow Automation', href: getRoutePath('flow', locale), icon: 'icon-save-time' },
          { label: 'Mobile', href: getRoutePath('mobile', locale), icon: 'icon-mobile' },
        ],
      },
      {
        heading: 'Get paid',
        orderClass: 'md:order-3 lg:order-5',
        items: [
          { label: 'Checkout', href: getRoutePath('checkout', locale), icon: 'icon-credit-card' },
          { label: 'Payments', href: getRoutePath('payments', locale), icon: 'icon-money' },
        ],
      },
    ] satisfies NavProductGroup[],
    beltHeading: 'Customize & extend Shopify',
    beltItems: [
      { label: 'Build shopping anywhere', description: 'Tools for agents', href: 'https://shop.dev', external: true },
      { label: 'Shopify App Store', description: 'Largest commerce ecosystem', href: `https://apps.shopify.com/?locale=${locale}`, external: true },
      { label: 'Shopify.dev', description: 'Dev docs, CLI, and more', href: 'https://shopify.dev', external: true },
    ],
    asideHeading: 'Non-stop innovation',
    editionsCard: {
      title: 'Shopify Editions',
      description: '150+ updates to Shopify, twice a year.',
      href: editionsHref,
      poster: 'https://cdn.shopify.com/b/shopify-brochure2-assets/2a8bb0e09e501de1dcd597e019d98629.png?width=512',
      webm: 'https://cdn.shopify.com/b/shopify-brochure2-assets/c4a1f951d939c947611f04242e2923f8.webm',
      mp4: 'https://cdn.shopify.com/b/shopify-brochure2-assets/fafdb144a0c8b06e1d9e98bc26b6245a.mp4',
    },
    updatesHeading: 'Latest updates',
    updates: [
      { label: 'Shopify Protect', href: `${editionsHref}#fraud-prevention-with-shopify-protect` },
      { label: 'Shop.dev', href: `${editionsHref}#shop-dev-for-builders` },
      { label: 'Canvas', href: `${editionsHref}#online-store-canvas` },
    ],
  };
}

export function getSimpleTopLinks(locale: Locale): { label: string; routeKey: RouteKey }[] {
  return [
    { label: 'Pricing', routeKey: 'pricing' },
    { label: 'Enterprise', routeKey: 'enterprise' },
  ];
}