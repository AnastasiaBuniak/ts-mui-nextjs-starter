/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const locales = ['en', 'es', 'pt-BR', 'de', 'fr'];

module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  alternateRefs: locales.map((locale) => ({
    href: `${siteUrl}${locale === 'en' ? '' : `/${locale}`}`,
    hreflang: locale
  }))
};
