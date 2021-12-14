function ParticleSystem(pos, color, rate, gDir, spitter){
  this.color = color;
  this.originalpos = pos;
  this.particles = [];
  this.rate = rate;
  this.spitter = spitter
  this.acceleration = new JSVector(0.5, 0);
  this.acceleration.setDirection(gDir);
  let offset = this.acceleration;
  this.pos = JSVector.addGetNew(this.originalpos, offset.setMagnitude(this.spitter.center.radius));
}
ParticleSystem.prototype.run = function(){
  for(let i=0;i<this.rate;i++){
    this.particles.push(new Particle(this.pos, this.color, this));
  }
  this.update();
}
ParticleSystem.prototype.update = function(){
  this.acceleration.setDirection(this.spitter.center.dir);
  let offset = this.acceleration;
  this.pos = JSVector.addGetNew(this.originalpos, offset.setMagnitude(this.spitter.center.radius));
  this.acceleration.setMagnitude(0.5);
  for(let i=0;i<this.particles.length;i++){
    this.particles[i].run();
    if(this.particles[i].alive==false){
      this.particles.splice(i, 1);
      i--;
    }
  }
}
