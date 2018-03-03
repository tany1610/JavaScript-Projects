//experiment with pattern
var dotNum = 0;
var distance = 4;
var angle = 132.3;

function setup() {
  createCanvas(400,400);
  angleMode(DEGREES);
  background(0);
}

function draw() {
  let a = n * angle;
  let r = distance * sqrt(n);
  let x = cos(a) * r + width / 2;
  let y = sin(a) * r + height / 2;
  
  //experiment with colors
  fill(dotNum % 155, a % 255, r % 155);
  noStroke();
  ellipse(x, y, 6, 6);
  dotNum++;
}