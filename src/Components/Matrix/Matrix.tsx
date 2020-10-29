import React, { useState } from "react";
import * as Tone from "tone";
import { Cell } from "../Cell/Cell";
import "./Matrix.scss";
import classNames from "classnames";

function generateMatrix() {
  let a = new Array(16);
  for (var i = 0; i < a.length; ++i) {
    a[i] = false;
  }

  const constructGrid = [];
  for (let i = 0; i < a.length; i++) {
    constructGrid[i] = a;
  }
  return constructGrid;
}
const chosenScale = ["C", "D", "E", "G", "A"];

const OFFSET = 1;
const getNote = (note) => {
  return (
    chosenScale[note % chosenScale.length] +
    (Math.floor(note / chosenScale.length) + OFFSET)
  );
};

export const Matrix = () => {
  const [grid, setGrid] = useState(generateMatrix());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumns] = useState<number | null>(null);

  const synth = new Tone.PolySynth();
  synth.set({
    envelope: {
      attack: 0.05,
      attackCurve: "linear",
      decay: 0.5,
      decayCurve: "exponential",
      release: 0.6,
      releaseCurve: "exponential",
      sustain: 0.4,
    },
  });
  synth.toDestination();

  const handleCellClick = (row, note) => {
    let updatedGrid = grid.map((gridRow, i) =>
      gridRow.map((gridNote, j) => {
        if (i === row && note === j) {
          return !gridNote;
        }
        return gridNote;
      })
    );
    setGrid(updatedGrid);
  };
  const play = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentColumns(null);
      await Tone.Transport.toggle();
      return;
    }
    setIsPlaying(true);
    let music = [];
    grid.map((column, index) => {
      let columnNotes = [];
      column.map(
        (shouldPlay, noteIndex) =>
          shouldPlay && columnNotes.push(getNote(noteIndex))
      );
      music.push(columnNotes);
    });

    await Tone.start();

    // Monophonic;
    const seq = new Tone.Sequence(
      (time, column) => {
        setCurrentColumns(column);
        synth.triggerAttackRelease(music[column], "16n", time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "8n"
    ).start(0);

    await Tone.Transport.toggle();
  };
  return (
    <>
      <div className="vizmiz-matrix-wrapper">
        {grid.map((l, row) => (
          <div
            className={classNames("vizmiz-matrix-column", {
              "vizmiz-matrix-column--active": row === currentColumn,
            })}
            key={l + row}
          >
            {l.map((k: any, note) => (
              <span className="vizmiz-matrix-cell" key={getNote(note)}>
                <Cell
                  onClick={() => handleCellClick(row, note)}
                  isActive={grid[row][note]}
                  note={getNote(note)}
                ></Cell>
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        className={classNames("vizmiz-matrix-play", {
          "vizmiz-matrix-play--playing": isPlaying,
        })}
        onClick={() => play()}
      >
        Play
      </button>
    </>
  );
};
