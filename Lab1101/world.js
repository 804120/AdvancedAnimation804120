function World(dimensions, ctx){
  this.width = dimensions.x;
  this.height = dimensions.y;
  this.context = ctx;
  this.position = new JSVector((this.width-canvas.width)/2, (this.height-canvas.height)/2);
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
  this.context.moveTo(-1*this.position.x, -1*this.position.y);
  this.context.lineTo(this.width-this.position.x, -1*this.position.y);
  this.context.lineTo(this.width-this.position.x, this.height-this.position.y);
  this.context.lineTo(-1*this.position.x, this.height-this.position.y);
  this.context.lineTo(-1*this.position.x, -1*this.position.y);
  this.context.strokeStyle = "LimeGreen";
  this.context.stroke();
  this.context.closePath();
}
World.prototype.update = function(){
  if(up){
    this.position.y-=5;
  }
  if(down){
    this.position.y+=5;
  }
  if(left){
    this.position.x-=5;
  }
  if(right){
    this.position.x+=5;
  }
}
World.prototype.run = function(){
  this.update();
  this.draw();
}
