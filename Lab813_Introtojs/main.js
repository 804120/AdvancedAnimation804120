
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
var canvas, context, pos, change, radii, colors;

function init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv");
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");

    pos = [[46, 46], [250, 300], [400, 30], [1200, 200], [700, 500], [800, 550]];
    change = [[12, 12], [-3, 5], [-30, 16], [-15, 20], [8, 2], [20, -15]];
    radii = [45, 80, 15, 30, 70, 25];
    colors = ["red", "orange", "blue", "purple", "green", "yellow"];
    animate();      // kick off the animation

}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    update();   // update location
    for(var i=0;i<pos.length;i++){
      circle(radii[i], pos[i][0], pos[i][1], "black", colors[i]);
    }
    requestAnimationFrame(animate); // next cycle
    checkedges();
}
function checkedges(){
    for(var i=0;i<pos.length;i++){
      if(pos[i][0]<radii[i]||pos[i][0]>1300-radii[i]){
        change[i][0]*=-1;
      }
      if(pos[i][1]<radii[i]||pos[i][1]>600-radii[i]){
        change[i][1]*=-1;
      }
    }
}

// move the circle to a new location
function update() {
  for(var i=0;i<pos.length;i++){
    pos[i][0]+=change[i][0];
    pos[i][1]+=change[i][1];
  }
}

// render a circle
function circle(r, a, b, stroke, fill) {
    context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.arc(a, b, r, 0, 2 * Math.PI);
    context.strokeStyle = stroke;  // color to fill
    context.fillStyle = fill;     // color to stroke
    context.fill();     // render the fill
    context.stroke();   // render the stroke
}
