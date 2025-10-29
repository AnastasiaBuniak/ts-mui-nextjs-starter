import React from 'react';
import type * as types from 'types';
import { useGetUserPolicy } from './hooks';
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Button
} from '@mui/material';
import { PolicyCard } from './PolicyCard';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Add this import

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
  const router = useRouter();

  const { userPolicy, isLoading, addPolicyVisit, deletePolicyVisit } =
    useGetUserPolicy({
      id: props.path?.id as string | undefined
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
      <Button
        variant="outlined"
        color="inherit"
        sx={{
          mb: 3,
          bgcolor: '#fff',
          borderColor: '#ccc',
          color: '#333',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': {
            bgcolor: '#f9f9f9',
            borderColor: '#bbb'
          }
        }}
        onClick={() => router.push('/dashboard')}
        startIcon={<ArrowBackIcon />} // Add this prop
      >
        Back
      </Button>
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
