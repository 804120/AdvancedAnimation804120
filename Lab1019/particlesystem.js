function ParticleSystem(pos, color, rate, ctx){
  this.color = color;
  this.context = ctx;
  this.pos = pos;
  this.particles = [];
  this.rate = rate;
  this.g = 0.2; // gravitational acceleration
}
ParticleSystem.prototype.run = function(){
  for(let i=0;i<this.rate;i++){
    this.particles.push(new Particle(new JSVector(this.pos.x, this.pos.y), this.color, this.g, this.context));
  }
  this.update();
}
ParticleSystem.prototype.update = function(){
  for(let i=0;i<this.particles.length;i++){
    this.particles[i].run();
    if(this.particles[i].alive==false){
      this.particles.splice(i, 1);
      i--;
    }
  }
}
ParticleSystem.prototype.antigravity = function(){
  for(let i=0;i<this.particles.length;i++){
    this.particles[i].acceleration.y=-1*this.g;
    this.particles[i].acceleration.x=0;
  }
}
ParticleSystem.prototype.restoregravity = function(){
  for(let i=0;i<this.particles.length;i++){
    this.particles[i].acceleration.y=this.g;
    this.particles[i].acceleration.x=0;
  }
}
ParticleSystem.prototype.nogravity = function(){
  for(let i=0;i<this.particles.length;i++){
    this.particles[i].acceleration.y=0;
    this.particles[i].acceleration.x=0;
  }
}
ParticleSystem.prototype.rightgravity = function(){
  for(let i=0;i<this.particles.length;i++){
    this.particles[i].acceleration.y=0;
    this.particles[i].acceleration.x=this.g;
  }
}
ParticleSystem.prototype.leftgravity = function(){
  for(let i=0;i<this.particles.length;i++){
    this.particles[i].acceleration.y=0;
    this.particles[i].acceleration.x=-1*this.g;
  }
}
