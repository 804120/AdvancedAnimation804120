function World(dimensions, ctx){
  this.width = dimensions.x;
  this.height = dimensions.y;
  this.context = ctx;
  this.position = new JSVector((this.width-canvas.width)/2, (this.height-canvas.height)/2);
  this.destination = this.position;
}
World.prototype.draw = function(){
  this.context.beginPath();
  this.context.moveTo(this.width/2-this.position.x, 0-this.position.y);
  this.context.lineTo(this.width/2-this.position.x, this.height-this.position.y);
  this.context.strokeStyle = "red";
  this.context.stroke();
  this.context.closePath();
  this.context.beginPath();
  this.context.moveTo(0-this.position.x, this.height/2-this.position.y);
  this.context.lineTo(this.width-this.position.x, this.height/2-this.position.y);
  this.context.strokeStyle = "red";
  this.context.stroke();
  this.context.closePath();
  this.context.beginPath();
  this.context.strokeStyle = "LimeGreen";
  this.context.strokeRect(-1*this.position.x, -1*this.position.y, this.width, this.height);
  this.context.closePath();
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
  this.destination.x = value_limit(this.destination.x, -1*buffer, this.width-canvas.width+buffer);
  this.destination.y = value_limit(this.destination.y, -1*buffer, this.height-canvas.height+buffer);
  this.position.add(JSVector.subGetNew(this.destination, this.position).divide(3));

}
World.prototype.run = function(){
  this.update();
  this.draw();
}
