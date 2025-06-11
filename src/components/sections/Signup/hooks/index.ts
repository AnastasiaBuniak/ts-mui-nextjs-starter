import { useGoogleLogin } from '@react-oauth/google';

export const useSignupWithGoogle = () => {
  const signup = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code: codeResponse.code })
        }
      );

      const data = await response.json();
      console.log('Backend response:', data);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
    flow: 'auth-code'
  });
  return { signup };
};
