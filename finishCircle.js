class FinishCircle {
	constructor(x, y, radius) {
		this.radius = radius;
		this.pos = createVector(x, y);
	}

	show() {
		fill('green')
		noStroke();
		circle(this.pos.x, this.pos.y, this.radius * 2);
	}
}
