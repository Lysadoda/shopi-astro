export const SITE_URL = 'https://www.shopify.com';
export const CDN_BASE_URL = 'https://cdn.shopify.com';
export const SIGNUP_BASE_URL = 'https://admin.shopify.com/signup';
export const SIGNUP_TRIAL_TYPE = 'paid_trial_experience';

export function cdnAsset(path: string): string {
  return new URL(path, CDN_BASE_URL).toString();
}