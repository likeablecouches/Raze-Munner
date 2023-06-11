function newBoundary(x1, y1, x2, y2) {
	let newBound = new Boundary(x1, y1, x2, y2);
	boundaries.push(newBound);
}

function initializeGrid() {
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

		var x = curCell.i * w;
		var y = curCell.j * w;

		if (curCell.walls[0]) {
		  newBoundary(x, y, x + w, y);
		}
		if (curCell.walls[1]) {
		  newBoundary(x + w, y, x + w, y + w);
		}
		if (curCell.walls[2]) {
		  newBoundary(x + w, y + w, x, y + w);
		}
		if (curCell.walls[3]) {
		  newBoundary(x, y + w, x, y);
		}
	}
}

function updateMaze() {

	if (!isGenerating) {
		return;
	}

	for (var i = 0; i < grid.length; i++) {
	  grid[i].show();
	}

	current.visited = true;
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
