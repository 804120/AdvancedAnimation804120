
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
var canvas, context;
var ball = {};
var ball2 = {};

function init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv");
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    ball.x = 450;
    ball.y = 150;
    ball.dx = ball.dy = 10;
    ball.radius = 35;
    ball.color = "blue";
    ball.checkedges = function(){
      if(this.x<this.radius||this.x>canvas.width-this.radius){
        this.dx*=-1;
      }
      if(this.y<this.radius||this.y>canvas.height-this.radius){
        this.dy*=-1;
      }
    }
    ball.update = function(){
      this.x+=this.dx;
      this.y+=this.dy;
    }
    ball.draw = function(){
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
      context.strokeStyle = "black";
      context.stroke();
      context.fillStyle = this.color;
      context.fill();
    }
    ball.run = function(){
      this.checkedges();
      this.update();
      this.draw();
    }
    ball2.x = 1000;
    ball2.y = 300;
    ball2.dx = ball2.dy = -8;
    ball2.radius = 50;
    ball2.color = "red";
    ball2.checkedges = function(){
      if(this.x<this.radius||this.x>canvas.width-this.radius){
        this.dx*=-1;
      }
      if(this.y<this.radius||this.y>canvas.height-this.radius){
        this.dy*=-1;
      }
    }
    ball2.update = function(){
      this.x+=this.dx;
      this.y+=this.dy;
    }
    ball2.draw = function(){
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
      context.strokeStyle = "black";
      context.stroke();
      context.fillStyle = this.color;
      context.fill();
    }
    ball2.run = function(){
      this.checkedges();
      this.update();
      this.draw();
    }
    animate();      // kick off the animation

}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    ball.run();
    ball2.run();
    requestAnimationFrame(animate); // next cycle
}
