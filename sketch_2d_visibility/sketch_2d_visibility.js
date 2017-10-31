var segments;

function intersect(ray, seg) {
  // Represented in parametric form
  var rpx = ray.a.x;
  var rpy = ray.a.y;
  var rdx = ray.b.x-ray.a.x;
  var rdy = ray.b.y-ray.a.y;

  var spx = seg.a.x;
  var spy = seg.a.y;
  var sdx = seg.b.x-seg.a.x;
  var sdy = seg.b.y-seg.a.y;

  // Check if parallel
  var rmag = Math.sqrt(rdx*rdx + rdy*rdy);
  var smag = Math.sqrt(sdx*sdx + sdy*sdy);
  if (rdx/rmag == sdx/smag && rdy/rmag == sdy/smag) {
    return null;
  }

  // Solve for t1 and t2
  var t2 = (rdx*(spy - rpy) + rdy*(rpx - spx)) / (sdx*rdy - sdy*rdx);
  var t1 = (spx + sdx*t2 - rpx) / rdx;

  // Check if t1 and t2 are within whatever parameters
  if (t1 < 0) return null;
  if (t2 < 0 || t2 > 1) return null;

  // Return where they intersect
  return {
    x: rpx + rdx*t1,
    y: rpy + rdy*t1,
    parameter: t1
  };
}

function sightPolygon(sightX, sightY) {
  // Get all unique points
  var points = (function(segments) {
    var a = [];
    segments.forEach(function(seg) {
      a.push(seg.a, seg.b);
    });
    return a;

  })(segments);

  var uniquePoints = (function(points) {
    var set = {};
    return points.filter(function(p) {
      var key = p.x+","+p.y;
      if (key in set) {
        return false;
      }
      else {
        set[key] = true;
        return true;
      }

    });

  })(points);

  // Get all angles
  var uniqueAngles = [];
  for (var i = 0; i < uniquePoints.length; i++) {
    var uniquePoint = uniquePoints[i];
    var angle = atan2(uniquePoint.y - sightY, uniquePoint.x - sightX);
    uniquePoint.angle = angle;
    uniqueAngles.push(angle-0.00001, angle, angle+0.00001);
  }

  // Cast rays in all directions
  var intersects = [];
  for (var j = 0; j < uniqueAngles.length; j++) {
    var angle = uniqueAngles[j];

    // Calculate dx and dy from angle
    var dx = Math.cos(angle);
    var dy = Math.sin(angle);

    // Ray from center of screen to light
    var ray = {
      a:{x:sightX, y:sightY},
      b:{x:sightX+dx, y:sightY+dy}
    };

    // Finding closest intersection
    var closestIntersection = null;
    for (var k = 0; k < segments.length; k++) {
      var intersection = intersect(ray, segments[k]);
      if (!intersection) continue; // If it wasn't null at any point
      if (!closestIntersection || intersection.parameter < closestIntersection.parameter) {
        closestIntersection = intersection;
      }
    }

    // Intersection angle
    if (!closestIntersection) continue;
    closestIntersection.angle = angle;

    // Add to list of intersections
    intersects.push(closestIntersection);
  }

  // Sort intersects by angle
  intersects = intersects.sort(function(a, b) {
    return a.angle - b.angle;
  });

  return intersects;
}

function drawPolygon(polygon, col) {
  noStroke();
  fill(col);
  beginShape();
  vertex(polygon[0].x, polygon[0].y);

  for (var i = 1; i < polygon.length; i++) {
    var intersect = polygon[i];
    vertex(intersect.x, intersect.y);
  }
  endShape(CLOSE);
}

function player(x, y) {
  noStroke();
  fill(color(0, 255, 0));
  ellipse(x, y, 5, 5);
}

/////////////////////////////////////////////////

function setup() {
  createCanvas(500, 500);
  segments = [
    {a:{x:0, y:0}, b:{x:500, y:0}},
    {a:{x:500, y:0}, b:{x:500, y:500}},
    {a:{x:500, y:500}, b:{x:0, y:500}},
    {a:{x:0, y:500}, b:{x:0, y:0}}
  ];
}

function draw() {
  background(0);
  player(mouseX, mouseY);

  // Draw segments
  stroke(0);
  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    line(seg.a.x, seg.a.y, seg.b.x, seg.b.y);
  }

  // Light polygons
  var fuzz = 6; // Additional layers of light
  var polygons = [sightPolygon(mouseX, mouseY)];
  for (var angle = 0; angle < Math.PI*2; angle += (Math.PI*2)/fuzz) {
    var dx = Math.cos(angle) * 6;
    var dy = Math.sin(angle) * 6;
    polygons.push(sightPolygon(mouseX+dx, mouseY+dy));
  }

  // Draw as a single polygon
  for (var j = 1; j < polygons.length; j++) {
    drawPolygon(polygons[j], color(200, 200, 200, 50));
  }
  drawPolygon(polygons[0], color(200, 200, 200, 50));
}

/////////////////////////////////////////////////

function keyPressed() {
  if (keyCode === 32) {
    var mx = mouseX;
    var my = mouseY;
    segments.push({a:{x:mx-16, y:my-16}, b:{x:mx+16, y:my-16}});
    segments.push({a:{x:mx+16, y:my-16}, b:{x:mx+16, y:my+16}});
    segments.push({a:{x:mx+16, y:my+16}, b:{x:mx-16, y:my+16}});
    segments.push({a:{x:mx-16, y:my+16}, b:{x:mx-16, y:my-16}});
  }
}
