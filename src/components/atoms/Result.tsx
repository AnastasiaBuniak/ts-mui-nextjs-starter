import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import {
  TaxResidencyMode,
  TaxResidencyRiskLevel
} from 'src/utils/taxResidencyUtils';
import { PolicyType } from 'src/types/data';
import { localePath } from 'src/utils/i18n';

interface ResultProps {
  remainingDaysToStay: number;
  usedDays: number | null;
  lastDate: string;
  overstayedDays: number;
  onRegisterClick?: () => void;
  isSignedIn?: boolean;
  ruleType?: PolicyType;
  taxMode?: TaxResidencyMode;
  taxRiskLevel?: TaxResidencyRiskLevel | null;
  isTaxResident?: boolean | null;
}

const Result: React.FC<ResultProps> = ({
  remainingDaysToStay,
  usedDays,
  lastDate,
  overstayedDays,
  onRegisterClick,
  isSignedIn = false,
  ruleType = PolicyType.Schengen90_180,
  taxMode = 'calendar',
  taxRiskLevel,
  isTaxResident
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale || router.defaultLocale || 'en';
  const isSchengen = ruleType === PolicyType.Schengen90_180;

  const getTaxSeverity = (): 'success' | 'warning' | 'error' => {
    if (taxRiskLevel === 'error') return 'error';
    if (taxRiskLevel === 'warning') return 'warning';
    return 'success';
  };

  const taxWindowLabel =
    taxMode === 'calendar' ? t('result.calendarYear') : t('result.rolling365');

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
            ? `${t('result.daysRemainToStay')}: ${remainingDaysToStay}`
            : `${t('result.daysBeforeTaxThreshold')}: ${remainingDaysToStay}`}
        </AlertTitle>
        {isSchengen ? (
          <>
            <div>
              <Trans
                i18nKey="result.schengenUsedDays"
                values={{ days: usedDays }}
                components={{ strong: <strong /> }}
              />
              {!!overstayedDays && (
                <span>
                  {' '}
                  <Trans
                    i18nKey="result.overstayedBy"
                    values={{ days: overstayedDays }}
                    components={{ strong: <strong /> }}
                  />
                </span>
              )}
            </div>
            <div>{t('result.allowed90Days')}</div>
            {overstayedDays > 0 ? (
              <div>
                <Trans
                  i18nKey="result.noDaysRemaining"
                  components={{ strong: <strong /> }}
                />
              </div>
            ) : (
              <div>
                <Trans
                  i18nKey="result.stayUntilDate"
                  values={{ days: remainingDaysToStay, date: lastDate }}
                  components={{ strong: <strong /> }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <Trans
                i18nKey="result.taxUsedDays"
                values={{ days: usedDays, window: taxWindowLabel }}
                components={{ strong: <strong /> }}
              />
              {!!overstayedDays && (
                <span>
                  {' '}
                  <Trans
                    i18nKey="result.overstayedTaxBy"
                    values={{ days: overstayedDays }}
                    components={{ strong: <strong /> }}
                  />
                </span>
              )}
            </div>
            <div>{t('result.taxThreshold')}</div>
            {isTaxResident ? (
              <div>
                <Trans
                  i18nKey="result.likelyTaxResident"
                  components={{ strong: <strong /> }}
                />
              </div>
            ) : (
              <div>
                <Trans
                  i18nKey="result.remainingBeforeTax"
                  values={{ days: remainingDaysToStay }}
                  components={{ strong: <strong /> }}
                />
              </div>
            )}
          </>
        )}
        <div>
          {isSignedIn ? null : (
            <>
              {' '}
              {t('result.wantToPersistResults')}{' '}
              <NextLink
                onClick={onRegisterClick}
                href={localePath('/signup', locale)}
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                {t('result.registerCta')}
              </NextLink>{' '}
              {t('result.registerCta2')}
            </>
          )}
        </div>
      </Alert>
    </Box>
  );
};

export default Result;
