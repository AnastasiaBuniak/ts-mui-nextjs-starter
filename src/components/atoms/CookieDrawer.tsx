import * as React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CONSENT_COOKIE_NAME } from 'src/utils/constants';

export const CookieDrawer: React.FC<{ consentCopy: string }> = ({
  consentCopy
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const givenConsent = Cookies.get(CONSENT_COOKIE_NAME);
    if (givenConsent) {
      setIsOpen(false);
    }
  }, []);

  const closeDrawer = () => {
    setIsOpen(false);
    Cookies.set(CONSENT_COOKIE_NAME, 'true', { expires: 365 });
  };

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
        disablePortal: true, // Prevents the drawer from being rendered in a portal.
        disableEnforceFocus: true, // Prevents the drawer from taking focus.
        disableAutoFocus: true, // Prevents the drawer from automatically focusing.
        disableRestoreFocus: true // Prevents the drawer from restoring focus.
      }}
    >
      <Box
        component="section"
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <IconButton
          aria-label="Close"
          title="Close"
          color="primary"
          onClick={closeDrawer}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box component="section" sx={{ px: 3, pb: 3 }}>
        <Typography component="p" variant="h6" color="text.primary">
          Disclaimer & Cookies Notice
        </Typography>
        <Typography component="div" variant="body1" color="text.primary">
          <div dangerouslySetInnerHTML={{ __html: consentCopy }} />
        </Typography>
      </Box>
    </Drawer>
  );
};

export default CookieDrawer;
