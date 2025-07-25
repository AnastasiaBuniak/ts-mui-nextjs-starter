import React, { useState } from 'react';
import { useGoogleSso } from './hooks';

import {
  Box,
  Grid,
  Container,
  Button,
  Typography,
  Alert,
  useTheme,
  useMediaQuery,
  Checkbox,
  FormControlLabel
} from '@mui/material';

export type Props = {
  type: 'Signup';
  pageType: 'signup' | 'login';
  title: string;
  subtitle: string;
  sideImageUrl: string;
  buttonText: string;
  errorText: string;
  // login specific props
  bottomText?: string;
  bottomLinkText?: string;
  bottomLink?: string;
  // signup specific props
  buttonErrorText?: string;
  termsText: string;
  termsLinkText: string;
  termsLink: string;
};

export const Signup: React.FC<Props> = ({
  pageType,
  title,
  subtitle,
  sideImageUrl,
  buttonText,
  errorText,
  bottomText,
  bottomLinkText,
  bottomLink,
  buttonErrorText,
  termsText,
  termsLinkText,
  termsLink
}) => {
  const [ignoreButtonHandler, setIgnoreButtonHandler] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { startGoogleSso, isError } = useGoogleSso(setIgnoreButtonHandler);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleButtonClick = () => {
    if (ignoreButtonHandler) return;
    if (pageType === 'signup' && !isChecked) {
      setShowTermsError(true);
      return;
    }
    setIgnoreButtonHandler(true);
    startGoogleSso();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        ...(isMobile && {
          minHeight: '100vh',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${sideImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })
      }}
    >
      <Grid container sx={{ minHeight: '100vh' }}>
        {!isMobile && (
          <Grid
            item
            md={6}
            sx={{
              minHeight: '100vh',
              backgroundImage: `url(${sideImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            ...(isMobile && {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            })
          }}
        >
          <Box
            sx={{
              height: isMobile ? 'auto' : '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              ...(isMobile && {
                backgroundColor: '#fff',
                borderRadius: 2,
                width: '90%',
                py: 4
              })
            }}
          >
            <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
              <Box sx={{ py: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      style={{ width: 20, height: 20 }}
                    />
                  }
                  onClick={handleButtonClick}
                  sx={{ mt: 2 }}
                >
                  {buttonText}
                </Button>

                {showTermsError && (
                  <Typography
                    variant="caption"
                    component="p"
                    color="error"
                    sx={{ mb: 2, mt: 0.5 }}
                  >
                    {buttonErrorText}
                  </Typography>
                )}
                {pageType === 'signup' && (
                  <FormControlLabel
                    sx={{ mt: 2 }}
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={(e) => {
                          setIsChecked(e.target.checked);
                          setShowTermsError(false);
                        }}
                        color="primary"
                        sx={{ p: isMobile ? 0 : '' }}
                      />
                    }
                    label={
                      <Typography
                        variant="caption"
                        sx={{ mt: isMobile ? 2 : 0 }}
                      >
                        {termsText}{' '}
                        <a
                          href={termsLink}
                          style={{ textDecoration: 'underline' }}
                        >
                          {termsLinkText}
                        </a>
                      </Typography>
                    }
                  />
                )}
                {pageType === 'login' && (
                  <Typography variant="caption" component="p" sx={{ mt: 2 }}>
                    {bottomText}{' '}
                    <a
                      href={bottomLink}
                      style={{ textDecoration: 'underline' }}
                    >
                      {bottomLinkText}
                    </a>
                  </Typography>
                )}
              </Box>

              {isError && <Alert severity="error">{errorText}</Alert>}
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
