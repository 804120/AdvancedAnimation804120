function World(dimensions, buffer, numRows, numCols){
  this.canvas1 = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/this.canvasRenderingContext2D
  this.canvas2 = document.getElementById("cnv2"); //second this.canvas
  this.ctx1 = this.canvas1.getContext("2d"); // first context
  this.ctx2 = this.canvas2.getContext("2d"); // second context
  this.ctx1.fillStyle = "black";
  this.ctx2.fillStyle = "black";
  this.numRows = numRows;
  this.numCols = numCols;
  this.width = dimensions.x/2; //Throughout this document I had to use half the width more than the actual width, so I found it easier to divide this by 2.
  this.height = dimensions.y/2; // see comment above
  this.position = new JSVector(0, 0); // initial position
  this.destination = this.position; // since it's not moving yet, the destination is the same as the position
  this.buffer = buffer; // how far past the boundary you can go before it won't let you move anymore
  this.cells = [];
  this.cellHeight = this.height*2/numRows;
  this.cellWidth = this.width*2/numCols;
  for(let i=0;i<numRows;i++){
    this.cells.push([]);
    for(let j=0;j<numCols;j++){
      let occ = Math.random()>0.8;
      this.cells[i].push(new Cell(this, i, j, occ));
    }
  }
  this.ctx2.scale(this.canvas2.width/(this.width*2), this.canvas2.height/(this.height*2)); // scaling the second context
  this.eventListeners(); // call all of the event listeners
}

World.prototype.run = function(){
  this.ctx1.fillRect(0, 0, this.canvas1.width, this.canvas1.height);
  this.ctx2.fillRect(0, 0, 2*world.width, 2*world.height);
  this.findPath(this.cells[0][0], this.cells[14][19]);
  this.update();
  this.enhancePerformance();
  this.draw();
  this.runSmallcanvas();
}

World.prototype.eventListeners = function(){
  document.addEventListener('keydown', event => { //listens for the keydown event
    if (event.code === 'ArrowUp') this.up = true; //sets the up condition to "true", which will change the animate function
    else if (event.code === 'ArrowDown') this.down = true;//sets the down condition to "true", which will change the animate function
    else if (event.code === 'ArrowRight') this.right = true;//sets the right condition to "true", which will change the animate function
    else if (event.code === 'ArrowLeft') this.left = true;//sets the left condition to "true", which will change the animate function
  })
  document.addEventListener('keyup', event => { // when arrow keys are released, the screen will stop moving
    if (event.code === 'ArrowUp') this.up = false;
    if (event.code === 'ArrowDown') this.down = false;
    if (event.code === 'ArrowRight') this.right = false;
    if (event.code === 'ArrowLeft') this.left = false;
  })
  this.canvas2.addEventListener("click", event => { // move to a point on the smaller this.canvas when the user clicks there
    let x = event.offsetX;
    let y = event.offsetY;
    x*= this.width*2/this.canvas2.width;
    y*= this.height*2/this.canvas2.height;
    x-= this.width;
    y-= this.height;
    let newpos = new JSVector(x, y);
    this.destination = newpos;
  });
  this.canvas1.addEventListener("click", event => {
    let x = event.offsetX;
    let y = event.offsetY;
    x-=this.canvas1.width/2-this.position.x;
    y-=this.canvas1.height/2-this.position.y;
    x+=world.width;
    y+=world.height;
    x = Math.floor(x/this.cellWidth);
    y = Math.floor(y/this.cellHeight);
    this.cells[y][x].occupied = !this.cells[y][x].occupied;
    if(this.cells[y][x].falsepath)this.cells[y][x].falsepath = false;
    this.cells[y][x].run();
    this.ctx1.fillStyle = "black";
    this.resetPath();
  })
}

World.prototype.draw = function(){
  this.ctx1.save();
  this.ctx1.translate(-1*this.position.x+this.canvas1.width/2, -1*this.position.y+this.canvas1.height/2);
  for(let i=0;i<this.numRows;i++){
    for(let j=0;j<this.numCols;j++){
      this.cells[i][j].run();
    }
  }
  this.ctx1.beginPath();
  this.ctx1.moveTo(0, -1*this.height);
  this.ctx1.lineTo(0, this.height);
  this.ctx1.strokeStyle = "red";
  this.ctx1.stroke();
  this.ctx1.closePath();
  this.ctx1.beginPath();
  this.ctx1.moveTo(-1*this.width, 0);
  this.ctx1.lineTo(this.width, 0);
  this.ctx1.strokeStyle = "red";
  this.ctx1.stroke();
  this.ctx1.closePath();
  this.ctx1.beginPath();
  this.ctx1.strokeStyle = "LimeGreen";
  this.ctx1.strokeRect(-1*this.width, -1*this.height, this.width*2, this.height*2);
  this.ctx1.closePath();
  this.ctx1.restore();
}
World.prototype.update = function(){
  if(this.up){
    this.destination.y=this.position.y-20;
  }
  if(this.down){
    this.destination.y=this.position.y+20;;
  }
  if(this.left){
    this.destination.x=this.position.x-20;;
  }
  if(this.right){
    this.destination.x=this.position.x+20;;
  }
  this.destination.x = this.value_limit(this.destination.x, -1*(this.width+this.buffer-this.canvas1.width/2), this.width+this.buffer-this.canvas1.width/2);
  this.destination.y = this.value_limit(this.destination.y, -1*(this.height+this.buffer-this.canvas1.height/2), this.height+this.buffer-this.canvas1.height/2);
  this.position.add(JSVector.subGetNew(this.destination, this.position).divide(4));
  if(JSVector.subGetNew(this.destination, this.position).getMagnitude()<1) this.destination = this.position;
}

World.prototype.runSmallcanvas = function(){
    this.ctx2.lineWidth = 5;
    this.ctx2.beginPath();
    this.ctx2.moveTo(this.width, 0);
    this.ctx2.lineTo(this.width, 2*this.height);
    this.ctx2.strokeStyle = "red";
    this.ctx2.stroke();
    this.ctx2.closePath();
    this.ctx2.beginPath();
    this.ctx2.moveTo(0, this.height);
    this.ctx2.lineTo(2*this.width, this.height);
    this.ctx2.stroke();
    this.ctx2.closePath();
    this.ctx2.beginPath();
    this.ctx2.strokeStyle = "white";
    this.ctx2.strokeRect(this.width+this.position.x-this.canvas1.width/2, this.height+this.position.y-this.canvas1.height/2, this.canvas1.width, this.canvas1.height);
    this.ctx2.stroke();
    this.ctx2.closePath();
}
World.prototype.enhancePerformance = function(){
  for(let i=0;i<this.numRows;i++){
    for(let j=0;j<this.numCols;j++){
      let xRange = Math.abs(this.cells[i][j].pos.x-this.position.x)<this.width+this.cellWidth;
      let yRange = Math.abs(this.cells[i][j].pos.y-this.position.y)<this.height+this.cellHeight;
      this.cells[i][j].isRunning = xRange&&yRange;
    }
  }
}
World.prototype.value_limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

World.prototype.findPath = function(startCell, endCell){
  endCell.occupied = false;
  if(startCell==endCell){
    console.log("success!");
    startCell.path = true;
    startCell.occupied = false;
  }
  else{
    this.currentCell = startCell;
    this.currentCell.path = true;
    this.currentCell.occupied = false;
    if(this.currentCell.neighbors.e!=null&&!this.currentCell.neighbors.e.occupied&&!this.currentCell.neighbors.e.falsepath){
        this.findPath(this.currentCell.neighbors.e, endCell);
    }
    else if(this.currentCell.neighbors.s!=null&&!this.currentCell.neighbors.s.occupied&&!this.currentCell.neighbors.s.falsepath){
      this.findPath(this.currentCell.neighbors.s, endCell);
    }
    else if(this.currentCell.neighbors.n!=null&&this.currentCell.neighbors.n.path){
      this.currentCell.falsepath = true;
      if(this.currentCell.neighbors.w!=null){
        this.findPath(this.currentCell.neighbors.w, endCell);
      }
    }
    else if(this.currentCell.neighbors.w!=null&&this.currentCell.neighbors.w.path){
      this.currentCell.falsepath = true;
      if(this.currentCell.neighbors.wn!=null){
        this.findPath(this.currentCell.neighbors.n, endCell);
      }
    }
    else console.log("dead end");
  }
}
World.prototype.resetPath = function(){
  for(let i=0;i<this.cells.length;i++){
    for(let j=0;j<this.cells[i].length;j++){
      this.cells[i][j].path = false;
      this.cells[i][j].falsepath =false;
    }
  }
}
