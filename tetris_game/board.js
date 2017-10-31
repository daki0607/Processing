function Board () {
  this.grid = new Array(cols);
  this.currentPiece = new Piece();
  this.nextPiece = new Piece();

  for (var i = 0; i < this.grid.length; i++) {
    this.grid[i] = new Array(rows);
  }

  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j] = 0;
    }
  }

  this.show = function () {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (this.grid[i][j] == 0) {
          fill(255);
        } else {
          fill(100);
        }

        rect(i * scl, j * scl, scl, scl);
      }
    }
  };

  this.update = function () {
    this.show();
  };
}
