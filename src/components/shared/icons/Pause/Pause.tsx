import { type ISvgProps } from "../types";

export const PauseSVG = ({ color, width = 24, height = 24, rotate = 0 }: ISvgProps) => (
  <svg
    width={width}
    height={height}
    transform={`rotate(${rotate})`}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="12" fill="white" />
    <path d="M8 16H10.6667V8H8V16ZM13.3333 8V16H16V8H13.3333Z" fill={color} />
  </svg>
);
