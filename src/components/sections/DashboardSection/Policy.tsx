import React from 'react';
import Form from '../../atoms/Form';
import Table from '../../atoms/Table';
import { Typography, Container, Card, IconButton } from '@mui/material'; // Import IconButton
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
  onDeletePolicy, // Destructure new props
  onEditPolicy // Destructure new props
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
        position: 'relative' // Needed for absolute positioning of buttons
      }}
    >
      {/* Container for title and buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1 // Adjust margin as needed
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          {' '}
          {/* Centers the text */}
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            {country.name}
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {country.totalDays}/180 days
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {' '}
          {/* Buttons container */}
          <IconButton
            aria-label="edit policy"
            onClick={() => onEditPolicy(country._id)}
            sx={{ color: 'white' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete policy"
            onClick={() => onDeletePolicy(country._id)}
            sx={{ color: 'white' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
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
