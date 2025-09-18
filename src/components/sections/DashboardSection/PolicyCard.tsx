import React from 'react';
import { Typography, Card } from '@mui/material';
import Box from '@mui/material/Box';
import { ExtendedPolicy } from 'src/types/data';
import { Visit } from 'src/types/data';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';

import { PolicyManagement } from './PolicyManagement';
import { DeletePolicyParams, EditPolicyParams } from 'src/types/api-types';

export type Props = {
  policy: ExtendedPolicy;
  visits: Visit[];
  onDeletePolicy: ({ id }: DeletePolicyParams) => void;
  onEditPolicy: ({ id, name, description }: EditPolicyParams) => void;
};

export const PolicyCard: React.FC<Props> = ({
  policy,
  onDeletePolicy,
  onEditPolicy
}) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-policy-management]')) return;
    router.push(`/policy?id=${policy._id}`);
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        background: '#6366f1',
        color: 'white',
        borderRadius: 3,
        mb: 4,
        p: 4,
        textAlign: 'center',
        position: 'relative',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          boxShadow: 6,
          background: '#4f46e5'
        }
      }}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View policy ${policy.name}`}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          mb: 1
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            {policy.name}
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
            {policy.description}
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {policy.totalDays}/180 days
          </Typography>
        </Box>
        <Box data-policy-management>
          <PolicyManagement
            onDeletePolicy={onDeletePolicy}
            onEditPolicy={onEditPolicy}
            policy={policy}
          />
        </Box>
      </Box>
    </Card>
  );
};
