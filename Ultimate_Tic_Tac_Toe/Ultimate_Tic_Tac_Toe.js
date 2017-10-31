var scl = 40;
var board = [[], [], []];
var symbols = ["O", "X"];
var turn;
var message, textCol;

function SubBoard(x, y, scl) {
  this.active = true;
  this.x = x;
  this.y = y;
  this.scl = scl;
  this.grid = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  this.tint = color(255, 255, 153, 50);

  this.showFrame = function() {
    var x = this.x;
    var y = this.y;
    var scl = this.scl;
    stroke(255);
    strokeWeight(4);
    line(scl + x, y, scl + x, y + scl * 3);
    line(x + scl * 2, y, x + scl * 2, y + scl * 3);
    line(x, scl + y, x + scl * 3, scl + y);
    line(x, y + scl * 2, x + scl * 3, y + scl * 2);
  }

  this.showTint = function() {
    noStroke();
    fill(this.tint);
    rect(this.x, this.y, this.scl * 3, this.scl * 3);
  }

  this.showMoves = function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.grid[i][j] == "O") {
          var x = this.x + scl * i + scl / 2;
          var y = this.y + scl * j + scl / 2;
          stroke(color(0, 0, 255));
          fill(0);
          ellipse(x, y, scl * 0.50, scl * 0.50);
        }

        if (this.grid[i][j] == "X") {
          var offset = scl * 0.25;
          var a = [this.x + scl * i + offset, this.y + scl * j + offset];
          var b = [this.x + scl * (i + 1) - offset, this.y + scl * j + offset];
          var c = [this.x + scl * i + offset, this.y + scl * (j + 1) - offset];
          var d = [this.x + scl * (i + 1) - offset, this.y + scl * (j + 1) - offset];
          stroke(color(255, 0, 0));
          line(a[0], a[1], d[0], d[1]);
          line(b[0], b[1], c[0], c[1]);
        }
      }
    }
  }

  this.show = function() {
    this.showFrame();
    this.showMoves();
    this.showTint();
  }

  this.makeMove = function(x, y, sym) {
    if ((x > this.x && x < this.x + this.scl * 3) && (y > this.y && y < this.y + this.scl * 3)) {
      var posx = floor(map(x, this.x, this.x + this.scl * 3, 0, 3));
      var posy = floor(map(y, this.y, this.y + this.scl * 3, 0, 3));

      if (this.grid[posx][posy] == " ") {
        this.grid[posx][posy] = sym;
        if (turn == 1) {
          turn = 0;
        }
        else {
          turn = 1;
        }
      }
    }
  }

  this.setMessage = function(m) {
    message = m + " wins!";
    this.active = false;
    if (m == "O") {
      this.tint = color(0, 0, 255, 75);
    }
    else {
      this.tint = color(255, 0, 0, 75);
    }
  }

  this.checkWin = function(m, col) {
    var b = this.grid;
    var x = this.x;
    var y = this.y;
    var scl = this.scl;
    stroke(col);
    strokeWeight(6);
    // Vertical
    if (b[0][0] == m && b[0][1] == m && b[0][2] == m) {
      line(x + scl / 2, y + scl / 2, x + scl / 2, y + scl * 2.5);
      this.setMessage(m);
    }
    if (b[1][0] == m && b[1][1] == m && b[1][2] == m) {
      line(x + scl * 1.5, y + scl / 2, x + scl * 1.5, y + scl * 2.5);
      this.setMessage(m);
    }
    if (b[2][0] == m && b[2][1] == m && b[2][2] == m) {
      line(x + scl * 2.5, y + scl / 2, x + scl * 2.5, y + scl * 2.5);
      this.setMessage(m);
    }
    // Horizontal
    if (b[0][0] == m && b[1][0] == m && b[2][0] == m) {
      line(x + scl / 2, y + scl / 2, x + scl * 2.5, y + scl / 2);
      this.setMessage(m);
    }
    if (b[0][1] == m && b[1][1] == m && b[2][1] == m) {
      line(x + scl / 2, y + scl * 1.5, x + scl * 2.5, y + scl * 1.5);
      this.setMessage(m);
    }
    if (b[0][2] == m && b[1][2] == m && b[2][2] == m) {
      line(x + scl / 2, y + scl * 2.5, x + scl * 2.5, y + scl * 2.5);
      this.setMessage(m);
    }
    // Diagonals
    if (b[0][0] == m && b[1][1] == m && b[2][2] == m) {
      line(x + scl / 2, y + scl / 2, x + scl * 2.5, y + scl * 2.5);
      this.setMessage(m);
    }
    if (b[0][2] == m && b[1][1] == m && b[2][0] == m) {
      line(x + scl / 2, y + scl * 2.5, x + scl * 2.5, y + scl / 2);
      this.setMessage(m);
    }
  }

  this.checkDraw = function() {
    var merged = [].concat.apply([], this.grid);
    return (merged.indexOf(" ") == -1);
  }
}

function setup() {
  createCanvas(400, 400);

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      board[i][j] = new SubBoard(i * scl * 3, j * scl * 3, scl);
    }
  }

  turn = floor(random() * 2);
  textCol = color(0, 255, 0);
}

function draw() {
  background(0);
  message = "It's " + symbols[turn] + "\'s turn!";

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      board[i][j].show();
      if (board[i][j].checkDraw()) {
        message = "It's a draw!";
      }
      board[i][j].checkWin("X", color(255, 0, 0));
      board[i][j].checkWin("O", color(0, 0, 255));
    }
  }

  textSize(30);
  strokeWeight(0);
  fill(255);
  textAlign(CENTER);
  text(message, width / 2, height - 20);
}

function mouseClicked() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j].active) {
        board[i][j].makeMove(mouseX, mouseY, symbols[turn]);
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 82) {
    setup();
  }
}
