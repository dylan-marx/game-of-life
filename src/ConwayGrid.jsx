import { useState, useEffect } from "react";

function ConwayGrid({rows, cols, speed}) {
    // Creates an empty grid
    let createEmptyGrid = () => {
      let grid = [];
      for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < cols; x++) {
          grid[y][x] = 0;
        }
      }
  
      return grid;
    }

    let createGrid = (newRows, newCols) => {
        const newGrid = Array.from({ length: newRows }, (_, rowIndex) =>
            Array.from({ length: newCols }, (_, colIndex) =>
              // If the cell exists in the old grid, retain its value; otherwise, set to 0
              grid[rowIndex]?.[colIndex] ?? 0
            )
          );
        return newGrid; 
    }

    let [grid, setGrid] = useState(() => createEmptyGrid());
    let [running, setRunning] = useState(false);

    useEffect(() => {
        const newGrid = createGrid(rows, cols);
        setGrid(createEmptyGrid());
    }, [rows, cols]);

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                updateGrid(grid);
            }, speed);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [running, grid]);


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

                // Ensure we"re within bounds of the grid
                if (newX >= 0 && newY >= 0 && newX < cols && newY < rows) {
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
    let updateGrid = (currentGrid) => {
        let gridCopy = currentGrid.map(subArray => subArray.slice());

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let newState = updateCell(x, y);
                gridCopy[y][x] = newState;
            }
        }
        setGrid(gridCopy);
    };

    return (
    <div className="conway-grid">
        <div id = "controls">
            <button onClick={() => setRunning(prev => !prev)}>{running ? "Stop" : "Start"}</button>
            <button id="one-gen" onClick={() => updateGrid(grid)}>Next</button>
            <button id="clear-grid" onClick={() => setGrid(() => createEmptyGrid())}>Clear</button>
            
            
        </div>
        
        <div id ="grid" className="grid" style={{display: "grid", gridTemplateColumns: `repeat(${cols}, 20px)`}}>
            {
            grid.map((rows, i) => 
                rows.map((col, j) =>
                    <div
                        className="cell"
                        key={`${i}-${j}`}
                        style={{width: 20, height: 20, backgroundColor: grid[i][j] ? "black": undefined} }
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
    </div>
    )
}

export default ConwayGrid;