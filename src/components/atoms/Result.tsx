import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import NextLink from 'next/link';

interface ResultProps {
  remainingDaysToStay: number;
  usedDays: number | null;
  lastDate: string;
  overstayedDays: number;
}

const Result: React.FC<ResultProps> = ({
  remainingDaysToStay,
  usedDays,
  lastDate,
  overstayedDays
}) => {
  return (
    <Box mb={4} sx={{ padding: 2, textAlign: 'center' }}>
      <Alert
        severity={remainingDaysToStay > 0 ? 'success' : 'error'}
        icon={false}
        variant="standard"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          justifyContent: 'center',
          mb: 0,
          border:
            remainingDaysToStay > 0 ? '1px solid #4caf50' : '1px solid #5f2120'
        }}
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>
          Days remain to stay: {remainingDaysToStay}
        </AlertTitle>
        <div>
          You have <b>used {usedDays} days</b> of stay in the last 180 days
          window.
          {!!overstayedDays && (
            <span>
              You <b>overstayed by {overstayedDays} days</b>.
            </span>
          )}
        </div>
        <div>You are allowed 90 days in a 180-day period.</div>
        {overstayedDays > 0 ? (
          <div>
            As of today, you cannot stay any longer and have <b>0 days</b>{' '}
            remaining. You could regain the right to stay only after enough
            previous days drop out of your 180-day window.
          </div>
        ) : (
          <div>
            You can stay for <b>{remainingDaysToStay} days </b> more, until{' '}
            <b>{lastDate}</b>, if you use all days at once.
          </div>
        )}
        <div>
          Want to persist the calculations results?{' '}
          <NextLink
            href="/signup"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            Register with Google
          </NextLink>{' '}
          for free and access it whenever you need it.
        </div>
      </Alert>
    </Box>
  );
};

export default Result;
