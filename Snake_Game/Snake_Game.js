var cols = 20;
var rows = 20;
var grid = new Array(cols);
var w, h;
var colors = 0;

function duplicate(arr) {
  for (var i = 1; i < arr.length; i++) {
    for (var j = 1; j < arr.length; j++) {
      if (j != i) {
        if (arr[i][0] === arr[j][0] && arr[i][1] === arr[j][1]) {
          return true;
        }
      }
    }
  }
  return false;
}

function Food(i, j) {
  this.i = i;
  this.j = j;

  this.show = function() {
    fill(60, 100, 100);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
}

function Point(i, j) {
  this.i = i;
  this.j = j;

  this.show = function() {
    fill(0, 0, 0);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
}

function Snake(i, j) {
  this.i = i;
  this.j = j;
  this.tail = [[this.i, this.j]];
  this.dir = Math.floor(Math.random() * 4);

  this.show = function(colors) {
    var cl = colors;
    fill(color(cl, 100, 100));
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);

    for (var i = 0; i < this.tail.length; i++) {
      fill(color((cl + i * 4) % 360, 100, 100));
      rect(this.tail[i][0] * w, this.tail[i][1] * h, w - 1, h - 1);
    }
  }

  this.movement = function() {
    if (this.dir == 0) {
      this.i++;
    }
    else if (this.dir == 1) {
      this.j--;
    }
    else if (this.dir == 2) {
      this.i--;
    }
    else if (this.dir == 3) {
      this.j++;
    }

    for (var i = this.tail.length - 1; i > 0; i--) {
      this.tail[i] = this.tail[i - 1];
    }
    this.tail[0] = [this.i, this.j];
  }
}

function setup() {
  frameRate(10);
  colorMode(HSB);
  createCanvas(600, 600);

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Point(i, j);
    }
  }

  s = new Snake(int(cols / 2), int(rows / 2));
  f = new Food(Math.floor(Math.random() * (cols - 1)), Math.floor(Math.random() * (rows - 1)));
}

function draw() {
  background(0, 0, 30);

  // Draw the grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  f.show();
  s.movement();
  s.show(colors);
  colors++;
  if (colors == 360) {
    colors = 0;
  }

  // Ate food
  if (s.i === f.i && s.j === f.j) {
    s.tail.push([f.i, f.j]);
    f.i = Math.floor(Math.random() * (cols - 1));
    f.j = Math.floor(Math.random() * (rows - 1));
  }

  // Hit itself
  if (duplicate(s.tail)) {
    console.log("You Lost.");
    noLoop();
  }

  // Ran into the edge
  if (s.i < 0 || s.i > cols - 1 || s.j < 0 || s.j > rows - 1) {
    console.log("You Lost.");
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir = 1;
  }
  else if (keyCode === DOWN_ARROW) {
    s.dir = 3;
  }
  else if (keyCode === RIGHT_ARROW) {
    s.dir = 0;
  }
  else if (keyCode === LEFT_ARROW) {
    s.dir = 2;
  }
}

function mousePressed() {
  s.tail.push(s.tail[s.tail.length - 1]);
}
