function World(dimensions, buffer){
  this.width = dimensions.x/2; //Throughout this document I had to use half the width more than the actual width, so I found it easier to divide this by 2.
  this.height = dimensions.y/2; // see comment above
  this.position = new JSVector(0, 0); // initial position
  this.destination = this.position; // since it's not moving yet, the destination is the same as the position
  this.buffer = buffer; // how far past the boundary you can go before it won't let you move anymore


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

  canvas2.addEventListener("click", event => { // move to a point on the smaller canvas when the user clicks there
    let x = event.offsetX;
    let y = event.offsetY;
    x*= this.width*2/canvas2.width;
    y*= this.height*2/canvas2.height;
    x-= this.width;
    y-= this.height;
    let newpos = new JSVector(x, y);
    this.destination = newpos;
  });
}
World.prototype.draw = function(){
  context.save();
  context.translate(-1*this.position.x+canvas.width/2, -1*this.position.y+canvas.height/2);
  context.beginPath();
  context.moveTo(0, -1*this.height);
  context.lineTo(0, this.height);
  context.strokeStyle = "red";
  context.stroke();
  context.closePath();
  context.beginPath();
  context.moveTo(-1*this.width, 0);
  context.lineTo(this.width, 0);
  context.strokeStyle = "red";
  context.stroke();
  context.closePath();
  context.beginPath();
  context.strokeStyle = "LimeGreen";
  context.strokeRect(-1*this.width, -1*this.height, this.width*2, this.height*2);
  context.closePath();
  context.restore();
}
World.prototype.update = function(){
  if(this.up){
    console.log("hi");
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
  this.destination.x = this.value_limit(this.destination.x, -1*(this.width+this.buffer-canvas.width/2), this.width+this.buffer-canvas.width/2);
  this.destination.y = this.value_limit(this.destination.y, -1*(this.height+this.buffer-canvas.height/2), this.height+this.buffer-canvas.height/2);
  this.position.add(JSVector.subGetNew(this.destination, this.position).divide(3));
  if(JSVector.subGetNew(this.destination, this.position).getMagnitude()<1) this.destination = this.position;

}
World.prototype.run = function(){
  this.update();
  this.draw();
  this.runSmallCanvas();
}

World.prototype.runSmallCanvas = function(){
    ctx2.lineWidth = 5;
    ctx2.beginPath();
    ctx2.moveTo(this.width, 0);
    ctx2.lineTo(this.width, 2*this.height);
    ctx2.strokeStyle = "red";
    ctx2.stroke();
    ctx2.closePath();
    ctx2.beginPath();
    ctx2.moveTo(0, this.height);
    ctx2.lineTo(2*this.width, this.height);
    ctx2.stroke();
    ctx2.closePath();
    ctx2.beginPath();
    ctx2.strokeStyle = "white";
    ctx2.strokeRect(this.width+this.position.x-canvas.width/2, this.height+this.position.y-canvas.height/2, canvas.width, canvas.height);
    ctx2.stroke();
    ctx2.closePath();
}
World.prototype.value_limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}
