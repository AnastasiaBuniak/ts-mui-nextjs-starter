import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import type * as types from 'types';
import { DynamicComponent } from '../components/DynamicComponent';
import { Header } from '../components/sections/Header';
import { Footer } from '../components/sections/Footer';
import { pagesByType, siteConfig, urlToContent } from '../utils/content';

import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import CookieDrawer from '../components/atoms/CookieDrawer';
import ProtectedRoute from '../components/ProtectedRoute';

export type Props = { page: types.Page; siteConfig: types.Config };
const protectedRoutes = ['/dashboard'];

const Page: React.FC<Props> = ({ page, siteConfig }) => {
  const router = useRouter();
  const currentPath = '/' + (router.query.slug ?? []).join('/');
  const header = { ...siteConfig.header, ...(page.header ?? {}) };

  const pageContent = (
    <MuiBox sx={{ px: page.noHeader ? 0 : 3 }} data-sb-object-id={page.__id}>
      <MuiContainer
        maxWidth={page.noHeader ? false : 'lg'}
        disableGutters={true}
      >
        <Head>
          <title>{page.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {siteConfig.favicon && <link rel="icon" href={siteConfig.favicon} />}
        </Head>
        {page.noHeader || !header ? null : (
          <Header {...header} data-sb-object-id={siteConfig.__id} />
        )}
        <CookieDrawer consentCopy={siteConfig.consentCopy} />
        {(page.sections ?? []).length > 0 && (
          <MuiBox component="main" data-sb-field-path="sections">
            {(page.sections ?? []).map((section, index) => (
              <DynamicComponent
                key={index}
                {...section}
                data-sb-field-path={`.${index}`}
              />
            ))}
          </MuiBox>
        )}
        {siteConfig.footer && (
          <Footer {...siteConfig.footer} data-sb-object-id={siteConfig.__id} />
        )}
      </MuiContainer>
    </MuiBox>
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
    paths: Object.keys(pages),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = ({
  params
}) => {
  const url = '/' + (params?.slug || []).join('/');
  const page = urlToContent(url) as types.Page;
  return { props: { page, siteConfig: siteConfig() } };
};
