export const classNames = (...args: unknown[]): string => {
  return [...args].filter((cl) => cl).join(" ");
};
