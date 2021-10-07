function Snake(ctx){
  this.velocity = new JSVector(Math.random()*4-2, Math.random()*4-2);
  this.radius = 16;
  this.color="red";
  this.context = ctx;
  this.acceleration = new JSVector(0, 0);
  this.position = new JSVector(Math.random()*(canvas.width-6*this.radius)+3*this.radius, Math.random()*(canvas.height-6*this.radius)+3*this.radius);
  this.pos = [];
  this.oldloc = [];
  this.time = 0;
  for(let i=0;i<32;i++){
    this.pos.push(new JSVector());
  }
}
Snake.prototype.checkedges = function(){
  if(this.position.x<3.5*this.radius||this.position.x>canvas.width-3.5*this.radius){
    this.acceleration.x = - .1*Math.sign(this.position.x-canvas.width/2);
  }
  else this.acceleration.x = 0;
  if(this.position.y<3.5*this.radius||this.position.y>canvas.height-3.5*this.radius){
    this.acceleration.y = - .1*Math.sign(this.position.y-canvas.height/2);
  }
  else this.acceleration.y = 0;
}
Snake.prototype.update = function(){
  this.oldloc.push(new JSVector(this.position.x, this.position.y));
  let oldv = this.velocity.getMagnitude();
  this.velocity.x+=this.acceleration.x;
  this.velocity.y+=this.acceleration.y;
  this.velocity.setMagnitude(oldv);
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
  if(this.time>485){
    for(let i=0;i<32;i++){
      this.pos[i]=this.oldloc[i*15];
    }
    this.oldloc.shift();
  }
  else{
    for(let i=0;i<16;i++){
      this.pos[i] = this.position;
    }
  }
  this.velocity.setMagnitude(oldv);
}
Snake.prototype.draw = function(){
  this.context.beginPath();
  this.context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  this.context.fillStyle = this.color;
  this.context.fill();
  this.context.closePath();
  for(let i=0;i<32;i+=2){
    this.context.beginPath();
    this.context.lineCap = "round";
    this.context.moveTo(this.pos[i].x, this.pos[i].y);
    this.context.lineTo(this.pos[i+1].x, this.pos[i+1].y);
    this.context.lineWidth = 4;
    this.context.stroke();
    this.context.closePath();
  }
}
Snake.prototype.run = function(){
  this.time++;
  this.checkedges();
  this.update();
  this.draw();
}
