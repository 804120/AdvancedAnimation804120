window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
document.addEventListener('keydown', event => {
  if (event.code === 'ArrowUp') {
    if(world.position.y>0-buffer){
      up = true;
    }
    else up = false;
  }
  if (event.code === 'ArrowDown'){
    if(world.position.y<buffer+world.height-canvas.height){
      down = true;
    }
    else down = false;
  }
  if (event.code === 'ArrowRight'){
    if(world.position.x<buffer+world.width-canvas.width){
      right = true;
    }
    else right = false;
  }
  if (event.code === 'ArrowLeft'){
    if(world.position.x>0-buffer){
      left = true;
    }
    else left = false;
  }
})
document.addEventListener('keyup', event => {
  if (event.code === 'ArrowUp') up = false;
  if (event.code === 'ArrowDown') down = false;
  if (event.code === 'ArrowRight') right = false;
  if (event.code === 'ArrowLeft') left = false;
})
var canvas, context, world, pos, buffer, right, left, down, up;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    canvas2 = document.getElementById("cnv2");
    context = canvas.getContext("2d");
    ctx2 = canvas2.getContext("2d");
    context.fillStyle = "black";
    ctx2.fillStyle = "black";
    buffer = 75;
    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    world = new World(new JSVector(2000, 1500), context);
    animate();      // kick off the animation
}
function animate() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = "black";
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    world.run();
    renderSmallCanvas();
    requestAnimationFrame(animate); // next cycle
}

function renderSmallCanvas(){
  ctx2.beginPath();
  ctx2.moveTo(canvas2.width/2, 0);
  ctx2.lineTo(canvas2.width/2, canvas2.height);
  ctx2.strokeStyle = "red";
  ctx2.stroke();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.moveTo(0, canvas2.height/2);
  ctx2.lineTo(canvas2.width, canvas2.height/2);
  ctx2.strokeStyle = "red";
  ctx2.stroke();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.moveTo(canvas2.width*world.position.x/world.width, canvas2.height*world.position.y/world.height);
  ctx2.lineTo(canvas2.width*(world.position.x+canvas.width)/world.width, canvas2.height*world.position.y/world.height);
  ctx2.lineTo(canvas2.width*(world.position.x+canvas.width)/world.width, canvas2.height*(world.position.y+canvas.height)/world.height);
  ctx2.lineTo(canvas2.width*world.position.x/world.width, canvas2.height*(world.position.y+canvas.height)/world.height);
  ctx2.lineTo(canvas2.width*world.position.x/world.width, canvas2.height*world.position.y/world.height);
  ctx2.strokeStyle = "white";
  ctx2.stroke();
  ctx2.closePath();
}
