# Conway's Game of Life

Conway's Game of Life is a zero-player game where cells live or die based on an initial state and a set of simple rules. This project implements these rules using React.

## Table of Contents

1. [Setup](#setup)
2. [Rules of life](#rules-of-life)


## Setup

1. Clone the repository using the command: `git clone https://github.com/dylan-marx/game-of-life.git`.
2. Navigate to the cloned directory.
3. Install the required dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. Open your browser and navigate to the specified address.


## Rules of Life

Conway's Game of Life is known for its simple rules, which can result in complex patterns, even making it Turing complete:

1. Any living cell with fewer than 2 living neighbors dies, as if by underpopulation.
2. Any living cell with 2 or 3 living neighbors survives to the next generation.
3. Any living cell with more than 3 living neighbors dies, as if by overpopulation.
4. Any dead cell with exactly 3 living neighbors becomes a living cell, as if by reproduction.