var paddle;
var ball;
var block; // rect(i, j, 25, 15);
var grid = new Array(24);

function movement() {
  if (keyIsDown(39)) {
    paddle.move(1);
  }
  if (keyIsDown(37)) {
    paddle.move(-1);
  }
}

function setup() {
  createCanvas(600, 400);

  paddle = new Paddle()
  ball = new Ball(paddle.x, paddle.y - 10);

  for (var i = 0; i < 24; i++) {
    grid[i] = new Array(6);
  }

  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 6; j++) {
      grid[i][j] = new Block(i, j);
    }
  }
}

function draw() {
  background(0);

  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 6; j++) {
      grid[i][j].show();
    }
  }

  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 6; j++) {
      if (grid[i][j].bounce(ball.v)) {
        var x = floor(map(ball.x, 0, width, 0, 24));
        grid[x][j].active = false;
      }
    }
  }

  movement();
  ball.move();
  paddle.bounce();

  paddle.show();
  ball.show();
}

function keyPressed() {
  if (keyCode == 32) {
    ball.released = true;
  }

  if (keyCode == 82) {
    setup();
  }
}
