window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, spaceship, vel, planet, pos;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    vel = new JSVector(1, 1);
    let acc = new JSVector(0, 0);
    vel.setMagnitude(Math.random()*2+2);
    vel.setDirection(Math.random()*2*Math.PI);
    pos = new JSVector(Math.floor(Math.random()*(canvas.width-2*50)+50), Math.floor(Math.random()*(canvas.height-2*50)+50));
    spaceship = new Spaceship(pos, vel, acc, 30, "black", context);
    planet = new Ball(30, "green", context);
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    attraction();
    spaceship.run();
    planet.run();
    context.beginPath();
    requestAnimationFrame(animate); // next cycle
}

function attraction(){
  if(JSVector.subGetNew(spaceship.position, planet.position).getMagnitude()<250){
    planet.velocity = JSVector.subGetNew(planet.position, spaceship.position).setMagnitude(2);
    if(JSVector.subGetNew(spaceship.position, planet.position).getMagnitude()<1.3*(spaceship.radius+planet.radius)){
      planet.position.x = Math.floor(Math.random()*(canvas.width-2*planet.radius))+planet.radius;
      planet.position.y = Math.floor(Math.random()*(canvas.height-2*planet.radius))+planet.radius;
      planet.velocity = new JSVector (0, 0);
    }
  }
  else planet.velocity = new JSVector(0, 0);
  spaceship.acceleration = JSVector.subGetNew(planet.position, spaceship.position).setMagnitude(0.3);
//  spaceship.acceleration = JSVector.subGetNew(planet.positon, spaceship.position).setMagnitude(0.5);
}
