function Shape(position, velocity, acceleration, radius, color, ctx){
  this.position = new JSVector(position.x, position.y);
  this.velocity = new JSVector(velocity.x, velocity.y);
  this.acceleration = new JSVector(acceleration.x, acceleration.y);
  this.radius = radius;
  this.color=color;
  this.context = ctx;
}
Shape.prototype.checkEdges = function(){
  if(this.position.x<-2500||this.position.x>2500){
    this.velocity.x *=-1//*Math.sign(this.position.x)*Math.abs(this.position.x);
  }
  if(this.position.y<-2500||this.position.y>2500){
    this.velocity.y *=-1//*Math.sign(this.position.x)*Math.abs(this.position.x);
  }
}
Shape.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.velocity.setMagnitude(oldv);
  this.radius-=0.01;
  if(this.radius<=0){
    this.radius = 15;
    this.position = new JSVector(Math.floor(Math.random()*3000-1500), Math.floor(Math.random()*2000-1000));
  }
}
Shape.prototype.draw = function(){
  this.context.save();
  this.context.translate(this.position.x, this.position.y);
  this.context.rotate(this.velocity.getDirection());
  this.context.beginPath();
  this.context.moveTo(-1*this.radius,-0.5*this.radius);
  this.context.lineTo(this.radius, 0);
  this.context.lineTo(-1*this.radius, 0.5*this.radius);
  this.context.lineWidth = 5;
  this.context.strokeStyle = this.color;
  this.context.closePath();
  this.context.stroke();
  this.context.restore();
}
Shape.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.draw();
}
