window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, b1, colors;// global variables
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
    colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "brown", "gray", "black"];
    b1 = [];
    for(let i = 0; i<Math.floor(Math.random()*100);i++){
      let radius = Math.floor(Math.random()*40+14);
      b1.push(new Ball(Math.floor(Math.random()*(canvas.width-2*radius)+radius), Math.floor(Math.random()*(canvas.height-2*radius)+radius), Math.floor((Math.random()-0.5)*40), Math.floor((Math.random()-0.5)*40), radius, colors[Math.floor(Math.random()*colors.length)]));
      if(b1[i].dx==0&&b1.dy==0){
        b1[i].dx=1;
        b1[i].dy=1;
      }
    }
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    for(let i = 0; i<b1.length;i++){ b1[i].run();}
    requestAnimationFrame(animate); // next cycle
}
