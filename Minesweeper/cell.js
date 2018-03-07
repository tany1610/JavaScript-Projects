function cell(i, j, w){
 this.x = i * w;
 this.y = j * w;
 this.i = i;
 this.j = j;
 this.w = w;
 this.marked = false;
 this.revealed = false;
 if (random(1) < 0.2){
  this.bomb = true;
 } else {
  this.bomb = false;
 }
 this.bombsCount = 0;
 
  this.mark = function(){
    if (this.marked){
      stroke(0);
      fill(130,0,0);
      ellipse(this.x + w/2, this.y + w/2, this.w/2, this.w/2);
    }
    else{
      noStroke();
      noFill(0);
      ellipse(this.x + w/2, this.y + w/2, this.w/2, this.w/2);
    }
  }
 
 this.show = function(){
 stroke(0);
 fill(100);
 rect(this.x, this.y, this.w, this.w);
 if (this.bomb && this.revealed){
  stroke(0);
  fill(155);
  ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w/2, this.w/2);
  }
  else if (!this.bomb && this.revealed){
   stroke(0);
   fill(180);
   rect(this.x, this.y, this.w, this.w);
   textAlign(CENTER);
   textSize(25);
   fill(0);
   if (this.bombsCount > 0){
    text(this.bombsCount, this.x + this.w / 2, this.y + this.w * 0.8);
   }
  }
 }
 
 this.reveal = function(){
  this.revealed = true;
  if (this.bombsCount === 0){
   this.revealAllWithNoBombs();
  }
 }
 
 this.revealAllWithNoBombs = function(){
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= rows) continue;
    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= cols) continue;
      var neighbor = grid[i][j];
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}
 
 this.findBombs = function(){
  var total = 0;
  if (this.bomb){
   this.bombsCount = -1;
   return;
  }
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= rows) continue;
    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= cols) continue;
      var neighbor = grid[i][j];
      if (neighbor.bomb) {
        total++;
      }
    }
  }
  this.bombsCount = total;
 }
}