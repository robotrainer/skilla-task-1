import type { ReactElement } from "react";

import classes from "./Icons.module.scss";

export const Icons = ({ svg }: { svg: ReactElement }) => {
  return <div className={classes.icons}>{svg}</div>;
};
