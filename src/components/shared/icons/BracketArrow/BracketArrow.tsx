import { type ISvgProps } from "../types";

export const BracketArrowSVG = ({ color, width = 24, height = 24, rotate = 0 }: ISvgProps) => (
  // <svg
  //   width={SVG_SIZE[size].width}
  //   height={SVG_SIZE[size].height}
  //   transform={`rotate(${rotate})`}
  //   viewBox="0 0 7 10"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     d="M0.589844 8.825L4.40651 5L0.589844 1.175L1.76484 0L6.76484 5L1.76484 10L0.589844 8.825Z"
  //     fill={color}
  //   />
  // </svg>

  <svg
    width={width}
    height={height}
    transform={`rotate(${rotate})`}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_866)">
      <path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" fill={color} />
    </g>
    <defs>
      <clipPath id="clip0_1_866">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
