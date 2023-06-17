let boundaries = [];

// particle variables
let particle;
let numRays = 20;
let respawnVector;

// The particle speed must be less than its hitbox diameter to avoid
// warping through walls(particleSpeed < 20 in this case). If the particle is
// too fast, it is possible for the particle to pass a wall but never actually
// collide with it.

let particleSpeed = 3;

// maze generation variables
var cols, rows;
var cellWidth = 80;
var grid = [];
var current;
var stack = [];
let isGenerating;
let startCell;

// game progression
let finishCell;
let finishCircle;

// performance tracking
let totalRunTimeMs = 0;
let adjustedFrameCount = 0;

function setup() {
	createCanvas(800, 600)

	cols = floor(width / cellWidth);
	rows = floor(height / cellWidth);

	initializeGrid();

	startMazeGeneration();

	particle = new Particle(10, particleSpeed);
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

	if (current.i == startCell.i && current.j == startCell.j && isGenerating) {
		isGenerating = false;
		createBoundariesFromGrid();
		connectAdjacentBoundaries();

	}

	if (isGenerating) {
		return;
	}

	drawBoundaries(true);

	// raycasting and particle movement
	particle.move();

 	particle.updateAllIntersections();
	particle.showCorrectRays();
	particle.showHitbox();

	if (particle.checkCollisionWithCircle(finishCircle)) {
		// console.log('here')
		resetMaze();
		startMazeGeneration();
	}

	finishCircle.show();

	adjustedFrameCount++;
	totalRunTimeMs += deltaTime;

	// displayPerformance();
}
