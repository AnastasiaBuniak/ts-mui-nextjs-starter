import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

export const useGoogleSso = (
  handler: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startGoogleSso = useGoogleLogin({
    onSuccess: (codeResponse) => {
      (async () => {
        setIsLoading(true);
        handler(true);
        try {
          const response = await fetch(`api/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: codeResponse.code }),
            credentials: 'include'
          });
          const data = await response.json();

          setIsError(!response.ok);
          if (response.ok) {
            window.location.href = '/dashboard';
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
