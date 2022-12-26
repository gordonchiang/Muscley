export const dateToDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
