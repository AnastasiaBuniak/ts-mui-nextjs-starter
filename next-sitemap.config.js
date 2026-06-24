/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const locales = ['en', 'es', 'pt-BR', 'de', 'fr'];
const defaultLocale = 'en';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  },
  transform: async (config, path) => {
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
