import { getList, type ICall, type IErrorResponse } from "api";
import { useEffect, useState } from "react";

// import { Icons, ArrowSVG } from "shared";

import classes from "./Calls.module.scss";

export const Calls = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [calls, setCalls] = useState<ICall[]>([]);

  useEffect(() => {
    getList({ date_start: "2025-09-01", date_end: "2025-10-03" })
      .then((resp) => setCalls(resp.results))
      .catch((error: IErrorResponse) => console.error(error.message, error.url))
      .finally(() => setIsLoading(false));
  }, []);

  console.log("calls", calls);

  return (
    <div className={classes.calls}>
      <div className={classes.callsHeader}>{"Calls"}</div>
      {/* <Icons svg={<ArrowSVG color="var(--green)" rotate={180} />} /> */}
      <div className={classes.callsTableWrapper}>
        <div className={classes.callsTableInner}>
          {isLoading ? <span>Loading...</span> : <div className={classes.callsTable} />}
        </div>
      </div>
    </div>
  );
};
