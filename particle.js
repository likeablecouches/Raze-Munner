class Particle {
	constructor() {
		this.pos = createVector(150, 150);
		this.rays = []
		// this.rays.push(new Ray(this.pos, castPoints[4]));

		for (let i = 0; i < castPoints.length; i++) {
			this.rays.push(new Ray(this.pos, castPoints[i], castPoints[i]));
		}
	}

	show() {
		drawPoint(this.pos, 'white');
		for (let ray of this.rays) {
			ray.show();
		}
	}

	move() {
		this.pos.x = mouseX;
		this.pos.y = mouseY;

		for (let ray of this.rays) {
			ray.move(this.pos);
		}
	}
}
