import { useState } from "react";

function ConwayGrid() {
    // TODO Calculate based on screen size
    const NUM_ROWS = 25;
    const NUM_COLS = 50;
    
    // Creates an empty grid
    let createEmptyGrid = () => {
      let grid = [];
      for (let y = 0; y < NUM_ROWS; y++) {
        grid[y] = [];
        for (let x = 0; x < NUM_COLS; x++) {
          grid[y][x] = 0;
        }
      }
  
      return grid;
    }

    // Counts a cells live neighbours
    let getNumNeighbours = (x, y) => {
        let operations = [-1, 0, 1];
        let numNeighbours = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                // Does not check if current cell is alive or dead
                if (i == j && i != 0 && (y+i) >= 0 && (x+j) >= 0 && (y+i) < NUM_ROWS && (x+j) < NUM_COLS) {
                    if (grid[y + i][x + j] == 1) {
                        numNeighbours = numNeighbours + 1;
                    }
                }
            }
        }

        return numNeighbours;
    }
  
    let [grid, setGrid] = useState(() => createEmptyGrid());
  
    return (
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`}}>
        {
          grid.map((rows, i) => 
            rows.map((col, j) =>
                <div
                    key={`${i}-${j}`}
                    style={{width: 20, height: 20, backgroundColor: grid[i][j] ? 'black': undefined, border: 'solid 0.5px'} }
                    onClick={() => {
                        let gridCopy = grid.map(subArray => subArray.slice());

                        if (gridCopy[i][j] == 0) {
                            gridCopy[i][j] = 1; 
                        } else {
                            gridCopy[i][j] = 0;
                        }

                        setGrid(gridCopy);
                    }}
                >

              </div>
            )
          )
        }
      </div>
    )
}

export default ConwayGrid;