import { type ISvgProps } from "../types";

export const ArrowSVG = ({ color, width = 24, height = 24, rotate = 0 }: ISvgProps) => (
  <svg
    width={width}
    height={height}
    transform={`rotate(${rotate})`}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5217 7.17704L17.3447 6L7.66957 15.6751V10.1739H6V18.5217H14.3478V16.8522H8.84661L18.5217 7.17704Z"
      fill={color}
    />
  </svg>
);
