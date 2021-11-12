window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
document.addEventListener('keydown', event => {
  if (event.code === 'ArrowUp') up = true;
  else if (event.code === 'ArrowDown') down = true;
  else if (event.code === 'ArrowRight') right = true;
  else if (event.code === 'ArrowLeft') left = true;
  if(world.position.y<0-buffer) up = false;
  if(world.position.y>buffer+world.height-canvas.height) down = false;
  if(world.position.x>buffer+world.width-canvas.width) right = false;
  if(world.position.x<0-buffer) left = false;
})
document.addEventListener('keyup', event => {
  if (event.code === 'ArrowUp') up = false;
  if (event.code === 'ArrowDown') down = false;
  if (event.code === 'ArrowRight') right = false;
  if (event.code === 'ArrowLeft') left = false;
})
document.addEventListener("click", move);
var canvas, context, world, pos, buffer, right, left, down, up, rect;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    canvas2 = document.getElementById("cnv2");
    context = canvas.getContext("2d");
    ctx2 = canvas2.getContext("2d");
    context.fillStyle = "black";
    ctx2.fillStyle = "black";
    rect = canvas2.getBoundingClientRect();
    buffer = 75;
    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    world = new World(new JSVector(3000, 2250), context);
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
  ctx2.strokeStyle = "white";
  ctx2.strokeRect(canvas2.width*world.position.x/world.width, canvas2.height*world.position.y/world.height, canvas2.width*canvas.width/world.width, canvas2.height*canvas.height/world.height);
  ctx2.stroke();
  ctx2.closePath();
}

function move(){
  let x = event.clientX-rect.x;
  let y = event.clientY-rect.top;
  x-= canvas2.width*canvas.width/world.width/2;
  y-= canvas2.height*canvas.height/world.height/2;
  let newpos = new JSVector(x*world.width/canvas2.width, y*world.height/canvas2.height);
  newpos.x = value_limit(newpos.x, -1*buffer, world.width+buffer-canvas.width);
  newpos.y = value_limit(newpos.y, -1*buffer, world.height+buffer-canvas.height);
  world.destination = newpos;
}

function value_limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}
