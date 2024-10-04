import { useState } from "react";
import ConwayGrid from "./ConwayGrid";
import Input from "./Input";

function App() {
  let [rows, setRows] = useState(20);
  let [cols, setCols] = useState(20);
  let [speed, setSpeed] = useState(250);

  return (
    <div>
      <div className="heading">
        <h1>Conway's Game of Life</h1>
      </div>
      <div className="components">
        <ConwayGrid rows={rows} cols={cols} speed={speed}/>
        <Input setRows={setRows} setCols={setCols} setSpeed={setSpeed}></Input>
      </div>
      
    </div>
  )
}

export default App
