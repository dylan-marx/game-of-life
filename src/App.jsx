import { useState } from "react";
import ConwayGrid from "./ConwayGrid";
import Input from "./Input";
import Information from "./Information";

function App() {
  let [rows, setRows] = useState(20);
  let [cols, setCols] = useState(20);
  let [speed, setSpeed] = useState(250);

  let [liveCells, setLiveCells] = useState(0);
  let [generation, setGeneration] = useState(0);

  return (
    <div>
      <div className="heading">
        <h1>Conway's Game of Life</h1>
      </div>
      <div className="components">
        <Information liveCells={liveCells} generation={generation}/>
        <ConwayGrid rows={rows} cols={cols} speed={speed} setLiveCells={setLiveCells} setGeneration={setGeneration}/>
        <Input setRows={setRows} setCols={setCols} setSpeed={setSpeed}></Input>
      </div>
      
    </div>
  )
}

export default App
