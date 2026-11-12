import * as React from 'react';
import type * as types from 'types';
import Link from 'next/link';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import MuiBox from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { userHeaderFeatures } from './hooks';
import { useAuth } from 'src/components/context/AuthContext';
import { LanguageSwitcher } from 'src/components/atoms/LanguageSwitcher';
import { Logo } from 'src/components/atoms/Logo';
import { useRouter } from 'next/router';
import { localePath } from 'src/utils/i18n';

export type Props = types.Header & types.StackbitObjectId;

export const UserHeader: React.FC<Props> = (props) => {
  const {
    title,
    'data-sb-object-id': objectId,
    user,
    welcomeText,
    deleteAccountText,
    deleteCancelText,
    deleteConfirmButtonText,
    deleteConfirmText,
    logoutText
  } = props;
  const userAuthData = useAuth();
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale || router.defaultLocale || 'en';

  const { logoutUser, deleteUserAccount } = userHeaderFeatures({
    userId: userAuthData?.user?.id,
    locale: router.locale
  });
  const fieldPath = objectId ? `${objectId}:header` : null;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    deleteUserAccount();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <MuiAppBar
        position="sticky"
        color="inherit"
        elevation={0}
        data-sb-field-path={fieldPath}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <MuiToolbar
          disableGutters={true}
          sx={{
            flexWrap: 'wrap',
            minHeight: 64,
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 3 },
            boxSizing: 'border-box',
            pt: isMobile ? 1.5 : 0,
            pb: isMobile ? 1.5 : 0,
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {title && (
            <MuiBox
              sx={{
                position: isMobile ? 'relative' : 'absolute',
                left: isMobile ? 'unset' : '50%',
                transform: isMobile ? 'unset' : 'translateX(-50%)',
                mb: isMobile ? 2 : 0,
                mr: isMobile ? 0 : 2,
                flexGrow: 1,
                flex: isMobile ? '1 1 100%' : '1 1 33%',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              <Link href={localePath('/', locale)} passHref legacyBehavior>
                <MuiBox
                  component="a"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <Logo />
                  <MuiTypography
                    component="h1"
                    variant="h5"
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
              </Link>
            </MuiBox>
          )}

          <MuiBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: isMobile ? '1 1 100%' : '0 0 auto',
              justifyContent: isMobile ? 'center' : 'flex-start',
              mb: isMobile ? 2 : 0
            }}
          >
            <Avatar
              src={user?.picture}
              alt={user?.name}
              sx={{ mr: isMobile ? 0 : 2 }}
            />
            {user?.name && (
              <MuiBox sx={{ ml: isMobile ? 2 : 0, flexGrow: 1 }}>
                <MuiTypography
                  component="p"
                  variant="subtitle1"
                  noWrap={!isMobile}
                  data-sb-field-path=".user.name"
                  sx={{
                    textAlign: isMobile ? 'center' : 'left'
                  }}
                >
                  {welcomeText} {user?.name}!
                </MuiTypography>
              </MuiBox>
            )}
          </MuiBox>

          <MuiBox sx={{ flex: '0 0 auto' }}>
            <LanguageSwitcher compact />
            <IconButton
              aria-label={t('common.settings')}
              onClick={handleAvatarClick}
              sx={{ mr: 1, color: 'text.primary' }}
            >
              <SettingsIcon />
            </IconButton>
            <Button
              onClick={logoutUser}
              variant="contained"
              color="primary"
              sx={{
                height: 36,
                minHeight: 36,
                px: 1.75,
                fontSize: 14,
                borderRadius: '8px',
                boxShadow: 'none'
              }}
            >
              {logoutText}
            </Button>
          </MuiBox>
        </MuiToolbar>
      </MuiAppBar>

      {/* Dropdown menu under settings */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={handleDeleteClick}>{deleteAccountText}</MenuItem>
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{deleteAccountText}</DialogTitle>
        <DialogContent>
          <MuiTypography>{deleteConfirmText}</MuiTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {deleteCancelText}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            {deleteConfirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
