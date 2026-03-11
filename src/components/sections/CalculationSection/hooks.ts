import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { getRemainingSchengenRuleDays } from 'src/utils/schengenRuleUtils';
import {
  getTaxResidencyStatus,
  TaxResidencyMode,
  TaxResidencyRiskLevel
} from 'src/utils/taxResidencyUtils';
import { VisitItem } from 'src/types/data';

export type CalculatorRuleType = 'schengen-90-180' | 'tax-183';

export const useVisaDaysCalculation = (
  rule: CalculatorRuleType,
  taxMode: TaxResidencyMode,
  countryCode: string
) => {
  const [datesData, setDatesData] = useState<
    { entry: Dayjs | null; exit: Dayjs | null; days: number }[]
  >([]);

  const [remainingDaysToStay, setRemainingDaysToStay] = useState<number | null>(
    null
  );

  const [usedDays, setUsedDays] = useState<number | null>(null);
  const [overstayedDays, setOverstayedDays] = useState<number>(0);
  const [lastDate, setLastDate] = useState<Dayjs | null>(null);
  const [isTaxResident, setIsTaxResident] = useState<boolean | null>(null);
  const [taxRiskLevel, setTaxRiskLevel] =
    useState<TaxResidencyRiskLevel | null>(null);
  const showResult = remainingDaysToStay !== null && !!datesData.length;

  const startCalculation = () => {
    if (rule === 'schengen-90-180') {
      const result = getRemainingSchengenRuleDays(datesData);
      setUsedDays(result.usedDays);
      setRemainingDaysToStay(result.remainingDaysToStay);
      setLastDate(result.dateToStay);
      setOverstayedDays(result.overstayedDays);
      setIsTaxResident(null);
      setTaxRiskLevel(null);
      return;
    }

    const taxStays = datesData
      .filter((item) => item.entry && item.exit)
      .map((item) => ({
        entry: item.entry as Dayjs,
        exit: item.exit as Dayjs,
        countryCode: 'XX'
      }));

    const taxResult = getTaxResidencyStatus(
      taxStays,
      countryCode || 'XX',
      dayjs(),
      taxMode
    );

    setUsedDays(taxResult.usedDays);
    setRemainingDaysToStay(taxResult.remainingDays);
    setLastDate(null);
    setOverstayedDays(taxResult.usedDays > 182 ? taxResult.usedDays - 182 : 0);
    setIsTaxResident(taxResult.isTaxResident);
    setTaxRiskLevel(taxResult.riskLevel);
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
  }, [datesData, rule, taxMode, countryCode]);

  return {
    datesData,
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    isTaxResident,
    taxRiskLevel,
    taxMode,
    deleteDate,
    addDate,
    startCalculation
  };
};
