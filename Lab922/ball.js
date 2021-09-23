function Ball(radius, color, ctx){
  this.velocity = new JSVector();
  this.radius = radius;
  this.color=color;
  this.position = new JSVector(Math.random()*(canvas.width-2*this.radius)+this.radius, Math.random()*(canvas.height-2*this.radius)+this.radius);
  this.context = ctx;
}
Ball.prototype.checkedges = function(){
  if(this.position.x<this.radius||this.position.x>canvas.width-this.radius){
    this.velocity.x = 0;
  }
  if(this.position.y<this.radius||this.position.y>canvas.height-this.radius){
    this.velocity.y = 0;
  }
}
Ball.prototype.update = function(){
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
}
Ball.prototype.draw = function(){
  this.context.beginPath();
  this.context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  this.context.fillStyle = this.color;
  this.context.fill();
}
Ball.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
