var cols = 4;
var rows = 4;
var grid = new Array(cols);
var unvisited = [];
var visited = [];
var start = [];
var w, h;

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.neighbors = [];

  this.show = function() {
    fill(255);
    noStroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  this.addNeighbors = function() {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i -1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }
}

function setup() {
  createCanvas(400, 400);

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors();
    }
  }

  console.log(grid);

}

function draw() {
  background(0);







  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
