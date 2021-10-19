window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, pSystem;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    pSystem = new ParticleSystem(new JSVector(500, 100), "red", context);
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pSystem.run();
    requestAnimationFrame(animate); // next cycle
}
