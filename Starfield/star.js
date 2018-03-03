function star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.prevZ = this.z;

  this.show = function() {
    fill(255);
    noStroke();

    var nextX = map(this.x / this.z, 0, 1, 0, width);
    var nextY = map(this.y / this.z, 0, 1, 0, height);
    
    var size = map(this.z, 0, width, 16 ,0);
    
    var prevX = map(this.x / this.prevZ, 0, 1, 0, width);
    var prevY = map(this.y / this.prevZ, 0, 1, 0, width);
    this.prevZ = this.z;
    
    stroke(255);

    line(prevX, prevY, nextX, nextY);
  }
  
  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1)
    {
     this.z = random(width);
     this.prevZ = this.z;
     this.x = random(-width, width);
     this.y = random(-height, height);
    }
  }
}