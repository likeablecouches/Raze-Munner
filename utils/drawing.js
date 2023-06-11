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

