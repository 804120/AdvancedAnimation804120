window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, count, inCircle, frequency;// global variables

function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    cnv2 = document.getElementById("cnv2");
    ctx2 = cnv2.getContext("2d");
    count = 0;
    inCircle = 0;
    frequency = 50;
    animate();      // kick off the animation
}


function animate() {
    renderCircle();
    requestAnimationFrame(animate); // next cycle
}


function renderCircle(){
  context.beginPath();
  context.strokeStyle = "red";
  context.lineWidth = 3;
  context.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, 2*Math.PI);
  context.stroke();
  context.closePath();
  context.beginPath();
  context.strokeRect(0, 0, canvas.width, canvas.height);
  context.closePath();
  for(let i=0; i<frequency; i++){
    count++;
    context.beginPath();
    context.fillStyle = "black";
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    context.arc(x, y, 3, 0, 2*Math.PI);
    context.fill();
    context.closePath();
    let dx = x-canvas.width/2;
    let dy = y-canvas.height/2;
    if(Math.sqrt(dx*dx+dy*dy)<canvas.width/2){
      inCircle++;
    }
    if(count%100==0){
      dispText();
    }
  }
}

function dispText(){
  ctx2.clearRect(0, 0, cnv2.width, cnv2.height);
  ctx2.font = "20px Times New Roman";
  ctx2.fillStyle = "black";
  ctx2.fillText("Total Dots: "+count, 5, 15);
  ctx2.fillText("# in circle: "+inCircle, 5, 35);
  let pi = 4*inCircle/count;
  ctx2.fillText("Pi approximation: "+pi, 5, 55)
}
