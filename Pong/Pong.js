var paddleLeft, paddleRight;
var ball, ballMove;
var speed = 5;
var pOffset = 50; // Offset from the edge

function setup() {
  createCanvas(500, 375);
  ball = new Ball(width / 2, height / 2, speed)
  ballMove = false;

  paddleLeft = new Paddle(pOffset, height / 2);
  paddleRight = new Paddle(width - pOffset, height / 2);
}

function draw() {
  background(0);

  ball.bounce();
  ball.move(ballMove);
  ball.show();

  paddleRight.show();
  paddleLeft.show();

  // Movement
  if (keyIsDown(38)) {
    // Up arrow for right up
    if (paddleRight.y - paddleRight.h > 0) {
      paddleRight.y -= speed * 0.9;
    }
  }

  if (keyIsDown(40)) {
    // Down arrow for right down
    if (paddleRight.y + paddleRight.h < height) {
      paddleRight.y += speed * 0.9;
    }
  }

  if (keyIsDown(87)) {
    // W for left up
    if (paddleLeft.y - paddleLeft.h > 0) {
      paddleLeft.y -= speed * 0.9;
    }
  }

  if (keyIsDown(83)) {
    // S for left down
    if (paddleLeft.y + paddleLeft.h < height) {
      paddleLeft.y += speed * 0.9;
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    // Space to launch ball
    ballMove = true;
  }

  if (keyCode == 82) {
    // R for reset
    setup();
  }
}
