window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
document.addEventListener('keydown', event => {
  if (event.code === 'ArrowUp') {
    if(world.position.y>0-buffer){
      world.position.y-=15;
    }
  }
  else if (event.code === 'ArrowDown'){
    if(world.position.y<buffer+world.height-canvas.height){
      world.position.y+=15;
    }
  }
  else if (event.code === 'ArrowRight'){
    if(world.position.x<buffer+world.width-canvas.width){
      world.position.x+=15;
    }
  }
  else if (event.code === 'ArrowLeft'){
    if(world.position.x>0-buffer){
      world.position.x-=15;
    }
  }
})
var canvas, context, world, pos, buffer;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    context.fillStyle = "black";
    buffer = 100;
    context.fillRect(0, 0, canvas.width, canvas.height);
    world = new World(new JSVector(4000, 3000), context);
    animate();      // kick off the animation
}
function animate() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    world.run();
    requestAnimationFrame(animate); // next cycle
}
