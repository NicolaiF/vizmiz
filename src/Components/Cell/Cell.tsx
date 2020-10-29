import React from "react";
import classNames from "classnames";
import "./Cell.scss";

type CellProps = {
  note: string;
  isActive: boolean;
  [key: string]: any;
};

export const Cell: React.FC<CellProps> = ({ isActive, note, ...rest }) => {
  return (
    <button
      className={classNames("vizmiz-cell", { "vizmiz-cell--active": isActive })}
      {...rest}
    >
      {note}
    </button>
  );
};
