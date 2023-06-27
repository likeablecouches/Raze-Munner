function displayCurrentDeltaTime() {
	drawText(`Current DT: ${String(deltaTime)}ms`, 10, 10);
}

function displayAvgDeltaTime() {
	let dtAvg = Math.round(totalRunTimeMs / adjustedFrameCount * 10) / 10;
	drawText(`DT avg: ${String(dtAvg)}ms`, 10, 20);
}

function displayCurrentFrameRate() {
	let fps = Math.round(frameRate() * 10) / 10;
	drawText(`Current FPS: ${String(fps)}`, 10, 30);
}

function displayAvgFrameRate() {
	let totalRunTimeSec = totalRunTimeMs / 1000;
	let avgFps = Math.round(adjustedFrameCount / totalRunTimeSec * 10) / 10;

	drawText(`Avg FPS: ${String(avgFps)}`, 10, 40);
}

function displayPerformance() {
	displayCurrentDeltaTime();
	displayAvgDeltaTime();
	displayCurrentFrameRate();
	displayAvgFrameRate();
}
