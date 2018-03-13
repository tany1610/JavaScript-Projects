function cell(x,y){
  this.x = x;
  this.y = y;
  this.isAlive = floor(random(2));
  this.aliveNeighbors = 0;
}

cell.prototype.show = function(){
  if(this.isAlive == 1){
    fill(255); 
  }
  else{
    fill(0); 
  }  
  stroke(100);
  rect(this.x * w,this.y * w,w - 1,w - 1);
}

cell.prototype.countAliveNeighbors = function(){
  var counter = 0;
  for (var i = -1; i <= 1; i++){
     for (var j = -1; j <= 1; j++){
       var newX = this.x + i;
       var newY = this.y + j;
       if (i != 0 || j != 0){         
         if (newX >=0 && newX < grid.length &&
          newY >= 0 && newY < grid.length){ 
           if (grid[newX][newY].isAlive == 1){
            counter++;  
        }
       }
      }
    }
  }
  this.aliveNeighbors = counter;
}