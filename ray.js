class Ray {
	constructor(pos, radian) {
		this.pos = pos;

		// Represents the coordinates of the ray's endpoint, relative to its
		// starting position. Its length should be arbitrarily long, longer
		// than the dimensions of the map.
		this.dir = p5.Vector.fromAngle(radian, 10000);
	}

	show() {
		stroke('white');
		push();
		translate(this.pos.x, this.pos.y);
		line(0, 0, this.dir.x, this.dir.y);
		pop();
	}

	move(pos) {
		this.pos = pos;
	}

	cast(wall) {
		// Return the point at which the ray intersects with the given wall.
		// None otherwise.

		let x1 = wall.a.x;
		let y1 = wall.a.y;
		let x2 = wall.b.x;
		let y2 = wall.b.y;

		// Pad the boundary to prevent ray leaking. See sketch.js for more details.
		if (wall.orientation == "horizontal") {
			x1 -= boundaryPadding;
			x2 += boundaryPadding;
		} else {
			y1 -= boundaryPadding;
			y2 += boundaryPadding;
		}

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y;

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

	updateIntersections() {
		// Update the ray's intersections with all boundaries given its current position

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

	getClosestIntersection() {
		// Return point of closest intersection with respect to the ray's origin

		let closestIntersection;
		let smallestDist = Number.MAX_VALUE
		let curDist;

		for (let intersection of this.getIntersections()) {
			curDist = this.pos.dist(intersection);
			if (curDist < smallestDist) {
				closestIntersection = intersection;
				smallestDist = curDist;
			}
		}

		return closestIntersection;
	}
}
