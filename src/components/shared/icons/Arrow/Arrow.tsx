// width="13" height="13" viewBox="0 0 13 13"

import { SVG_SIZE, type ISvgProps } from "../lib";

export const ArrowSVG = ({ color, size = "small", rotate }: ISvgProps) => (
  <svg
    style={{ margin: 6 }}
    width={SVG_SIZE[size].width}
    height={SVG_SIZE[size].height}
    transform={`rotate(${rotate})`}
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z"
      fill={color}
    />
  </svg>
);
