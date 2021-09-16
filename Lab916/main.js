window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, shape, colors, vel, b1, b2;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    balls = [];
    vel = new JSVector(1, 1);
    let acc = new JSVector(0, 0);
    vel.setMagnitude(Math.random()*3+3);
    vel.setDirection(Math.random()*2*Math.PI);
    let pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*20)+20), Math.floor(Math.random()*(canvas.height-2*20)+20));
    shape = new Shape(pos, vel, acc, 15, "blue", context);
    animate();      // kick off the animation
}
function animate() {
    //context.clearRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    shape.run();
    context.beginPath();
    requestAnimationFrame(animate); // next cycle
}
