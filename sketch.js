let boundaries = [];

// particle variables
let particle;
let numRays = 360;
let respawnVector;

// By default, rays will occasionally seem to leak through areas where two
// boundaries meet. boundaryPadding is used to pad out the boundaires by a
// marginal amount in order to full close off the tiny open spaces between
// boundaries.

let boundaryPadding = 0.1;

// The particle speed must be less than its hitbox diameter to avoid
// warping through walls(particleSpeed < 20 in this case). If the particle is
// too fast, it is possible for the particle to pass a wall but never actually
// collide with it.

let particleSpeed = 5;

// maze generation variables
var cols, rows;
var cellWidth = 80;
var cellWidthLimit = 40;
var grid = [];
var current;
var stack = [];
let isGenerating;
let startCell;

// game progression
let finishCell;
let finishCircle;
let currentLevel = 1;

// performance tracking
let totalRunTimeMs = 0;
// total frames drawn after first maze generation
let adjustedFrameCount = 0;

function setup() {
	createCanvas(800, 600)

	cols = floor(width / cellWidth);
	rows = floor(height / cellWidth);

	newGrid();

	startMazeGeneration();

	particle = new Particle(10, particleSpeed);
}

// Mouse based movement is deprecated.
//
// function mousePressed() {
// 	if (particle.isHovered()) {
// 		particle.startDrag();
// 	}
// }
// 
// function mouseReleased() {
// 	particle.endDrag();
// }

function draw() {
	background(0);

	if (isGenerating) {
		updateMaze();
	}

	if (current == startCell && isGenerating) {
		isGenerating = false;

		// Grid displayed during maze generation does not contain any actual
		// concrete walls that are detectable by the particle.
		createBoundariesFromGrid();

		// premature optimization :)
		connectAdjacentBoundaries();

		particle.respawn();

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

	finishCircle.show();

	drawText(`Level: ${str(currentLevel)}`, width - 70, 30, 16);

	if (particle.checkCollisionWithCircle(finishCircle)) {
		
		if (cellWidth > cellWidthLimit) {
			cellWidth -= 10;
		}

		// Update cols and rows for next maze generation.
		cols = floor(width / cellWidth);
		rows = floor(height / cellWidth);

		newGrid();
		boundaries = [];

		startMazeGeneration();
		currentLevel++;
	}

	// performance stuff
	adjustedFrameCount++;
	totalRunTimeMs += deltaTime;

	displayPerformance();
}
