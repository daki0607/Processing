var drag = 0.3;
var force = 0.1;

function Player() {
  this.x = width / 2;
  this.y = height / 2;
  this.ship = loadImage("images/ship.jpg");
  this.xspeed = 0;
  this.yspeed = 0;

  this.show = function() {
    image(this.ship, this.x - 25, this.y - 25);
  }

  this.movement = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.xspeed > 0) {
      this.xpseed -= drag;
    }
    if (this.xspeed < 0) {
      this.xspeed += drag;
    }
    if (this.yspeed > 0) {
      this.ypseed -= drag;
    }
    if (this.yspeed < 0) {
      this.yspeed += drag;
    }
  }
}

function setup() {
  createCanvas(800, 800);
  background(40);

  s = new Player();
}

function draw() {
  frameRate(30);

  s.show();
  s.movement();
}

function keyPressed() {
  if (keyCode === 87) {
    // Up
    s.yspeed -= force;
  }
  else if (keyCode === 83) {
    // Down
    s.yspeed += force;
  }
  else if (keyCode === 68) {
    // Right
    s.xspeed += force;
  }
  else if (keyCode === 65) {
    // Left
    s.xspeed -= force;
  }
}
