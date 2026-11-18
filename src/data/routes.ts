export type Locale = 'en' | 'pl';

export const ROUTES = {
  home: { en: '/', pl: '/pl' },
  start: { en: '/start', pl: '/pl/start' },
  sell: { en: '/sell', pl: '/pl/sprzedawaj' },
  enterprise: { en: '/enterprise', pl: '/pl/enterprise' },
  pricing: { en: '/pricing', pl: '/pl/cennik' },
  checkout: { en: '/checkout', pl: '/pl/kasa' },
  sidekick: { en: '/sidekick', pl: '/pl/sidekick' },
  'website-builder': { en: '/website/builder', pl: '/pl/kreator' },
  domains: { en: '/domains', pl: '/pl/domeny' },
  'customer-accounts': { en: '/customer-accounts', pl: '/pl/konta-klientow' },
  online: { en: '/online', pl: '/pl/online' },
  'agentic-storefronts': { en: '/agentic-storefronts', pl: '/pl/agentic-storefronts' },
  pos: { en: '/pos', pl: '/pl/pos' },
  shop: { en: '/shop', pl: '/pl/aplikacja-shop' },
  channels: { en: '/channels', pl: '/pl/kanaly-sprzedazy' },
  international: { en: '/international', pl: '/pl/sprzedaz-miedzynarodowa' },
  'solutions-b2b': { en: '/solutions/b2b', pl: '/pl/rozwiazania/b2b' },
  markets: { en: '/markets', pl: '/pl/rynki' },
  marketing: { en: '/marketing', pl: '/pl/marketing' },
  'marketing-automation-tools': {
    en: '/marketing-automation-tools',
    pl: '/pl/automatyzacja-marketingu',
  },
  discounts: { en: '/discounts', pl: '/pl/rabaty' },
  analytics: { en: '/analytics', pl: '/pl/analityka' },
  'test-and-launch': { en: '/test-and-launch', pl: '/pl/testuj-i-uruchom' },
  orders: { en: '/orders', pl: '/pl/zamowienia' },
  shipping: { en: '/shipping', pl: '/pl/wysylka' },
  flow: { en: '/flow', pl: '/pl/flow' },
  mobile: { en: '/mobile', pl: '/pl/mobile' },
  payments: { en: '/payments', pl: '/pl/platnosci' },
  ucp: { en: '/ucp', pl: '/pl/ucp' },
  'shop-pay': { en: '/shop-pay', pl: '/pl/shop-pay' },
  editions: { en: '/editions', pl: '/pl/editions' },
  'editions-fall2026': { en: '/editions/fall2026', pl: '/pl/editions/fall2026' },
  blog: { en: '/blog', pl: '/pl/blog' },
  'blog-what-is-shopify': { en: '/blog/what-is-shopify', pl: '/pl/blog/czym-jest-shopify' },
  partners: { en: '/partners', pl: '/pl/partnerzy' },
  'partners-directory': { en: '/partners/directory', pl: '/pl/partnerzy/katalog' },
  affiliates: { en: '/affiliates', pl: '/pl/afiliacja' },
  compare: { en: '/compare', pl: '/pl/porownaj' },
  tools: { en: '/tools', pl: '/pl/narzedzia' },
  legal: { en: '/legal', pl: '/pl/prawne' },
  'legal-terms': { en: '/legal/terms', pl: '/pl/prawne/warunki' },
  'legal-privacy': { en: '/legal/privacy', pl: '/pl/prawne/prywatnosc' },
  sitemap: { en: '/sitemap', pl: '/pl/mapa-strony' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export function getRoutePath(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

export function normalizeLocale(value: string | undefined): Locale {
  return value === 'pl' ? 'pl' : 'en';
}