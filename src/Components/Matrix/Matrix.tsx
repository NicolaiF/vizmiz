import React from "react";
import * as Tone from "tone";
import { Cell } from "../Cell/Cell";
import "./Matrix.scss";

export const Matrix = () => {
  let a = new Array(8);
  for (var i = 0; i < a.length; ++i) {
    a[i] = false;
  }

  const constructGrid = [];
  for (let i = 0; i < a.length; i++) {
    constructGrid[i] = a;
  }
  const [grid, setGrid] = React.useState(constructGrid);

  const synthB = new Tone.AMSynth().toDestination();

  const loopB = new Tone.Loop((time) => {
    synthB.triggerAttackRelease("C4", "8n", time);
  }, "1m").start(0);
  return (
    <div>
      {grid.map((l) => (
        <div className="vizmiz-matrix-row">
          {l.map((k: any) => (
            <span className="vizmiz-matrix-cell">
              <Cell></Cell>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
