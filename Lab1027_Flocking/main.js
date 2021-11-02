window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, flocksystem, colors;// global variables
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    colors = ["red", "orange", "yellow", "black", "green", "blue", "purple", "pink", "teal", "brown", "gray", "tan", "beige", "hotPink", "aqua", "darkGreen", "cyan", "chartreuse", "lime", "gold"];
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    flocksystem = []
    for(let i=0;i<3;i++){
      let c = Math.floor(Math.random()*colors.length);
      flocksystem.push(new FlockSystem(colors[c], Math.floor(Math.random()*25+10), context));
      colors.splice(c, 1);
    }
    animate();      // kick off the animation
}
function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<flocksystem.length;i++){
      flocksystem[i].run();
    }
    requestAnimationFrame(animate); // next cycle
}
