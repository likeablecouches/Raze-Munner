class Particle {
	constructor(radius) {
		this.pos = createVector(respawnVector.x, respawnVector.y);
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
		strokeWeight(2);
		noFill();
		circle(this.pos.x, this.pos.y, this.hitboxRadius * 2);
		pop();
	}

	checkCollision(boundary) {
		let d = createVector(boundary.b.x - boundary.a.x, boundary.b.y - boundary.a.y);
		let f = createVector(boundary.a.x - this.pos.x, boundary.a.y - this.pos.y);

		let a = d.dot( d ) ;
		let b = 2*f.dot( d ) ;
		let c = f.dot( f ) - this.hitboxRadius * this.hitboxRadius;

		let discriminant = b*b-4*a*c;

		if (discriminant < 0 ) {
			return false;
		} else {
			discriminant = sqrt( discriminant );
			
			let t1 = (-b - discriminant)/(2*a);
			let t2 = (-b + discriminant)/(2*a);
			
			if( t1 >= 0 && t1 <= 1 )
			{
			  return true ;
			}
			
			if( t2 >= 0 && t2 <= 1 )
			{
			  return true ;
			}
			
			return false ;

		}
	}

	checkCollisionWithAllBoundaries() {
		for (let boundary of boundaries) {
			if (this.checkCollision(boundary)) {
				return true;
			}
		}

		return false;
	}

	resetPosition() {
		this.pos.x = respawnVector.x;
		this.pos.y = respawnVector.y;
	}

	move() {
		if (this.isDragged) {
			this.pos.x = mouseX;
			this.pos.y = mouseY;

			for (let ray of this.rays) {
				ray.move(this.pos);
			}
		}

		let isColliding = this.checkCollisionWithAllBoundaries();

		if (isColliding) {
			this.resetPosition();
			this.endDrag();
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
