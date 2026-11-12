import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { persistLocale } from 'src/utils/i18n';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const LanguageSwitcher: React.FC<{
  lightText?: boolean;
  compact?: boolean;
}> = ({ lightText = false, compact = false }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const activeLocale = router.locale || router.defaultLocale || 'en';

  const handleLocaleChange = (event: SelectChangeEvent<string>) => {
    const locale = event.target.value;
    persistLocale(locale);
    router.push(router.asPath, router.asPath, { locale });
  };

  if (compact) {
    return (
      <Select
        aria-label={t('language.label')}
        value={activeLocale}
        onChange={handleLocaleChange}
        variant="standard"
        disableUnderline
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'text.secondary',
          '& .MuiSelect-select': {
            py: 0.5,
            pr: '22px !important',
            minHeight: 0,
            display: 'flex',
            alignItems: 'center'
          },
          '& .MuiSvgIcon-root': { fontSize: 18, color: 'text.secondary' }
        }}
      >
        {(router.locales || []).map((locale) => (
          <MenuItem key={locale} value={locale}>
            {t(`language.${locale}`)}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <FormControl size="small" sx={{ minWidth: 132 }}>
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
            {t(`language.${locale}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
