let boundaries = [];

// particle variables
let particle;
let numRays = 360
let respawnVector;

// maze generation variables
var cols, rows;
var cellWidth = 80;
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

	cols = floor(width / cellWidth);
	rows = floor(height / cellWidth);

	initializeGrid();

	current = grid[0];

	respawnVector = createVector(cellWidth / 2, cellWidth / 2);
	particle = new Particle(10);
}

function mousePressed() {
	if (particle.isHovered()) {
		particle.startDrag();
	}
}

function mouseReleased() {
	particle.endDrag();
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
	}

	if (isGenerating) {
		return;
	}

	// drawBoundaries(true);

	// raycasting and particle movement
	particle.move();

 	particle.updateAllIntersections();
	particle.showCorrectRays();
	particle.showHitbox();

	adjustedFrameCount++;
	totalRunTimeMs += deltaTime;

	// displayPerformance();
}
