export type TSvgSize = "small" | "medium" | "large";

export interface ISvgProps {
  color: string;
  size?: TSvgSize;
  rotate?: number;
}
