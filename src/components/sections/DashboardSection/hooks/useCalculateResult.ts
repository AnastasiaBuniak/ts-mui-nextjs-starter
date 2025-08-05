import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { Visit } from 'src/types/data';
import { getRemainingVisaDays } from 'src/utils/countTimeUtils';

export const useCalculateResult = (visits: Visit[]) => {
  const [remainingDaysToStay, setRemainingDaysToStay] = useState<number | null>(
    null
  );
  const [usedDays, setUsedDays] = useState<number | null>(null);
  const [overstayedDays, setOverstayedDays] = useState<number>(0);
  const [lastDate, setLastDate] = useState<Dayjs | null>(null);
  const showResult = remainingDaysToStay !== null && !!visits.length;

  const startCalculation = () => {
    const result = getRemainingVisaDays(visits);
    setUsedDays(result.usedDays);
    setRemainingDaysToStay(result.remainingDaysToStay);
    setLastDate(result.dateToStay);
    setOverstayedDays(result.overstayedDays);
  };

  return {
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    startCalculation
  };
};
