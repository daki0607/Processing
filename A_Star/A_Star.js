function removeFromArr(arr, el) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == el) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  // Var d = dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}


var cols = 25;
var rows = 25;
var grid = new Array(cols)

openSet = [];
closedSet = [];
var start;
var end;
var w, h;
var path = [];
var noSolution = false;

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.3) {
    this.wall = true;
  }

  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }

  this.show = function(col) {
    fill(col);
    if (this.wall) {
      fill(0);
    }
    noStroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
}

function setup() {
  createCanvas(600, 600);
  // console.log('A*');

  w = width / cols;
  h = height / rows;

  // Making a 2D array
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
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
  // console.log(grid);
}

function draw() {
  if (openSet.length > 0) {
    // keep going

    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log('Done!');
    }

    removeFromArr(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;

    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        if (!openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
          else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;

      }
    }
  }

  else {
    // no solution

    console.log('No solution');
    noSolution = true;
    noLoop();
  }

  background(0);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  // find the path
  if (!noSolution) {
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }

  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }
}
