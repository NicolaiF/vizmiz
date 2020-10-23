import React from "react";
import classNames from "classnames";
import "./Cell.scss";

type CellProps = {};

export const Cell: React.FC<CellProps> = (props) => {
  const [active, setActive] = React.useState(false);
  return (
    <button
      className={classNames("vizmiz-cell", { "vizmiz-cell--active": active })}
      onClick={() => setActive((prev) => !prev)}
      {...props}
    >
      {props.children}
    </button>
  );
};
