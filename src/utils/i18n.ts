export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'pt-BR', 'de', 'fr']
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

export const defaultNS = 'common';

export const supportedLocales = i18nConfig.locales as unknown as string[];

export function localePath(
  path: string,
  locale: string = i18nConfig.defaultLocale
): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === i18nConfig.defaultLocale) {
    return normalized;
  }
  return `/${locale}${normalized}`;
}
