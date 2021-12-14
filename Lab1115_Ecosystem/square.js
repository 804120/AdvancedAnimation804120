function Square(){
  this.radius = 50;
  this.position = new JSVector(Math.random()*2*canvas1.width-canvas1.width, Math.random()*canvas1.height-canvas1.height);
  this.velocity = new JSVector(Math.random()*6-3, Math.random()*6-3);
  this.velocity.setMagnitude(4);
  this.acceleration = new JSVector(0, 0);
  this.changeColors();
}
Square.prototype.changeColors = function(){
  let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "brown", "gray", "tan", "hotPink", "aqua", "darkGreen", "cyan", "chartreuse", "lime", "gold"];
  this.color=colors[Math.floor(Math.random()*colors.length)];
}
Square.prototype.checkedges = function(){
  if(this.position.x<this.radius/2-ecosystem.width||this.position.x>ecosystem.width-this.radius/2){
    this.velocity.x*=-1;
    this.position.x+=this.velocity.x;
    this.changeColors();
  }
  if(this.position.y<this.radius/2-ecosystem.height||this.position.y>ecosystem.height-this.radius/2){
    this.velocity.y*=-1;
    this.position.y+=this.velocity.y;
    this.changeColors();
  }
}
Square.prototype.update = function(){
  let oldv = this.velocity.getMagnitude();
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.velocity.setMagnitude(oldv);
  let distances = [];
  distances.push(JSVector.subGetNew(this.position, new JSVector(-1*canvas1.width, -1*canvas1.height)).getMagnitude());
  distances.push(JSVector.subGetNew(this.position, new JSVector(-1*canvas1.width, canvas1.height)).getMagnitude());
  distances.push(JSVector.subGetNew(this.position, new JSVector(canvas1.width, canvas1.height)).getMagnitude());
  distances.push(JSVector.subGetNew(this.position, new JSVector(canvas1.width, -1*canvas1.height)).getMagnitude());
  let dist=distances[0];
  for(let i=1; i<4;i++){
    if(distances[i]<dist){
      dist = distances[i];
    }
  }
  this.radius = ecosystem.value_limit(dist/12.5, 10, 50);
}
Square.prototype.draw = function(){
  for(let i=0;i<2;i++){
    ecosystem.ctx[i].beginPath();
    ecosystem.ctx[i].fillStyle = this.color;
    ecosystem.ctx[i].fillRect(this.position.x-this.radius/2, this.position.y-this.radius/2, this.radius, this.radius);
    ecosystem.ctx[i].fill();
    ecosystem.ctx[i].closePath();
  }
}
Square.prototype.run = function(){
  this.repelFlocks();
  this.checkedges();
  this.update();
  this.draw();
}

Square.prototype.repelFlocks = function(){
  let isRepelling = false;
  for(let i=0;i<ecosystem.creatures.creatures[0].length;i++){
    let targetFlock = ecosystem.creatures.creatures[0][i];
    if(JSVector.subGetNew(this.position, targetFlock.averagePos).getMagnitude()<300){
      this.acceleration = JSVector.subGetNew(this.position, targetFlock.averagePos).setMagnitude(0.1);
      isRepelling = true;
    }
  }
  if(!isRepelling){
    this.acceleration = new JSVector(0, 0);
  }
}
