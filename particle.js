class Particle {
	constructor(radius) {
		this.pos = createVector(cellWidth / 2, cellWidth / 2);
		this.rays = []

		for (let i = 0; i < 360; i += 360 / numRays) {
			this.rays.push(new Ray(this.pos, radians(i)));
		}

		this.hitboxRadius = radius;
		this.isDragged = false;
	}

	showFullRays() {
		drawPoint(this.pos, 'white');
		for (let ray of this.rays) {
			ray.show();
		}
	}

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

	isHovered() {
		let distFromMouse = dist(this.pos.x, this.pos.y, mouseX, mouseY);

		if (distFromMouse < this.hitboxRadius) {
			return true;
		}

		return false;
	}

	showHitbox() {
		let color;

		if (this.isDragged) {
			color = 'red';
		} else if (this.isHovered()) {
			color = 'green';
		} else {
			color = 'navy';
		}

		push();
		stroke(color);
		strokeWeight(4);
		noFill();
		circle(this.pos.x, this.pos.y, this.hitboxRadius * 2);
		pop();
	}

	move() {
		if (this.isDragged) {
			this.pos.x = mouseX;
			this.pos.y = mouseY;

			for (let ray of this.rays) {
				ray.move(this.pos);
			}
		}
	}

	startDrag() {
		this.isDragged = true;
	}

	endDrag() {
		this.isDragged = false;
	}

	updateAllIntersections() {
		for (let ray of this.rays) {
			ray.updateIntersections();
		}
	}
}
