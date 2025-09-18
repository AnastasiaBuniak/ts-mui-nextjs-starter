import React from 'react';
import type * as types from 'types';
import { useGetUserPolicy } from './hooks';
import { Typography, Container, CircularProgress, Box } from '@mui/material';
import { PolicyCard } from './PolicyCard';

export type Props = {
  type: 'PolicySection';
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

export const PolicySection: React.FC<Props> = ({ title, ...props }) => {
  const { userPolicy, isLoading, addPolicyVisit, deletePolicyVisit } =
    useGetUserPolicy({
      id: props.path.id as string | undefined
    });

  if (isLoading || !userPolicy || !userPolicy.visits.length) {
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
        Policy id: {props.path.id}
      </Typography>
      <PolicyCard
        policy={userPolicy}
        visits={userPolicy.visits}
        addVisit={addPolicyVisit}
        deleteVisit={deletePolicyVisit}
        addButtonText={props.addButtonText}
        resultText={props.resultText}
        selectedDateText={props.selectedDateText}
      />
    </Container>
  );
};
