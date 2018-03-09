function ground(x,y,w){
  this.x = x;
  this.y = y;
  this.w = w;
}

ground.prototype.show = function(){
  strokeWeight(5);
  stroke(4, 119, 14);
  fill(4, 163, 18);
  ellipse(this.x + this.w, this.y + this.w, this.w * 2);
}