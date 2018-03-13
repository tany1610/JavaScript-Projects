var grid;
var size;
var w;

function setup() {
  createCanvas(400, 400);
  size = 40;
  w = floor(width / size);
  
  grid = new Array(size);
  
  for (var i = 0; i < grid.length; i++){
     grid[i] = new Array(size);
  }
  
  for (var i = 0; i < grid.length; i++){
    for (var j = 0; j < grid.length; j++){
      grid[i][j] = new cell(i,j);
    }
  }
}

function draw() {
  background(220);
  
  for (var i = 0; i < grid.length; i++){
    for (var j = 0; j < grid.length; j++){
      grid[i][j].countAliveNeighbors();           
    }
  } 
  
  
  for (var i = 0; i < grid.length; i++){
    for (var j = 0; j < grid.length; j++){
      grid[i][j].show();         
    }
  } 
  
  grid = modifyGrid();
}

function modifyGrid(){
  var newGrid = new Array(size);
  
  for (var i = 0; i < newGrid.length; i++){
    newGrid[i] = new Array(size);
  }
  
  for (var i = 0; i < newGrid.length; i++){
    for (var j = 0; j < newGrid.length; j++){
       newGrid[i][j] = new cell(i,j);
    }
  }
  
  for (var i = 0; i < grid.length; i++){
    for (var j = 0; j < grid.length; j++){
      if (grid[i][j].isAlive == 1){
        if (grid[i][j].aliveNeighbors == 2 || grid[i][j].aliveNeighbors == 3){
          newGrid[i][j].isAlive = 1;
        }
        else{
          newGrid[i][j].isAlive = 0; 
        }
      }
      else{
        if (grid[i][j].aliveNeighbors == 3){
          newGrid[i][j].isAlive = 1;
        }
        else{
          newGrid[i][j].isAlive = 0; 
        }
      }
    }    
  }
  return newGrid;
}