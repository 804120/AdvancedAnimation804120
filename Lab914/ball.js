function Ball(position, velocity, acceleration, radius, color, ctx){
  this.position = new JSVector(position.x, position.y);
  this.velocity = new JSVector(velocity.x, velocity.y);
  this.acceleration = new JSVector(acceleration.x, acceleration.y);
  this.radius = radius;
  this.color=color;
  this.context = ctx;
}
Ball.prototype.checkedges = function(){
  if(this.position.x<this.radius){
    this.velocity.x = Math.abs(this.velocity.x);
  }
  else if(this.position.x>canvas.width-this.radius){
    this.velocity.x =-1*Math.abs(this.velocity.x);
  }
  if(this.position.y<this.radius){
    this.velocity.y = Math.abs(this.velocity.y);
  }
  else if(this.position.y>canvas.height-this.radius){
    this.velocity.y =-1*Math.abs(this.velocity.y);
  }
}
Ball.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
  this.velocity.x+=this.acceleration.x;
  this.velocity.y+=this.acceleration.y;
  this.velocity.setMagnitude(oldv);
}
Ball.prototype.draw = function(){
  this.context.beginPath();
  this.context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  this.context.fillStyle = this.color;
  this.context.fill();
}
Ball.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
