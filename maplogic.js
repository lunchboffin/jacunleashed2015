////A bunch of useful map functions

//info for the map file
var mapInfo = {
	width: 400,
	height: 600,
	botRightLat: -38.050037,
	botRightLong: 140.802480
}

//returns the X coordinate for the given latitudinal value
var mapTranslateX = function (inputLat) {
	var ratio = inputLat / mapInfo.botRightLat;
	return mapInfo.width * ratio;
}

//returns the Y coordinate for the given longitudinal value
var mapTranslateY = function (inputLong) {
	var ratio = inputLong / mapInfo.botRightLong;
	return mapInfo.height * ratio;
}

//returns the radar angle between two sets of coordinates
var radarAngle = function (x1, y1, x2, y2) {
	var pi = 3.14159265358979;
	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	return Math.atan2(deltaY, deltaX) * 180 / pi;
}