function Mover(){
  this.velocity = new JSVector(Math.random()*4-2, Math.random()*4-2);
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
  if(this.position.x<this.radius||this.position.x>2*ecosystem.width-this.radius){
    this.velocity.x *=-1;
  }
  if(this.position.y<this.radius||this.position.y>2*ecosystem.height-this.radius){
    this.velocity.y *=-1;
  }
}
Mover.prototype.update = function(){
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
}
Mover.prototype.draw = function(){
  this.time++;
  for(let i=0;i<2;i++){
    ctx[i].save();
    ctx[i].translate(this.position.x, this.position.y);
    ctx[i].rotate(this.time*Math.PI/120);
    ctx[i].beginPath();
    ctx[i].arc(0, 0, this.radius, 0, 2*Math.PI);
    ctx[i].fillStyle = this.color;
    ctx[i].fill();
    for(let i=0;i<this.orbiters.length;i++){
      this.orbiters[i].draw();
    }
    this.context.restore();
  }

}
Mover.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
