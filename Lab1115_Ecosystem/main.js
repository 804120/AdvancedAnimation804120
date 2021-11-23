window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas1, canvas2, ecosystem;// global variables

function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
  canvas1 = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  canvas2 = document.getElementById("cnv2"); //second canvas
  ecosystem = new World(new JSVector(2000, 1500), 75); // creating the world larger than the canvas
  animate();      // kick off the animation
}


function animate() {
    ecosystem.run();
    requestAnimationFrame(animate); // next cycle
}
