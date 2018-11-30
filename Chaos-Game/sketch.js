var dots = [];
let currentX;
let currentY;
var previous;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  fill(255);
  textSize(32);
  text("THE CHAOS GAME", 10, 50);
}

function draw() {
  //trianglePattern();
  //pentagonPattern();
  squarePattern();
}

function trianglePattern() {
  if (frameCount === 1) {
    currentX = random(width);
    currentY = random(height);
    addDots(3);
  }
  for (let i = 0; i < 300; i++) {
    let current = createVector(currentX, currentY);
    let next = random(dots);
    let index = dots.indexOf(next);
    current = p5.Vector.lerp(current, next, 0.5);
    currentX = current.x;
    currentY = current.y;
    if (index === 0) {
      stroke(255, 0, 0, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 1) {
      stroke(0, 255, 0, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 2) {
      stroke(0, 0, 255, 100);
      strokeWeight(1);
      point(current.x, current.y);
    }
  }
  if (frameCount % 1000 === 0) {
    background(0);
    stroke(255);
    fill(255);
    textSize(32);
    text("THE CHAOS GAME", 10, 50);
  }
}

function squarePattern() {
  if (frameCount === 1) {
    background(0);
    stroke(255);
    fill(255);
    textSize(32);
    text("THE CHAOS GAME", 10, 50);
    addDots(4);
  }
  for (let i = 0; i < 300; i++) {
    let current = createVector(currentX, currentY);
    let next = random(dots);
    while (abs(dots.indexOf(next) - dots.indexOf(previous)) == 2) {
      next = random(dots);
    }
    previous = next;
    let index = dots.indexOf(next);
    current = p5.Vector.lerp(current, next, 0.5);
    currentX = current.x;
    currentY = current.y;
    if (index === 0) {
      stroke(255, 0, 0, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 1) {
      stroke(0, 255, 0, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 2) {
      stroke(0, 0, 255, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 3) {
      stroke(0, 255, 255, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 4) {
      stroke(255, 0, 255, 100);
      strokeWeight(1);
      point(current.x, current.y);
    }
  }
  if (frameCount % 1000 === 0) {
    background(0);
    stroke(255);
    fill(255);
    textSize(32);
    text("THE CHAOS GAME", 10, 50);
  }
}

function pentagonPattern() {
  if (frameCount === 1) {
    background(0);
    stroke(255);
    fill(255);
    textSize(32);
    text("THE CHAOS GAME", 10, 50);
    addDots(5);
  }
  for (let i = 0; i < 300; i++) {
    let current = createVector(currentX, currentY);
    let next = random(dots);
    while (next === previous) {
      next = random(dots);
    }
    previous = next;
    let index = dots.indexOf(next);
    current = p5.Vector.lerp(current, next, 0.5);
    currentX = current.x;
    currentY = current.y;
    if (index === 0) {
      stroke(255, 0, 0, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 1) {
      stroke(0, 255, 0, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 2) {
      stroke(0, 0, 255, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 3) {
      stroke(0, 255, 255, 100);
      strokeWeight(1);
      point(current.x, current.y);
    } else if (index === 4) {
      stroke(255, 0, 255, 100);
      strokeWeight(1);
      point(current.x, current.y);
    }
  }
  if (frameCount % 1000 === 0) {
    background(0);
    stroke(255);
    fill(255);
    textSize(32);
    text("THE CHAOS GAME", 10, 50);
  }
}

function addDots(dotsCount) {
  let x = width / 2;
  let y = height / 2;
  var angle = TWO_PI / dotsCount;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * 500;
    var sy = y + sin(a) * 500;
    dots.push(createVector(sx, sy));
  }
  endShape(CLOSE);
}