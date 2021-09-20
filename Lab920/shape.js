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
    this.acceleration.x=0.2*Math.abs(100/this.position.x);
  }
  else if(this.position.x>canvas.width-100){
    this.acceleration.x =-0.2*(100/Math.abs(canvas.width-this.position.x));
  }
  else {
    this.acceleration.x +=Math.random()*0.1-0.05;
    if(Math.abs(this.acceleration.x)<0.045) this.acceleration.x = 0;
  }


  if(this.position.y<100){
    this.acceleration.y=0.2*(100/Math.abs(this.position.y));
  }
  else if(this.position.y>canvas.height-100){
    this.acceleration.y =-0.2*(100/Math.abs(canvas.height-this.position.y));
  }
  else{
    this.acceleration.y += Math.random()*0.1-0.05;
    if(Math.abs(this.acceleration.y)<0.045) this.acceleration.y = 0;
  }
}
Shape.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.velocity.setMagnitude(oldv);
}
Shape.prototype.draw = function(){
  this.context.save();
  this.context.translate(this.position.x, this.position.y);
  this.context.rotate(this.velocity.getDirection());
  this.context.moveTo(-1*this.radius,-0.5*this.radius);
  this.context.lineTo(this.radius, 0);
  this.context.lineTo(-1*this.radius, 0.5*this.radius);
  this.context.closePath();
  this.context.lineWidth = 5;
  this.context.strokeStyle = this.color;
  this.context.stroke();
  this.context.restore();
}
Shape.prototype.run = function(){
  this.repulsion();
  this.update();
  this.draw();
}
