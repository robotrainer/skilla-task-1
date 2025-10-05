import type { PropsWithChildren } from "react";

import { classNames } from "utils";

import classes from "./StatusCard.module.scss";

interface IStatusCarProps {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

export const StatusCard = ({
  textColor,
  backgroundColor,
  borderColor,
  children,
}: PropsWithChildren<IStatusCarProps>) => {
  return (
    <div style={{ backgroundColor, borderColor }} className={classes.statusCard}>
      <span style={{ color: textColor }} className={classNames("text-caption", classes.title)}>
        {children}
      </span>
    </div>
  );
};
