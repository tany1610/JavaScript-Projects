function cloud(x,y,w){
  this.x = x;
  this.y = y;
  this.w = w;
}

cloud.prototype.show = function(){
	noStroke();
  fill(93, 181, 247);
  ellipse(this.x, this.y, this.w);
  ellipse(this.x + this.w, this.y, this.w * 2);
  ellipse(this.x + this.w * 2, this.y, this.w);
}