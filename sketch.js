let boundaries = [];

// particle variables
let particle;
let numRays = 360;
let respawnVector;

// By default, rays will occasionally seem to leak through areas where two
// boundaries meet. boundaryPadding is used to pad out the boundaires by a
// marginal amount in order to full close off the tiny open spaces between
// boundaries.

let boundaryPadding = 0.3;

// The particle speed must be less than its hitbox diameter to avoid
// warping through walls(particleSpeed < 20 in this case). If the particle is
// too fast, it is possible for the particle to pass a wall but never actually
// collide with it.

let particleSpeed = 5;

// maze generation variables
var cols, rows;
var cellWidth = 60;
var cellWidthLimit = 40;
// var cellWidthLimit = 
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
let adjustedFrameCount = 0;

function setup() {
	createCanvas(800, 600)

	cols = floor(width / cellWidth);
	rows = floor(height / cellWidth);

	newGrid();

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
		particle.resetPosition();

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

	fill(255);
	stroke(0);
	textSize(16);
	text(`Level: ${str(currentLevel)}`, width - 70, 30);

	if (particle.checkCollisionWithCircle(finishCircle)) {
		// console.log('here')
		
		if (cellWidth > cellWidthLimit) {
			cellWidth -= 10;
		}

		cols = floor(width / cellWidth);
		rows = floor(height / cellWidth);

		newGrid();
		boundaries = [];

		startMazeGeneration();
		currentLevel++;
	}

	// stroke('red');
	// noFill();
	// rect(startCell.i * cellWidth, startCell.j * cellWidth, cellWidth, cellWidth);

	// stroke('green');
	// rect(finishCell.i * cellWidth, finishCell.j * cellWidth, cellWidth, cellWidth);

	// console.log(`${startCell.x}, ${startCell.y}`)
	// console.log(`${finishCell.x}, ${finishCell.y}`)

	adjustedFrameCount++;
	totalRunTimeMs += deltaTime;

	// displayPerformance();
}
