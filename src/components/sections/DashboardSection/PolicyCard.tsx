import React from 'react';
import Form from 'src/components/atoms/Form';
import Table from 'src/components/atoms/Table';
import { Typography, Container, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Result from 'src/components/atoms/Result';
import { ExtendedPolicy } from 'src/types/data';
import { Visit } from 'src/types/data';
import { Dayjs } from 'dayjs';

import { useCalculateResult } from './hooks';
import { PolicyManagement } from './PolicyManagement';
import { DeletePolicyParams } from 'src/types/api-types';

export type Props = {
  policy: ExtendedPolicy;
  addVisit: (
    countryId: string
  ) => (data: { entry: Dayjs; exit: Dayjs }) => Promise<void>;
  deleteVisit: (visit: Visit) => Promise<void>;
  addButtonText: string;
  onDeletePolicy: ({ id }: DeletePolicyParams) => void;
};

export const PolicyCard: React.FC<Props> = ({
  policy,
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
  } = useCalculateResult(policy.visits);

  return (
    <Card
      key={policy._id}
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
            {policy.name}
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {policy.totalDays}/180 days
          </Typography>
        </Box>
        <PolicyManagement onDeletePolicy={onDeletePolicy} policy={policy} />
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
          data={policy.visits}
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
            handleSubmit={addVisit(policy._id)}
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
            disabled={!policy.visits.length}
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
