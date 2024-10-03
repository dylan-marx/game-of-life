import { useState } from "react";
import ConwayGrid from "./ConwayGrid";

function App() {
  return (
    <div>
      <ConwayGrid rows={20} cols={20} speed={250}/>
    </div>
  )
}

export default App
