/** @type {import('next-sitemap').IConfig} */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(
  /\/$/,
  ''
);
const locales = ['en', 'es', 'pt-BR', 'de', 'fr'];
const defaultLocale = 'en';
// Keep in sync with nonIndexableRoutes in src/utils/seo.ts
const nonIndexableRoutes = [
  '/login',
  '/signup',
  '/dashboard',
  '/policy',
  '/localization-todo'
];

const placeholderSiteUrls = new Set(['https://example.com', 'http://example.com']);

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    '[seo] NEXT_PUBLIC_SITE_URL is not set. Sitemap and robots.txt will use a placeholder domain.'
  );
} else if (
  process.env.NODE_ENV === 'production' &&
  (placeholderSiteUrls.has(siteUrl) ||
    siteUrl.includes('localhost') ||
    siteUrl.includes('127.0.0.1'))
) {
  console.warn(
    `[seo] NEXT_PUBLIC_SITE_URL (${siteUrl}) is not a production domain. Update it in your deployment environment before going live.`
  );
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: nonIndexableRoutes,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  },
  transform: async (config, path) => {
    if (nonIndexableRoutes.includes(path)) {
      return null;
    }

    const isDefaultLocalePath = !locales.some(
      (locale) =>
        locale !== defaultLocale &&
        (path === `/${locale}` || path.startsWith(`/${locale}/`))
    );

    if (!isDefaultLocalePath) {
      return null;
    }

    // next-sitemap appends the page path to each alternateRef href
    const alternateRefs = locales.map((locale) => ({
      href: `${siteUrl}${locale === defaultLocale ? '' : `/${locale}`}`,
      hreflang: locale
    }));

    alternateRefs.push({
      href: siteUrl,
      hreflang: 'x-default'
    });

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs
    };
  }
};
