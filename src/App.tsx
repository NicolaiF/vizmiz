import React from "react";
import "./App.scss";
import { Player } from "./Container/Player";

function App() {
  return (
    <div className="App">
      <header className="App-header">VizMiz</header>
      <main>
        <Player />
      </main>
    </div>
  );
}

export default App;
