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
		lastX = boundaryRow[0].a.x - cellWidth; 
	}

	for (let i = 0; i < boundaryRow.length; i++) {
		let boundary = boundaryRow[i];
		let connected = isConnecting(boundary, lastX, "horizontal", cellWidth);

		debugString = `Index: ${i}| Pos: ${boundary.a.x}, ${boundary.a.y}   ${boundary.b.x}, ${boundary.b.y}| lastX: ${lastX}| adjBoundaries size: ${adjBoundaries.length}`

		if (connected) {
			debugString += " Pushed!";
			adjBoundaries.push(boundary);
			console.log(debugString);

			if (i != boundaryRow.length - 1) {
				lastX += cellWidth;
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
		lastY = boundaryCol[0].a.y - cellWidth; 
	}

	for (let i = 0; i < boundaryCol.length; i++) {
		let boundary = boundaryCol[i];
		let connected = isConnecting(boundary, lastY, "vertical", cellWidth);

		debugString = `Index: ${i}| Pos: ${boundary.a.x}, ${boundary.a.y}   ${boundary.b.x}, ${boundary.b.y}| lastX: ${lastY}| adjBoundaries size: ${adjBoundaries.length}`

		if (connected) {
			debugString += " Pushed!";
			adjBoundaries.push(boundary);
			console.log(debugString);

			if (i != boundaryCol.length - 1) {
				lastY += cellWidth;
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

	for (let y = 0; y < height; y += cellWidth) {

		curBoundaries = filterAndRemoveBoundariesInRow(y);
		boundaries = boundaries.concat(connectAdjBoundariesInRow(curBoundaries));
		// console.log(`Y: ${y}`);
	}

	for (let x = 0; x <= width; x += cellWidth) {
		curBoundaries = filterAndRemoveBoundariesInCol(x);
		boundaries = boundaries.concat(connectAdjBoundariesInCol(curBoundaries));
	}
}
