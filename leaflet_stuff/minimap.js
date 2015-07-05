var context, minimapImg;

//info for the map file
var mapInfo = {
	width: 413,
	height: 537,
	botRightLat: -40.930066711,
	botRightLong: 141.215518787,
	topLeftLat: -24.563376339,
	topLeftLong: 128.619463671
}

//returns the Y coordinate for the given latitudinal value
var mapTranslateY = function (inputLat) {
	var mapDiff = mapInfo.botRightLat - mapInfo.topLeftLat;
	var relInputLat = inputLat - mapInfo.topLeftLat;
	var ratio = relInputLat / mapDiff;
	return Math.round(mapInfo.height * ratio);
}

//returns the X coordinate for the given longitudinal value
var mapTranslateX = function (inputLong) {
	var mapDiff = mapInfo.botRightLong - mapInfo.topLeftLong;
	var relInputLong = inputLong - mapInfo.topLeftLong;
	var ratio = relInputLong / mapDiff;
	return Math.round(mapInfo.width * ratio);
}

function drawMinimap() {
	context.drawImage(minimapImg, 0, 0);

	for (var i = 0; i < FoundShips.length; i++) {
		var longi = FoundShips[i].feature.geometry.coordinates[0];
		var lat = FoundShips[i].feature.geometry.coordinates[1];
		var x = mapTranslateX(longi);
		var y = mapTranslateY(lat);
		drawShip(x, y);
	}
}

function drawShip(x, y) {
	context.fillStyle = "rgb(0, 250, 0)";
	context.font = "16px Helvetica";
	context.fillText("X", x, y);
}

function minimapLoaded() {
	// Image loaded event complete.  Start the timer
	setInterval(drawMinimap, 1000);
}

function init_minimap() {
	/*var canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	canvas.width = mapInfo.width;
	canvas.height = mapInfo.height;
	document.body.appendChild(canvas);*/
	
	var canvas = document.getElementById("minimap");
	context = canvas.getContext("2d");
	
	minimapImg = new Image();
	minimapImg.src = 'minimap.png';
	minimapImg.onload = minimapLoaded;
	
}