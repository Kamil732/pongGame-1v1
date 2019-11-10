const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;

let ballSpeedX = 3;
let ballSpeedY = 3;

const pHeight = 100; // player height
const pWidth = 15; // player width

const playerX = 5; // player X
let playerY = ch/2 - pHeight/2; // player Y

const playerX2 = cw - pWidth - 5; // player2 X
let  playerY2 = ch/2 - pHeight/2; // player2 Y

let score = 0;
let score2 = 0;

///////////////////////////////////////////////////////////////////
function bg() {
	// draw a table
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, cw, ch);
}
function ball() {
	ctx.fillStyle = "white";
	ctx.fillRect(ballX, ballY, ballSize, ballSize);
	
	ballX += ballSpeedX; // speed X
	ballY += ballSpeedY; // speed Y
	
	// BALL BOUNCING Y
	if(ballY <= 0 || ballY >= ch - ballSize) { 
		ballSpeedY = -ballSpeedY;
	}
	// BALL BOUNCING X (left)
	if(ballX <= 0) {
		ballX = cw/2 - ballSize/2;
		ballY = ch/2 - ballSize/2;
		ballSpeedX = 0;
		ballSpeedY = 0;
		score2 += 1;
		scoreResult();
	}
	// BALL BOUNCING X (right)
	if(ballX >= cw) {
		ballX = cw/2 - ballSize/2;
		ballY = ch/2 - ballSize/2;
		ballSpeedX = 0;
		ballSpeedY = 0;
		score += 1;
		scoreResult();
	}
}
function player() {
		ctx.fillStyle = "lightblue";
		ctx.fillRect(playerX, playerY, pWidth, pHeight);

		// the ball bouncing of the paddle
		if(ballX <= playerX + pWidth && ballY <= playerY + pHeight && ballY >= playerY) {ballSpeedX = -ballSpeedX; ballSpeedUp();}
} 
function player2() {
		ctx.fillStyle = "yellow";
		ctx.fillRect(playerX2, playerY2, pWidth, pHeight);

		// the ball bouncing of the paddle
		if(ballX >= playerX2 - pWidth && ballY <= playerY2 + pHeight && ballY >= playerY2) {ballSpeedX = -ballSpeedX; ballSpeedUp();}
}
//////////////////////////////////////////////////////////
bg();
ball();
player();
player2();

// NA ZALADOWANIE SIE
window.addEventListener("click", function() {
	ballSpeedX = 3;
	ballSpeedY = 3;
	function playerPosision(event) {
		if(event.keyCode==83) playerY += 20;
		if(event.keyCode==87) playerY -= 20;

		// blokowanie wyjazdu
		if(playerY < 0) playerY = 0;
		else if(playerY > ch - pHeight) playerY = ch - pHeight;
	}
	function playerPosision2(event) {
		if(event.keyCode==38) playerY2 -= 20;
		if(event.keyCode==40) playerY2 += 20;


		// blokowanie wyjazdu
		if(playerY2 < 0) playerY2 = 0;
		else if(playerY2 > ch - pHeight) playerY2 = ch - pHeight;
	}

	function ballSpeedUp() {
		if(ballSpeedX > 0 && ballSpeedX < 9) {
			ballSpeedX += 1; 
	   }
	   else if(ballSpeedX < 0 && ballSpeedX < -9) {
		   ballSpeedX -= 1;
	   }

	   // predY
	   if(ballSpeedY  > 0 && ballSpeedY  < 9) {
		  ballSpeedY  += 1;
	   }
	   else if(ballSpeedY  < 0 && ballSpeedY  < -9) {
		  ballSpeedY -= 1;
	   }
	}

	function scoreResult() {
		if(score == 1) {
			document.getElementById('punkty').innerHTML = "Gracz Lewy Wygrał!";
		}
		else if(score2 == 1) {
			document.getElementById('punkty').innerHTML = "Gracz Prawy Wygrał!";
		}
	}

	window.addEventListener("keydown", playerPosision);
	window.addEventListener("keydown", playerPosision2);

	function game() {
		bg(); 	   // background
		ball();    // ball
		player();  // player   <--
		player2(); // player2  -->
	}

	setInterval(game, 1000/60); // ANIMATING
});