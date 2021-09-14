window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, balls, colors, vel, b1;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    balls = [];
    vel = new JSVector(1, 1);
    vel.setMagnitude(8);
    let acc = new JSVector(0, 0);
    for(let i = 0; i<5;i++){
      vel.setDirection(Math.random()*2*Math.PI);
      let pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*15)+15), Math.floor(Math.random()*(canvas.height-2*15)+15));
      balls.push(new Ball(pos, vel, acc, 15, "blue", context));
    }
    vel.setMagnitude(12);
    vel.setDirection(Math.random()*2*Math.PI);
    let pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*15)+15), Math.floor(Math.random()*(canvas.height-2*15)+15));
    b1 = new Ball(pos, vel, acc, 15, "green", context);
    animate();      // kick off the animation
}
function animate() {
    context.fillStyle = "rgb("+255+","+255+","+255+", "+ 0.1+")";
    context.fillRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    attract();
    for(let i = 0; i<balls.length;i++){
      balls[i].run();
    }
    b1.run();
    requestAnimationFrame(animate); // next cycle
}
function attract(){
    for(let i=0;i<balls.length;i++){
      if(JSVector.subGetNew(balls[i].position, b1.position).getMagnitude()<300){
        balls[i].acceleration = JSVector.subGetNew(b1.position, balls[i].position).normalize();
      }
    }
}
