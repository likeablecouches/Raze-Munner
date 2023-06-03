class Particle {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.rays = []

		for (let i = 0; i < 360; i += 360 / numRays) {
			this.rays.push(new Ray(this.pos, radians(i)));
		}

	}

	showFullRays() {
		drawPoint(this.pos, 'white');
		for (let ray of this.rays) {
			ray.show();
		}
	}

//	look(wall) {
//		for (let ray of this.rays) {
//			const pt = ray.cast(wall);
//			if (pt) {
//				drawPoint(pt, 'blue');
//				line(this.pos.x, this.pos.y, pt.x, pt.y)
//			}
//		}
//	}

 	showCorrectRays() {
 		for (let ray of this.rays) {
			if (ray.getIntersections().length == 0) {
				ray.show();
				continue;
			}

			let closestIntersection = ray.getClosestIntersection();

			stroke('white');
			push();
			translate(this.pos.x, this.pos.y);
			line(0, 0, closestIntersection.x - this.pos.x, closestIntersection.y - this.pos.y);
			
			pop();
		}
	}

	showAllRays() {
 		for (let ray of this.rays) {
			stroke('green');
			push();
			translate(this.pos.x, this.pos.y);
			line(0, 0, ray.dir.x, ray.dir.y);
			pop();
		}
	}

	move() {
		this.pos.x = mouseX;
		this.pos.y = mouseY;

		for (let ray of this.rays) {
			ray.move(this.pos);
		}
	}

	updateAllIntersections() {
		for (let ray of this.rays) {
			ray.updateIntersections();
		}
	}
}
