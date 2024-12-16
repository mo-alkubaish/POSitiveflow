/**
 * Utility functions for validating numeric values and determining status based on dates.
 * 
 * - `isNumeric`: Checks if a given value contains only digits.
 * - `determineStatus`: Determines the status of a date range relative to today.
 *    - Returns "Active" if today's date falls within the range,
 *    - "Ended" if today is after the end date,
 *    - "Scheduled" if today is before the start date.
 */


export const isNumeric = (value) => /^\d+$/.test(value);
export const determineStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start <= today && today <= end) {
    return 'Active';
  } else if (today > end) {
    return 'Ended';
  } else {
    return 'Scheduled';
  }
};

