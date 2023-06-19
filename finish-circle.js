class FinishCircle {
	constructor(x, y, radius) {
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
		this.radius = cellWidth / 2 * this.borderRatio;
	}
}
