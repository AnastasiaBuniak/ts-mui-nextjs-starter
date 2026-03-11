import dayjs, { Dayjs } from 'dayjs';

export interface Stay {
  entry: Dayjs;
  exit: Dayjs;
  countryCode: string;
}

const TAX_RESIDENCY_LIMIT = 182;

export type TaxResidencyMode = 'calendar' | 'rolling';

export type TaxResidencyRiskLevel = 'success' | 'warning' | 'error';

export interface TaxResidencyStatus {
  usedDays: number;
  remainingDays: number;
  isTaxResident: boolean;
  riskLevel: TaxResidencyRiskLevel;
}

/**
 * Calculates tax residency exposure based on days spent in a specific country.
 * - In 'calendar' mode, counts days from Jan 1 of the current year.
 * - In 'rolling' mode, counts days from referenceDate - 365 days.
 * Both arrival and departure days are counted as full days.
 */
export const getTaxResidencyStatus = (
  stays: Stay[],
  countryCode: string,
  referenceDate: Dayjs = dayjs(),
  mode: TaxResidencyMode = 'calendar'
): TaxResidencyStatus => {
  const windowStart =
    mode === 'calendar'
      ? referenceDate.startOf('year')
      : referenceDate.subtract(365, 'day');

  let usedDays = 0;

  stays
    .filter((stay) => stay.countryCode === countryCode)
    .forEach(({ entry, exit }) => {
      const stayEntry = dayjs(entry);
      const stayExit = dayjs(exit);

      // If stay overlaps with the window [windowStart, referenceDate]
      if (stayExit.isAfter(windowStart) && stayEntry.isBefore(referenceDate)) {
        const validEnter = stayEntry.isBefore(windowStart)
          ? windowStart
          : stayEntry;
        const validExit = stayExit.isAfter(referenceDate)
          ? referenceDate
          : stayExit;
        usedDays += validExit.diff(validEnter, 'day') + 1;
      }
    });

  const remainingDays = Math.max(TAX_RESIDENCY_LIMIT - usedDays, 0);
  const isTaxResident = usedDays > TAX_RESIDENCY_LIMIT;

  let riskLevel: TaxResidencyRiskLevel = 'success';
  if (usedDays > TAX_RESIDENCY_LIMIT) {
    riskLevel = 'error';
  } else if (usedDays >= 90) {
    // 90–150+ days are considered at-risk; 151–182 remain 'warning' as well
    riskLevel = 'warning';
  }

  return {
    usedDays,
    remainingDays,
    isTaxResident,
    riskLevel
  };
};
