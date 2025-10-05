export const changeFormatStringDate = (date: string) => {
  return date.split(".").reverse().join("-");
};
