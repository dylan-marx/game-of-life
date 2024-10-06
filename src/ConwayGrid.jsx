import { useState, useEffect } from "react";

function ConwayGrid({rows, cols, speed, setLiveCells, setGeneration}) {
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

    // Creates a new grid with a set number of columns and rows

    let createGrid = (newRows, newCols) => {
        let newGrid = [];
        for (let y = 0; y < newRows; y++) {
            newGrid[y] = [];
            for (let x = 0; x < newCols; x++) {
                if (grid[y] && grid[y][x] !== undefined) {
                    newGrid[y][x] = grid[y][x];
                } else {
                    newGrid[y][x] = 0;
                }
                
            }
        }
    
        return newGrid;
    }

    let [grid, setGrid] = useState(() => createEmptyGrid());
    let [running, setRunning] = useState(false);
    let [localLiveCells, setLocalLiveCells] = useState(0);
    let [localGeneration, setLocalGeneration] = useState(1);

    // If the rows or cols change updates the grid size
    useEffect(() => {
        const newGrid = createGrid(rows, cols);
        setGrid(newGrid);
    }, [rows, cols]);

    useEffect(() => {
        setGeneration(localGeneration);
        setLiveCells(localLiveCells);
    }, [localGeneration, localLiveCells, setLocalLiveCells, setLocalGeneration]);

    // Updates the grid every few seconds
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
                const newX = x + operations[j];
                const newY = y + operations[i];
                // Skip current cell
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
            // Live cell dies by underpopulation
            if (numNeighbours < 2) {
                return 0;
            }
            // Live cell stays alive
            if (numNeighbours >= 2 && numNeighbours < 4) {
                return 1;
            }
            // Live cell dies by overpopulation
            if (numNeighbours >= 4) {
                return 0;
            }
        } else {
            // Dead cell become alive by reproduction
            if (numNeighbours == 3) {
                return 1;
            }
        }

        return currentState;
    };

    // Moves the entire grid one generation forward
    let updateGrid = (currentGrid) => {
        // Used to store cell states after their status is determined
        let gridCopy = currentGrid.map(subArray => subArray.slice());
        let newLiveCells = 0;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let newState = updateCell(x, y);
                gridCopy[y][x] = newState;
                if (newState == 1) {
                    newLiveCells = newLiveCells + 1;
                }
            }
        }
        setLocalLiveCells(newLiveCells);
        setLocalGeneration((prevGeneration) => prevGeneration + 1);
        setGrid(gridCopy);
    };

    return (
    <div className="conway-grid">
        <div id = "controls">
            <button onClick={() => setRunning(prev => !prev)}>{running ? "Stop!" : "Start"}</button>
            <button id="one-gen" onClick={() => updateGrid(grid)}>Next</button>
            <button id="clear-grid" onClick={() => {
                setLocalGeneration(1);
                setLocalLiveCells(0);
                setGrid(() => createEmptyGrid());}}
            >Clear</button>
        </div>
        
        <div id ="grid" className="grid" style={{display: "grid", gridTemplateColumns: `repeat(${cols}, 20px)`}}>
            {
            grid.map((rows, i) => 
                rows.map((col, j) =>
                    <div
                        className={`cell ${grid[i][j] ? "alive": "dead"}`}
                        key={`${i}-${j}`}
                        style={{width: 20, height: 20} }
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