export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'pt-BR', 'de', 'fr']
} as const;

export const defaultNS = 'common';

export const supportedLocales = i18nConfig.locales as unknown as string[];
