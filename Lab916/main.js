window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, shape, vel, b1, b2;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    vel = new JSVector(1, 1);
    let acc = new JSVector(0, 0);
    shape = [];
    for(let i=0;i<30;i++){
      vel.setMagnitude(Math.random()*4+4);
      vel.setDirection(Math.random()*2*Math.PI);
      let pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*20)+20), Math.floor(Math.random()*(canvas.height-2*20)+20));
      shape.push(new Shape(pos, vel, acc, 10, "darkgreen", context));
    }
    animate();      // kick off the animation
}
function animate() {
    //context.clearRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0;i<shape.length;i++){
      shape[i].run();
    }
    context.beginPath();
    requestAnimationFrame(animate); // next cycle
}
