class Particle {
	constructor(radius, speed) {
		this.pos = createVector(respawnVector.x, respawnVector.y);
		this.rays = []

		for (let i = 0; i < 360; i += 360 / numRays) {
			this.rays.push(new Ray(this.pos, radians(i)));
		}

		this.hitboxRadius = radius;

		// Deprecated attribute. Used for mouse based movement
		this.isDragged = false;

		this.velocity = speed;
	}

 	showCorrectRays() {
		// 'correct rays' refer to rays that have been cut off at their
		// intersections. All rays will at least intersect with the map borders.
 		for (let ray of this.rays) {

			// The following condition may not ever be reached because of screen boundaries
			// if (ray.getIntersections().length == 0) {
			// 	ray.show();
			// 	continue;
			// }

			let closestIntersection = ray.getClosestIntersection();

			stroke('white');
			push();

			// Translating the origin to the particle's position is necessary
			// because all other vectors will be relative to the particle's
			// position.
			translate(this.pos.x, this.pos.y);

			// we can get the line that connects the particles position to the
			// ray's closest intersection with vector subtraction
			line(0, 0, closestIntersection.x - this.pos.x, closestIntersection.y - this.pos.y);
			
			pop();
		}
	}

	showAllRays() {
		// Show all rays unaltered for debugging purposes
 		for (let ray of this.rays) {
			stroke('green');
			push();
			translate(this.pos.x, this.pos.y);
			line(0, 0, ray.dir.x, ray.dir.y);
			pop();
		}
	}

	isHovered() {
		// checks if the mouse is hovered over the hitbox
		let distFromMouse = dist(this.pos.x, this.pos.y, mouseX, mouseY);

		if (distFromMouse < this.hitboxRadius) {
			return true;
		}

		return false;
	}

	showHitbox() {
		let color;

		// to make it visually interactive,
		if (this.isDragged) {
			color = 'red';
		} else if (this.isHovered()) {
			color = 'green';
		} else {
			color = 'aqua';
		}

		push();
		stroke(color);
		strokeWeight(2);
		noFill();
		circle(this.pos.x, this.pos.y, this.hitboxRadius * 2);
		pop();
	}

	checkCollision(boundary) {
		// detect collision between the hitbox and a given boundary

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

	checkCollisionWithCircle(circleObj) {
		let dist = this.pos.dist(circleObj.pos);

		if (dist < this.hitboxRadius + circleObj.radius) {
			return true;
		}
		
		return false;
	}

	respawn() {
		this.pos.x = respawnVector.x;
		this.pos.y = respawnVector.y;
	}

	move() {
		// handles keyboard based movement

		if (keyIsDown(87)) { 				// up - W
			this.pos.y -= this.velocity;

		} else if(keyIsDown(83)) { 			// down - S
			this.pos.y += this.velocity;
		}

		if (keyIsDown(65)) { 				// left - A
			this.pos.x -= this.velocity;

		} else if(keyIsDown(68)) { 			// right - D
			this.pos.x += this.velocity;
		}

		// mouse based movement - deprecated
		//
		// if (this.isDragged) {
		// 	this.pos.x = mouseX;
		// 	this.pos.y = mouseY;

		// 	for (let ray of this.rays) {
		// 		ray.move(this.pos);
		// 	}
		// }

		let isColliding = this.checkCollisionWithAllBoundaries();

		if (isColliding) {
			this.respawn();
			// this.endDrag();
		}

	}

	// startDrag() {
	// 	this.isDragged = true;
	// }

	// endDrag() {
	// 	this.isDragged = false;
	// }

	updateAllIntersections() {
		// Updates ray-boundary intersections of all rays of particle
		for (let ray of this.rays) {
			ray.updateIntersections();
		}
	}
}
