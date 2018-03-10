var cols = 50; // <<< CHOOSE SIZE OF GRID
var rows = 50;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w;
var path = [];
var timeStart;
var timeEnd;

function setup() {  
  frameRate(60);// <<< CHANGE SPEED
  createCanvas(400, 400);
  timeStart = performance.now();
  w = width / cols;
  
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new spot(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors();
    }
  }

  start = grid[floor(random(0, cols))][floor(random(0, rows))];
  end = grid[floor(random(0, cols))][floor(random(0, rows))];
  
  while(end == start){
    end = grid[floor(random(0, cols))][floor(random(0, rows))];
  }
  
  start.wall = false;
  end.wall = false;
  
  openSet.push(start);
}

function draw() {

  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];
    
    if (current === end) {
      noLoop();
      timeEnd = performance.now();
      console.log("DONE!");
      console.log("Time elapsed: " + Math.round((timeEnd - timeStart) * 0.001) + " seconds.");
    }

    removeCurrFromOpenSet(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);

        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }    
  } 
  else {
    console.log('no solution');
    noLoop();
    return;
  }

  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] != end){
       grid[i][j].show();
      }
      else{
        grid[i][j].show(color(249, 100, 252));
      }
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(250, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  
  fill(0,0,250);
  strokeWeight(2);
  stroke(0);
  
  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0,0,250));
  }
}

function removeCurrFromOpenSet(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  var h = sqrt(Math.pow(a.i - b.i,2) + Math.pow(a.j - b.j,2));
  return h;
}