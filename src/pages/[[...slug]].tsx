import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type * as types from 'types';
import { DynamicComponent } from '../components/DynamicComponent';
import { Header } from '../components/sections/Header';
import { Footer } from '../components/sections/Footer';
import { pagesByType, siteConfig, urlToContent } from '../utils/content';
import { i18nConfig } from 'src/utils/i18n';

import MuiBox from '@mui/material/Box';
import CookieDrawer from '../components/atoms/CookieDrawer';
import PageContainer from 'src/components/atoms/PageContainer';
import ProtectedRoute from '../components/ProtectedRoute';

export type Props = { page: types.Page; siteConfig: types.Config };
const protectedRoutes = ['/dashboard', '/policy'];
const routesWithoutFooter = ['/dashboard', '/policy', '/signup', '/login'];

const Page: React.FC<Props> = ({ page, siteConfig }) => {
  const router = useRouter();
  const locale = router.locale || i18nConfig.defaultLocale;
  const canonicalBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const slugSegments = Array.isArray(router.query.slug)
    ? router.query.slug
    : [];
  const currentUrl = '/' + slugSegments.join('/');
  const normalizedCurrentUrl = currentUrl === '//' ? '/' : currentUrl;
  const canonicalUrl = canonicalBaseUrl
    ? `${canonicalBaseUrl}${locale === i18nConfig.defaultLocale ? '' : `/${locale}`}${normalizedCurrentUrl}`
    : null;
  const hrefLangUrls = (router.locales || []).map((availableLocale) => ({
    locale: availableLocale,
    href: canonicalBaseUrl
      ? `${canonicalBaseUrl}${availableLocale === i18nConfig.defaultLocale ? '' : `/${availableLocale}`}${normalizedCurrentUrl}`
      : null
  }));
  const currentPath = currentUrl;
  const isProtectedRoute = protectedRoutes.includes(currentPath);
  const header = { ...siteConfig.header, ...(page.header ?? {}) };
  const pageContent = (
    <PageContainer noHeader={page.noHeader} pageType={page.type} id={page.__id}>
      <Head>
        <title>{page.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {siteConfig.favicon && <link rel="icon" href={siteConfig.favicon} />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {hrefLangUrls.map(
          (item) =>
            item.href && (
              <link
                key={item.locale}
                rel="alternate"
                hrefLang={item.locale}
                href={item.href}
              />
            )
        )}
        {canonicalBaseUrl && (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${canonicalBaseUrl}${normalizedCurrentUrl}`}
          />
        )}
      </Head>
      {page.noHeader || !header ? null : (
        <Header
          {...(header as types.Header)}
          data-sb-object-id={siteConfig.__id}
          isProtectedRoute={isProtectedRoute}
        />
      )}
      <CookieDrawer consentCopy={siteConfig.consentCopy} />
      {(page.sections ?? []).length > 0 && (
        <MuiBox component="main" data-sb-field-path="sections">
          {(page.sections ?? []).map((section, index) => (
            <DynamicComponent
              key={index}
              path={router.query}
              {...section}
              data-sb-field-path={`.${index}`}
            />
          ))}
        </MuiBox>
      )}
      {siteConfig.footer && !routesWithoutFooter.includes(currentPath) && (
        <Footer {...siteConfig.footer} data-sb-object-id={siteConfig.__id} />
      )}
    </PageContainer>
  );

  // Protect only certain paths
  if (protectedRoutes.includes(currentPath)) {
    return <ProtectedRoute>{pageContent}</ProtectedRoute>;
  }

  return pageContent;
};

export default Page;

export const getStaticPaths: GetStaticPaths = () => {
  const pages = pagesByType('Page');
  return {
    paths: i18nConfig.locales.flatMap((locale) =>
      Object.keys(pages).map((url) => ({
        params: { slug: slugFromUrl(url) },
        locale
      }))
    ),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<
  Props,
  { slug: string[] }
> = async ({ params, locale }) => {
  const url = '/' + (params?.slug || []).join('/');
  const activeLocale = locale || i18nConfig.defaultLocale;
  const page = urlToContent(url, activeLocale) as types.Page;
  return {
    props: {
      page,
      siteConfig: siteConfig(),
      ...(await serverSideTranslations(activeLocale, ['common']))
    }
  };
};

function slugFromUrl(url: string) {
  if (url === '/') return [];
  return url.replace(/^\//, '').split('/');
}
