import React, { useState } from 'react';
import { useGoogleSso } from './hooks';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

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
  const { startGoogleSso, isError, isLoading } = useGoogleSso(
    setIgnoreButtonHandler
  );
  const handleButtonClick = () => {
    if (ignoreButtonHandler) return;
    setIgnoreButtonHandler(true);
    startGoogleSso();
  };

  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
      <Container maxWidth="xl" sx={{ textAlign: 'center', py: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
        <Container maxWidth="sm" sx={{ textAlign: 'center', py: 4 }}>
          {isError && <Alert severity="error">{errorText}</Alert>}
        </Container>
      </Container>
    </Container>
  );
};
