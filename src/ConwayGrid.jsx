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

    let [grid, setGrid] = useState(() => createEmptyGrid());

    // Counts a cells live neighbours
    let getNumNeighbours = (x, y) => {
        let numNeighbours = 0;
        let operations = [-1, 0, 1]; // To represent relative positions

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                 // Skip current cell
                
                const newX = x + operations[j];
                const newY = y + operations[i];
                if (newX === x && newY === y) continue;

                // Ensure we're within bounds of the grid
                if (newX >= 0 && newY >= 0 && newX < NUM_COLS && newY < NUM_ROWS) {
                    if (grid[newY][newX] === 1) {
                        numNeighbours++;
                    }
                }
            };
        };

        return numNeighbours;
    };
    
    // Determines if a cell is alive or dead
    let updateCell = (x, y) => {

        let numNeighbours = getNumNeighbours(x, y);
        let currentState = grid[y][x];

        if (currentState == 1) {
            if (numNeighbours < 2) {
                return 0;
            }
            if (numNeighbours >= 2 && numNeighbours < 4) {
                return 1;
            }
            if (numNeighbours >= 4) {
                return 0;
            }
        } else {
            if (numNeighbours == 3) {
                return 1;
            }
        }

        return currentState;
    };

    // Moves the entire grid one generation forward
    let updateGrid = () => {
        let gridCopy = grid.map(subArray => subArray.slice());

        for (let y = 0; y < NUM_ROWS; y++) {
            for (let x = 0; x < NUM_COLS; x++) {
                let newState = updateCell(x, y);
                gridCopy[y][x] = newState;
            }
        }
        console.log("New grid state:", gridCopy);
        setGrid(gridCopy);
    };
  
    return (
    <>
    <button onClick={() => updateGrid()}>RUN</button>
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
    </>
    )
}

export default ConwayGrid;