import * as React from 'react';
import type * as types from 'types';

import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import MuiBox from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useLogout } from './hooks';

export type Props = types.Header &
  types.StackbitObjectId & {
    user?: {
      name: string;
      picture: string;
    };
  };

export const UserHeader: React.FC<Props> = (props) => {
  const { title, 'data-sb-object-id': objectId, user } = props;
  const { logout } = useLogout();
  const fieldPath = objectId ? `${objectId}:header` : null;
  return (
    <MuiAppBar
      position="static"
      color="transparent"
      elevation={0}
      data-sb-field-path={fieldPath}
    >
      <MuiToolbar disableGutters={true} sx={{ flexWrap: 'wrap' }}>
        <Avatar src={user?.picture} alt={user?.name} sx={{ mr: 2 }} />

        {user?.name && (
          <MuiBox sx={{ mb: 1, mr: 2, flexGrow: 1 }}>
            <MuiTypography
              component="p"
              variant="subtitle1"
              color="text.secondary"
              noWrap
              data-sb-field-path=".user.name"
            >
              Welcome, {user?.name}!
            </MuiTypography>
          </MuiBox>
        )}
        {title && (
          <MuiBox sx={{ mb: 1, mr: 2, flexGrow: 1 }}>
            <MuiTypography
              component="p"
              variant="h6"
              color="text.primary"
              noWrap
              data-sb-field-path=".title"
            >
              {title}
            </MuiTypography>
          </MuiBox>
        )}

        <Button onClick={logout} variant="contained">
          Logout
        </Button>
      </MuiToolbar>
    </MuiAppBar>
  );
};
