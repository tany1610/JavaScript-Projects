var speed = 2;
var maxForce = 0.2;
var food = []
var poison = []
var vehicles = [];
var mutationRate;
var reproductionRate = 0.02;
var colonySize = 20;
var time = 0;
var bestPerfection = 0;
var debug;

function setup() {
  createCanvas(500, 500);
  debug = createCheckbox();
  
  //generating vehicles
  for (var i = 0; i < colonySize; i++){
    var x = random(width);
    var y = random(height);
    var v = new vehicle(x,y);
    vehicles.push(v);
  }
  
  //generating food
  for (var i = 0; i < 30; i++){
    var x = random(50,width - 50);
    var y = random(50,height - 50);
    food.push(createVector(x,y)) 
  }
  
  //generating poison
  for (var i = 0; i < 15; i++){
    var x = random(50,width- 50);
    var y = random(50,height - 50);
    poison.push(createVector(x,y)) 
  }
}

//click on vehicle if you want to clone it
function mousePressed(){
  var mousePos = createVector(mouseX,mouseY)
  for (var i = 0; i < vehicles.length; i++){
    if (vehicles[i].pos.dist(mousePos) < 15){
      var child = vehicles[i].reproduce();
      vehicles.push(child);
      console.log("cloning...")
      break;
    }
  }
}


function draw() {
  background(100);
	time++;
  
  //randomly add food
  if (random(1) < 0.09){
    var x = random(50,width- 50);
    var y = random(50,height - 50);
    food.push(createVector(x, y)); 
  }
  
  //randomly add poison
  if (random(1) < 0.02){
    var x = random(50,width- 50);
    var y = random(50,height - 50);
    poison.push(createVector(x, y));  
  }
  
  //draw food
  for (var i = 0; i < food.length; i++){
    fill(0,200,0);
    stroke(0,0,0);
    ellipse(food[i].x, food[i].y, 8,8);
  }
  
  //draw poison
  for (var i = 0; i < poison.length; i++){
    fill(200,0,0);
    stroke(0,0,0);
    ellipse(poison[i].x, poison[i].y, 8,8);
  }
  
  //reproduce random vehicle
  if (random(1) < reproductionRate && vehicles.length > 0){    
      var child = vehicles[random(0,vehicles.lenght)].reproduce(); 
      vehicles.push(child);
    }
  
  //displaying vehicles 
  for (var i = vehicles.length - 1; i >= 0; i--){
    var v = vehicles[i];
    v.update();
    v.boundaries();
    v.behave(food,poison);
    v.show();
    
    bestPerfection = 0;
    
    //get vehicle with highest perfection
    if (vehicles[i].perfection > bestPerfection){
        bestPerfection = vehicles[i].perfection;
      }
    
    //check if vehicle has died
    if (v.dead()){
      vehicles.splice(i,1); 
      food.push(createVector(width / 2 + random(-200, 200), 
        height / 2 + random(-200, 200)))
    }      
  }
  
  //mapping mutation based on most perfect vehicle
  mutationRate = map(bestPerfection * 100, 0,100,1,0);
  
  
  //drawing text  
  textSize(16);
  fill(0);
  text("Click on checkbox to see stats", 5, height - 10)
  
  textSize(16);
  fill(0);
  text("Perfection: " + floor((bestPerfection * 100)) + "%", width / 2 + 125, 20);
  
  textSize(16);
  fill(0);
  text("Time elapsed: " + floor((time / 60)) + " seconds", width / 2 + 56, 40)
  
  if (debug.checked() == false){
    textSize(20);
    fill(0,0,200);
    text("Evolutionary Steering Behaviors", 2, 20)
    
    textSize(16);
    fill(0);
    text("Click on vehicle if you want to clone it",  2, 40)
    
    textSize(16);
    fill(0);
    text("(optional)",  2, 60)
  }
  
  textSize(16);
  fill(0);
  text("Population count: " + vehicles.length, width / 2 + 98, 60)  
  
  //see stats
  if (debug.checked()){        
  textSize(16);
  fill(0);
  text("Stats legend:", 5, 20)
  
  textSize(16);
  fill(0);
  text("Green ellipse: food detection radius", 5, 40)
  text("Red ellipse: poison detection radius", 5, 60)
  text("Green line: food attraction", 5, 80)
  text("Red line: poison attraction", 5, 100)
    
  //end if no vehicles left
  if (vehicles.length <= 0){
    background(100);
    textSize(24);
    fill(0);
    text("Colony is dead! Time survived: ", 50, height / 2 - 10);
    text("" + floor((time / 60) / 60) + " minutes.", 150, height / 2 + 20);
    noLoop();
    }
  }
}