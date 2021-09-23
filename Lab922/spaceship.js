function Spaceship(position, velocity, acceleration, radius, color, ctx){
  this.position = new JSVector(position.x, position.y);
  this.velocity = new JSVector(velocity.x, velocity.y);
  this.acceleration = new JSVector(acceleration.x, acceleration.y);
  this.radius = radius;
  this.color=color;
  this.context = ctx;
  this.flamesize = 3;
}
Spaceship.prototype.checkedges = function(){
  if(this.position.x<0){
    this.position.x += canvas.width;
  }
  else if(this.position.x>canvas.width){
    this.position.x -= canvas.width;;
  }
  if(this.position.y<0){
    this.position.y += canvas.height;
  }
  else if(this.position.y>canvas.height){
    this.position.y -= canvas.height;
  }
}
Spaceship.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.velocity.setMagnitude(oldv);
}
Spaceship.prototype.draw = function(){
  this.context.save();
  this.context.translate(this.position.x, this.position.y);
  this.context.rotate(this.velocity.getDirection());
  this.context.moveTo(-1*this.radius,-0.5*this.radius);
  this.context.lineTo(this.radius, 0);
  this.context.lineTo(-1*this.radius, 0.5*this.radius);
  this.context.lineTo(-0.5*this.radius, 0);
  this.context.closePath();
  this.context.fillStyle = "black";
  this.context.fill();
  this.context.beginPath();
  this.context.moveTo(-1*this.radius, 0);
  this.context.lineTo(-1.5*this.radius, -0.3*this.radius);
  this.flamesize+=Math.random()*.2-.1;
  if(this.flamesize<2||this.flamesize>4) this.flamesize = 3;
  this.context.lineTo(-1*this.flamesize*this.radius, 0);
  this.context.lineTo(-1.5*this.radius, 0.3*this.radius);
  this.context.closePath();
  this.context.fillStyle = "orange";
  this.context.fill();
  this.context.restore();
}
Spaceship.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
