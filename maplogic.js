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