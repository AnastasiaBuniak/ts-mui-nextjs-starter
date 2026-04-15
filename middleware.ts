import { NextRequest, NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18nConfig } from './src/utils/i18n';

const PUBLIC_FILE = /\.(.*)$/;

function getPreferredLocale(request: NextRequest) {
  const requestHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    requestHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: requestHeaders }).languages();
  return matchLocale(languages, [...i18nConfig.locales], i18nConfig.defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale || pathname !== '/') {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    cookieLocale &&
    i18nConfig.locales.includes(
      cookieLocale as (typeof i18nConfig.locales)[number]
    )
      ? cookieLocale
      : getPreferredLocale(request);

  if (locale === i18nConfig.defaultLocale) {
    return NextResponse.next();
  }

  const localizedUrl = request.nextUrl.clone();
  localizedUrl.pathname = `/${locale}`;
  return NextResponse.redirect(localizedUrl);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
};
