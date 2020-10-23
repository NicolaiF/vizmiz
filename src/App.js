import React from "react";
import logo from "./logo.svg";
import * as Tone from "tone";
import "./App.css";

function App() {
  var a = new Array(8);
  for (var i = 0; i < a.length; ++i) {
    a[i] = false;
  }

  const constructGrid = [];
  for (let i = 0; i < a.length; i++) {
    constructGrid[i] = a;
  }
  const [grid, setGrid] = React.useState(constructGrid);
  console.log(grid);

  // const tone = new Tone.Transport();
  const synthB = new Tone.AMSynth().toDestination();

  const loopB = new Tone.Loop((time) => {
    synthB.triggerAttackRelease("C4", "8n", time);
  }, "1m").start(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {grid.map((line, lineIndex) => (
            <div>
              {line.map((note, noteIndex) => (
                <button
                  onClick={() =>
                    setGrid((prev) => [
                      ...prev,
                      ...(prev[lineIndex][noteIndex] = !note),
                    ])
                  }
                >
                  {note ? "On" : "Off"}
                </button>
              ))}
            </div>
          ))}
        </div>
        <button onClick={() => Tone.Transport.start()}>Start</button>
        <button onClick={() => Tone.Transport.stop()}>Stopp</button>
      </header>
    </div>
  );
}

export default App;
