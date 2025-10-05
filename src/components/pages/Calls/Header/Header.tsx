import { useCallback, useEffect, useState } from "react";

import { DATE_RANGE } from "consts";
import { BracketArrowSVG, Button, CalendarSVG, CrossSVG } from "shared";
import { classNames, getDateFromRange } from "utils";

import classes from "../Calls.module.scss";

interface IHeaderProps {
  now: Date;
  changeDateRange: (dateStart: Date, dateEnd?: Date) => void;
  changeInOut: (valueInOut: string | undefined) => void;
}

const IN_OUT_CALLS = [
  {
    id: 1,
    title: "Все типы",
    in_out: undefined,
  },
  {
    id: 2,
    title: "Входящие",
    in_out: "1",
  },
  {
    id: 3,
    title: "Исходящие",
    in_out: "0",
  },
];

export const Header = ({ now, changeDateRange, changeInOut }: IHeaderProps) => {
  const [isShowInOutMenu, setIsShowInOutMenu] = useState(false);
  const [currentInOutId, setCurrentInOutId] = useState(1);

  const [isShowDateRangeMenu, setIsShowDateRangeMenu] = useState(false);
  const [currentRangeId, setCurrentRangeId] = useState(1);

  const currentRange = DATE_RANGE.find((range) => range.id === currentRangeId);
  const currentInOut = IN_OUT_CALLS.find((inOut) => inOut.id === currentInOutId);

  const onOpenInOutMenu = () => setIsShowInOutMenu(true);
  const onCloseInOutMenu = () => setIsShowInOutMenu(false);
  const onResetInOutMenu = () => setCurrentInOutId(1);

  const onOpenDateRangeMenu = () => setIsShowDateRangeMenu(true);
  const onCloseDateRangeMenu = () => setIsShowDateRangeMenu(false);

  const onClickInOutItem = (id: number) => {
    setCurrentInOutId(id);
    onCloseInOutMenu();
  };

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

  useEffect(() => {
    const currentInOut = IN_OUT_CALLS.find((inOut) => inOut.id === currentInOutId);
    if (currentInOut) {
      changeInOut(currentInOut.in_out);
    }
  }, [changeInOut, currentInOutId]);

  return (
    <div className={classes.header}>
      <div className={classes.selectInOutWrapper}>
        <Button className={classes.selectInOut} onClick={onOpenInOutMenu}>
          <span className={classNames("text-caption", classes.title)}>{currentInOut?.title}</span>
          <BracketArrowSVG
            color={isShowInOutMenu ? "var(--accent)" : "var(--trinity-blue)"}
            rotate={isShowInOutMenu ? 0 : 180}
          />
        </Button>

        {currentInOutId !== 1 && (
          <Button className={classes.resetButton} onClick={onResetInOutMenu}>
            <span className="text-caption">Сбросить фильтры</span>

            <CrossSVG width={15} height={15} color="var(--trinity-blue)" />
          </Button>
        )}

        <div className={classNames(classes.selectInOutMenu, isShowInOutMenu && classes.isShow)}>
          {IN_OUT_CALLS.map((inOut) => {
            const isActive = currentInOutId === inOut.id;
            return (
              <Button
                key={inOut.id}
                disabled={isActive}
                className={classNames(
                  "text-caption",
                  classes.rangeButton,
                  isActive && classes.active
                )}
                onClick={() => onClickInOutItem(inOut.id)}
              >
                {inOut.title}
              </Button>
            );
          })}
        </div>
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
