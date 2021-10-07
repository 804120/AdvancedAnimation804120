function Orbiter(mover, length, angle, radius, color, ctx){
  this.radius = radius;
  this.color=color;
  this.position = new JSVector(length*Math.cos(angle), length*Math.sin(angle));
  this.context = ctx;
}
Orbiter.prototype.draw = function(){
  this.context.beginPath();
  this.context.moveTo(this.position.x, this.position.y);
  this.context.lineTo(0, 0);
  this.context.strokeStyle = this.color;
  this.context.lineWidth = 3;
  this.context.stroke();
  this.context.closePath();
  this.context.beginPath();
  this.context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  this.context.fillStyle = this.color;
  this.context.fill();
  this.context.closePath();
}
