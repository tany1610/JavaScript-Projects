function drop(x, y){
	this.x = x;
  this.y = y;
  this.length = random(5,10);
  this.thickness = random(-1, 1.8);
  this.speed = 5; 
}

drop.prototype.update = function(){
  var m = map(this.thickness, 0,2,7,0);
  this.y += this.speed + this.y / 100 + m;
  if (this.y > height){
    this.y = 0;
    this.x = random(0,400);
  }
}

drop.prototype.show = function(){
  stroke(0,0,255);
  fill(0,0,255);
  strokeWeight(this.thickness);
  line(this.x, this.y, this.x, this.y + this.length);
}