import { getList } from "api";
import { useCallback, useEffect, useState } from "react";

import { DATE_RANGE } from "consts";
import { changeFormatStringDate, getDateFromRange, getDateString } from "utils";

import { Header } from "./Header";
import { Table } from "./Table";

import classes from "./Calls.module.scss";

import type { ICall, IErrorResponse } from "types";

export const Calls = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [calls, setCalls] = useState<ICall[]>([]);
  const [now] = useState(new Date());
  const [dateStartState, setDateStartState] = useState<string>(
    changeFormatStringDate(getDateString(getDateFromRange(now, DATE_RANGE[0].range)))
  );
  const [dateEndState, setDateEndState] = useState<string>(
    changeFormatStringDate(getDateString(now))
  );
  const [inOut, setInOut] = useState<string>();

  const changeDateRange = useCallback((dateStart: Date, dateEnd?: Date) => {
    setDateEndState((prevDateEnd) =>
      dateEnd ? changeFormatStringDate(getDateString(dateEnd)) : prevDateEnd
    );
    setDateStartState(changeFormatStringDate(getDateString(dateStart)));
  }, []);

  const changeInOut = (valueInOut: string | undefined) => {
    setInOut(valueInOut);
  };

  useEffect(() => {
    getList({ date_start: dateStartState, date_end: dateEndState, in_out: inOut })
      .then((resp) => setCalls(resp.results))
      .catch((error: IErrorResponse) => console.error(error.message, error.url))
      .finally(() => setIsLoading(false));
  }, [dateStartState, dateEndState, inOut]);

  return (
    <div className={classes.calls}>
      <Header changeDateRange={changeDateRange} now={now} changeInOut={changeInOut} />
      <div className={classes.tableWrapper}>
        {isLoading ? <span>Loading...</span> : <Table data={calls} />}
      </div>
    </div>
  );
};
