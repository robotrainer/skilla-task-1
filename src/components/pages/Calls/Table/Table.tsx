import { ArrowSVG, BracketArrowSVG, Button } from "shared";
import { classNames } from "utils";
import { StatusCard } from "widgets";

import classes from "./Table.module.scss";

import type { ICall } from "types";
import { useState } from "react";

interface ITableProps {
  data: ICall[];
}

const EVALUATION_DATE = {
  bad: {
    tittle: "Плохо",
    textColor: "var(--red)",
    borderColor: "var(--red)",
    backgroundColor: "var(--light-red)",
  },
  good: {
    tittle: "Хорошо",
    textColor: "var(--secondary-blue)",
    borderColor: "var(--trinity-blue)",
    backgroundColor: "var(--quadruple-blue)",
  },
  great: {
    tittle: "Отлично",
    textColor: "var(--secondary-green)",
    borderColor: "var(--green)",
    backgroundColor: "var(--light-green)",
  },
};

export const Table = ({ data }: ITableProps) => {
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByDuration, setSortByDuration] = useState(false);

  return (
    <table className={classes.table}>
      <thead className={classes.header}>
        <tr>
          <th scope="col"></th>
          <th className={classNames("text-caption", classes.typeCol)} scope="col">
            Тип
          </th>
          <th className={classNames("text-caption", classes.timeCol)} scope="col">
            <Button className={classes.timeButton} onClick={() => setSortByDate((prev) => !prev)}>
              <span>Время</span>
              <BracketArrowSVG color="var(--trinity-blue)" rotate={sortByDate ? 0 : 180} />
            </Button>
          </th>
          <th className={classNames("text-caption", classes.personCol)} scope="col">
            Сотрудник
          </th>
          <th className={classNames("text-caption", classes.callCol)} scope="col">
            Звонок
          </th>
          <th className={classNames("text-caption", classes.sourceCol)} scope="col">
            Источник
          </th>
          <th className={classNames("text-caption", classes.evaluationCol)} scope="col">
            Оценка
          </th>
          <th className={classNames("text-caption", classes.durationCol)} scope="col">
            <Button
              className={classes.durationButton}
              onClick={() => setSortByDuration((prev) => !prev)}
            >
              <span> Длительность</span>
              <BracketArrowSVG color="var(--trinity-blue)" rotate={sortByDuration ? 0 : 180} />
            </Button>
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((call) => {
          const time = call.date.match(/(?<=\s)\d{2}:\d{2}(?=:\d{2})/)?.[0];
          const evaluation =
            Math.random() <= 0.25
              ? "bad"
              : Math.random() <= 0.5
                ? "good"
                : Math.random() <= 0.75
                  ? "great"
                  : null;

          return (
            <tr key={call.id} className={classes.row}>
              <td></td>
              <td>
                <div className={classNames("text-body", classes.col)}>
                  {
                    <ArrowSVG
                      color={
                        call.status === "Не дозвонился"
                          ? "var(--red)"
                          : call.in_out
                            ? "var(--blue)"
                            : "var(--green)"
                      }
                      rotate={call.in_out ? 0 : 180}
                    />
                  }
                </div>
              </td>
              <td>
                <div className={classNames("text-body", classes.col)}>{time}</div>
              </td>
              <td>
                <div
                  style={{
                    backgroundImage: `url(${call.person_avatar})`,
                  }}
                  className={classNames("text-body", classes.col, classes.person)}
                ></div>
              </td>
              <td>
                <div className={classNames("text-body", classes.col)}>{call.from_number}</div>
              </td>
              <td>
                <div className={classNames("text-body", classes.col, classes.source)}>
                  {call.source}
                </div>
              </td>
              <td>
                <div className={classNames("text-body", classes.col)}>
                  {evaluation && (
                    <StatusCard
                      textColor={EVALUATION_DATE[evaluation].textColor}
                      borderColor={EVALUATION_DATE[evaluation].borderColor}
                      backgroundColor={EVALUATION_DATE[evaluation].backgroundColor}
                    >
                      {EVALUATION_DATE[evaluation].tittle}
                    </StatusCard>
                  )}
                </div>
              </td>
              <td>
                <div
                  className={classNames("text-body", classes.col)}
                >{`${Math.floor(call.time / 60)}:${call.time % 60}`}</div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
