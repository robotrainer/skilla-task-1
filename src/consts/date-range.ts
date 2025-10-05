export const ONE_DAY = 24 * 60 * 60 * 1000;

export const DATE_RANGE = [
  {
    id: 1,
    title: "3 дня",
    range: 3 * ONE_DAY,
  },
  {
    id: 2,
    title: "Неделя",
    range: 7 * ONE_DAY,
  },
  {
    id: 3,
    title: "Месяц",
    range: 29 * ONE_DAY, // среднее количество дней в месяцах
  },
  {
    id: 4,
    title: "Год",
    range: 365 * ONE_DAY,
  },
  // {
  //   id: 5,
  //   title: "Указать даты",
  // },
];
