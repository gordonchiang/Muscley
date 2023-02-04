/*
 * Converts a date object into YYYY-MM-DD string format.
 */
export const dateObjectToDateString = (date: Date): string => {
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
