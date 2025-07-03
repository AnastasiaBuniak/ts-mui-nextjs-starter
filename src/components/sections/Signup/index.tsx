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

import GoogleIcon from '@mui/icons-material/Google';

export type Props = {
  type: 'Signup';
  title: string;
  subtitle: string;
  buttonText: string;
  errorText: string;
};

export const Signup: React.FC<Props> = ({
  title,
  subtitle,
  buttonText,
  errorText
}) => {
  const [ignoreButtonHandler, setIgnoreButtonHandler] = useState(false);
  const { startGoogleSso, isError } = useGoogleSso(setIgnoreButtonHandler);

  const [isChecked, setIsChecked] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleButtonClick = () => {
    if (ignoreButtonHandler || !isChecked) return;
    setIgnoreButtonHandler(true);
    startGoogleSso();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {!isMobile && (
          <Grid
            item
            md={6}
            sx={{
              minHeight: '100vh',
              backgroundImage:
                'url(https://images.unsplash.com/photo-1524850301259-7729d41d11d9?q=80&w=794&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2
            }}
          >
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>

              <Box sx={{ py: 4 }}>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="caption">
                      By proceeding, I agree to the{' '}
                      <a href="/terms" style={{ textDecoration: 'underline' }}>
                        terms and conditions
                      </a>
                      .
                    </Typography>
                  }
                />
              </Box>

              {isError && <Alert severity="error">{errorText}</Alert>}
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
