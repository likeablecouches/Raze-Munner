let boundaries = [];

// particle variables
let particle;
let numRays = 360

// maze generation variables
var cols, rows;
var w = 80;
var grid = [];
var current;
var stack = [];
let isGenerating;

// performance tracking
let totalRunTimeMs = 0;
let adjustedFrameCount = 0;

function setup() {
	createCanvas(800, 600)

	isGenerating = true;

	cols = floor(width / w);
	rows = floor(height / w);

	initializeGrid();

	current = grid[0];

	particle = new Particle();

//	newBoundary(50, 200, 100, 300);
//	newBoundary(300, 200, 300, 350);
//	newBoundary(50, 50, 350, 350);
}

function draw() {
	background(0);
 
	if (isGenerating) {
		updateMaze();
	}

	if (current.i == 0 && current.j == 0 && isGenerating) {
		isGenerating = false;

		createBoundariesFromGrid();
		connectAdjacentBoundaries();
		// console.log(boundaries.length);

		// for (let boundary of boundaries) {
		// 	console.log(`${boundary.a.x}, ${boundary.a.y}   ${boundary.b.x}, ${boundary.b.y}`);
		// }
	}

	if (isGenerating) {
		return;
	}

	drawBoundaries(true);

	// raycasting and particle movement

	particle.move();
	// particle.showAllRays();

 	particle.updateAllIntersections();
	particle.showCorrectRays();

	adjustedFrameCount++;
	totalRunTimeMs += deltaTime;

	displayPerformance();
}
