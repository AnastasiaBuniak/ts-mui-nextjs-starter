import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import {
  TaxResidencyMode,
  TaxResidencyRiskLevel
} from 'src/utils/taxResidencyUtils';

type RuleType = 'schengen-90-180' | 'tax-183';

interface ResultProps {
  remainingDaysToStay: number;
  usedDays: number | null;
  lastDate: string;
  overstayedDays: number;
  onRegisterClick?: () => void;
  isSignedIn?: boolean;
  ruleType?: RuleType;
  taxMode?: TaxResidencyMode;
  taxRiskLevel?: TaxResidencyRiskLevel | null;
  isTaxResident?: boolean | null;
  resultText: {
    daysRemainToStay: string;
    wantToPersistResults: string;
    registerCta: string;
    registerCta2: string;
  };
}

const Result: React.FC<ResultProps> = ({
  remainingDaysToStay,
  usedDays,
  lastDate,
  overstayedDays,
  onRegisterClick,
  isSignedIn = false,
  ruleType = 'schengen-90-180',
  taxMode = 'calendar',
  taxRiskLevel,
  isTaxResident,
  resultText
}) => {
  const isSchengen = ruleType === 'schengen-90-180';

  const getTaxSeverity = (): 'success' | 'warning' | 'error' => {
    if (taxRiskLevel === 'error') return 'error';
    if (taxRiskLevel === 'warning') return 'warning';
    return 'success';
  };

  return (
    <Box mb={4} sx={{ padding: 2, textAlign: 'center' }}>
      <Alert
        severity={
          isSchengen
            ? remainingDaysToStay > 0
              ? 'success'
              : 'error'
            : getTaxSeverity()
        }
        icon={false}
        variant="standard"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          justifyContent: 'center',
          mb: 0,
          border:
            isSchengen && remainingDaysToStay <= 0
              ? '1px solid #5f2120'
              : '1px solid #4caf50'
        }}
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>
          {isSchengen
            ? `${resultText.daysRemainToStay}: ${remainingDaysToStay}`
            : `Days before 183-day tax threshold: ${remainingDaysToStay}`}
        </AlertTitle>
        {isSchengen ? (
          <>
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
          </>
        ) : (
          <>
            <div>
              You have <b>used {usedDays} days</b> of presence in the selected{' '}
              {taxMode === 'calendar' ? 'calendar year' : 'rolling 365-day'}{' '}
              window.
              {!!overstayedDays && (
                <span>
                  {' '}
                  You have exceeded the 183-day threshold by{' '}
                  <b>{overstayedDays} days</b>.
                </span>
              )}
            </div>
            <div>The tax residency threshold is 183 days in a year.</div>
            {isTaxResident ? (
              <div>
                You are likely to be considered a <b>tax resident</b> under the
                183-day rule. Please consult a qualified tax advisor for your
                specific situation.
              </div>
            ) : (
              <div>
                You have <b>{remainingDaysToStay} days</b> before reaching the
                183-day tax residency threshold in this window.
              </div>
            )}
          </>
        )}
        <div>
          {isSignedIn ? null : (
            <>
              {' '}
              {resultText.wantToPersistResults}{' '}
              <NextLink
                onClick={onRegisterClick}
                href="/signup"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                {resultText.registerCta}
              </NextLink>{' '}
              {resultText.registerCta2}
            </>
          )}
        </div>
      </Alert>
    </Box>
  );
};

export default Result;
