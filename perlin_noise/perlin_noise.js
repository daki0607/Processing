var increment = 0.1;
var scl = 10;
var cols, rows;
// var fr;
// var mSlider, fSlider, zSlider;
var zoff = 0;

var particles = [];
var flowfield = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 255);
  background(51);
  cols = floor(width / scl);
  rows = floor(height / scl);
  // fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 500; i++) {
    particles.push(new Particle());
  }

  // mSlider = createSlider(0, 5, 1);
  // fSlider = createSlider(1, 5, 4);
  // zSlider = createSlider(0, 9, 3);
}

function draw() {
  // var mag = mSlider.value();
  // var flowrate = fSlider.value();
  // var zInc = zSlider.value();

  var yoff = 0;

  for (var y = 0; y < rows; y++) {
    xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += increment;

      // stroke(0, 50);
      // strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
    }

    yoff += increment;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].show();
    particles[i].update();
    particles[i].wrap();
  }

  // fr.html(floor(frameRate()));
}
