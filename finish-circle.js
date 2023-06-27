class FinishCircle {
	constructor(x, y, radius) {

		// used to scale the circle's radius according to the cell width
		this.borderRatio = 0.6 
		this.radius = cellWidth / 2 * this.borderRatio;
		this.pos = createVector(x, y);
	}

	show() {
		fill('lime')
		noStroke();
		circle(this.pos.x, this.pos.y, this.radius * 2);
	}

	updateRadius() {
		// makes sure the circle's radius is adjusted for the current cell width
		this.radius = cellWidth / 2 * this.borderRatio;
	}
}
