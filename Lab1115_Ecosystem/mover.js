function Mover(){
  this.velocity = new JSVector(5, 0).setDirection(Math.random()*2*Math.PI);
  this.radius = 16;
  let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "brown", "gray", "black", "tan", "hotPink", "aqua", "darkGreen", "cyan", "chartreuse", "lime", "gold"];
  this.color=colors[Math.floor(Math.random()*colors.length)];
  this.position = new JSVector(Math.random()*2*canvas1.width-canvas1.width, Math.random()*canvas1.height-canvas1.height);
  this.orbiters = [];
  this.time = 0;
  let num = Math.floor(Math.random()*7)+2;
  for(let i=0;i<num;i++){
    this.orbiters.push(new Orbiter(this, 50, 2*i*Math.PI/num, 8, this.color));
  }
}
Mover.prototype.checkedges = function(){
  if(this.position.x<-1*this.radius-ecosystem.width){
    this.position.x+=2*(ecosystem.width+this.radius);
  }
  else if(this.position.x>ecosystem.width+this.radius){
    this.position.x-=2*(ecosystem.width+this.radius);
  }
  if(this.position.y<-1*(this.radius+ecosystem.height)){
    this.position.y+=2*(ecosystem.height+this.radius);
  }
  else if(this.position.y>ecosystem.height+this.radius){
    this.position.y-=2*(ecosystem.height+this.radius);
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
    ecosystem.ctx[i].rotate(this.time*Math.PI/120);
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

}
Mover.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
