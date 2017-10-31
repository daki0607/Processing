function Paddle() {
  this.x = width / 2;
  this.y = height * 0.95;
  this.w = 50;
  this.h = 5;

  this.show = function() {
    noStroke();
    fill(color(255, 165, 0));
    rect(this.x - this.w, this.y - this.h, this.w * 2, this.h * 2, 4, 4, 4, 4);
  }

  this.move = function(dir) {
    if (this.x + dir*4 - this.w > 0 && this.x + dir*4 + this.w < width) {
      this.x += dir*4;
    }
  }

  this.bounce = function() {
    if ((ball.x < this.x + this.w && ball.x > this.x - this.w) && (ball.y + ball.r/2 > this.y - this.h)) {
      ball.v.y = -ball.v.y;
    }
  }
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.released = false;
  var angle = Math.random()*(135 - 46) + 45;
  this.v = p5.Vector.fromAngle(radians(angle));
  this.v.mult(-3);

  this.show = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r);
  }

  this.move = function() {
    if (this.released) {
      this.x += this.v.x;
      this.y += this.v.y;

      if (this.y - this.r < 0) {
        this.v.y *= -1;
      }
      if (this.x + this.r > width || this.x - this.r < 0) {
        this.v.x *= -1;
      }
    }
    else {
      this.x = paddle.x;
      this.y = paddle.y - 10;
    }
  }
}

function Block(i, j) {
  this.i = i * 25;
  this.j = j * 15 + 30;
  this.h = 12;
  this.w = 22;
  this.active = true;

  this.show = function() {
    if (this.active) {
      noStroke();
      fill(255);
      rect(this.i + 2, this.j + 2, this.w, this.h);
    }
  }

  this.bounce = function(Vec) {
    if (this.active) {
      if (!((this.j + this.h < ball.y - ball.r/2) || (this.j > ball.y + ball.r/2))) {
        Vec.y = -Vec.y;
        ball.y += Vec.y;
        return true;
      }
    }
  }
}
