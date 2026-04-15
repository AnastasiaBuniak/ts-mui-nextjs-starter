import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const labels: Record<string, string> = {
  en: 'English',
  es: 'Espanol',
  'pt-BR': 'Portugues (Brasil)',
  de: 'Deutsch',
  fr: 'Francais'
};

export const LanguageSwitcher: React.FC<{ lightText?: boolean }> = ({
  lightText = false
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const activeLocale = router.locale || router.defaultLocale || 'en';

  const handleLocaleChange = (event: SelectChangeEvent<string>) => {
    const locale = event.target.value;
    router.push(router.asPath, router.asPath, { locale });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150, ml: 2 }}>
      <InputLabel
        id="language-switcher-label"
        sx={lightText ? { color: 'white' } : undefined}
      >
        {t('language.label')}
      </InputLabel>
      <Select
        labelId="language-switcher-label"
        value={activeLocale}
        label={t('language.label')}
        onChange={handleLocaleChange}
        sx={
          lightText
            ? {
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                },
                '.MuiSvgIcon-root': { color: 'white' }
              }
            : undefined
        }
      >
        {(router.locales || []).map((locale) => (
          <MenuItem key={locale} value={locale}>
            {labels[locale] || locale}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
