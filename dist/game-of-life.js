"use strict";
const GRID_SIZE = 25;
// create a 2D array grid with dimensions GRID_SIZE x GRID_SIZE, 
// and initializes it with random true or false values
// each true or false value represents whether a cell in the grid is alive or dead
let grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => Math.random() > 0.5));
function render(grid) {
    console.clear();
    grid.forEach(row => {
        console.log(row.map(cell => (cell ? "█" : " ")).join(""));
    });
}
function nextGrid(grid) {
    // Initialize a new grid with all false values (indicating all cells are initially dead)
    const newGrid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => false));
    // each row
    for (let row = 0; row < GRID_SIZE; row++) {
        // each column
        for (let col = 0; col < GRID_SIZE; col++) {
            // Initialize a count of alive neighbors to zero
            let aliveNeighbors = 0;
            // Begin loop to check all neighboring rows (the current row, one row above, and one row below)
            for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
                // Begin loop to check all neighboring columns (the current column, one column to the left, and one column to the right)
                for (let colOffset = -1; colOffset <= 1; colOffset++) {
                    // Skip the check for the current cell, as we're only interested in the neighboring cells
                    if (rowOffset === 0 && colOffset === 0)
                        continue;
                    // Calculate the coordinates of the neighboring cell by adding the offsets to the current cell's coordinates
                    const newRow = row + rowOffset;
                    const newCol = col + colOffset;
                    // Check if the neighboring cell is within the grid boundaries and is alive
                    // If so, increment the count of alive neighbors
                    if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE && grid[newRow][newCol]) {
                        aliveNeighbors++;
                    }
                }
            }
            if (grid[row][col]) {
                // Rule 1: Any live cell with fewer than two live neighbors dies, as if by underpopulation
                if (aliveNeighbors < 2) {
                    newGrid[row][col] = false;
                }
                // Rule 2: Any live cell with two or three live neighbors lives on to the next generation
                else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                    newGrid[row][col] = true;
                }
                // Rule 3: Any live cell with more than three live neighbours dies, as if by overpopulation.
                else if (aliveNeighbors > 3) {
                    newGrid[row][col] = false;
                }
                // Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                else if (aliveNeighbors === 3) {
                    newGrid[row][col] = true;
                }
            }
        }
    }
    // Return the new grid
    return newGrid;
}
setInterval(() => {
    render(grid);
    grid = nextGrid(grid);
}, 100);
