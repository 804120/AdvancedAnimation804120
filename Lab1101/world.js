function World(dimensions, ctx, canvas){
  this.width = dimensions.x/2; //Throughout this document I had to use half the width more than the actual width, so I found it easier to divide this by 2.
  this.height = dimensions.y/2; // see comment above
  this.context = ctx; // probably unnecessary, but it's there just in case
  this.position = new JSVector(0, 0); // initial position
  this.destination = this.position; // since it's not moving yet, the destination is the same as the position
  this.canvas = canvas; // also probably unnecessary
}
World.prototype.draw = function(){
  this.context.save();
  this.context.translate(-1*this.position.x+this.canvas.width/2, -1*this.position.y+this.canvas.height/2);
  this.context.beginPath();
  this.context.moveTo(0, -1*this.height);
  this.context.lineTo(0, this.height);
  this.context.strokeStyle = "red";
  this.context.stroke();
  this.context.closePath();
  this.context.beginPath();
  this.context.moveTo(-1*this.width, 0);
  this.context.lineTo(this.width, 0);
  this.context.strokeStyle = "red";
  this.context.stroke();
  this.context.closePath();
  this.context.beginPath();
  this.context.strokeStyle = "LimeGreen";
  this.context.strokeRect(-1*this.width, -1*this.height, this.width*2, this.height*2);
  this.context.closePath();
  this.context.restore();
}
World.prototype.update = function(){
  if(up){
    this.destination.y=this.position.y-20;
  }
  if(down){
    this.destination.y=this.position.y+20;;
  }
  if(left){
    this.destination.x=this.position.x-20;;
  }
  if(right){
    this.destination.x=this.position.x+20;;
  }
  this.destination.x = value_limit(this.destination.x, -1*(this.width+buffer-this.canvas.width/2), this.width+buffer-this.canvas.width/2);
  this.destination.y = value_limit(this.destination.y, -1*(this.height+buffer-this.canvas.height/2), this.height+buffer-this.canvas.height/2);
  this.position.add(JSVector.subGetNew(this.destination, this.position).divide(3));

}
World.prototype.run = function(){
  this.update();
  this.draw();
}
