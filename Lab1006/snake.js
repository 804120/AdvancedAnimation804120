function Snake(ctx){
  this.velocity = new JSVector(Math.random()*4-2, Math.random()*4-2);
  this.radius = 16;
  this.color="red";
  this.context = ctx;
  this.acceleration = new JSVector(0, 0);
  this.position = new JSVector(Math.random()*(canvas.width-6*this.radius)+3*this.radius, Math.random()*(canvas.height-6*this.radius)+3*this.radius);//assign a random starting position
  this.pos = []; // array of segment positions
  this.oldloc = []; // array storing old locations
  this.time = 0;
  for(let i=0;i<32;i++){ // adding 16 segments, each with a startpoint and endpoint
    this.pos.push(new JSVector());
  }
}
Snake.prototype.checkedges = function(){ // snakes are repelled by the edge of the canvas when they are within a certain distance
  if(this.position.x<3.5*this.radius||this.position.x>canvas.width-3.5*this.radius){
    this.acceleration.x = - .1*Math.sign(this.position.x-canvas.width/2);
  }
  else this.acceleration.x = 0;
  if(this.position.y<3.5*this.radius||this.position.y>canvas.height-3.5*this.radius){
    this.acceleration.y = - .1*Math.sign(this.position.y-canvas.height/2);
  }
  else this.acceleration.y = 0;
}
Snake.prototype.update = function(){ // updates position and velocity
  this.oldloc.push(new JSVector(this.position.x, this.position.y)); // store the current location in the oldloc array
  let oldv = this.velocity.getMagnitude();
  this.velocity.x+=this.acceleration.x;
  this.velocity.y+=this.acceleration.y;
  this.velocity.setMagnitude(oldv);
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
  if(this.time>485){ // once enough time has passed, store the old positions as positions of the segments
    for(let i=0;i<32;i++){
      this.pos[i]=this.oldloc[i*15];
    }
    this.oldloc.shift(); // delete the first item in the array of old locations
  }
  else{ // if enough time hasn't passed, just store the position of the segments as the position of the head
    for(let i=0;i<32;i++){
      this.pos[i] = this.position;
    }
  }
  this.velocity.setMagnitude(oldv);
}
Snake.prototype.draw = function(){ // render the snake
  this.context.beginPath();
  this.context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI); // head
  this.context.fillStyle = this.color;
  this.context.fill();
  this.context.closePath();
  for(let i=0;i<32;i+=2){ // draw each of the 16 segments
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
  this.time++; // ensure that the time increments each time
  this.checkedges();
  this.update();
  this.draw();
}
