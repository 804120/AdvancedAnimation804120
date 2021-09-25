function Mover(ctx){
  this.velocity = new JSVector(Math.random()*4-2, Math.random()*4-2);
  this.radius = 16;
  let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "brown", "gray", "black", "tan", "hotPink", "aqua", "darkGreen", "cyan", "chartreuse", "lime", "gold"];
  this.color=colors[Math.floor(Math.random()*colors.length)];
  this.context = ctx;
  this.position = new JSVector(Math.random()*(canvas.width-6*this.radius)+3*this.radius, Math.random()*(canvas.height-6*this.radius)+3*this.radius);
  this.orbiters = [];
  this.time = 0;
  let num =Math.floor(Math.random()*7)+2;
  for(let i=0;i<num;i++){
    this.orbiters.push(new Orbiter(this, 50, 2*i*Math.PI/num, 8, this.color, this.context));
  }
}
Mover.prototype.checkedges = function(){
  if(this.position.x<this.radius||this.position.x>canvas.width-this.radius){
    this.velocity.x *=-1;
  }
  if(this.position.y<this.radius||this.position.y>canvas.height-this.radius){
    this.velocity.y *=-1;
  }
}
Mover.prototype.update = function(){
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
}
Mover.prototype.draw = function(){
  this.time++;
  this.context.save();
  this.context.translate(this.position.x, this.position.y);
  this.context.rotate(this.time*Math.PI/120);
  this.context.beginPath();
  this.context.arc(0, 0, this.radius, 0, 2*Math.PI);
  this.context.fillStyle = this.color;
  this.context.fill();
  for(let i=0;i<this.orbiters.length;i++){
    this.orbiters[i].draw();
  }
  this.context.restore();
}
Mover.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
