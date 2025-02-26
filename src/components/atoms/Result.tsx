import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

interface ResultProps {
  remainingDaysToStay: number;
  usedDays: number | null;
  lastDate: string;
}

const Result: React.FC<ResultProps> = ({
  remainingDaysToStay,
  usedDays,
  lastDate
}) => {
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
        <div>
          You have used <b>{usedDays} days</b> of stay in the last 180 days
          window.
        </div>
        <div>You are allowed 90 days in a 180-day period.</div>
        <div>
          You can stay for <b>{remainingDaysToStay} days </b> more, until{' '}
          <b>{lastDate}</b>, if you use all days at once.
        </div>
      </Alert>
    </Box>
  );
};

export default Result;
