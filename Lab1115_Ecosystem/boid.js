function Boid(position, velocity, acceleration, radius, color, fixed){
  this.position = new JSVector(position.x, position.y);
  this.fixed = fixed;
  if(!this.fixed){
    this.velocity = new JSVector(velocity.x, velocity.y);
    this.acceleration = new JSVector(acceleration.x, acceleration.y);
  }
  else this.dir = Math.random()*2*Math.PI;
  this.radius = radius;
  this.color=color;
}
Boid.prototype.checkedges = function(){
  if(this.position.x<-1*this.radius-ecosystem.width){
    this.position.x+=2*(ecosystem.width+this.radius);
  }
  else if(this.position.x>ecosystem.width+this.radius){
    this.position.x-=2*(ecosystem.width+this.radius);
  }
  if(this.position.y<-1*(this.radius+ecosystem.height)){
    this.position.y+=2*(ecosystem.height+this.radius);
  }
  else if(this.position.y>ecosystem.height+this.radius){
    this.position.y-=2*(ecosystem.height+this.radius);
  }
}
Boid.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.velocity.setMagnitude(oldv);
}
Boid.prototype.draw = function(){
  for(let i=0;i<2;i++){
    ecosystem.ctx[i].save();
    ecosystem.ctx[i].translate(this.position.x, this.position.y);
    if(this.fixed) ecosystem.ctx[i].rotate(this.dir);
    else ecosystem.ctx[i].rotate(this.velocity.getDirection());
    ecosystem.ctx[i].beginPath();
    ecosystem.ctx[i].moveTo(-1*this.radius,-0.5*this.radius);
    ecosystem.ctx[i].lineTo(this.radius, 0);
    ecosystem.ctx[i].lineTo(-1*this.radius, 0.5*this.radius);
    ecosystem.ctx[i].closePath();
    ecosystem.ctx[i].lineWidth = 5;
    ecosystem.ctx[i].strokeStyle = this.color;
    ecosystem.ctx[i].stroke();
    ecosystem.ctx[i].restore();
  }
}
Boid.prototype.run = function(){
  if(!this.fixed){
  this.checkedges();
  this.update();
  }
  this.draw();
}
