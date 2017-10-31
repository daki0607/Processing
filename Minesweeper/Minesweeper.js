var scl;
var rows = 10;
var cols = 10;
var grid = new Array(cols);

function Square(i, j) {
  this.i = i;
  this.j = j;
  this.mine = false;
  this.neighbors = [];
  this.number = 0;
  this.flagged = false;
  this.revealed = false;

  if (random(1) < 0.1) {
    this.mine = true;
  }

  this.showNumber = function() {
    var num = " ";
    if (this.number > 0) {
      num = this.number.toString();
    }
    if (this.mine) {
      num = "M";
    }
    fill(color(150, 0, 0));
    noStroke();
    textSize(40);
    text(num, this.i * scl + scl / 3, this.j * scl + scl * 2 / 3);
  }

  this.show = function() {
    fill(color(175, 175, 175));
    stroke(color(100, 100, 100));
    strokeWeight(10);
    rect(this.i * scl, this.j * scl, scl, scl);
    if (this.revealed) {
      fill(color(125, 125, 125));
      stroke(color(100, 100, 100));
      strokeWeight(10);
      rect(this.i * scl, this.j * scl, scl, scl);
      this.showNumber();
    }
    if (this.flagged) {
      fill(color(125, 0, 0));
      stroke(color(100, 100, 100));
      strokeWeight(10);
      rect(this.i * scl, this.j * scl, scl, scl);
    }
  }

  this.clicked = function() {
    if (!this.flagged) {
      if (!this.revealed) {
        this.revealed = true;
        if (this.mine) {
          for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
              grid[i][j].flagged = false;
              grid[i][j].revealed = true;
            }
          }
        }
      }

      if (this.number == 0) {
        for (var i = 0; i < this.neighbors.length; i++) {
          if (this.neighbors[i].number == 0 && !this.neighbors[i].revealed) {
            this.neighbors[i].clicked();
          }
          if (!this.neighbors[i].reavealed) {
            this.neighbors[i].revealed = true;
          }
        }
      }
    }
  }

  this.addNeighbors = function() {
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
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
  }

  this.findMines = function() {
    for (var i = 0; i < this.neighbors.length; i++) {
      if (this.neighbors[i].mine) {
        this.number++;
      }
    }
  }
}

function setup() {
  createCanvas(700, 700);
  background(51);
  scl = width / cols;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // Populate the grid with square objects.
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Square(i, j);
    }
  }

  // Find each sqaure's neighbors.
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!grid[i][j].mine) {
        grid[i][j].addNeighbors();
      }
    }
  }

  // Determine the number of surrounding mines.
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!grid[i][j].mine) {
        grid[i][j].findMines();
      }
    }
  }
}

function draw() {
  // Draw each square
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function mouseClicked() {
  if (mouseButton == LEFT) {
    if ((mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height)) {
      var x = floor(map(mouseX, 0, width, 0, cols));
      var y = floor(map(mouseY, 0, height, 0, rows));

      grid[x][y].clicked();
    }
  }
  if (mouseButton == RIGHT) {
    if ((mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height)) {
      var x = floor(map(mouseX, 0, width, 0, cols));
      var y = floor(map(mouseY, 0, height, 0, rows));

      if (!grid[x][y].revealed) {
        if (grid[x][y].flagged == true) {
          grid[x][y].flagged = false;
        }
        else {
          grid[x][y].flagged = true;
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 82) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].revealed = true;
      }
    }
  }
}
