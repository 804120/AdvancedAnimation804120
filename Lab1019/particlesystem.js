function ParticleSystem(pos, color, rate, ctx){
  this.color = color;
  this.context = ctx;
  this.pos = pos;
  this.particles = [];
  this.rate = rate;
}
ParticleSystem.prototype.run = function(){
  for(let i=0;i<this.rate;i++){
    this.particles.push(new Particle(new JSVector(this.pos.x, this.pos.y), this.color, this.context));
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
