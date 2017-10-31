var row = [1];
var width;

function add_row() {
    var new_row = [];
    var last_row = row[row.length-1];
    for (var i = 0; i < last_row.length - 1; i++) {
        new_row.push(last_row[i] + last_row[i+1]);
    }

    new_row.unshift(1);
    new_row.push(1);

    row.push(new_row);
}

function draw_triangle() {
    fill(255);
    textSize(16);
    textAlign(CENTER);

    text("1", width/2, 20);
    
    for (var i = 0; i < row.length; i++) {
        var s = "";
        for (var j = 0; j < row[i].length; j++) {
            s += " " + row[i][j].toString();
        }
        text(s, width/2, i*20+20);
    }
}

function setup() {
    createCanvas(1000, 1000);
    background(0);
}

function draw() {
    draw_triangle();
}

function mouseClicked() {
    add_row();
}