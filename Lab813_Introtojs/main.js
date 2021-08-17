
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
var canvas, context, x, y, dx, dy, a, b, da, db, p, q, dp, dq;

function init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv");
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");

    x = 31;
    y = 31;    // initial x,y canvas location
    dx = dy = 8;   // velocity in x and y directions
    a = 250;
    b = 300;
    da = -2;
    db = 2;
    p = 400;
    q = 30;
    dp = -8;
    dq = 15;
    animate();      // kick off the animation

}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    update();   // update location
    circle(30, x, y, "black", "red");     // render
    circle(80, a, b, "black", "orange");
    circle(15, p, q, "black", "blue");
    requestAnimationFrame(animate); // next cycle
    if(x<30||x>770){
      dx*=-1;
    }
    if(y<30||y>570){
      dy*=-1;
    }
    if(a<80||a>720){
      da*=-1;
    }
    if(b<80||b>520){
      db*=-1;
    }
    if(p<15||p>785){
      dp*=-1;
    }
    if(q<15||q>585){
      dq*=-1;
    }
}

// move the circle to a new location
function update() {
    x += dx;    // update x coordinate of location with x velocity
    y += dy;  // update y coordinate of location with y velocity
    a += da;
    b += db;
    p += dp;
    q += dq;
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
