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

function newBoundary(x1, y1, x2, y2) {
	boundaries.push(new Boundary(x1, y1, x2, y2));
}
