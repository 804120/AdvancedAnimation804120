function Orbiter(mover, length, angle, radius, color){
  this.radius = radius;
  this.color=color;
  this.position = new JSVector(length*Math.cos(angle), length*Math.sin(angle));
}
Orbiter.prototype.draw = function(){
  ecosystem.ctx[0].beginPath();
  ecosystem.ctx[0].arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
  ecosystem.ctx[0].fillStyle = this.color;
  ecosystem.ctx[0].fill();
  ecosystem.ctx[0].beginPath();
  ecosystem.ctx[0].moveTo(this.position.x, this.position.y);
  ecosystem.ctx[0].lineTo(0, 0);
  ecosystem.ctx[0].closePath();
  ecosystem.ctx[0].strokeStyle = this.color;
  ecosystem.ctx[0].lineWidth = 3;
  ecosystem.ctx[0].stroke();
}
