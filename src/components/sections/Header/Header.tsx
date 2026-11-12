import * as React from 'react';
import type * as types from 'types';
import { Link } from '../../atoms/Link';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';

import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import MuiBox from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { handleScrollToSection } from 'src/utils/scroll';
import { LanguageSwitcher } from 'src/components/atoms/LanguageSwitcher';
import { Logo } from 'src/components/atoms/Logo';
import { localePath } from 'src/utils/i18n';
import { useRouter } from 'next/router';

export type Props = types.Header & types.StackbitObjectId;

const navLinkSx = {
  color: 'text.secondary',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1,
  letterSpacing: '-0.01em',
  '&:hover': { color: 'text.primary' }
};

const signupButtonSx = {
  height: 36,
  minHeight: 36,
  minWidth: 0,
  px: 1.75,
  py: 0,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '-0.01em',
  borderRadius: '8px',
  boxShadow: 'none'
};

export const Header: React.FC<Props> = (props) => {
  const { title, navLinks = [], 'data-sb-object-id': objectId, user } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || router.defaultLocale || 'en';
  const fieldPath = objectId ? `${objectId}:header` : null;
  return (
    <MuiAppBar
      position="sticky"
      color="inherit"
      elevation={0}
      data-sb-field-path={fieldPath}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.appBar
      }}
    >
      <MuiToolbar
        disableGutters
        sx={{
          minHeight: { xs: 60, sm: 64 },
          maxWidth: 1200,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 3 },
          gap: { xs: 2, md: 4 },
          boxSizing: 'border-box'
        }}
      >
        {title && (
          <MuiBox
            component={NextLink}
            href={localePath('/', locale)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexShrink: 0,
              textDecoration: 'none',
              color: 'text.primary'
            }}
          >
            <Logo />
            <MuiTypography
              component="span"
              variant="body1"
              noWrap
              data-sb-field-path=".title"
              sx={{
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.03em'
              }}
            >
              {title}
            </MuiTypography>
          </MuiBox>
        )}
        {navLinks.length > 0 && (
          <MuiBox
            component="nav"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 2, md: 3 },
              minWidth: 0
            }}
            data-sb-field-path=".navLinks"
          >
            {navLinks.map(({ isAnchor, ...link }, index) =>
              isAnchor ? (
                <Button
                  key={index}
                  variant="text"
                  color="inherit"
                  component="a"
                  onClick={handleScrollToSection(link.url)}
                  data-sb-field-path={`.${index}`}
                  sx={{ ...navLinkSx, p: 0, minWidth: 0, minHeight: 0 }}
                >
                  {link.label}
                </Button>
              ) : (
                <Link
                  key={index}
                  {...link}
                  color="inherit"
                  underline="hover"
                  sx={navLinkSx}
                  data-sb-field-path={`.${index}`}
                />
              )
            )}
          </MuiBox>
        )}
        <MuiBox
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            ml: 'auto',
            flexShrink: 0
          }}
        >
          <LanguageSwitcher compact />
          {user ? (
            <NextLink
              href={localePath('/dashboard', locale)}
              passHref
              legacyBehavior
            >
              <Avatar
                src={user?.picture}
                alt={user?.name}
                sx={{ cursor: 'pointer', width: 32, height: 32 }}
              />
            </NextLink>
          ) : (
            <>
              <Link
                type="Link"
                label={t('auth.login')}
                url="/login"
                underline="hover"
                color="inherit"
                sx={navLinkSx}
              />
              <Button
                component={NextLink}
                href={localePath('/signup', locale)}
                variant="contained"
                color="primary"
                sx={signupButtonSx}
              >
                {t('auth.signup')}
              </Button>
            </>
          )}
        </MuiBox>
      </MuiToolbar>
    </MuiAppBar>
  );
};
