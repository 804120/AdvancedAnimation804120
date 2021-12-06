window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas1, ctx1, canvas2, ctx2, world;// global variables

function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    world = new World(new JSVector(800, 600), 0, 15, 20); // creating the world larger than the canvas
    animate();      // kick off the animation
}


function animate() {
    world.run();
    requestAnimationFrame(animate); // next cycle
}
