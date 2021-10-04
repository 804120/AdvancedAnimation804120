window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, movers, colors, shape;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    movers = [];
    for(let i=0;i<15;i++){
      movers.push(new Mover(context));
    }
    vel = new JSVector(1, 1);
    let acc = new JSVector(0, 0);
    shape = [];
    for(let i=0;i<30;i++){
      vel.setMagnitude(Math.random()*1+1);
      vel.setDirection(Math.random()*2*Math.PI);
      let pos = new JSVector(Math.floor(Math.random()*3000-1500), Math.floor(Math.random()*2000-1000));
      shape.push(new Shape(pos, vel, acc, 15, "darkgreen", context));
    }
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    interact();
    for(let i=0;i<movers.length;i++){
      movers[i].run();
    }
    for(let i=0;i<shape.length;i++){
      shape[i].run();
    }
    requestAnimationFrame(animate); // next cycle
}
function interact(){
    for(let i=0;i<shape.length;i++){
      for(let j=0;j<movers.length;j++){
        if(JSVector.subGetNew(movers[j].position, shape[i].position).getMagnitude()<200){
          shape[i].acceleration = JSVector.subGetNew(movers[j].position, shape[i].position).setMagnitude(0.5);
          if(JSVector.subGetNew(movers[j].position, shape[i].position).getMagnitude()<shape[i].radius+movers[j].radius){
            shape[i].radius+=0.5;
            movers[j].radius-=0.5;
            if(movers[j].radius<=0){
              movers[j].radius = 16;
              movers[j].position = new JSVector(Math.random()*3000-1500, Math.random()*2000-1000);
            }
          }
        }
      }
    }
}
