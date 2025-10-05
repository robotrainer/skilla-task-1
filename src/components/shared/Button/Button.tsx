import {
  forwardRef,
  memo,
  type CSSProperties,
  type PropsWithChildren,
  type MouseEvent,
  type TouchEvent,
} from "react";

import classes from "./Button.module.scss";

interface IButtonProps {
  className: string;
  style: CSSProperties;
  disabled: boolean;
  title: string;
  draggable: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onContextMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  onTouchStart: (event: TouchEvent<HTMLButtonElement>) => void;
  onTouchCancel: (event: TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd: (event: TouchEvent<HTMLButtonElement>) => void;
  onTouchMove: (event: TouchEvent<HTMLButtonElement>) => void;
  onMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = memo(
  forwardRef<HTMLButtonElement, PropsWithChildren<Partial<IButtonProps>>>(
    (
      {
        className,
        style,
        disabled,
        title,
        draggable = false,

        onClick = () => null,
        onContextMenu = () => null,
        onTouchStart = () => null,
        onTouchCancel = () => null,
        onTouchEnd = () => null,
        onTouchMove = () => null,
        onMouseDown = () => null,
        onMouseEnter = () => null,
        onMouseLeave = () => null,
        onMouseUp = () => null,

        children,
      },
      ref
    ) => {
      return (
        <button
          ref={ref}
          title={title}
          draggable={draggable}
          className={[classes.button, className].filter((x) => x).join(" ")}
          style={style}
          disabled={disabled}
          onClick={onClick}
          onContextMenu={onContextMenu}
          onTouchStart={onTouchStart}
          onTouchCancel={onTouchCancel}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
        >
          {children}
        </button>
      );
    }
  )
);

Button.displayName = "Button";

export { Button };
