import React, { useEffect } from 'react';
import Form from 'src/components/atoms/Form';
import Table from 'src/components/atoms/Table';
import { Typography, Container, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Result from 'src/components/atoms/Result';
import { ExtendedPolicy } from 'src/types/data';
import { Visit } from 'src/types/data';
import { Dayjs } from 'dayjs';
import { useCalculateResult } from './hooks';

export type Props = {
  policy: ExtendedPolicy;
  visits: Visit[];
  addVisit: (data: { entry: Dayjs; exit: Dayjs }) => Promise<void>;
  deleteVisit: (visit: Visit) => Promise<void>;
  addButtonText: string;
  resultText: {
    daysRemainToStay: string;
    wantToPersistResults: string;
    registerCta: string;
    registerCta2: string;
  };
  selectedDateText: string;
};

export const PolicyCard: React.FC<Props> = ({
  policy,
  visits,
  addVisit,
  deleteVisit,
  ...props
}) => {
  const {
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    startCalculation
  } = useCalculateResult(visits);

  useEffect(() => {
    if (visits.length) {
      startCalculation();
    }
  }, [visits.length]);

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
      </Box>

      <Container
        sx={{
          backgroundColor: '#fff',
          borderRadius: 3,
          overflow: 'hidden',
          mt: 2,
          pt: 2,
          pb: 2
        }}
      >
        <Table
          data={visits}
          onDelete={deleteVisit as unknown as (item: unknown) => void}
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
            handleSubmit={addVisit}
            addButtonText={props.addButtonText}
            selectedDateText={props.selectedDateText}
          />
        </Container>

        {showResult && (
          <Result
            resultText={props.resultText}
            remainingDaysToStay={remainingDaysToStay as number}
            usedDays={usedDays}
            overstayedDays={overstayedDays}
            lastDate={(lastDate as Dayjs).format('DD/MM/YYYY')}
            isSignedIn={true}
          />
        )}
      </Container>
    </Card>
  );
};
