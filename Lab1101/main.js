window.addEventListener("load", init);// wait for the page to finish loading with init as the callback

var canvas, context, world;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    canvas2 = document.getElementById("cnv2"); //second canvas
    context = canvas.getContext("2d"); // first context
    ctx2 = canvas2.getContext("2d"); // second context
    context.fillStyle = "black";
    ctx2.fillStyle = "black";
    world = new World(new JSVector(2400, 1800), 75); // creating the world larger than the canvas
    ctx2.scale(canvas2.width/(world.width*2), canvas2.height/(world.height*2));
    animate();      // kick off the animation
}


function animate() {
    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.fillRect(0, 0, 2*world.width, 2*world.height);
    world.run();
    requestAnimationFrame(animate); // next cycle
}
