import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/pt-br';

export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'pt-BR', 'de', 'fr']
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

export const defaultNS = 'common';

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const supportedLocales = i18nConfig.locales as unknown as string[];

export function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale);
}

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

const dayjsLocaleByAppLocale: Record<string, string> = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  'pt-BR': 'pt-br'
};

export function formatLocalizedDate(date: Dayjs, locale: string): string {
  const dayjsLocale = dayjsLocaleByAppLocale[locale] || 'en';
  return date.locale(dayjsLocale).format('L');
}

export function localizeInternalHtmlLinks(
  html: string,
  locale: string = i18nConfig.defaultLocale
): string {
  return html.replace(/href=(['"])(\/[^'"]*)\1/g, (_match, quote, path) => {
    return `href=${quote}${localePath(path, locale)}${quote}`;
  });
}

export function getStoredLocale(): string {
  if (typeof document === 'undefined') {
    return i18nConfig.defaultLocale;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`)
  );
  const cookieLocale = match?.[1];

  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  return i18nConfig.defaultLocale;
}

export function persistLocale(locale: string) {
  if (typeof document === 'undefined' || !isSupportedLocale(locale)) {
    return;
  }

  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
}
