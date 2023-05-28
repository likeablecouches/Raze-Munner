class Particle {
	constructor() {
		this.pos = createVector(150, 150);
		this.rays = []

		for (let i = 0; i < 360; i += 10) {
			this.rays.push(new Ray(this.pos, radians(i)));
		}

	}

	show() {
		drawPoint(this.pos, 'white');
		for (let ray of this.rays) {
			ray.show();
		}
	}

	look(wall) {
		for (let ray of this.rays) {
			const pt = ray.cast(wall);
			if (pt) {
				line(this.pos.x, this.pos.y, pt.x, pt.y)
			}
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
