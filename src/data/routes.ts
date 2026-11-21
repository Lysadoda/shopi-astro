import { SIGNUP_BASE_URL, SIGNUP_TRIAL_TYPE, SITE_URL } from './constants';

export type Locale = 'en' | 'pl';

export { SIGNUP_BASE_URL, SIGNUP_TRIAL_TYPE };

export const ROUTES = {
  home: { en: '/', pl: '/pl/' },
  start: { en: '/start/', pl: '/pl/start/' },
  sell: { en: '/sell/', pl: '/pl/sprzedawaj/' },
  enterprise: { en: '/enterprise/', pl: '/pl/enterprise/' },
  pricing: { en: '/pricing/', pl: '/pl/cennik/' },
  checkout: { en: '/checkout/', pl: '/pl/kasa/' },
  sidekick: { en: '/sidekick/', pl: '/pl/sidekick/' },
  'website-builder': { en: '/website/builder/', pl: '/pl/kreator/' },
  domains: { en: '/domains/', pl: '/pl/domeny/' },
  'customer-accounts': { en: '/customer-accounts/', pl: '/pl/konta-klientow/' },
  online: { en: '/online/', pl: '/pl/online/' },
  'agentic-storefronts': { en: '/agentic-storefronts/', pl: '/pl/agentic-storefronts/' },
  pos: { en: '/pos/', pl: '/pl/pos/' },
  shop: { en: '/shop/', pl: '/pl/aplikacja-shop/' },
  channels: { en: '/channels/', pl: '/pl/kanaly-sprzedazy/' },
  international: { en: '/international/', pl: '/pl/sprzedaz-miedzynarodowa/' },
  'solutions-b2b': { en: '/solutions/b2b/', pl: '/pl/rozwiazania/b2b/' },
  markets: { en: '/markets/', pl: '/pl/rynki/' },
  marketing: { en: '/marketing/', pl: '/pl/marketing/' },
  'marketing-automation-tools': {
    en: '/marketing-automation-tools/',
    pl: '/pl/automatyzacja-marketingu/',
  },
  discounts: { en: '/discounts/', pl: '/pl/rabaty/' },
  analytics: { en: '/analytics/', pl: '/pl/analityka/' },
  'test-and-launch': { en: '/test-and-launch/', pl: '/pl/testuj-i-uruchom/' },
  orders: { en: '/orders/', pl: '/pl/zamowienia/' },
  shipping: { en: '/shipping/', pl: '/pl/wysylka/' },
  flow: { en: '/flow/', pl: '/pl/flow/' },
  mobile: { en: '/mobile/', pl: '/pl/mobile/' },
  payments: { en: '/payments/', pl: '/pl/platnosci/' },
  ucp: { en: '/ucp/', pl: '/pl/ucp/' },
  'shop-pay': { en: '/shop-pay/', pl: '/pl/shop-pay/' },
  editions: { en: '/editions/', pl: '/pl/editions/' },
  'editions-fall2026': { en: '/editions/fall2026/', pl: '/pl/editions/fall2026/' },
  blog: { en: '/blog/', pl: '/pl/blog/' },
  'blog-what-is-shopify': { en: '/blog/what-is-shopify/', pl: '/pl/blog/czym-jest-shopify/' },
  partners: { en: '/partners/', pl: '/pl/partnerzy/' },
  'partners-directory': { en: '/partners/directory/', pl: '/pl/partnerzy/katalog/' },
  affiliates: { en: '/affiliates/', pl: '/pl/afiliacja/' },
  compare: { en: '/compare/', pl: '/pl/porownaj/' },
  tools: { en: '/tools/', pl: '/pl/narzedzia/' },
  legal: { en: '/legal/', pl: '/pl/prawne/' },
  'legal-terms': { en: '/legal/terms/', pl: '/pl/prawne/warunki/' },
  'legal-privacy': { en: '/legal/privacy/', pl: '/pl/prawne/prywatnosc/' },
  sitemap: { en: '/sitemap/', pl: '/pl/mapa-strony/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

/**
 * Routes implemented as dedicated pages (`src/pages/<route>/index.astro`)
 * instead of `[...slug].astro`. Add a key here when replacing a placeholder.
 */
export const DEDICATED_ROUTES: ReadonlySet<RouteKey> = new Set<RouteKey>(['home']);

const PATH_TO_ROUTE_KEY = new Map<string, RouteKey>(
  (Object.entries(ROUTES) as [RouteKey, Record<Locale, string>][]).flatMap(([key, locales]) => [
    [locales.en, key],
    [locales.pl, key],
  ]),
);

export function isRouteKey(value: string): value is RouteKey {
  return Object.hasOwn(ROUTES, value);
}

export function normalizeLocale(value: string | undefined): Locale {
  return value === 'pl' ? 'pl' : 'en';
}

/** Normalizes paths to `trailingSlash: 'always'` directory format (`/`, `/pl/`, `/pricing/`). */
export function normalizePathname(pathname: string): string {
  const withoutQueryOrHash = pathname.split(/[?#]/, 1)[0] ?? '';
  let clean = (withoutQueryOrHash.startsWith('/') ? withoutQueryOrHash : `/${withoutQueryOrHash}`)
    .replace(/\/{2,}/g, '/');

  if (clean === '/index.html') {
    return '/';
  }
  if (clean.endsWith('/index.html')) {
    clean = clean.slice(0, -'index.html'.length);
  }
  if (!clean.endsWith('/')) {
    clean = `${clean}/`;
  }

  return clean;
}

export function getLocaleFromPath(pathname: string): Locale {
  return normalizePathname(pathname).startsWith('/pl/') ? 'pl' : 'en';
}

export function getRoutePath(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

export function getRouteKeyFromPath(pathname: string): RouteKey | undefined {
  return PATH_TO_ROUTE_KEY.get(normalizePathname(pathname));
}

export function getCanonicalUrl(
  routeOrPath: RouteKey | string,
  locale: Locale,
  origin: string | URL = SITE_URL,
): string {
  let path: string;

  if (isRouteKey(routeOrPath)) {
    path = getRoutePath(routeOrPath, locale);
  } else {
    const matchedKey = getRouteKeyFromPath(routeOrPath);
    path = matchedKey ? getRoutePath(matchedKey, locale) : normalizePathname(routeOrPath);
  }

  return new URL(path, origin).toString();
}

export function getAlternateUrls(routeKey: RouteKey, origin: string | URL = SITE_URL) {
  return {
    en: new URL(getRoutePath(routeKey, 'en'), origin).toString(),
    pl: new URL(getRoutePath(routeKey, 'pl'), origin).toString(),
  };
}

export function getStaticSlug(key: RouteKey, locale: Locale): string {
  const fullPath = ROUTES[key][locale];

  if (locale === 'pl') {
    if (!fullPath.startsWith('/pl/') || !fullPath.endsWith('/') || fullPath === '/pl/') {
      throw new Error(`Polish subroute "${key}" must be "/pl/.../": received "${fullPath}"`);
    }
    return fullPath.slice('/pl/'.length, -1);
  }

  if (fullPath === '/' || !fullPath.startsWith('/') || !fullPath.endsWith('/')) {
    throw new Error(`English subroute "${key}" must be "/.../": received "${fullPath}"`);
  }
  return fullPath.slice(1, -1);
}

export function getPlaceholderStaticPaths(locale: Locale) {
  return (Object.keys(ROUTES) as RouteKey[])
    .filter((key) => !DEDICATED_ROUTES.has(key))
    .map((routeKey) => ({
      params: { slug: getStaticSlug(routeKey, locale) },
      props: { routeKey },
    }));
}

export function getSignupPageUrl(
  locale: Locale,
  routeOrPath: RouteKey | string = 'home',
): string {
  return getCanonicalUrl(routeOrPath, locale, SITE_URL);
}

export function getSignupHref(
  locale: Locale,
  routeOrPath: RouteKey | string = 'home',
): string {
  const params = new URLSearchParams({
    locale,
    language: locale,
    signup_page: getSignupPageUrl(locale, routeOrPath),
    'signup_types[]': SIGNUP_TRIAL_TYPE,
  });
  return `${SIGNUP_BASE_URL}?${params.toString()}`;
}