// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
document.body.appendChild(canvas);

//Tile info
var tile = {
	y: 0,
	x: 0,
	yMax: 5,
	xMax: 5,
	yMin: -5,
	xMin: -5
};

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/bg" + tile.x + tile.y + ".png";


// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "img/download.png";

// target image
var targetReady = false;
var targetImage = new Image();
targetImage.onload = function () {
	targetReady = true;
};
targetImage.src = "img/target.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var target = {};
var targetsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var resetHero = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
}

var resetTarget = function () {
	// Throw the target somewhere on the screen randomly
	target.x = 32 + (Math.random() * (canvas.width - 64));
	target.y = 32 + (Math.random() * (canvas.height - 64));
}

var removeTarget = function () {
	target.x = 1000;
	target.y = 1000;
}

var resetTile = function () {
	bgImage.src = "img/bg" + tile.x + tile.y + ".png";
}

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Found Target?
	if (
		hero.x <= (target.x + 32)
		&& target.x <= (hero.x + 32)
		&& hero.y <= (target.y + 32)
		&& target.y <= (hero.y + 32)
	) {
		++targetsCaught;
		removeTarget();
	}
	//edge of map?
	if (hero.x >= canvas.width && tile.x < tile.xMax) {
		hero.x = 0 + 32;
		tile.x++;
		resetTile();
		resetTarget();
	}
	if (hero.x <= 0 && tile.x > tile.xMin) {
		hero.x = canvas.width - 32;
		tile.x--;
		resetTile();
		resetTarget();
	}
	if (hero.y >= canvas.height && tile.y < tile.yMax) {
		hero.y = 0 + 32;
		tile.y++;
		resetTile();
		resetTarget();
	}
	if (hero.y <= 0 && tile.y > tile.yMin) {
		hero.y = canvas.height - 32;
		tile.y--;
		resetTile();
		resetTarget();
	}
	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (targetReady) {
		ctx.drawImage(targetImage, target.x, target.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("X:" + tile.x + " Y:" + tile.y + " Treasure found: " + targetsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	
	then = now;
	requestAnimationFrame(main);
};

// Let's play this game!
resetHero();
var then = Date.now();
main();
