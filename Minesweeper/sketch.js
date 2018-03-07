var grid;
var rows = 10;
var cols = 10;
var w = 30;
var solved = [];
var lost = false;

function setup() {
  createCanvas(rows * w,cols * w);
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
  checkIfWon();
}

function checkIfWon(){
  for(var i = 0; i < rows; i ++){
   for(var j = 0; j < cols; j++){
    var current = grid[i][j]; 
     if ((current.revealed && !current.bomb && !solved.includes(current)) 
         || (current.bomb && current.marked && !solved.includes(current))
        || current.bomb && !current.revealed && !solved.includes(current)){
      solved.push(current);
    }
   }
  }
  if (solved.length == rows * cols && !lost){
    console.log("CONGRATS, YOU WON!");
    noLoop();
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
  if (lost){
  console.log("YOU LOST! TRY AGAIN!");
  noLoop();
  }
}

function mousePressed(){
 for (i = 0; i < rows; i++){
   for (j = 0; j < cols; j++){
    var current = grid[i][j];
     if (mouseButton === LEFT){
       if (mouseX >= current.x && mouseX < current.x + w && mouseY >= current.y && mouseY < current.y + w){
         current.reveal();
         current.marked = false;
         if (current.bomb){
         lost = true;
         endGame();
      }
     }   
    }
     if (mouseButton === CENTER){
       if (mouseX >= current.x && mouseX < current.x + w && mouseY >= current.y && mouseY < current.y + w && !current.marked){
         current.marked = true;
         current.mark();
       }
       else if (mouseX >= current.x && mouseX < current.x + w && mouseY >= current.y && mouseY < current.y + w && current.marked){
         current.marked = false;
         current.mark();
       }
     }
   }
  }
}