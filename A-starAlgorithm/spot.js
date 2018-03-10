function spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;
  
  if (random(1) < 0.2) {
    this.wall = true;
  }  
}

spot.prototype.show = function(col) {
    if (this.wall) {
      fill(0);
      strokeWeight(2);
      stroke(0);
      rect(this.i * w, this.j * w, w, w);
    } else if (col){
      fill(col);
      strokeWeight(2);
      stroke(0);
      rect(this.i * w, this.j * w, w, w);
    }
}

spot.prototype.addNeighbors = function() {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }