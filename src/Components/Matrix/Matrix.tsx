import React from "react";
import * as Tone from "tone";
import { Cell } from "../Cell/Cell";
import "./Matrix.scss";

export const Matrix = () => {
  const pentatonic = ["C", "D", "E", "G", "A"];
  let a = new Array(16);
  for (var i = 0; i < a.length; ++i) {
    a[i] = false;
  }

  const constructGrid = [];
  for (let i = 0; i < a.length; i++) {
    constructGrid[i] = a;
  }
  const [grid, setGrid] = React.useState(constructGrid);

  const synthB = new Tone.AMSynth();
  synthB.set({
    envelope: {
      attack: 0.027,
      attackCurve: "linear",
      decay: 0.5,
      decayCurve: "exponential",
      release: 0.6,
      releaseCurve: "exponential",
      sustain: 0.4,
    },
  });
  synthB.toDestination();

  const loopB = new Tone.Loop((time) => {
    synthB.triggerAttackRelease("C4", "8n", time);
  }, "1m").start(0);

  return (
    <div className="vizmiz-matrix-wrapper">
      {grid.map((l, row) => (
        <div className="vizmiz-matrix-column">
          {l.map((k: any, note) => (
            <span className="vizmiz-matrix-cell">
              {/* <Cell></Cell> */}
              <Cell
                onClick={() =>
                  synthB.triggerAttackRelease(
                    pentatonic[note % 5] + (Math.floor(note / 5) + 1),
                    "8n"
                  )
                }
                note={pentatonic[note % 5] + (Math.floor(note / 5) + 1)}
              ></Cell>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
