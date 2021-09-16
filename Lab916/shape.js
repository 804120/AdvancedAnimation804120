function Shape(position, velocity, acceleration, radius, color, ctx){
  this.position = new JSVector(position.x, position.y);
  this.velocity = new JSVector(velocity.x, velocity.y);
  this.acceleration = new JSVector(acceleration.x, acceleration.y);
  this.radius = radius;
  this.color=color;
  this.context = ctx;
}
Shape.prototype.repulsion = function(){
  if(this.position.x<100){
    this.acceleration.x=0.3*Math.abs(100/this.position.x);
  }
  else if(this.position.x>canvas.width-100){
    this.acceleration.x =-0.3*(100/Math.abs(canvas.width-this.position.x));
  }
  else {
    this.acceleration.x = 0;
  }


  if(this.position.y<100){
    this.acceleration.y=0.3*(100/Math.abs(this.position.y));
  }
  else if(this.position.y>canvas.height-100){
    this.acceleration.y =-0.3*(100/Math.abs(canvas.height-this.position.y));
  }
  else{
    this.acceleration.y = 0;
  }
}
Shape.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
  this.velocity.x+=this.acceleration.x;
  this.velocity.y+=this.acceleration.y;
  this.velocity.setMagnitude(oldv);
}
Shape.prototype.draw = function(){
  this.context.moveTo(this.position.x-this.radius, this.position.y-0.5*this.radius);
  this.context.lineTo(this.position.x+this.radius, this.position.y);
  this.context.lineTo(this.position.x-this.radius, this.position.y+0.5*this.radius);
  this.context.closePath();
  this.context.lineWidth = 6;
  this.context.strokeStyle = this.color;
  this.context.stroke();
}
Shape.prototype.run = function(){
  this.repulsion();
  this.update();
  this.draw();
}
