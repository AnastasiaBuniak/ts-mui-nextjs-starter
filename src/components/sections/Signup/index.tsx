import React from 'react';
import { useSignupWithGoogle } from './hooks';

import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

export type Props = {
  type: 'Signup';
};

export const Signup: React.FC<Props> = ({}) => {
  const { signup } = useSignupWithGoogle();

  return (
    <Button variant="outlined" startIcon={<GoogleIcon />} onClick={signup}>
      Signup with Google
    </Button>
  );
};
