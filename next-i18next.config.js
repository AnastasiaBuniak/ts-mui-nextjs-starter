module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    localeDetection: true
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common'
};
