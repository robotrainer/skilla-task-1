export const getDateFromRange = (date: Date, distance: number) => {
  const startDate = new Date(date);

  startDate.setTime(startDate.getTime() - distance);

  return startDate;
};
