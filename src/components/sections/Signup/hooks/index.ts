import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { localePath } from 'src/utils/i18n';

export const useGoogleSso = (
  handler: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startGoogleSso = useGoogleLogin({
    onSuccess: (codeResponse) => {
      (async () => {
        setIsLoading(true);
        handler(true);
        try {
          const response = await fetch('/api/proxy/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: codeResponse.code }),
            credentials: 'include'
          });
          await response.json();

          setIsError(!response.ok);
          if (response.ok) {
            const locale = router.locale || router.defaultLocale || 'en';
            window.location.href = localePath('/dashboard', locale);
          }
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
          console.error('Error during Google SSO:', error);
        }
      })();
    },
    onError: (error) => {
      setIsLoading(false);
      setIsError(true);
      handler(false);
      console.error('Google SSO Failed:', error);
    },
    flow: 'auth-code'
  });
  return { startGoogleSso, isError, isLoading };
};
