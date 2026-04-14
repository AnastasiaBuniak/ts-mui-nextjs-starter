import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Visit, PolicyType } from 'src/types/data';
import { getRemainingSchengenRuleDays } from 'src/utils/schengenRuleUtils';
import {
  getTaxResidencyStatus,
  TaxResidencyMode,
  TaxResidencyRiskLevel
} from 'src/utils/taxResidencyUtils';

export const useCalculateResult = (
  visits: Visit[],
  rule: PolicyType,
  taxMode: TaxResidencyMode
) => {
  const [remainingDaysToStay, setRemainingDaysToStay] = useState<number | null>(
    null
  );
  const [usedDays, setUsedDays] = useState<number | null>(null);
  const [overstayedDays, setOverstayedDays] = useState<number>(0);
  const [lastDate, setLastDate] = useState<Dayjs | null>(null);
  const [isTaxResident, setIsTaxResident] = useState<boolean | null>(null);
  const [taxRiskLevel, setTaxRiskLevel] =
    useState<TaxResidencyRiskLevel | null>(null);
  const showResult = remainingDaysToStay !== null && !!visits.length;

  const startCalculation = () => {
    if (rule === PolicyType.Schengen90_180) {
      const result = getRemainingSchengenRuleDays(visits);
      setUsedDays(result.usedDays);
      setRemainingDaysToStay(result.remainingDaysToStay);
      setLastDate(result.dateToStay);
      setOverstayedDays(result.overstayedDays);
      setIsTaxResident(null);
      setTaxRiskLevel(null);
      return;
    }

    const taxStays = visits.map((visit) => ({
      entry: dayjs(visit.entry),
      exit: dayjs(visit.exit)
    }));

    const taxResult = getTaxResidencyStatus(taxStays, dayjs(), taxMode);

    setUsedDays(taxResult.usedDays);
    setRemainingDaysToStay(taxResult.remainingDays);
    setLastDate(null);
    setOverstayedDays(taxResult.usedDays > 182 ? taxResult.usedDays - 182 : 0);
    setIsTaxResident(taxResult.isTaxResident);
    setTaxRiskLevel(taxResult.riskLevel);
  };

  useEffect(() => {
    if (!visits.length) {
      return;
    }
    startCalculation();
  }, [visits, rule, taxMode]);

  return {
    usedDays,
    overstayedDays,
    lastDate,
    showResult,
    remainingDaysToStay,
    isTaxResident,
    taxRiskLevel,
    startCalculation
  };
};
