var grid;
var rows = 20;
var cols = 20;
var w = 40;

function setup() {
  createCanvas(401,401);
  background(255);
  grid = createGrid(rows,cols);
  for (i = 0; i < rows; i++){
   for (j = 0; j < cols; j++){
    grid[i][j] = new cell(i, j, w);
  }
 }
 
 for (i = 0; i < rows; i++){
   for (j = 0; j < cols; j++){
    grid[i][j].findBombs();
  }
 }
}

function draw() {
  for (i = 0; i < rows; i++){
   for (j = 0; j < cols; j++){
    grid[i][j].show();
   }
 }
}

function createGrid(rows,cols){
 var result = new Array(rows);
 for (i = 0; i < rows; i++){
   result[i] = new Array(cols)
 }
 return result;
}

function endGame(){
 for (i = 0; i < rows; i++){
   for (j = 0; j < cols; j++){
    grid[i][j].reveal();
   }
 }
}

function mousePressed(){
 for (i = 0; i < rows; i++){
   for (j = 0; j < cols; j++){
    var current = grid[i][j];
    if (mouseX >= current.x && mouseX < current.x + w && mouseY >= current.y && mouseY < current.y + w){
     current.reveal();
     if (current.bomb){
      endGame();
     }
    }
   }
  }
}