import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

interface ResultProps {
  remainingDaysToStay: number;
  usedDays: number | null;
}

const Result: React.FC<ResultProps> = ({ remainingDaysToStay, usedDays }) => {
  return (
    <Box mb={4} sx={{ padding: 2, textAlign: 'center' }}>
      <Alert
        severity="success"
        icon={false}
        variant="standard"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          justifyContent: 'center',
          mb: 0,
          border: '1px solid #4caf50'
        }}
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>
          Days remain to stay: {remainingDaysToStay}
        </AlertTitle>
        <div>You&apos;ve spent {usedDays} days in the 180 days window.</div>
      </Alert>
    </Box>
  );
};

export default Result;
