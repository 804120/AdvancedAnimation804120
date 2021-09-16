window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, balls, colors, vel, b1, b2;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    balls = [];
    vel = new JSVector(1, 1);
    let acc = new JSVector(0, 0);
    for(let i = 0; i<100;i++){
      vel.setMagnitude(Math.random()*2+2);
      vel.setDirection(Math.random()*2*Math.PI);
      let pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*8)+8), Math.floor(Math.random()*(canvas.height-2*8)+8));
      balls.push(new Ball(pos, vel, acc, 8, "blue", context));
    }
    vel.setMagnitude(4);
    vel.setDirection(Math.random()*2*Math.PI);
    let pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*8)+8), Math.floor(Math.random()*(canvas.height-2*8)+8));
    b1 = new Ball(pos, vel, acc, 8, "limeGreen", context);
    vel.setDirection(Math.random()*2*Math.PI);
    let pos2 = new JSVector(Math.floor(Math.random()*(canvas.width-2*8)+8), Math.floor(Math.random()*(canvas.height-2*8)+8));
    b2 = new Ball(pos2, vel, acc, 8, "red", context);
    animate();      // kick off the animation
}
function animate() {
    context.fillStyle = "rgb("+255+","+255+","+255+", "+ 0.15+")";
    context.fillRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    interact();
    for(let i = 0; i<balls.length;i++){
      balls[i].run();
    }
    b1.run2();
    b2.run2();
    requestAnimationFrame(animate); // next cycle
}
function interact(){
    for(let i=0;i<balls.length;i++){
      if(JSVector.subGetNew(balls[i].position, b1.position).getMagnitude()<150){
        balls[i].acceleration = JSVector.subGetNew(b1.position, balls[i].position).normalize();
      }
      else balls[i].acceleration.setDirection(balls[i].velocity.getDirection());
      if(JSVector.subGetNew(balls[i].position, b2.position).getMagnitude()<150){
        balls[i].acceleration = JSVector.subGetNew(balls[i].position, b2.position).normalize();
      }
    }
}
