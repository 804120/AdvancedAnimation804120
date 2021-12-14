function Mover(){
  this.velocity = new JSVector(5, 0).setDirection(Math.random()*2*Math.PI);
  this.radius = 16;
  this.position = new JSVector(Math.random()*2*canvas1.width-canvas1.width, Math.random()*canvas1.height-canvas1.height);
  this.orbiters = [];
  this.time = 0;
  this.rate = 90;
  let num = Math.floor(Math.random()*7)+2;
  for(let i=0;i<num;i++){
    this.orbiters.push(new Orbiter(this, 50, 2*i*Math.PI/num, 8, this.color));
  }
  this.changeColors();
}
Mover.prototype.changeColors = function(){
  let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "brown", "gray", "tan", "hotPink", "aqua", "darkGreen", "cyan", "chartreuse", "lime", "gold"];
  this.color=colors[Math.floor(Math.random()*colors.length)];
  for(let i=0;i<this.orbiters.length;i++){
    this.orbiters[i].color = this.color;
  }
}
Mover.prototype.checkedges = function(){
  if(this.position.x<-6*this.radius-ecosystem.width){
    this.position.x+=2*(ecosystem.width+3*this.radius);
    this.changeColors();
  }
  else if(this.position.x>ecosystem.width+6*this.radius){
    this.position.x-=2*(ecosystem.width+3*this.radius);
    this.changeColors();
  }
  if(this.position.y<-1*(6*this.radius+ecosystem.height)){
    this.position.y+=2*(ecosystem.height+3*this.radius);
    this.changeColors();
  }
  else if(this.position.y>ecosystem.height+6*this.radius){
    this.position.y-=2*(ecosystem.height+3*this.radius);
    this.changeColors();
  }
}
Mover.prototype.update = function(){
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
}
Mover.prototype.draw = function(){
  this.time++;
  for(let i=0;i<2;i++){
    ecosystem.ctx[i].save();
    ecosystem.ctx[i].translate(this.position.x, this.position.y);
    ecosystem.ctx[i].rotate(this.time*Math.PI/this.rate);
    ecosystem.ctx[i].beginPath();
    ecosystem.ctx[i].arc(0, 0, this.radius, 0, 2*Math.PI);
    ecosystem.ctx[i].fillStyle = this.color;
    ecosystem.ctx[i].fill();
    if(i==0){
      for(let j=0;j<this.orbiters.length;j++){
        this.orbiters[j].draw();
      }
    }
    ecosystem.ctx[i].restore();
  }
  if(this.time==this.rate*2) this.time = 0;
}
Mover.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
