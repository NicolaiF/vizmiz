import React from "react";
import classNames from "classnames";
import "./Cell.scss";

type CellProps = {
  note: string;
  onClick: () => void;
};

export const Cell: React.FC<CellProps> = ({ note, onClick }) => {
  const [active, setActive] = React.useState(false);
  const handleClick = () => {
    setActive((prev) => !prev);
    onClick();
  };
  return (
    <button
      className={classNames("vizmiz-cell", { "vizmiz-cell--active": active })}
      onClick={handleClick}
    >
      {note}
    </button>
  );
};
