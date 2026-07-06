export const DEFAULT_OG_IMAGE_PATH =
  '/images/calculator_visa_online_desktop.webp';

export function toAbsoluteUrl(
  siteUrl: string | null,
  path?: string | null
): string | null {
  if (!siteUrl || !path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export type SocialMeta = {
  ogUrl: string | null;
  ogType: 'website';
  ogImageUrl: string | null;
  ogImageAlt: string;
  twitterCard: 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImageUrl: string | null;
};

export function buildSocialMeta({
  siteUrl,
  canonicalUrl,
  title,
  description,
  ogImagePath,
  ogImageAlt
}: {
  siteUrl: string | null;
  canonicalUrl: string | null;
  title: string;
  description: string;
  ogImagePath?: string;
  ogImageAlt?: string;
}): SocialMeta {
  const ogImageUrl = toAbsoluteUrl(
    siteUrl,
    ogImagePath || DEFAULT_OG_IMAGE_PATH
  );

  return {
    ogUrl: canonicalUrl,
    ogType: 'website',
    ogImageUrl,
    ogImageAlt: ogImageAlt?.trim() || title,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImageUrl: ogImageUrl
  };
}

export const nonIndexableRoutes = [
  '/login',
  '/signup',
  '/dashboard',
  '/policy',
  '/localization-todo'
] as const;

export function isNonIndexableRoute(path: string): boolean {
  return (nonIndexableRoutes as readonly string[]).includes(path);
}

export function buildPageTitle(pageTitle: string, siteName?: string): string {
  const trimmedTitle = pageTitle.trim();
  const trimmedSiteName = siteName?.trim();

  if (!trimmedSiteName || trimmedTitle.includes(trimmedSiteName)) {
    return trimmedTitle;
  }

  return `${trimmedTitle} | ${trimmedSiteName}`;
}

export type FaqSchemaItem = {
  question: string;
  answer: string;
};

export function buildFaqPageJsonLd(items: FaqSchemaItem[]) {
  const mainEntity = items
    .filter((item) => item.question.trim() && item.answer.trim())
    .map((item) => ({
      '@type': 'Question',
      name: item.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.trim()
      }
    }));

  if (mainEntity.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  };
}
