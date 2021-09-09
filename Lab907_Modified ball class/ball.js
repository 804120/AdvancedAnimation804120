function Ball(position, velocity, radius, color, ctx){
  this.position = new JSVector(position.x, position.y);
  this.velocity = new JSVector(velocity.x, velocity.y);
  this.radius = radius;
  this.color=color;
  this.context = ctx;
}
Ball.prototype.checkedges = function(){
  if(this.position.x<this.radius||this.position.x>canvas.width-this.radius){
    this.velocity.x*=-1;
  }
  if(this.position.y<this.radius||this.position.y>canvas.height-this.radius){
    this.velocity.y*=-1;
  }
}
Ball.prototype.update = function(){
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
}
Ball.prototype.draw = function(){
  this.context.beginPath();
  this.context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  this.context.strokeStyle = "black";
  this.context.stroke();
  this.context.fillStyle = this.color;
  this.context.fill();
}
Ball.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
