import { ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { AuthProvider } from '../components/context/AuthContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: AppProps & { emotionCache?: any }) {
  return (
    <CacheProvider value={emotionCache}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      >
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
