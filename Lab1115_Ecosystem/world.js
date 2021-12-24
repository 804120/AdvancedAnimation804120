function World(dimensions, buffer){
  this.ctx = [canvas1.getContext("2d"), canvas2.getContext("2d")];
  for(let i=0;i<2;i++) this.ctx[i].fillStyle = "black";


  this.width = dimensions.x/2; //Throughout this document I had to use half the width more than the actual width, so I found it easier to divide this by 2.
  this.height = dimensions.y/2; // see comment above
  this.position = new JSVector(0, 0); // initial position
  this.destination = this.position; // since it's not moving yet, the destination is the same as the position
  this.buffer = buffer; // how far past the boundary you can go before it won't let you move anymore
  this.zoomScale = new JSVector(1, 1);
  this.ctx[1].scale(canvas2.width/(this.width*2), canvas2.height/(this.height*2)); // scaling the second context
  this.ctx[1].translate(this.width, this.height);
  this.zoomfactor = 1;
  this.eventListeners(); // call all of the event listeners
  this.creatures = new Creature();
  this.targetSize = new JSVector(this.width*2, this.height*2);
}

World.prototype.run = function(){
  this.ctx[0].fillRect(0, 0, this.targetSize.x, this.targetSize.y);
  this.ctx[1].fillStyle = "black";
  this.ctx[1].fillRect(-1*this.width, -1*this.height, 2*this.width, 2*this.height);
  this.update();
  this.runSmallCanvas();
  this.draw();
}

World.prototype.eventListeners = function(){
  document.addEventListener('keydown', event => { //listens for the keydown event
    if (event.code === 'ArrowUp') this.up = true; //sets the up condition to "true", which will change the animate function
    else if (event.code === 'ArrowDown') this.down = true;//sets the down condition to "true", which will change the animate function
    else if (event.code === 'ArrowRight') this.right = true;//sets the right condition to "true", which will change the animate function
    else if (event.code === 'ArrowLeft') this.left = true;//sets the left condition to "true", which will change the animate function
    else if (event.code === 'KeyA') this.zoomOut = true;
    else if (event.code === 'KeyS') this.zoomIn = true;
  })
  document.addEventListener('keyup', event => { // when arrow keys are released, the screen will stop moving
    if (event.code === 'ArrowUp') this.up = false;
    if (event.code === 'ArrowDown') this.down = false;
    if (event.code === 'ArrowRight') this.right = false;
    if (event.code === 'ArrowLeft') this.left = false;
    if (event.code === 'KeyA') this.zoomOut = false;
    if (event.code === 'KeyS') this.zoomIn = false;
  })
  canvas2.addEventListener("click", event => { // move to a point on the smaller canvas when the user clicks there
    let x = event.offsetX;
    let y = event.offsetY;
    x*= this.width*2/canvas2.width;
    y*= this.height*2/canvas2.height;
    x-= this.width/this.zoomfactor;
    y-= this.height/this.zoomfactor;
    let newpos = new JSVector(x, y);
    this.destination = newpos;
  });

}

World.prototype.draw = function(){
  this.ctx[0].save();
  this.ctx[0].scale(this.zoomScale.x, this.zoomScale.y);
  this.ctx[0].translate(-1*this.position.x+canvas1.width/2/this.zoomfactor, -1*this.position.y+canvas1.height/2/this.zoomfactor);
  this.creatures.run();
  this.ctx[0].beginPath();
  this.ctx[0].moveTo(0, -1*this.height);
  this.ctx[0].lineTo(0, this.height);
  this.ctx[0].strokeStyle = "red";
  this.ctx[0].stroke();
  this.ctx[0].closePath();
  this.ctx[0].beginPath();
  this.ctx[0].moveTo(-1*this.width, 0);
  this.ctx[0].lineTo(this.width, 0);
  this.ctx[0].strokeStyle = "red";
  this.ctx[0].stroke();
  this.ctx[0].closePath();
  this.ctx[0].beginPath();
  this.ctx[0].strokeStyle = "LimeGreen";
  this.ctx[0].strokeRect(-1*this.width, -1*this.height, this.width*2, this.height*2);
  this.ctx[0].closePath();
  this.ctx[0].fillStyle = "black";
  this.ctx[0].fillRect(-1*(this.width+this.buffer), -1*(this.height+this.buffer), 2*(this.width+this.buffer), this.buffer);
  this.ctx[0].fillRect(-1*(this.width+this.buffer), -1*this.height, this.buffer, 2*(this.height+this.buffer));
  this.ctx[0].fillRect(-1*(this.width), this.height, 2*(this.width+this.buffer), this.buffer);
  this.ctx[0].fillRect(this.width, -1*this.height, this.buffer, 2*this.height);
  this.ctx[0].restore();
}
World.prototype.update = function(){
  if(this.up){
    this.destination.y=this.position.y-20;
  }
  if(this.down){
    this.destination.y=this.position.y+20;
  }
  if(this.left){
    this.destination.x=this.position.x-20;
  }
  if(this.right){
    this.destination.x=this.position.x+20;
  }
  if(this.zoomIn){
    this.zoomScale.multiply(1.01);
    this.zoomfactor*=1.01;
  }
  if(this.zoomOut){
    this.zoomScale.divide(1.01);
    this.zoomfactor/=1.01;
  }
  this.zoomfactor = this.value_limit(this.zoomfactor, canvas1.width/(2*(this.width+this.buffer)), 2);
  if(this.zoomfactor != this.zoomScale.x){
    this.zoomScale.setMagnitude(this.zoomfactor*Math.sqrt(2));
  }
  this.destination.x = this.value_limit(this.destination.x, -1*(this.width+this.buffer-canvas1.width/2/this.zoomfactor), (this.width+this.buffer-canvas1.width/2/this.zoomfactor));
  this.destination.y = this.value_limit(this.destination.y, -1*(this.height+this.buffer-canvas1.height/2/this.zoomfactor), (this.height+this.buffer-canvas1.height/2/this.zoomfactor));
  this.position.add(JSVector.subGetNew(this.destination, this.position).divide(3));
  if(JSVector.subGetNew(this.destination, this.position).getMagnitude()<1) this.destination = this.position;

}

World.prototype.runSmallCanvas = function(){
    this.ctx[1].lineWidth = 2*canvas1.width/canvas2.width;
    this.ctx[1].beginPath();
    this.ctx[1].moveTo(-1*this.width, 0);
    this.ctx[1].lineTo(this.width, 0);
    this.ctx[1].strokeStyle = "red";
    this.ctx[1].stroke();
    this.ctx[1].closePath();
    this.ctx[1].beginPath();
    this.ctx[1].moveTo(0, -1*this.height);
    this.ctx[1].lineTo(0, this.height);
    this.ctx[1].stroke();
    this.ctx[1].closePath();
    this.ctx[1].beginPath();
    this.ctx[1].strokeStyle = "white";
    this.ctx[1].strokeRect(this.position.x-canvas1.width/2/this.zoomfactor, this.position.y-canvas1.height/2/this.zoomfactor, canvas1.width/this.zoomfactor, canvas1.height/this.zoomfactor);
    this.ctx[1].stroke();
    this.ctx[1].closePath();
}

World.prototype.value_limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}
