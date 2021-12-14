function Spitter(color){
  let randompos = new JSVector(Math.random()*2*canvas1.width-canvas1.width, Math.random()*2*canvas1.height-canvas1.height);
  let zero = new JSVector(0, 0);
  this.color = color;
  this.center = new Boid(randompos, zero, zero, 50, this.color, true);
  this.particles = false;
  this.pSystem = new ParticleSystem(this.center.position, this.color, 0, this.center.dir, this);
}
Spitter.prototype.run = function(){
  this.point();
  this.checkParticles();
  this.pSystem.run();
  this.center.run();
}
Spitter.prototype.point = function(){
  this.closestOrbiter = ecosystem.creatures.creatures[1][0];
  for(let i=1; i<ecosystem.creatures.creatures[1].length;i++){
    if(JSVector.subGetNew(this.center.position, ecosystem.creatures.creatures[1][i].position).getMagnitude()<JSVector.subGetNew(this.center.position, this.closestOrbiter.position).getMagnitude()){
      this.closestOrbiter = ecosystem.creatures.creatures[1][i];
    }
  }
  this.center.dir = JSVector.subGetNew(this.closestOrbiter.position, this.center.position).getDirection();

  //move the tip of the particle pSystem
  //this.pSystem.position = new JSVector(this.center.position.x+this.center.radius*Math.cos(this.center.direction), this.center.position.y+this.center.radius*Math.sin(this.center.direction));
}
Spitter.prototype.checkParticles = function(){
  if(JSVector.subGetNew(this.closestOrbiter.position, this.center.position).getMagnitude()<250){
    this.pSystem.rate = 3;
  }
  else this.pSystem.rate = 0;
}
