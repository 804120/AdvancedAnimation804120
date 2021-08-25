window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, b1, colors, isColliding;// global variables
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
    b1 = [];
    for(let i = 0; i<15;i++){
      b1.push(new Ball(Math.floor(Math.random()*(canvas.width-40)+20), Math.floor(Math.random()*(canvas.height-40)+20), Math.floor(10*(Math.random()-0.5)), Math.floor(10*(Math.random()-0.5)), 20, "blue"));
      if(b1[i].dx==0&&b1.dy==0){
        b1[i].dx=1;
        b1[i].dy=1;
      }
    }
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    for(let i = 0; i<b1.length;i++){
      b1[i].run();
      isColliding = false;
      for(var j=i+1;j<b1.length;j++){
        if(Math.sqrt(Math.pow((b1[i].x-b1[j].x), 2)+Math.pow((b1[i].y-b1[j].y), 2))<40){
          b1[i].color = "orange";
          b1[j].color = "orange";
          isColliding = true;
        }

      }
      if(!isColliding){
        b1[i].color = "blue";
      }
    }
    requestAnimationFrame(animate); // next cycle
}
