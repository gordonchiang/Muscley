export const dateObjectToDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
