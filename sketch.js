let boundaries = [];
let castPoints = [];
let closestIntersections = [];

let particle;

function setup() {
	createCanvas(400, 400)
	castPoints.push(createVector(0, 0))
	castPoints.push(createVector(width, 0))
	castPoints.push(createVector(0, height))
	castPoints.push(createVector(width, height))

	newBoundary(100, 100, 300, 100);
	// newBoundary(100, 150, 300, 150);
	newBoundary(300, 200, 300, 350);
	newBoundary(100, 150, 300, 150);

	particle = new Particle();
}

function draw() {
	background(0);
	drawPoints(castPoints, 'white');

	for (let i = 0; i < boundaries.length; i++) {
		boundaries[i].show();
	}

//	console.log(particle.rays[0].dir.x, particle.rays[0].dir.y);
	particle.move();
	particle.show();

	for (let i = 0; i < particle.rays.length; i++) {
		// particle.rays[i].lookAt(mouseX, mouseY);
		particle.rays[i].updateIntersections();

		let points = particle.rays[i].getIntersections();

		drawPoints(points, 'blue');
	}

	drawPoints(closestIntersections, 'green');
}
