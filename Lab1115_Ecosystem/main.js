window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas1, canvas2, ctx, ecosystem;// global variables

function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    ecosystem = new World(new JSVector(2000, 1500), 75); // creating the world larger than the canvas
    animate();      // kick off the animation
}


function animate() {
    ecosystem.run();
    requestAnimationFrame(animate); // next cycle
}
