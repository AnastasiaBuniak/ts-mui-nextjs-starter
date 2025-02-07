import dayjs, { Dayjs } from 'dayjs';

/**
 * Calculates the remaining Schengen visa days based on the 90/180 rule.
 * @param {Array} stays - List of stay periods [{ enter: dayjs, exit: dayjs }]
 * @param {dayjs} referenceDate - The date to check remaining days (defaults to today)
 * @param {number} windowDays - Rolling window duration (defaults to 180 days)
 * @returns {number} Remaining days in the Schengen area
 */
export const getRemainingVisaDays = (
  stays: any[],
  referenceDate: Dayjs = dayjs(),
  windowDays: number = 180
) => {
  const visaLimit = 90;
  const windowStart = referenceDate.subtract(windowDays, 'day');

  // Calculate days spent within the rolling window
  let usedDays = 1;

  stays.forEach(({ enter, exit }) => {
    // If stay overlaps with the rolling window
    if (exit.isAfter(windowStart) && enter.isBefore(referenceDate)) {
      const validEnter = enter.isBefore(windowStart) ? windowStart : enter;
      const validExit = exit.isAfter(referenceDate) ? referenceDate : exit;
      usedDays += validExit.diff(validEnter, 'day');
    }
  });

  return {
    remainingDaysToStay: Math.max(visaLimit - usedDays, 0),
    usedDays: usedDays,
    referenceDate,
    windowStart
  };
};

// // Example usage
// const stays = [
//   { enter: dayjs("2024-01-01"), exit: dayjs("2024-01-30") },
//   { enter: dayjs("2024-05-01"), exit: dayjs("2024-05-30") },
// ];

// console.log(getRemainingVisaDays(stays)); // Outputs remaining days
