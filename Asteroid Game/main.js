window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, b1, mousex, mousey, time;// global variables
class Ball{
  constructor(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color=color;
  }
  checkedges(){
    if(this.x<this.radius||this.x>canvas.width-this.radius){
      this.dx*=-1;
    }
    if(this.y<this.radius||this.y>canvas.height-this.radius){
      this.dy*=-1;
    }
  }
  update(){
    this.x+=this.dx;
    this.y+=this.dy;
  }
  draw(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = this.color;
    context.fill();
  }
  run(){
    this.checkedges();
    this.update();
    this.draw();
  }
}
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    document.addEventListener('mousemove', (event) => {
	console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
  mousex = event.clientX;
  mousey = event.clientY;
});
    b1 = [];
    for(let i = 0; i<15;i++){
      b1.push(new Ball(Math.floor(Math.random()*(canvas.width-40)+20), Math.floor(Math.random()*(canvas.height-40)+20), Math.floor(10*(Math.random()-0.5)), Math.floor(10*(Math.random()-0.5)), 20, "blue"));
      if(b1[i].dx==0&&b1[i].dy==0){
        b1[i].dx=1;
        b1[i].dy=1;
      }
    }
    b2 = new Ball(650, 300, 0, 0, 50, "red");
    animate();      // kick off the animation
    time = 0;
}

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    b2.run();
    time++;
    for(let i = 0; i<b1.length;i++){
      b1[i].run();
      if(time>60&&Math.floor(Math.sqrt(Math.pow((b1[i].x-b2.x), 2)+Math.pow((b1[i].y-b2.y), 2)))<70){
        b2.color = "black";
        b1[i].color = "hotpink";
        b2.run();
        b1[i].run();
        return;
      }

    }
    followcursor();
    requestAnimationFrame(animate); // next cycle
}
function followcursor(){
  if(mousex>1250){
    b2.x = 1250;
  }
  else if (mousex<50) {
    b2.x = 50;
  }
  else b2.x = mousex;

  if(mousey>550){
    b2.y=550;
  }
  else if(mousey<50){
    b2.y=50;
  }
  else b2.y = mousey;
}