import * as React from 'react';
import type * as types from 'types';

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

import { userHeaderFeatures } from './hooks';
import { useAuth } from 'src/components/context/AuthContext';

export type Props = types.Header &
  types.StackbitObjectId & {
    user?: {
      name: string;
      picture: string;
    };
  };

export const UserHeader: React.FC<Props> = (props) => {
  const { title, 'data-sb-object-id': objectId, user } = props;
  const userAuthData = useAuth();

  const { logoutUser, deleteUserAccount } = userHeaderFeatures({
    userId: userAuthData?.user?.id
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
        position="static"
        color="transparent"
        elevation={0}
        data-sb-field-path={fieldPath}
      >
        <MuiToolbar
          disableGutters={true}
          sx={{
            flexWrap: 'wrap',
            pt: isMobile ? 2 : 1,
            pb: isMobile ? 2 : 1,
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start'
          }}
        >
          <MuiBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: isMobile ? '1 1 100%' : '1 1 33%',
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
                  color="text.secondary"
                  noWrap={!isMobile}
                  data-sb-field-path=".user.name"
                  sx={{
                    fontWeight: 'bold',
                    textAlign: isMobile ? 'center' : 'left'
                  }}
                >
                  Welcome, {user?.name}!
                </MuiTypography>
              </MuiBox>
            )}
          </MuiBox>

          {title && (
            <MuiBox
              sx={{
                mb: isMobile ? 2 : 1,
                mr: isMobile ? 0 : 2,
                flexGrow: 1,
                flex: isMobile ? '1 1 100%' : '1 1 33%',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              <MuiTypography
                component="h1"
                variant="h6"
                color="text.primary"
                data-sb-field-path=".title"
              >
                {title}
              </MuiTypography>
            </MuiBox>
          )}

          <MuiBox sx={{ flexGrow: 0 }}>
            <IconButton
              aria-label="edit policy"
              onClick={handleAvatarClick}
              sx={{ mr: 1 }}
            >
              <SettingsIcon color="action" />
            </IconButton>
            <Button onClick={logoutUser} variant="contained">
              Logout
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
        <MenuItem onClick={handleDeleteClick}>Delete Account</MenuItem>
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <MuiTypography>
            Are you sure you want to delete your account?
          </MuiTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
