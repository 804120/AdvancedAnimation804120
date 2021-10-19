window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
document.addEventListener("click", generateParticleSystem);
var canvas, context, pSystem, colors;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "teal", "brown", "gray", "black", "tan", "beige", "hotPink", "aqua", "darkGreen", "cyan", "chartreuse", "lime", "gold"];
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    pSystem = [];
    animate();      // kick off the animation
}
function animate() {
    context.fillStyle = "rgb("+0+","+0+","+0+","+0.3+")";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for(let i=0;i<pSystem.length;i++){
      pSystem[i].run();
    }
    requestAnimationFrame(animate); // next cycle
}
function generateParticleSystem(event){
  let x = event.clientX;
  let y = event.clientY;
  pSystem.push(new ParticleSystem(new JSVector(x, y), colors[Math.floor(Math.random()*colors.length)], Math.floor(Math.random()*10+1), context));
}
