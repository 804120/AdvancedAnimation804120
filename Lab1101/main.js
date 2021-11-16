window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
document.addEventListener('keydown', event => { //listens for the keydown event
  if (event.code === 'ArrowUp') up = true; //sets the up condition to "true", which will change the animate function
  else if (event.code === 'ArrowDown') down = true;//sets the down condition to "true", which will change the animate function
  else if (event.code === 'ArrowRight') right = true;//sets the right condition to "true", which will change the animate function
  else if (event.code === 'ArrowLeft') left = true;//sets the left condition to "true", which will change the animate function
})
document.addEventListener('keyup', event => { // when arrow keys are released, the screen will stop moving
  if (event.code === 'ArrowUp') up = false;
  if (event.code === 'ArrowDown') down = false;
  if (event.code === 'ArrowRight') right = false;
  if (event.code === 'ArrowLeft') left = false;
})


var canvas, context, world, pos, buffer, right, left, down, up, rect;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    canvas2 = document.getElementById("cnv2"); //second canvas
    context = canvas.getContext("2d"); // first context
    ctx2 = canvas2.getContext("2d"); // second context
    context.fillStyle = "black";
    ctx2.fillStyle = "black";
    rect = canvas2.getBoundingClientRect();
    buffer = 75;
    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    canvas2.addEventListener("click", move);
    world = new World(new JSVector(2400, 1800), context, canvas); // this is another another another another comment
    ctx2.scale(canvas2.width/(world.width*2), canvas2.height/(world.height*2));
    animate();      // kick off the animation
}
function animate() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = "black";
    ctx2.fillRect(0, 0, 2*world.width, 2*world.height);
    world.run();
    renderSmallCanvas();
    requestAnimationFrame(animate); // next cycle
}

function renderSmallCanvas(){
  ctx2.lineWidth = 5;
  ctx2.beginPath();
  ctx2.moveTo(world.width, 0);
  ctx2.lineTo(world.width, 2*world.height);
  ctx2.strokeStyle = "red";
  ctx2.stroke();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.moveTo(0, world.height);
  ctx2.lineTo(2*world.width, world.height);
  ctx2.stroke();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.strokeStyle = "white";
  ctx2.strokeRect(world.width+world.position.x-canvas.width/2, world.height+world.position.y-canvas.height/2, canvas.width, canvas.height);
  ctx2.stroke();
  ctx2.closePath();
}

function move(){
  let x = event.offsetX;
  let y = event.offsetY;
  x*= world.width*2/canvas2.width;
  y*=world.height*2/canvas2.height;
  x-= world.width;
  y-= world.height;
  let newpos = new JSVector(x, y);
  world.destination = newpos;
}

function value_limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}
