import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { getRemainingSchengenRuleDays } from 'src/utils/schengenRuleUtils';
import { VisitItem } from 'src/types/data';

export const useVisaDaysCalculation = () => {
  const [datesData, setDatesData] = useState<
    { entry: Dayjs | null; exit: Dayjs | null; days: number }[]
  >([]);

  const [remainingDaysToStay, setRemainingDaysToStay] = useState<number | null>(
    null
  );

  const [usedDays, setUsedDays] = useState<number | null>(null);
  const [overstayedDays, setOverstayedDays] = useState<number>(0);
  const [lastDate, setLastDate] = useState<Dayjs | null>(null);
  const showResult = remainingDaysToStay !== null && !!datesData.length;

  const startCalculation = () => {
    const result = getRemainingSchengenRuleDays(datesData);
    setUsedDays(result.usedDays);
    setRemainingDaysToStay(result.remainingDaysToStay);
    setLastDate(result.dateToStay);
    setOverstayedDays(result.overstayedDays);
  };

  const addDate = ({
    entry = null,
    exit = null
  }: {
    entry: Dayjs | null;
    exit: Dayjs | null;
  }) => {
    setDatesData(
      datesData.concat(
        ...[{ entry, exit, days: dayjs(exit).diff(entry, 'day') + 1 }]
      )
    );
  };

  const deleteDate = (item: VisitItem) => {
    const itemIndex = item.index;
    const updatedArray = datesData
      .slice(0, itemIndex)
      .concat(...datesData.slice(itemIndex + 1));
    setDatesData(updatedArray);
    setRemainingDaysToStay(null);
  };

  useEffect(() => {
    if (datesData.length) {
      startCalculation();
    }
  }, [datesData]);

  return {
    datesData,
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    deleteDate,
    addDate,
    startCalculation
  };
};
