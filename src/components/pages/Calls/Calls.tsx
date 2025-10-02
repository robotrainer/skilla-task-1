// import { Icons, ArrowSVG } from "components/shared/icons";

import classes from "./Calls.module.scss";

export const Calls = () => {
  return (
    <div className={classes.calls}>
      <div className={classes.callsHeader}>{"Calls"}</div>
      {/* <Icons svg={<ArrowSVG color="var(--green)" rotate={180} />} /> */}
      <div className={classes.callsTableWrapper}>
        <div className={classes.callsTableInner}>
          <div className={classes.callsTable}></div>
        </div>
      </div>
    </div>
  );
};
