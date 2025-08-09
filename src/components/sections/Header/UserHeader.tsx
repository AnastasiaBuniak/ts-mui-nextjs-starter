import * as React from 'react';
import type * as types from 'types';

import Button from '@mui/material/Button';
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

import { userHeaderFeatures } from './hooks';
import { deleteAccount } from '../../../api/user';

export type Props = types.Header &
  types.StackbitObjectId & {
    user?: {
      name: string;
      picture: string;
    };
  };

export const UserHeader: React.FC<Props> = (props) => {
  const { title, 'data-sb-object-id': objectId, user } = props;
  const { logoutUser, deleteUserAccount } = userHeaderFeatures();
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

  return (
    <>
      <MuiAppBar
        position="static"
        color="transparent"
        elevation={0}
        data-sb-field-path={fieldPath}
      >
        <MuiToolbar disableGutters={true} sx={{ flexWrap: 'wrap' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', flex: '1 1 33%' }}
          >
            <Avatar
              src={user?.picture}
              alt={user?.name}
              sx={{ mr: 2, cursor: 'pointer' }}
              onClick={handleAvatarClick}
            />
            {user?.name && (
              <MuiBox sx={{ mr: 1, flexGrow: 1 }}>
                <MuiTypography
                  component="p"
                  variant="subtitle1"
                  color="text.secondary"
                  noWrap
                  data-sb-field-path=".user.name"
                  sx={{ fontWeight: 'bold' }}
                >
                  Welcome, {user?.name}!
                </MuiTypography>
              </MuiBox>
            )}
          </div>

          {title && (
            <MuiBox sx={{ mb: 1, mr: 2, flexGrow: 1, flex: '1 1 33%' }}>
              <MuiTypography
                component="p"
                variant="h5"
                color="text.primary"
                noWrap
                data-sb-field-path=".title"
                style={{ fontWeight: 'bold' }}
              >
                {title}
              </MuiTypography>
            </MuiBox>
          )}

          <Button
            onClick={logoutUser}
            variant="contained"
            style={{ flexGrow: 0 }}
          >
            Logout
          </Button>
        </MuiToolbar>
      </MuiAppBar>

      {/* Dropdown menu under avatar */}
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
