const PLACEHOLDER_SITE_URLS = new Set([
  'https://example.com',
  'http://example.com'
]);

export function getSiteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return null;
  }

  return raw.replace(/\/$/, '');
}

export function isValidProductionSiteUrl(url: string): boolean {
  if (PLACEHOLDER_SITE_URLS.has(url)) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.hostname !== 'localhost' && parsed.hostname !== '127.0.0.1';
  } catch {
    return false;
  }
}

export function warnIfInvalidProductionSiteUrl(
  context: string = 'build'
): string | null {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    const message = `[seo] NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, hreflang tags, and sitemap will be incomplete during ${context}.`;
    console.warn(message);
    return null;
  }

  if (
    process.env.NODE_ENV === 'production' &&
    !isValidProductionSiteUrl(siteUrl)
  ) {
    const message = `[seo] NEXT_PUBLIC_SITE_URL (${siteUrl}) is not a production domain. Set your real site URL before deploying.`;
    console.warn(message);
  }

  return siteUrl;
}
