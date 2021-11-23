function Cell(ec, row, col, occupied){
  this.ecosystem = ec;
  this.ctx= this.ecosystem.ctx1;
  this.row = row;
  this.col = col;
  this.pos = new JSVector(this.col*ec.cellWidth-ec.width, this.row*ec.cellHeight-ec.height);
  this.occupied = occupied;
  this.neighbors = {
    n: null,
    ne: null,
    nw: null,
    e: null,
    w: null,
    se: null,
    s: null,
    sw: null
  }
  this.time = 0;
  this.isRunning = false;
}
Cell.prototype.run = function(){
  if(this.time==0){
    this.loadNeighbors();
    this.time++;
  }
  this.update();
  if(this.isRunning){
    this.render();
  }
}
Cell.prototype.render = function(){
  if(this.occupied){
    this.color = "blue";
  }
  else this.color = "teal";
  this.ecosystem.ctx1.beginPath();
  this.ecosystem.ctx1.fillStyle = this.color;
  this.ecosystem.ctx1.strokeStyle = "black";
  this.ecosystem.ctx1.lineWidth = 3;
  this.ecosystem.ctx1.strokeRect(this.pos.x, this.pos.y, this.ecosystem.cellWidth, this.ecosystem.cellHeight);
  this.ecosystem.ctx1.fillRect(this.pos.x, this.pos.y, this.ecosystem.cellWidth, this.ecosystem.cellHeight);
  this.ecosystem.ctx1.closePath();
}
Cell.prototype.loadNeighbors = function(){
  this.neighbors.e = this.ecosystem.cells[this.row][this.col+1];
  if(this.row != 0){
    this.neighbors.ne = this.ecosystem.cells[this.row-1][this.col+1];
    this.neighbors.n = this.ecosystem.cells[this.row-1][this.col];
    this.neighbors.nw = this.ecosystem.cells[this.row-1][this.col-1];
  }
  this.neighbors.w = this.ecosystem.cells[this.row][this.col-1];
  if(this.row!=this.ecosystem.numRows-1){
    this.neighbors.sw = this.ecosystem.cells[this.row+1][this.col-1];
    this.neighbors.s = this.ecosystem.cells[this.row+1][this.col];
    this.neighbors.se =this.ecosystem.cells[this.row+1][this.col+1];
  }
}

Cell.prototype.update = function(){
  if(this.occupied){
    if(this.neighbors.n!=null){
      if(this.neighbors.n.occupied) this.neighbors.n.occupied = false;
    }
    if(this.neighbors.e!=null){
      if(this.neighbors.e.occupied) this.neighbors.e.occupied = false;
    }
    if(this.neighbors.w!=null){
      if(this.neighbors.w.occupied) this.neighbors.w.occupied = false;
    }
    if(this.neighbors.s!=null){
      if(this.neighbors.s.occupied) this.neighbors.s.occupied = false;
    }
  }
}
