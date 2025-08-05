import React, { useState } from 'react'; // Import useState
import Form from '../../atoms/Form';
import Table from '../../atoms/Table';
import {
  Typography,
  Container,
  Card,
  IconButton,
  Dialog, // Import Dialog
  DialogTitle, // Import DialogTitle
  DialogContent, // Import DialogContent
  DialogActions // Import DialogActions
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Result from '../../atoms/Result';
import { Policy } from 'src/types/data';
import { Visit } from 'src/types/data';
import { Dayjs } from 'dayjs';

// Import Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useCalculateResult } from './hooks';
import { PolicyManagement } from './PolicyManagement';

export type Props = {
  country: Policy;
  addVisit: (
    countryId: string
  ) => (data: { entry: Dayjs; exit: Dayjs }) => Promise<void>;
  deleteVisit: (visit: Visit) => Promise<void>;
  addButtonText: string;
  // New props for policy actions
  onDeletePolicy: (policyId: string) => void;
  onEditPolicy: (policyId: string) => void;
};

export const PolicyCard: React.FC<Props> = ({
  country,
  addVisit,
  deleteVisit,
  addButtonText,
  onDeletePolicy
}) => {
  const {
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    startCalculation
  } = useCalculateResult(country.visits);

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
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            {country.name}
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {country.totalDays}/180 days
          </Typography>
        </Box>
        <PolicyManagement onDeletePolicy={onDeletePolicy} country={country} />
      </Box>

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
        <Box
          mb={4}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            type="button"
            size="large"
            color="primary"
            onClick={startCalculation}
            disabled={!country.visits.length}
            sx={{ minWidth: '230px' }}
          >
            Calculate
          </Button>
        </Box>
        {showResult && (
          <Result
            remainingDaysToStay={remainingDaysToStay as number}
            usedDays={usedDays}
            overstayedDays={overstayedDays}
            lastDate={(lastDate as Dayjs).format('DD/MM/YYYY')}
          />
        )}
      </Container>
    </Card>
  );
};
