import type { TSvgSize } from "./types";

export const SVG_SIZE: Record<TSvgSize, { width: number; height: number }> = {
  small: {
    width: 12,
    height: 12,
  },
  medium: {
    width: 24,
    height: 24,
  },
  large: {
    width: 48,
    height: 48,
  },
};
