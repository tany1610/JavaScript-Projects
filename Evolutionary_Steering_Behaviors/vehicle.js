function vehicle(x,y,dna){
  this.pos = createVector(x,y);
  this.vel = createVector(0,random(-5,5));
  this.acc = createVector(1,1);
  this.width = 5;
  this.speed = 5;
  this.dna = [];
  if (dna){
    this.copyDNA(dna); 
  }
  else{
    this.setDNA();
  }
  this.health = 100;
  this.perfection = this.calcPerfection();
}

//calculate perfection of every vehicle
vehicle.prototype.calcPerfection = function(){
  var d1 = map(this.dna[0], -2,2,0,1);
  var d2 = map(this.dna[1], -2,2,1,0);
  var d3 = map(this.dna[2], 0,100,0,1);
  var d4 = map(this.dna[2], 0,100,1,0);
  var perf = (d1 + d2 + d3 + d4) / 4;
  return perf;
}

//create copy of vehicle
vehicle.prototype.reproduce = function(){
  var child = new vehicle(this.pos.x + 5, this.pos.y + 5, this.dna);
  return child;
}

//if there is no parent generate randomly
vehicle.prototype.setDNA = function(){
  this.dna[0] = random(-2,0);  //food attraction
  this.dna[1] = random(-1,2);  // poison attraction
  this.dna[2] = random(5,50);  // food perception
  this.dna[3] = random(5,10);  // poison perception
}

//if there is a parent copy its dna based on
//mutation rate
vehicle.prototype.copyDNA = function(dna){
  if (random(1) < mutationRate){
    this.dna[0] = random(-2,1);
    this.dna[1] = random(-2,1);
    this.dna[2] = random(5,50);
    this.dna[3] = random(5,50);
  }
  else{
    this.dna[0] = dna[0]
    this.dna[1] = dna[1]
    this.dna[2] = dna[2]
    this.dna[3] = dna[3]
  }
}

//check if a vehicle is dead
vehicle.prototype.dead = function(){
  if (this.health <= 0) return true
  else return false
}

//change velocity if vehicle is out of the screen
vehicle.prototype.boundaries = function() {
    var d = 25;
    var desired = null;
    if (this.pos.x < d) {
      desired = createVector(speed, this.vel.y);
    } else if (this.pos.x > width - d) {
      desired = createVector(-speed, this.vel.y);
    }
    if (this.pos.y < d + 40) {
      desired = createVector(this.vel.x, speed);
    } else if (this.pos.y > height - d - 15) {
      desired = createVector(this.vel.x, -speed);
    }
    if (desired !== null) {
      desired.normalize();
      desired.mult(speed);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(maxForce);
      this.applyForce(steer);
    }
  }

//moving the vehicle
vehicle.prototype.update = function(){
  this.health -= 0.3;  
  this.vel.add(this.acc);
  this.vel.limit(speed);
  this.pos.add(this.vel);
  this.dna[0] = constrain(this.dna[0],-2,2);
  this.dna[1] = constrain(this.dna[1],-2,2);
  this.acc.mult(0);
}

//chanche behavior based on perception
vehicle.prototype.behave = function(food,poison){
  var foodAttraction = this.eat(food, 1);
  var poisonAttraction = this.eat(poison, -1);
  
  foodAttraction.mult(this.dna[0])
  poisonAttraction.mult(this.dna[1])
  
  this.applyForce(foodAttraction);
  this.applyForce(poisonAttraction);
}

vehicle.prototype.applyForce = function(force){
  this.acc.add(force); 
}

//displaying vehicle
vehicle.prototype.show = function(){
    var angle = this.vel.heading() + PI / 2;
  	var to = color(0, 255, 0);
    var from = color(255, 0, 0);
  	var val = map(this.health,-1,100,0,1);
  	var clr = lerpColor(from, to, val);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
  	//color based on health
    fill(clr);
    stroke(0);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.width * 2);
    vertex(-this.width, this.width * 2);
    vertex(this.width, this.width * 2);
    endShape(CLOSE); 
  	//if stats checkBox is on
  	if (debug.checked()){
      stroke(0,255,0);
  		strokeWeight(5);
  		line(0,0,0, -this.dna[0] * 20);
  		strokeWeight(2);
  		noFill();
  		ellipse(0,0,this.dna[2] * 2);
  		stroke(255,0,0);
  		strokeWeight(2);
  		line(0,0,0, -this.dna[1] * 20);
  		strokeWeight(2);
  		noFill();
  		ellipse(0,0,this.dna[3] * 2);
      stroke(10);
      strokeWeight(2);
      ellipse(0,0,this.dna[4] * 2);
    }  	
    pop();  	
}

//move towards food or poison
vehicle.prototype.seek = function(target, affection){
  var desired = p5.Vector.sub(target, this.pos);
  desired.setMag(speed);
  var seek = p5.Vector.sub(desired, this.vel);
  seek.limit(maxForce);
  return seek;
}

//choose food or poison to seek based on
//food and poison attraction
vehicle.prototype.eat = function(stuff, affection){
  var bestDist = Infinity;
  var bestIndex = -1;
  for (var i = 0; i < stuff.length; i++){
    var currDist = this.pos.dist(stuff[i]);
    if (affection == -1){
    	if(currDist < bestDist && currDist < this.dna[3]){
      	bestDist = currDist;
     		bestIndex = i;
    	}
    }
    else if (affection == 1){
      if(currDist < bestDist && currDist < this.dna[2]){
      	bestDist = currDist;
     		bestIndex = i;
    	}
    }
  }
  if (bestDist < this.speed){
    	if (affection == 1){
        this.health += 10; 
      }
    	else if (affection == -1){
        this.health -= 20; 
      }
     stuff.splice(bestIndex,1);
  }
  else if (bestIndex > -1){
    //if there is something in the range
    return this.seek(stuff[bestIndex], affection); 
  }
  //else keep the same direction
  return createVector(0,0);
}