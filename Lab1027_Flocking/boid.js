function Boid(position, velocity, acceleration, radius, color, ctx){
  this.position = new JSVector(position.x, position.y);
  this.velocity = new JSVector(velocity.x, velocity.y);
  this.acceleration = new JSVector(acceleration.x, acceleration.y);
  this.radius = radius;
  this.color=color;
  this.context = ctx;
}
Boid.prototype.checkedges = function(){
  if(this.position.x<-1*this.radius){
    this.position.x+=canvas.width+2*this.radius;
  }
  else if(this.position.x>canvas.width+this.radius){
    this.position.x-=canvas.width+2*this.radius;
  }
  if(this.position.y<-1*this.radius){
    this.position.y+=canvas.height+2*this.radius;
  }
  else if(this.position.y>canvas.height+this.radius){
    this.position.y-=canvas.height+2*this.radius;
  }
}
Boid.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.velocity.setMagnitude(oldv);
}
Boid.prototype.draw = function(){
  this.context.save();
  this.context.translate(this.position.x, this.position.y);
  this.context.rotate(this.velocity.getDirection());
  this.context.beginPath();
  this.context.moveTo(-1*this.radius,-0.5*this.radius);
  this.context.lineTo(this.radius, 0);
  this.context.lineTo(-1*this.radius, 0.5*this.radius);
  this.context.closePath();
  this.context.lineWidth = 5;
  this.context.strokeStyle = this.color;
  this.context.stroke();
  this.context.restore();
}
Boid.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
