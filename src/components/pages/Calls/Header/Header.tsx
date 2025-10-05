import { useCallback, useEffect, useState } from "react";

import { DATE_RANGE } from "consts";
import { BracketArrowSVG, Button, CalendarSVG } from "shared";
import { classNames, getDateFromRange } from "utils";

import classes from "../Calls.module.scss";

interface IHeaderProps {
  now: Date;
  changeDateRange: (dateStart: Date, dateEnd?: Date) => void;
}

export const Header = ({ now, changeDateRange }: IHeaderProps) => {
  const [isShowDateRangeMenu, setIsShowDateRangeMenu] = useState(false);
  const [currentRangeId, setCurrentRangeId] = useState(1);

  const currentRange = DATE_RANGE.find((range) => range.id === currentRangeId);

  const onOpenDateRangeMenu = () => setIsShowDateRangeMenu(true);

  const onCloseDateRangeMenu = () => setIsShowDateRangeMenu(false);

  const onClickRangeItem = (id: number) => {
    setCurrentRangeId(id);
    onCloseDateRangeMenu();
  };

  const onChangeDateRangeItem = useCallback(
    (id: number) => {
      const currentRange = DATE_RANGE.find((range) => range.id === id);
      if (currentRange) {
        const dateStart = getDateFromRange(now, currentRange.range);
        changeDateRange(dateStart);
      }
    },
    [changeDateRange, now]
  );

  useEffect(() => {
    onChangeDateRangeItem(currentRangeId);
  }, [currentRangeId, onChangeDateRangeItem]);

  return (
    <div className={classes.header}>
      <div className={classes.selectInOut}>
        <span className={classNames("text-caption", classes.title)}>Все типы</span>
        <BracketArrowSVG color="var(--trinity-blue)" rotate={180} />
      </div>

      <div className={classes.selectDate}>
        <Button
          className={classes.previous}
          onClick={() =>
            setCurrentRangeId((prev) => {
              if (prev !== 1) {
                return prev - 1;
              }

              return prev;
            })
          }
        >
          <BracketArrowSVG color="var(--trinity-blue)" rotate={270} />
        </Button>

        <Button className={classes.select} onClick={onOpenDateRangeMenu}>
          <CalendarSVG width={18} height={18} color="var(--trinity-blue)" />
          <span className={classNames("text-caption", classes.title)}>{currentRange?.title}</span>
        </Button>

        <Button
          className={classes.next}
          onClick={() =>
            setCurrentRangeId((prev) => {
              if (prev !== 4) {
                return prev + 1;
              }

              return prev;
            })
          }
        >
          <BracketArrowSVG color="var(--trinity-blue)" rotate={90} />
        </Button>

        <div className={classNames(classes.selectDateMenu, isShowDateRangeMenu && classes.isShow)}>
          {DATE_RANGE.map((range) => {
            const isActive = currentRangeId === range.id;
            return (
              <Button
                key={range.id}
                disabled={isActive}
                className={classNames(
                  "text-caption",
                  classes.rangeButton,
                  isActive && classes.active
                )}
                onClick={() => onClickRangeItem(range.id)}
              >
                {range.title}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
