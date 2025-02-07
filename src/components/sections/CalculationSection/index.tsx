import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Form from '../../atoms/Form';
import Table from '../../atoms/Table';
import type * as types from 'types';
import dayjs, {Dayjs} from 'dayjs';
import { getRemainingVisaDays } from '../../../utils/countTimeUtils';
import { CALCULATION_SECTION_ID } from 'src/utils/constants';
import Result from 'src/components/atoms/Result';

export type Props = types.CalculationSection & types.StackbitFieldPath;

export const CalculationSection: React.FC<Props> = (props) => {
  const [datesData, setDatesData] = useState<{ enter: Dayjs | null, exit: Dayjs | null, days: number }[]>([]);
  const [remainingDaysToStay, setRemainingDaysToStay] = useState<number | null>(null);
  const [usedDays, setUsedDays] = useState<number | null>(null);
  const showResult = remainingDaysToStay !== null && !!datesData.length;

  const handleSubmit = ({ enter = null, exit = null }: {enter: Dayjs | null, exit: Dayjs | null}) => {
    // ts-ignore-next-line
    setDatesData(datesData.concat(...[{ enter, exit, days: dayjs(exit).diff(enter, 'day') + 1 }]));
  };

  const deleteItem = (itemIndex: number) => {
    const updatedArray = datesData.slice(0, itemIndex).concat(...datesData.slice(itemIndex + 1));
    setDatesData(updatedArray);
  };

  const startCalculation = () => {
    const result = getRemainingVisaDays(datesData);
    setUsedDays(result.usedDays);
    setRemainingDaysToStay(result.remainingDaysToStay);
  };

  return (
    <>
    <Box id={CALCULATION_SECTION_ID} sx={{ padding: 4, backgroundColor: '#f0f4f8', borderRadius: '4px' }}>
      <Box mb={4}>
        <Typography variant="h4" align='center' color='primary' sx={{ marginTop: '8px' }}>{props.title || ''}&#58;</Typography>
      </Box>
      <Box mb={4} sx={{ width: '100%' }}>
        {!!datesData.length && <Table data={datesData} onDelete={deleteItem} />}
      </Box>
      <Form {...props} handleSubmit={handleSubmit} />
      <Box mb={4} sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
        <Button variant="contained" type="button" size='large' color="primary" onClick={startCalculation} disabled={!datesData.length} sx={{ minWidth: '230px', }}>
          Calculate
        </Button>
      </Box>
      {showResult && (<Result remainingDaysToStay={remainingDaysToStay as number} usedDays={usedDays} /> )}
    </Box>
    
    </>
  );
};

export default CalculationSection;


