import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { persistLocale } from 'src/utils/i18n';

export const LocalePersist: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.locale) {
      persistLocale(router.locale);
    }
  }, [router.locale]);

  return null;
};
