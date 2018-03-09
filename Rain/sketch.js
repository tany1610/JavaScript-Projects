var drops = [];
var cloud1;
var cloud2;
var cloud3;
var ground1;
var ground2;
var ground3;


function setup() {
  createCanvas(400, 400);
  for(var i = 0; i < 150; i++){
   drops[i] = new drop(random(0,400), random(0,400)); 
  }
  cloud1 = new cloud(20,40,30);
  cloud2 = new cloud(150,80,20);
  cloud3 = new cloud(300,50,35);
  ground1 = new ground(-150, 350, 200);
  ground2 = new ground(-5, 380, 250);
  ground3 = new ground(280, 350, 150);
}

function draw() {
  background(63, 137, 191);
  for(var i = 0; i < drops.length; i++){
    drops[i].update();
    drops[i].show();
  }
  cloud1.show();
  cloud2.show();
  cloud3.show();
  ground1.show();
  ground2.show();
  ground3.show();
}