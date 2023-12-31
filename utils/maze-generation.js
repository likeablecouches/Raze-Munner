function newBoundary(x1, y1, x2, y2) {
	// Wrapper function to make sure all boundaries are in the boundaries array

	let newBound = new Boundary(x1, y1, x2, y2);
	boundaries.push(newBound);
}

function newGrid() {
	grid = [];

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

}

function createBoundariesFromGrid() {
	for (let i = 0; i < grid.length; i++) {
		curCell = grid[i];

		var x = curCell.i * cellWidth;
		var y = curCell.j * cellWidth;

		if (curCell.walls[0]) {
			newBoundary(x, y, x + cellWidth, y);
		}
		if (curCell.walls[1]) {
			newBoundary(x + cellWidth, y, x + cellWidth, y + cellWidth);
		}
		if (curCell.walls[2]) {
			newBoundary(x + cellWidth, y + cellWidth, x, y + cellWidth);
		}
		if (curCell.walls[3]) {
			newBoundary(x, y + cellWidth, x, y);
		}
	}
}

function updateMaze() {

	if (!isGenerating) {
		return;
	}

	current.visited = true;
	// console.log('updatemaze')
	// STEP 1
	var next = current.checkNeighbors();
	if (next) {
		next.visited = true;

		// STEP 2
		stack.push(current);

		// STEP 3
		removeWalls(current, next);

		// STEP 4
		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	}

	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	current.highlight();
}

function removeWalls(a, b) {
	var x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

function index(i, j) {
	if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}
	return i + j * cols;
}

function startMazeGeneration() {
	isGenerating = true;

	if (!current || current.i != grid[0].i || current.j != grid[0].j) {
		current = grid[0];
		finishCell = grid[grid.length - 1];
	} else {
		current = grid[grid.length - 1];
		finishCell = grid[0];
	}

	startCell = current;

	if (!finishCircle) {
		finishCircle = new FinishCircle(finishCell.i * cellWidth + cellWidth / 2, finishCell.j * cellWidth + cellWidth / 2);
	} else {
		finishCircle.pos.x = finishCell.i * cellWidth + cellWidth / 2;
		finishCircle.pos.y = finishCell.j * cellWidth + cellWidth / 2;
		finishCircle.updateRadius();
	}

	respawnVector = createVector(startCell.i * cellWidth + cellWidth / 2, startCell.j * cellWidth + cellWidth / 2);

	// console.log(`current: ${current.i}, ${current.j}`);
	// console.log(`finish cell: ${finishCell.i * cellWidth}, ${finishCell.j * cellWidth}`);
	// console.log(`resp vector: ${respawnVector.x}, ${respawnVector.y}`);
	// console.log(`finishCircle: ${finishCircle.pos.x}, ${finishCircle.pos.y}`);
	// console.log(stack);
}
