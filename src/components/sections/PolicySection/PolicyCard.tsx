import React, { useState } from 'react';
import Form from 'src/components/atoms/Form';
import Table from 'src/components/atoms/Table';
import { Typography, Container, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Result from 'src/components/atoms/Result';
import { ExtendedPolicy, PolicyType } from 'src/types/data';
import { Visit } from 'src/types/data';
import { Dayjs } from 'dayjs';
import { useCalculateResult } from './hooks';
import theme from 'src/utils/theme';
import { TaxResidencyMode } from 'src/utils/taxResidencyUtils';

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
  const [rule, setRule] = useState<PolicyType>(PolicyType.Schengen90_180);
  const [taxMode, setTaxMode] = useState<TaxResidencyMode>('calendar');
  const {
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    isTaxResident,
    taxRiskLevel
  } = useCalculateResult(visits, rule, taxMode);

  return (
    <Card
      key={policy._id}
      elevation={3}
      sx={{
        mb: 4,
        p: 4,
        textAlign: 'center',
        position: 'relative',
        backgroundColor: theme.colors.lightVioletBg
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
          <Typography variant="body1" sx={{ mb: 1 }}>
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
            rule={rule}
            onRuleChange={setRule}
            taxMode={taxMode}
            onTaxModeChange={setTaxMode}
          />
        </Container>

        {showResult && (
          <Result
            resultText={props.resultText}
            remainingDaysToStay={remainingDaysToStay as number}
            usedDays={usedDays}
            overstayedDays={overstayedDays}
            lastDate={lastDate ? (lastDate as Dayjs).format('DD/MM/YYYY') : ''}
            isSignedIn={true}
            ruleType={rule}
            taxMode={taxMode}
            taxRiskLevel={taxRiskLevel}
            isTaxResident={isTaxResident}
          />
        )}
      </Container>
    </Card>
  );
};
