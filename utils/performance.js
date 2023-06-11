function displayCurrentDeltaTime() {
	fill(255);
	stroke(0);
	text(`Current DT: ${String(deltaTime)}ms`, 10, 10);
}

function displayAvgDeltaTime() {
	fill(255);
	stroke(0);

	let dtAvg = Math.round(totalRunTimeMs / adjustedFrameCount * 10) / 10;
	text(`DT avg: ${String(dtAvg)}ms`, 10, 20);
}

function displayCurrentFrameRate() {
	fill(255);
	stroke(0);

	let fps = Math.round(frameRate() * 10) / 10;
	text(`Current FPS: ${String(fps)}`, 10, 30);
}

function displayAvgFrameRate() {
	fill(255);
	stroke(0);

	let totalRunTimeSec = totalRunTimeMs / 1000;

	let avgFps = Math.round(adjustedFrameCount / totalRunTimeSec * 10) / 10;
	text(`Avg FPS: ${String(avgFps)}`, 10, 40);
}

function displayPerformance() {
	displayCurrentDeltaTime();
	displayAvgDeltaTime();
	displayCurrentFrameRate();
	displayAvgFrameRate();
}
