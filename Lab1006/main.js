window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, snake, colors;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    snake = new Snake(context);
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.run();
    requestAnimationFrame(animate); // next cycle
}
