// Visual representation of fractals from chaos.

var pos = [];
var Triangle;
var chosen = false;
var choice;

function draw_triangle(verticies) {
  noStroke();
  fill(color(50, 200, 50, 127));
  for (var i = 0; i < 3; i++) {
    ellipse(verticies[i][0], verticies[i][1], 15, 15);
  }
}

function next_point(choice, points) {
  pos[0] = ((pos[0] + points[choice][0]) / 2);
  pos[1] = ((pos[1] + points[choice][1]) / 2);

  noStroke();
  fill(255);
  ellipse(pos[0], pos[1], 6, 6);
}

function setup() {
  createCanvas(500, 500);
  background(51);

  Triangle = [[249, 50],
  [249+(400*cos(PI/3)), 50+(400*sin(PI/3))],
  [249+(400*cos(2*PI/3)), 50+(400*sin(2*PI/3))]];

  draw_triangle(Triangle);
}

function draw() {
  choice = random([0, 1, 2]);
  if (chosen) {
    next_point(choice, Triangle);
  }
}

function mouseClicked() {
  if (!chosen) {
    pos = [mouseX, mouseY];
    chosen = true;

    noStroke();
    fill(255);
    ellipse(pos[0], pos[1], 6, 6);
  }
}
