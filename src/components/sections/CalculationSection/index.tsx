import React, { useState } from 'react';
import type * as types from 'types';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Form from 'src/components/atoms/Form';
import Table from 'src/components/atoms/Table';
import { CALCULATION_SECTION_ID } from 'src/utils/constants';
import Result from 'src/components/atoms/Result';
import { useVisaDaysCalculation } from './hooks';
import { VisitItem, PolicyType } from 'src/types/data';
import Cookies from 'js-cookie';
import { TaxResidencyMode } from 'src/utils/taxResidencyUtils';

export type Props = types.CalculationSection & types.StackbitFieldPath;

export const CalculationSection: React.FC<Props> = (props) => {
  const [rule, setRule] = useState<PolicyType>(PolicyType.Schengen90_180);
  const [taxMode, setTaxMode] = useState<TaxResidencyMode>('calendar');
  const [country, setCountry] = useState<string>('');
  const {
    datesData,
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    isTaxResident,
    taxRiskLevel,
    deleteDate,
    addDate
  } = useVisaDaysCalculation(rule, taxMode, country);

  const onRegisterClick = () => {
    const rawData = datesData.map(({ entry, exit }) => {
      return {
        entry: dayjs(entry).valueOf(),
        exit: dayjs(exit).valueOf()
      };
    });
    Cookies.set('datesData', JSON.stringify(rawData), { expires: 1 / 24 });
  };

  return (
    <Card
      id={CALCULATION_SECTION_ID}
      sx={{ backgroundColor: '#EFF5FB', mt: 3 }}
    >
      <CardHeader
        mb={4}
        component="h2"
        title={`${props.title}:`}
        sx={{ backgroundColor: '#4C57C5', color: 'white', mt: 0 }}
      />
      <Box mb={4} sx={{ width: '100%' }}>
        {!!datesData.length && (
          <Table
            data={datesData}
            onDelete={(item) => deleteDate(item as VisitItem)}
            tableHeadStyles={{
              fontWeight: 'bold'
            }}
          />
        )}
      </Box>
      <Form
        {...props}
        handleSubmit={addDate}
        rule={rule}
        onRuleChange={(newRule) => setRule(newRule)}
        country={country}
        onCountryChange={(newCountry) => setCountry(newCountry)}
        taxMode={taxMode}
        onTaxModeChange={(newMode) => setTaxMode(newMode)}
      />
      {showResult && (
        <Result
          remainingDaysToStay={remainingDaysToStay as number}
          usedDays={usedDays}
          overstayedDays={overstayedDays}
          lastDate={lastDate ? (lastDate as Dayjs).format('DD/MM/YYYY') : ''}
          onRegisterClick={onRegisterClick}
          ruleType={rule}
          taxMode={taxMode}
          taxRiskLevel={taxRiskLevel}
          isTaxResident={isTaxResident}
          resultText={props.resultText}
        />
      )}
    </Card>
  );
};

export default CalculationSection;
