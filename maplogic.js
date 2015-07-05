////A bunch of useful map functions

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

//returns the radar angle between two sets of coordinates
var radarAngle = function (x1, y1, x2, y2) {
	var pi = 3.14159265358979;
	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	return Math.atan2(deltaY, deltaX) * 180 / pi;
}