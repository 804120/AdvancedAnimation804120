function Particle(position, color, pSystem){
  this.position = position;
  this.velocity = new JSVector(Math.random()*8-4, Math.random()*8-4);
  this.radius = 3;
  this.color=color;
  this.life = 0;
  this.alive = true;
  this.pSystem = pSystem;
}
Particle.prototype.update = function(){
  this.acceleration = this.pSystem.acceleration;
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
}
Particle.prototype.draw = function(){
  ecosystem.ctx[0].beginPath();
  ecosystem.ctx[0].arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  ecosystem.ctx[0].fillStyle = this.color;
  ecosystem.ctx[0].fill();
}

Particle.prototype.run = function(){
  this.life++;
  this.update();
  this.draw();
  if(this.life>50) this.alive = false;
}
