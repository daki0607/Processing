var hr;
var mn;
var sc;
var milli_reset;
var previous_second;

function draw_ticks() {
    stroke(255);
    strokeWeight(4);

    for (var i = 0; i < 12; i++) {
        var angle = 30 * i
        line(113*cos(angle), 113*sin(angle), 123*cos(angle), 123*sin(angle));
    }
}

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    translate(200, 200);
    rotate(-90);
    
    draw_ticks();

    sc = second();
    mn = minute()+sc/60;
    hr = hour()+mn/60;

    if (previous_second != sc) {
        milli_reset = millis();
    }

    previous_second = sc;
    var milliseconds = floor(millis() - milli_reset);

    strokeWeight(7);
    stroke(138, 43, 226);
    noFill();
    var end1 = map(sc+milliseconds/1000, 0, 60, 0, 360);
    // var end1 = map(sc, 0, 60, 0, 360);
    arc(0, 0, 320, 320, 0, end1);

    push();
    rotate(end1);
    line(0, 0, 100, 0);
    pop();

    strokeWeight(7);
    stroke(255, 165, 0);
    noFill();
    var end2 = map(mn, 0, 60, 0, 360);
    arc(0, 0, 295, 295, 0, end2);

    push();
    rotate(end2);
    line(0, 0, 80, 0);
    pop();

    strokeWeight(7);
    stroke(0, 255, 0);
    noFill();
    var end3 = map(hr % 12, 0, 12, 0, 360);
    arc(0, 0, 270, 270, 0, end3);

    push();
    rotate(end3);
    line(0, 0, 60, 0);
    pop();
    
}