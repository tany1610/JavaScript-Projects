var dotNum = 5;
var distance = 4;
var angle = 132.3;

function setup() {
  createCanvas(400,400);
  angleMode(DEGREES);
  background(0);
}

function draw() {
  var a = dotNum * angle;
  var r = distance * sqrt(dotNum);
  var x = cos(a) * r + width / 2;
  var y = sin(a) * r + height / 2;
  
  fill(dotNum % 155, a % 255, r % 155);
  noStroke();
  ellipse(x, y, 6, 6);
  dotNum++;
}