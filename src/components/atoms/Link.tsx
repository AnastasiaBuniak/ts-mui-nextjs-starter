import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type * as types from 'types';
import { localePath } from 'src/utils/i18n';

import MuiLink from '@mui/material/Link';

export type Props = types.Link &
  types.StackbitFieldPath & { className?: string; sx?: { [key: string]: any } };

export const Link: React.FC<Props> = (props) => {
  const router = useRouter();
  const {
    className,
    label,
    url,
    underline = 'always',
    color = 'primary',
    sx,
    'data-sb-field-path': fieldPath
  } = props;
  const locale = router.locale || router.defaultLocale || 'en';
  const href =
    url.startsWith('http') || url.startsWith('#')
      ? url
      : localePath(url, locale);
  const annotations = fieldPath
    ? [fieldPath, `${fieldPath}.url#@href`].join(' ').trim()
    : null;

  return (
    <MuiLink
      component={NextLink}
      href={href}
      className={className}
      underline={underline}
      color={color}
      sx={{ ...sx }}
      data-sb-field-path={annotations}
    >
      <span data-sb-field-path=".label">{label}</span>
    </MuiLink>
  );
};
