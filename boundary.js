class Boundary {
	constructor(x1, y1, x2, y2, parentCellIndex) {
		if (parentCellIndex === null) {
			console.log('here')
			return;
		}

		if (x1 <= x2 && y1 <= y2) {
			this.a = createVector(x1, y1);
			this.b = createVector(x2, y2);
		} else {
			this.a = createVector(x2, y2);
			this.b = createVector(x1, y1);
		}

		this.orientation;

		if (this.a.x == this.b.x) {
			this.orientation = "vertical";
		} else {
			this.orientation = "horizontal";
		}

		this.red = random(255);
		this.green = random(255);
		this.blue = random(255);
	}

	show() {
		stroke(this.red, this.green, this.blue);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}

}
