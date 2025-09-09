import React from 'react';
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
import { VisitItem } from 'src/types/data';
import Cookies from 'js-cookie';

export type Props = types.CalculationSection & types.StackbitFieldPath;

export const CalculationSection: React.FC<Props> = (props) => {
  const {
    datesData,
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    deleteDate,
    addDate
  } = useVisaDaysCalculation();

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
      <Form {...props} handleSubmit={addDate} />
      {showResult && (
        <Result
          remainingDaysToStay={remainingDaysToStay as number}
          usedDays={usedDays}
          overstayedDays={overstayedDays}
          lastDate={(lastDate as Dayjs).format('DD/MM/YYYY')}
          onRegisterClick={onRegisterClick}
        />
      )}
    </Card>
  );
};

export default CalculationSection;
