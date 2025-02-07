import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Typography, Button } from '@mui/material';
import Form from '../../atoms/Form';
import Table from '../../atoms/Table';
import type * as types from 'types';
import dayjs, {Dayjs} from 'dayjs';
import { getRemainingVisaDays } from '../../../utils/countTimeUtils';

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
    <Box sx={{ padding: 4, backgroundColor: '#f0f4f8', borderRadius: '8px' }}>
      <Box mb={4}>
        <Typography variant="h3" align='center' color='primary' sx={{ marginTop: '8px' }}>{props.title || ''}</Typography>
      </Box>
      <Box mb={4} sx={{ width: '100%' }}>
        {!!datesData.length && <Table data={datesData} onDelete={deleteItem} />}
      </Box>
      <Box mb={4} sx={{ width: '100%' }}>
        <Form {...props} handleSubmit={handleSubmit} />
      </Box>
      <Box mb={4} sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', marginBottom: 0 }}>
        <Button variant="contained" size="large" color="primary" onClick={startCalculation} disabled={!datesData.length} sx={{ minWidth: '230px'}}>
          Calculate
        </Button>
      </Box>
      {showResult && (
      <Box mb={4} sx={{  padding: 2, textAlign: 'center' }}>
       <Alert icon={<div/>} sx={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', marginBottom: 0 }}>
       <AlertTitle sx={{fontWeight: 'bold'}}>Days remain to stay: {remainingDaysToStay}.</AlertTitle>
         <div>You&apos;ve spent {usedDays} days in the 180 days window</div>
       </Alert>
      </Box>
    )}
    </Box>
    
    </>
  );
};

export default CalculationSection;


