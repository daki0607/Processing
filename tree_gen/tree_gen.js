var branches = [];
var leaves = [];
var count = 0;
var leafSize = 21;
var col = 100;

// Start and End stored as 2D vectors
function Branch(begin, end) {
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.branchA = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    var rot = random(PI / 6, PI / 5);
    var len = random(0.55, 0.75);
    dir.rotate(rot);
    dir.mult(len);
    var newEnd = p5.Vector.add(this.end, dir);
    var right = new Branch(this.end, newEnd);
    return right;
  }

  this.branchB = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    var rot = random(PI / 6, PI / 5);
    var len = random(0.55, 0.75);
    dir.rotate(- rot);
    dir.mult(len);
    var newEnd = p5.Vector.add(this.end, dir);
    var left = new Branch(this.end, newEnd);
    return left;
  }

  this.show = function() {
    // stroke(255);
    stroke(139, 69, 19);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
}

function mousePressed() {
  for (i = branches.length - 1; i >= 0; i--) {
    if (!branches[i].finished) {
      branches.push(branches[i].branchA());
      branches.push(branches[i].branchB());
    }
    branches[i].finished = true;
  }
  count++;

  if (count >= 6) {
    for (var i = 0; i < branches.length; i++) {
      if (!branches[i].finished) {
        // var leaf = branches[i].end.copy();
        var leaf = createVector(branches[i].end.x, branches[i].end.y, leafSize - (count - 6) * 3);
        leaves.push(leaf);
      }
    }
  }

  for (var i = 0; i < branches.length; i++) {
    branches[i].show();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(random(0, 25), random(100, 255), random(0, 25), random(100, 150));
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, leaves[i].z, leaves[i].z);
  }
}

function setup() {
  createCanvas(400, 400);
  background(51);

  var begin = createVector(width / 2, height);
  var end = createVector(width / 2, height - 100);

  branches.push(new Branch(begin, end));
  // console.log(branches);
}
