function FlockSystem(color, num){
  this.color = color;
  this.boids = [];
  this.averagePos = new JSVector(0, 0);
  this.averagevel = 0; // average direction of velocity
  for(let i=0;i<num;i++){
    let randompos = new JSVector(Math.random()*2*canvas1.width-canvas1.width, Math.random()*2*canvas1.height-canvas1.height);
    let randomvel = new JSVector(Math.random()-0.5, Math.random()-0.5);
    this.boids.push(new Boid(randompos, randomvel.setMagnitude(3), new JSVector(0, 0), 15, this.color, false));
  }
}
FlockSystem.prototype.run = function(){
  this.averagePos = new JSVector(0, 0);
  this.averagevel = 0;
  for(let i=0;i<this.boids.length;i++){
    this.averagePos.add(this.boids[i].position);
    this.averagevel+=(this.boids[i].velocity.getDirection());
  }
  this.averagePos.divide(this.boids.length);
  this.averagevel/=this.boids.length;
  for(let i=0;i<this.boids.length;i++){
    this.boids[i].acceleration = JSVector.subGetNew(this.averagePos, this.boids[i].position).setMagnitude(0.3);
  }
  this.repel();
  this.update();
}
FlockSystem.prototype.update = function(){
  for(let i=0;i<this.boids.length;i++){
    this.boids[i].run();
  }
}
FlockSystem.prototype.repel = function(){
  for(let i=0;i<this.boids.length;i++){
    if(JSVector.subGetNew(this.boids[i].position, this.averagePos).getMagnitude()<100){
      this.boids[i].acceleration.setDirection(this.averagevel);
    }
    for(let j=i+1;j<this.boids.length;j++){
      if(JSVector.subGetNew(this.boids[i].position, this.boids[j].position).getMagnitude()<20){
        this.boids[j].acceleration.add(JSVector.subGetNew(this.boids[j].position, this.boids[i].position)).setMagnitude(0.2);
        this.boids[i].acceleration.add(JSVector.subGetNew(this.boids[i].position, this.boids[j].position)).setMagnitude(0.2);
      }
    }
  }
}
