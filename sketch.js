let boundaries = [];
let particle;
let numRays = 360

function setup() {
	createCanvas(400, 400)

	particle = new Particle();

	newBoundary(100, 100, 300, 100);
	newBoundary(50, 200, 100, 300);
	newBoundary(300, 200, 300, 350);
	newBoundary(50, 50, 350, 350);
//	newBoundary(350, 200, 350, 350);
//	newBoundary(370, 200, 370, 350);
}

function draw() {
	background(0);

//	for (let i = 0; i < boundaries.length; i++) {
//		boundaries[i].show();
//	}

	particle.move();
	// particle.showAllRays();

	particle.updateAllIntersections();

	particle.showCorrectRays();
	console.log(particle.rays.length)

}
