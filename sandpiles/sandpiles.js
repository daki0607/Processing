var total = 0;
var grid;
var w, h;

function drawGrid(grid) {
  var cell;
  noStroke();
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      cell = grid[i][j];
      fill(0);
      if (cell == 1) {
        fill(color(127, 127, 255));
      }
      if (cell == 2) {
        fill(color(255, 255, 0));
      }
      if (cell == 3) {
        fill(color(255, 0, 0));
      }
      rect(i, j, 1, 1);
    }
  }
}

function addSand(i, j) {
  var cell = grid[i][j];
  if (cell < 3) {
    grid[i][j]++;
  }
  else {
    grid[i][j] = cell - 3;
    if (i > 0) {
      addSand(i - 1, j);
    }
    if (i < width - 1) {
      addSand(i + 1, j);
    }
    if (j > 0) {
      addSand(i, j - 1);
    }
    if (j < height - 1) {
      addSand(i, j + 1);
    }
  }
}

function setup() {
  createCanvas(200, 200);
  background(0);

  w = floor(width/2);
  h = floor(height/2);

  grid = new Array(width);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(height);
    grid[i].fill(0);
  }

  // grid[w][h] = 2**16;
}

function draw() {
  if (total % 512 == 0) {
    drawGrid(grid);
  }

  addSand(w, h);

  total++;
}
