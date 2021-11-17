function Orbiter(mover, length, angle, radius, color){
  this.radius = radius;
  this.color=color;
  this.position = new JSVector(length*Math.cos(angle), length*Math.sin(angle));
  ctx[0] = ctx;
}
Orbiter.prototype.draw = function(){
  ctx[0].beginPath();
  ctx[0].arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  ctx[0].fillStyle = this.color;
  ctx[0].fill();
  ctx[0].beginPath();
  ctx[0].moveTo(this.position.x, this.position.y);
  ctx[0].lineTo(0, 0);
  ctx[0].closePath();
  ctx[0].strokeStyle = this.color;
  ctx[0].lineWidth = 3;
  ctx[0].stroke();
}
