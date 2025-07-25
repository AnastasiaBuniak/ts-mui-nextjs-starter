import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useManageUserVisits } from './hooks';
import Form from '../../atoms/Form';
import Table from '../../atoms/Table';
import { Typography, List, Container, Card } from '@mui/material';
import { ExtendedPolicy } from 'src/types/data';
import { Visit } from 'src/types/data';

export type Props = {
  type: 'DashboardSection';
  title: string;
  addButtonText: string;
};

export const DashboardSection: React.FC<Props> = ({ title, addButtonText }) => {
  const { user } = useAuth();
  const { policies, isLoading, addVisit, deleteVisit } = useManageUserVisits({
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
              <Card
                key={country._id}
                elevation={3}
                sx={{
                  background: '#6366f1',
                  color: 'white',
                  borderRadius: 3,
                  mb: 4,
                  p: 4,
                  textAlign: 'center'
                }}
              >
                <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {country.totalDays}/180 days
                </Typography>
                <Container
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 3,
                    mt: 2,
                    pt: 2,
                    pb: 2
                  }}
                >
                  <Table
                    data={country.visits}
                    onDelete={(item) => deleteVisit(item as Visit)}
                    tableHeadStyles={{
                      borderRadius: 3,
                      backgroundColor: '#f5f5f5'
                    }}
                  />
                  <Container
                    sx={{
                      pt: 4
                    }}
                  >
                    <Form
                      handleSubmit={addVisit(country._id)}
                      addButtonText={addButtonText}
                    />
                  </Container>
                </Container>
              </Card>
            );
          })}
        </List>
      </Container>
    </Container>
  );
};
