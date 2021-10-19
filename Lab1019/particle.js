function Particle(position, color, ctx){
  this.position = position;
  this.velocity = new JSVector(Math.random()*8-4, Math.random()*8-4);
  this.acceleration = new JSVector(0, 0.2);
  this.radius = 3;
  this.color=color;
  this.context = ctx;
  this.life = 0;
  this.alive = true;
}
Particle.prototype.update = function(){
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
}
Particle.prototype.draw = function(){
  this.context.beginPath();
  this.context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  this.context.fillStyle = this.color;
  this.context.fill();
}

Particle.prototype.run = function(){
  this.life++;
  this.update();
  this.draw();
  if(this.life>100) this.alive = false;
}
