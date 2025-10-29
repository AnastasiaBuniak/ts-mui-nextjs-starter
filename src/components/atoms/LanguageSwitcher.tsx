import * as React from 'react';
import { useRouter } from 'next/router';
import { MenuItem, Select } from '@mui/material';
import { useTranslation } from 'next-i18next';

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { i18n, t } = useTranslation('common');

  const handleChange = (event: any) => {
    const nextLocale = event.target.value;
    router.push(router.asPath, router.asPath, { locale: nextLocale });
  };

  return (
    <Select
      size="small"
      value={i18n.language}
      onChange={handleChange}
      variant="outlined"
      sx={{ ml: 2 }}
    >
      <MenuItem value="en">{t('english')}</MenuItem>
      <MenuItem value="uk">{t('ukrainian')}</MenuItem>
    </Select>
  );
};
