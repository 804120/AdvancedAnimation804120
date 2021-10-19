window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
document.addEventListener("click", generateParticleSystem);
document.addEventListener('keyup', event => {
  restore();
})
document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    spacedown();
  }
  else if (event.code === 'ArrowUp') {
    up();
  }
  else if (event.code === 'ArrowDown'){
    deleteParticleSystem();
  }
  else if (event.code === 'ArrowRight'){
    right();
  }
  else if (event.code === 'ArrowLeft'){
    left();
  }
})
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
    context.fillStyle = "rgb("+0+","+0+","+0+","+0.25+")";
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
function restore(event){
  for(let i=0;i<pSystem.length;i++){
    pSystem[i].restoregravity();
  }
}
function up(event){
  for(let i=0;i<pSystem.length;i++){
    pSystem[i].antigravity();
  }
}
function spacedown(event){
  for(let i=0;i<pSystem.length;i++){
    pSystem[i].nogravity();
  }
}
function deleteParticleSystem(event){
  pSystem.shift();
}
function right(event){
  for(let i=0;i<pSystem.length;i++){
    pSystem[i].rightgravity();
  }
}
function left(event){
  for(let i=0;i<pSystem.length;i++){
    pSystem[i].leftgravity();
  }
}
