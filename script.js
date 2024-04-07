function adjustCellSize() {
    const gridElement = document.getElementById('grid');
    const controlsHeight = document.querySelector('.controls').offsetHeight;
    const availableHeight = window.innerHeight - controlsHeight - 20; // Adjusting for padding/margins
    const availableWidth = window.innerWidth - 20; // Adjusting for padding/margins
    const gridSize = 50; // Assuming a 50x50 grid
    const cellSize = Math.min(availableWidth / gridSize, availableHeight / gridSize);

    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
    gridElement.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;
}

window.addEventListener('resize', adjustCellSize);
document.addEventListener('DOMContentLoaded', adjustCellSize);

// Constants and variables declaration
const gridSize = 40; // Size of the grid (50x50)
let simulationInterval; // Variable to store the simulation interval
let gridState = []; // Array to store the state of each cell in the grid

// Function to initialize the grid with trees and a few burning trees
function initializeGrid() {
    // Create a 50x50 grid with mostly trees (1) and some burning trees (2)
    gridState = Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => Math.random() > 0.9 ? 2 : 1)
    );
    // Ensure at least one cell is burning to start the simulation
    if (gridState.flat().every(cell => cell !== 2)) {
        const randomRow = Math.floor(Math.random() * gridSize);
        const randomCol = Math.floor(Math.random() * gridSize);
        gridState[randomRow][randomCol] = 2; // Set a random cell to burning
    }
    renderGrid(); // Render the initialized grid
}

// Function to render the grid on the webpage
function renderGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = ''; // Clear the grid before rendering
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 16px)`; // Set grid columns
    // Loop through each cell in the gridState array
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div'); // Create a new div for each cell
            cell.classList.add('cell'); // Add 'cell' class to all cells
            cell.dataset.row = row; // Store row index in dataset
            cell.dataset.col = col; // Store column index in dataset

            // Add specific class based on the cell's state
            if (gridState[row][col] === 1) {
                cell.classList.add('tree'); // Tree cell
            } else if (gridState[row][col] === 2) {
                cell.classList.add('burning'); // Burning tree cell
            } else {
                cell.classList.add('empty'); // Empty cell
            }

            // Add click event listener to set the cell on fire
            cell.addEventListener('click', function() {
                const row = this.dataset.row;
                const col = this.dataset.col;
                if (gridState[row][col] === 1) { // Only trees can catch fire
                    gridState[row][col] = 2; // Set the cell to burning
                    renderGrid(); // Re-render the grid to show the updated state
                }
            });

            gridElement.appendChild(cell); // Append the cell to the grid element
        }
    }
}

// Event listener for DOMContentLoaded to initialize and render the grid
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const treeDensitySlider = document.getElementById('treeDensity');
    const densityValueDisplay = document.getElementById('densityValue');

    // Display the current value of the slider
    densityValueDisplay.innerText = `${treeDensitySlider.value}%`;

    // Update the display when the slider value changes
    treeDensitySlider.oninput = function() {
        densityValueDisplay.innerText = `${this.value}%`;
    };

    // Function to initialize the grid with trees based on the selected density
    function initializeGrid() {
        const treeDensity = treeDensitySlider.value / 100;
	console.log("Tree density: ", treeDensity);
        gridState = Array.from({ length: gridSize }, () =>
            Array.from({ length: gridSize }, () => Math.random() < treeDensity ? 1 : 0)
        );
        renderGrid();
    }

    initializeGrid(); // Initialize the grid on page load

    // Attach event listeners to buttons
    resetButton.addEventListener('click', initializeGrid);

// Function to update the state of the grid based on fire spread rules
function updateFireSpread() {
    let newGridState = gridState.map((row, rowIndex) => row.map((cell, colIndex) => {
        // If the cell is burning, it turns into an empty cell
        if (cell === 2) {
            return 0;
        }

        // If the cell is a tree, check if any adjacent cell is burning
        if (cell === 1) {
            const adjacentCells = [
                [rowIndex - 1, colIndex], // Up
                [rowIndex + 1, colIndex], // Down
                [rowIndex, colIndex - 1], // Left
                [rowIndex, colIndex + 1]  // Right
            ];
            const isBurningAdjacent = adjacentCells.some(([adjRow, adjCol]) => {
                return adjRow >= 0 && adjRow < gridSize && adjCol >= 0 && adjCol < gridSize && gridState[adjRow][adjCol] === 2;
            });

            // If any adjacent cell is burning, this tree catches fire
            if (isBurningAdjacent) {
                return 2;
            }
        }

        // Return the cell state unchanged if it's not affected
        return cell;
    }));

    // Update the grid state and re-render the grid
    gridState = newGridState;
    renderGrid();
}

// Function to start the simulation interval
function startSimulation() {
    // Ensure there's no ongoing simulation
    if (!simulationInterval) {
        simulationInterval = setInterval(updateFireSpread, 1000); // Update fire spread every second
    }
}

// Update the start button event listener to start the simulation
startButton.addEventListener('click', startSimulation);

// Update the stopSimulation function to clear the interval
function stopSimulation() {
    clearInterval(simulationInterval);
    simulationInterval = null;
}

// Update the resetGrid function to reinitialize the grid based on the slider value
function resetGrid() {
    stopSimulation();
    initializeGrid();
}

// Attach event listeners to the stop and reset buttons
stopButton.addEventListener('click', stopSimulation);
resetButton.addEventListener('click', resetGrid);

});
// Define spreading probabilities for each direction
const spreadingProbabilities = {
    north: { main: 0.7, opposite: 0.3 },
    east: { main: 0.7, opposite: 0.3 },
    south: { main: 0.7, opposite: 0.3 },
    west: { main: 0.7, opposite: 0.3 }
};

// Calculate orthogonal and diagonal probabilities based on main and opposite
Object.keys(spreadingProbabilities).forEach(direction => {
    const probs = spreadingProbabilities[direction];
    probs.orthogonal = (probs.main + probs.opposite) / 2;
    probs.diagonal = probs.orthogonal / 2;
});

// Function to update fire spread based on wind direction
function updateFireSpreadWithWind() {
    // Placeholder for the corrected fire spreading logic
    const windDirection = document.getElementById('windDirection').value;
    const newGridState = gridState.map((row, rowIndex) => row.map((cell, colIndex) => {
        // Logic to determine if the cell should catch fire based on wind direction and probabilities
        // This is a simplified example. Actual implementation will depend on the specific rules for fire spreading.
        if (cell === 1) { // If the cell is a tree
            // Check adjacent cells based on wind direction and decide if this tree catches fire
            // Placeholder for checking adjacent cells
            return 2; // Example: Set the cell to burning
        } else if (cell === 2) { // If the cell is burning
            return 3; // Example: Set the cell to burned
        }
        return cell; // Return the cell state unchanged if it's not affected
    }));

    gridState = newGridState;
    renderGrid();
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the tree density slider is set to 75% on page load
    document.getElementById('treeDensity').value = "75";
    document.getElementById('densityValue').innerText = "75%";
    
    // Initialize the grid with the default tree density
    initializeGrid();
});