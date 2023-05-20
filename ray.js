class Ray {
	constructor(pos, dir) {
		this.pos = pos;
		this.dir = dir;
		this.intersections = [];
	}

	show() {
//		stroke('red');
//		push();
//		translate(this.pos.x, this.pos.y);
//		line(0, 0, this.dir.x, this.dir.y);
//		pop();
		stroke('red');
		line(this.pos.x, this.pos.y, this.dir.x, this.dir.y)
	}

	lookAt(x, y) {
		this.dir.x = x - this.pos.x;
		this.dir.y = y - this.pos.y;
		this.dir.normalize();
	}

	move(pos) {
		this.pos = pos;
	}

	cast(wall) {
		const x1 = wall.a.x;
		const y1 = wall.a.y;
		const x2 = wall.b.x;
		const y2 = wall.b.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.dir.x;
		const y4 = this.dir.y;

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (den == 0) {return;}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

		if (t > 0 && t < 1 && u > 0 && u < 1) {
			const pt = createVector();
			pt.x = x1 + t * (x2 - x1);
			pt.y = y1 + t * (y2 - y1);
			return pt;
		} 

		else {return;}
	}

	updateIntersections () {
		this.intersections = []

		for (let j = 0; j < boundaries.length; j++) {
			let intersection = this.cast(boundaries[j]);
			if (intersection) {
				this.intersections.push(intersection);
			}
		}
	}

	getIntersections() {
		return this.intersections;
	}
}
