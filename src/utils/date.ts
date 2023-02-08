/**
 * Converts a date object into an ISO 8601-formatted string (YYYY-MM-DD).
 * @param {Date} date A date object.
 * @returns {string} The local date as an ISO 8601-formatted string (YYYY-MM-DD). 
 **/
export const dateObjectToString = (date: Date): string => {
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
