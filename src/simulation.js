// Export the functions and variables related to the simulation logic
    // Assuming gridSize and gridState are defined globally or passed as parameters
    gridState = Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => Math.random() > 0.75 ? 1 : 0)
    );
    // Assuming renderGrid is a function responsible for rendering the grid based on gridState
    renderGrid();

export function updateFireSpreadWithWindAndRain() {
    // Example logic for updating fire spread based on wind and rain
    // This should be adjusted based on the actual logic used in script.js
    const newGridState = gridState.map((row, rowIndex) => row.map((cell, colIndex) => {
        // Placeholder for fire spreading logic
        if (cell === 2) { // If the cell is burning
            return 3; // Set the cell to burned
        }
        return cell; // Return the cell state unchanged if it's not affected
    }));

    gridState = newGridState;
    renderGrid();
}

// Other functions and constants as needed
