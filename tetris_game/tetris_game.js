var scl = 15;
var fps = 10;
var rows = 20;
var cols = 10;

var gameBoard;
// var score;
// var speed;

function setup () {
  createCanvas(400, 400);
  background(51);

  gameBoard = new Board();
}

function draw () {
  // Update the baord every frame
  gameBoard.update();
}
