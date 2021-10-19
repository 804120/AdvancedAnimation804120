function ParticleSystem(pos, color, ctx){
  this.color = color;
  this.context = ctx;
  this.pos = pos;
  this.particles = [];
  this.time = 0;
}
ParticleSystem.prototype.run = function(){
  this.time++;
  if(this.time>3000) this.time =0;
  if(this.time%1==0){
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
