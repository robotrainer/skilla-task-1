/// <reference lib="dom" />

interface IGetDateStringOptions {
  withTime?: boolean;
}

export const getDateString = (date: Date, options?: IGetDateStringOptions) => {
  return date.toLocaleString(
    "ru-Ru",
    options?.withTime
      ? {}
      : {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
  );
};
