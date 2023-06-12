// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;

	this.checkNeighbors = function() {
		var neighbors = [];

		var top = grid[index(i, j - 1)];
		var right = grid[index(i + 1, j)];
		var bottom = grid[index(i, j + 1)];
		var left = grid[index(i - 1, j)];

		if (top && !top.visited) {
		  neighbors.push(top);
		}
		if (right && !right.visited) {
		  neighbors.push(right);
		}
		if (bottom && !bottom.visited) {
		  neighbors.push(bottom);
		}
		if (left && !left.visited) {
		  neighbors.push(left);
		}

		if (neighbors.length > 0) {
		  var r = floor(random(0, neighbors.length));
		  return neighbors[r];
		} else {
		  return undefined;
		}

	}

	this.highlight = function() {
		var x = this.i * cellWidth;
		var y = this.j * cellWidth;
		noStroke();

		if (!isGenerating) {
			fill("black")
		} else {
			fill("lime");
		}
		rect(x, y, cellWidth, cellWidth);

	}

	this.show = function() {
		var x = this.i * cellWidth;
		var y = this.j * cellWidth;
		stroke(255);
		if (this.walls[0]) {
		  line(x, y, x + cellWidth, y);
		}
		if (this.walls[1]) {
		  line(x + cellWidth, y, x + cellWidth, y + cellWidth);
		}
		if (this.walls[2]) {
		  line(x + cellWidth, y + cellWidth, x, y + cellWidth);
		}
		if (this.walls[3]) {
		  line(x, y + cellWidth, x, y);
		}

		if (this.visited) {
		  noStroke();
		  fill("black");
		  rect(x, y, cellWidth, cellWidth);
		}
	}
}
