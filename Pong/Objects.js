function Paddle(x, y) {
  this.x = x;
  this.y = y;
  this.h = 40;
  this.w = 5;

  this.show = function() {
    noStroke();
    fill(255);
    rect(this.x - this.w, this.y - this.h, this.w * 2, this.h * 2);
  }
}

function Ball(x, y, v) {
  this.x = x;
  this.y = y;
  this.xspeed = random([-1, 1]) * v;
  this.yspeed = sin(random(-PI / 4, PI / 4)) * v;
  this.size = 10;

  this.move = function(bool) {
    if (bool) {
      this.x += this.xspeed;
      this.y += this.yspeed;
    }
  }

  this.show = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  this.bounce = function() {
    var x = this.x;
    var y = this.y;
    var s = this.size;

    if (x + s > width || x - s < 0) {
      this.xspeed *= -1;
    }
    if (y + s > height || y - s < 0) {
      this.yspeed *= -1;
    }

    if (x + s > paddleRight.x && (y < paddleRight.y + paddleRight.h && y > paddleRight.y - paddleRight.h)) {
      this.xspeed *= -1;
    }
    if (x - s < paddleLeft.x + paddleLeft.w && (y < paddleLeft.y + paddleLeft.h && y > paddleLeft.y - paddleLeft.h)) {
      this.xspeed *= -1;
    }
  }
}
