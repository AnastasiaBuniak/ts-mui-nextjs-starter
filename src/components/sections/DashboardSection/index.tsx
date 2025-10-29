import React from 'react';
import type * as types from 'types';
import { useAuth } from 'src/components/context/AuthContext';
import { useManageUserVisits } from './hooks';
import {
  Typography,
  List,
  Container,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Box
} from '@mui/material';
import { ExtendedPolicy } from 'src/types/data';
import { AddNewPolicyBlock } from './AddNewPolicyBlock';
import { PolicyCard } from './PolicyCard';

export type Props = {
  type: 'DashboardSection';
  title: string;
  addButtonText: string;
  selectedDateText: string;
  resultText: {
    daysRemainToStay: string;
    wantToPersistResults: string;
    registerCta: string;
    registerCta2: string;
  };
} & types.StackbitFieldPath;

export const DashboardSection: React.FC<Props> = ({
  title,
  addButtonText,
  selectedDateText,
  resultText
}) => {
  const { user } = useAuth();
  const { policies, isLoading, addPolicy, deletePolicy, editPolicy } =
    useManageUserVisits({
      user
    });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading || !user) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          borderRadius: 3,
          width: '100%'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        px: isMobile ? 0 : 2,
        bgcolor: isMobile
          ? theme.colors.white
          : theme.colors.lightNeutralGreyBg,
        borderRadius: 1
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: 4
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: isMobile ? 'center' : 'flex-start',
          mb: 3
        }}
      >
        {policies.map((policy: ExtendedPolicy) => {
          return (
            <Box
              key={policy._id}
              sx={{
                flex: '1 0 auto',
                maxWidth: '300px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              <PolicyCard
                key={policy._id}
                policy={policy}
                visits={policy.visits || []}
                addButtonText={addButtonText}
                onDeletePolicy={deletePolicy}
                onEditPolicy={editPolicy}
                selectedDateText={selectedDateText}
                resultText={resultText}
              />
            </Box>
          );
        })}
      </Box>
      <AddNewPolicyBlock addPolicy={addPolicy} />
    </Container>
  );
};
