// drawers
function drawPoint(vector, color) {
	noStroke();
	fill(color);
	ellipse(vector.x, vector.y, 8, 8);

}

function drawPoints(points, color) {
	for (let i = 0; i < points.length; i++) {
		drawPoint(points[i], color);
	}
}

function drawBoundaries(drawEndPoints) {
	for (let i = 0; i < boundaries.length; i++) {
		boundaries[i].show();

		if (drawEndPoints) {
			drawPoint(boundaries[i].a, 'green')
			drawPoint(boundaries[i].b, 'green')
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

function initializeGrid() {
	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
}

function newBoundary(x1, y1, x2, y2) {
	let newBound = new Boundary(x1, y1, x2, y2);
	boundaries.push(newBound);
}

function index(i, j) {
	if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
	  return -1;
	}
	return i + j * cols;
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

function uniqueBy(array, key) {
    var seen = {};
    return array.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

// boundary connecting

function isConnecting(wall, lastCoord, orientation, cellLength) {
	let boundaryVal;

	if (orientation == "horizontal") {
		boundaryVal = wall.a.x;
	} else {
		boundaryVal = wall.a.y;
	}

	if (boundaryVal == lastCoord + cellLength) {
		return true;
	}

	return false;
}

function connectAdjBoundariesInRow(boundaryRow) {
	let adjBoundaries = [];
	let connectedBoundaries = [];
	let debugString;
	let lastX;

	boundaryRow.sort((bound1, bound2) => bound1.a.x - bound2.a.x);

	if (boundaryRow.length != 0) {
		lastX = boundaryRow[0].a.x - w; 
	}

	for (let i = 0; i < boundaryRow.length; i++) {
		let boundary = boundaryRow[i];
		let connected = isConnecting(boundary, lastX, "horizontal", w);

		debugString = `Index: ${i}| Pos: ${boundary.a.x}, ${boundary.a.y}   ${boundary.b.x}, ${boundary.b.y}| lastX: ${lastX}| adjBoundaries size: ${adjBoundaries.length}`

		if (connected) {
			debugString += " Pushed!";
			adjBoundaries.push(boundary);
			console.log(debugString);

			if (i != boundaryRow.length - 1) {
				lastX += w;
				continue;
			}
		}

		let leftmostBoundary = adjBoundaries[0];
		let rightmostBoudary = adjBoundaries[adjBoundaries.length - 1];

		connectedBoundaries.push(new Boundary(leftmostBoundary.a.x, leftmostBoundary.a.y, rightmostBoudary.b.x, rightmostBoudary.b.y));
		
		// stroke('green')
		// line(leftmostBoundary.a.x, leftmostBoundary.a.y, rightmostBoudary.b.x, rightmostBoudary.b.y);

		if (!connected && i == boundaryRow.length - 1) {
			connectedBoundaries.push(boundary);
			// stroke('green')
			// line(boundary.a.x, boundary.a.y, boundary.b.x, boundary.b.y);
			continue;
		}

		adjBoundaries = [boundary];
		lastX = boundary.a.x;
	}

	return connectedBoundaries;

}


function connectAdjBoundariesInCol(boundaryCol) {
	let adjBoundaries = [];
	let connectedBoundaries = [];
	let debugString;
	let lastY;

	boundaryCol.sort((bound1, bound2) => bound1.a.y - bound2.a.y);

	if (boundaryCol.length != 0) {
		lastY = boundaryCol[0].a.y - w; 
	}

	for (let i = 0; i < boundaryCol.length; i++) {
		let boundary = boundaryCol[i];
		let connected = isConnecting(boundary, lastY, "vertical", w);

		debugString = `Index: ${i}| Pos: ${boundary.a.x}, ${boundary.a.y}   ${boundary.b.x}, ${boundary.b.y}| lastX: ${lastY}| adjBoundaries size: ${adjBoundaries.length}`

		if (connected) {
			debugString += " Pushed!";
			adjBoundaries.push(boundary);
			console.log(debugString);

			if (i != boundaryCol.length - 1) {
				lastY += w;
				continue;
			}
		}

		if (!connected) {
			debugString += " Disconnected";
			console.log(debugString);
		}

		let leftmostBoundary = adjBoundaries[0];
		let rightmostBoudary = adjBoundaries[adjBoundaries.length - 1];

		connectedBoundaries.push(new Boundary(leftmostBoundary.a.x, leftmostBoundary.a.y, rightmostBoudary.b.x, rightmostBoudary.b.y));
		
		// stroke('green')
		// line(leftmostBoundary.a.x, leftmostBoundary.a.y, rightmostBoudary.b.x, rightmostBoudary.b.y);

		if (!connected && i == boundaryCol.length - 1) {
			connectedBoundaries.push(boundary);
			// stroke('green')
			// line(boundary.a.x, boundary.a.y, boundary.b.x, boundary.b.y);
			continue;
		}

		adjBoundaries = [boundary];
		lastY = boundary.a.y;
	}

	return connectedBoundaries;

}

function filterAndRemoveBoundariesInRow(yCoord) {
	let filteredBoundaries = [];

	for (let i = boundaries.length - 1; i >= 0; i--) {
		let boundary = boundaries[i];
		
		if (boundary.a.y == yCoord && boundary.b.y == yCoord) {
			filteredBoundaries = filteredBoundaries.concat(boundaries.splice(i, 1));
		}
	}

	filteredBoundaries = uniqueBy(filteredBoundaries, boundary => [boundary.a, boundary.b]);

	return filteredBoundaries;
}

function filterAndRemoveBoundariesInCol(xCoord) {
	let filteredBoundaries = [];

	for (let i = boundaries.length - 1; i >= 0; i--) {
		let boundary = boundaries[i];
		
		if (boundary.a.x == xCoord && boundary.b.x == xCoord) {
			filteredBoundaries = filteredBoundaries.concat(boundaries.splice(i, 1));
		}
	}

	filteredBoundaries = uniqueBy(filteredBoundaries, boundary => [boundary.a, boundary.b]);

	return filteredBoundaries;
}

function connectAdjacentBoundaries() {
	let curBoundaries = [];

	for (let y = 0; y < height; y += w) {

		curBoundaries = filterAndRemoveBoundariesInRow(y);
		boundaries = boundaries.concat(connectAdjBoundariesInRow(curBoundaries));
		// console.log(`Y: ${y}`);
	}

	for (let x = 0; x <= width; x += w) {
		curBoundaries = filterAndRemoveBoundariesInCol(x);
		boundaries = boundaries.concat(connectAdjBoundariesInCol(curBoundaries));
	}
}

function displayDeltaTime() {
	fill(255);
	stroke(0);
	text(`Current DT: ${String(deltaTime)}ms`, 10, 10);
}

function displayAvgDeltaTime() {
	fill(255);
	stroke(0);

	let dtAvg = Math.round(totalRunTimeMs / adjustedFrameCount * 10) / 10;
	text(`DT avg: ${String(dtAvg)}ms`, 10, 20);
}

function displayFrameRate() {
	fill(255);
	stroke(0);

	let fps = Math.round(frameRate() * 10) / 10;
	text(`Current FPS: ${String(fps)}`, 10, 30);
}

function displayAvgFrameRate() {
	fill(255);
	stroke(0);

	let totalRunTimeSec = totalRunTimeMs / 1000;

	let avgFps = Math.round(adjustedFrameCount / totalRunTimeSec * 10) / 10;
	text(`Avg FPS: ${String(avgFps)}`, 10, 40);
}

function displayPerformance() {
	displayDeltaTime();
	displayAvgDeltaTime();
	displayFrameRate();
	displayAvgFrameRate();
}
