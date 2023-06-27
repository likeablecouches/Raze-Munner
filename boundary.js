class Boundary {

	constructor(x1, y1, x2, y2) {

		// A boundarie's a vector should always represent the point that is
		// higher/further to the left. The boundary merging functions depend on
		// this rule

		if (x1 <= x2 && y1 <= y2) {
			this.a = createVector(x1, y1);
			this.b = createVector(x2, y2);
		} else {
			this.a = createVector(x2, y2);
			this.b = createVector(x1, y1);
		}

		// used to determine in what direction the boundary should be padded out in.
		this.orientation;

		if (this.a.x == this.b.x) {
			this.orientation = "vertical";
		} else {
			this.orientation = "horizontal";
		}

		// a boundary's color should be different from its neighbors. Useful
		// for debugging boundaries.
		this.red = random(255);
		this.green = random(255);
		this.blue = random(255);
	}

	show() {
		stroke(this.red, this.green, this.blue);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}

}
