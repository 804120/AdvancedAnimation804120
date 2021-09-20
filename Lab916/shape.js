function Shape(position, velocity, acceleration, radius, color, ctx){
  this.position = new JSVector(position.x, position.y);
  this.velocity = new JSVector(velocity.x, velocity.y);
  this.acceleration = new JSVector(acceleration.x, acceleration.y);
  this.radius = radius;
  this.color=color;
  this.context = ctx;
}
Shape.prototype.repulsion = function(){
  if(this.position.x<75){
    this.acceleration.x=0.2*Math.abs(75/this.position.x);
  }
  else if(this.position.x>canvas.width-75){
    this.acceleration.x =-0.2*(75/Math.abs(canvas.width-this.position.x));
  }
  else {
    this.acceleration.x +=Math.random()*0.1-0.05;
    if(Math.abs(this.acceleration.x)<0.045) this.acceleration.x = 0;
  }


  if(this.position.y<75){
    this.acceleration.y=0.2*(75/Math.abs(this.position.y));
  }
  else if(this.position.y>canvas.height-50){
    this.acceleration.y =-0.2*(75/Math.abs(canvas.height-this.position.y));
  }
  else{
    this.acceleration.y += Math.random()*0.1-0.05;
    if(Math.abs(this.acceleration.y)<0.045) this.acceleration.y = 0;
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
  let dir = this.velocity.normalize();
  this.context.moveTo(this.position.x-0.5*this.radius*dir.y, this.position.y+0.5*this.radius*dir.x);
  this.context.lineTo(this.position.x+2*this.radius*dir.x, this.position.y+2*this.radius*dir.y);
  this.context.lineTo(this.position.x+0.5*this.radius*dir.y, this.position.y-0.5*this.radius*dir.x);
  this.context.closePath();
  this.context.lineWidth = 5;
  this.context.strokeStyle = this.color;
  this.context.stroke();
}
Shape.prototype.run = function(){
  this.repulsion();
  this.update();
  this.draw();
}
