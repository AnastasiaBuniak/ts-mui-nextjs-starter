import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useManageUserVisits } from './hooks';
import { Typography, List, Container } from '@mui/material';
import { ExtendedPolicy } from 'src/types/data';
import { AddNewPolicyBlock } from './AddNewPolicyBlock';
import { PolicyCard } from './Policy';

export type Props = {
  type: 'DashboardSection';
  title: string;
  addButtonText: string;
};

export const DashboardSection: React.FC<Props> = ({ title, addButtonText }) => {
  const { user } = useAuth();
  const { policies, isLoading, addVisit, deleteVisit, addPolicy } =
    useManageUserVisits({
      user
    });

  if (isLoading) {
    return 'Loading...';
  }
  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4, bgcolor: '#f5f5f5', borderRadius: 3 }}
    >
      <Container maxWidth="md" sx={{ py: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <List disablePadding>
          {policies.map((country: ExtendedPolicy) => {
            return (
              <PolicyCard
                key={country._id}
                country={country}
                addVisit={addVisit}
                deleteVisit={deleteVisit}
                addButtonText={addButtonText}
              />
            );
          })}
        </List>
        <AddNewPolicyBlock addPolicy={addPolicy} />
      </Container>
    </Container>
  );
};
