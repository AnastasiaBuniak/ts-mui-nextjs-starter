import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Card } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import { ExtendedPolicy } from 'src/types/data';
import { Visit } from 'src/types/data';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { getSchengenRuleResultColor } from 'src/utils/schengenRuleUtils';

import { PolicyManagement } from './PolicyManagement';
import { DeletePolicyParams, EditPolicyParams } from 'src/types/api-types';
import { localePath } from 'src/utils/i18n';
import theme from 'src/utils/theme';

export type Props = {
  policy: ExtendedPolicy;
  visits: Visit[];
  addButtonText?: string;
  selectedDateText?: string;
  resultText?: {
    daysRemainToStay: string;
    wantToPersistResults: string;
    registerCta: string;
    registerCta2: string;
  };
  onDeletePolicy: ({ id }: DeletePolicyParams) => void;
  onEditPolicy: ({ id, name, description }: EditPolicyParams) => void;
};

export const PolicyCard: React.FC<Props> = ({
  policy,
  onDeletePolicy,
  onEditPolicy
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const isTaxResidencyRule =
    policy.allowedRuleWindow === 183 && policy.ruleWindow === 365;
  const ruleLabel = isTaxResidencyRule
    ? t('dashboard.taxResidency')
    : t('dashboard.ruleLabel', {
        allowed: policy.allowedRuleWindow,
        window: policy.ruleWindow
      });

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-policy-management]')) return;
    router.push(
      localePath(
        `/policy?id=${policy._id}`,
        router.locale || router.defaultLocale
      )
    );
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        minHeight: '220px',
        py: 2,
        px: 1,
        textAlign: 'center',
        position: 'relative',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          boxShadow: 6
        }
      }}
      variant="inApp"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={t('dashboard.viewPolicyAria', { name: policy.name })}
    >
      <CardContent
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: 0 }}
      >
        <Typography
          variant="h5"
          color={theme.palette.text.primary}
          fontWeight={600}
          sx={{
            mb: 1,
            mr: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {policy.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1, alignSelf: 'flex-start', textAlign: 'left' }}
        >
          {policy.description}
        </Typography>
        <Box sx={{ display: 'flex', mt: 'auto', alignItems: 'center', gap: 1 }}>
          <Chip
            color={getSchengenRuleResultColor({
              allowed: policy.allowedRuleWindow,
              current: policy.totalDays
            })}
            label={t('dashboard.daysUsed', {
              count: policy.totalDays,
              unit:
                policy.totalDays === 1
                  ? t('dashboard.day')
                  : t('dashboard.days')
            })}
          />

          <Chip color="primary" label={ruleLabel} />
        </Box>
      </CardContent>
      <CardActions onClick={(e) => e.stopPropagation()} data-policy-management>
        <PolicyManagement
          onDeletePolicy={onDeletePolicy}
          onEditPolicy={onEditPolicy}
          policy={policy}
        />
      </CardActions>
    </Card>
  );
};
