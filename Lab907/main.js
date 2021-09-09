window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, b1, colors;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "brown", "gray", "black", "tan", "beige", "hotPink", "aqua", "darkGreen", "cyan", "chartreuse", "lime", "gold"];
    balls = [];
    for(let i = 0; i<Math.floor(Math.random()*300);i++){
      let radius = Math.floor(Math.random()*45+14);
      let vel = new JSVector(1, 1);
      vel.setMagnitude(10000/(Math.pow(radius, 2)));
      vel.setDirection(Math.random()*2*Math.PI);
      let pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*radius)+radius), Math.floor(Math.random()*(canvas.height-2*radius)+radius));
      balls.push(new Ball(pos, vel, radius, colors[Math.floor(Math.random()*colors.length)], context));
    }
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    for(let i = 0; i<balls.length;i++){
      balls[i].run();
    }
    requestAnimationFrame(animate); // next cycle
}
