window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var canvas, context, b1, mousex, mousey, time, randomx, randomy, health, time2, bonustime;// global variables
class Ball{
  constructor(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color=color;
  }
  checkedges(){
    if(this.x<this.radius||this.x>canvas.width-this.radius){
      this.dx*=-1;
    }
    if(this.y<this.radius||this.y>canvas.height-this.radius){
      this.dy*=-1;
    }
  }
  update(){
    this.x+=this.dx;
    this.y+=this.dy;
  }
  draw(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = this.color;
    context.fill();
  }
  run(){
    this.checkedges();
    this.update();
    this.draw();
  }
}
function init(){// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv"); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    document.addEventListener('mousemove', (event) => {
	console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
  mousex = event.clientX;
  mousey = event.clientY;
});
    b1 = [];
    for(let i = 0; i<5;i++){
      newpos();
      b1.push(new Ball(randomx, randomy, Math.floor(10*(Math.random()-0.5)), Math.floor(10*(Math.random()-0.5)), 20, "blue"));
      if(b1[i].dx==0&&b1[i].dy==0){
        b1[i].dx=1;
        b1[i].dy=1;
      }
    }
    b2 = new Ball(650, 300, 0, 0, 50, "blue");
    time = 0;
    health = 101;
    time2 = 0;
    bonustime=0;
    animate();      // kick off the animation
}

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);// erase the HTMLCanvasElement
    collision = false;
    b2.run();
    disp();
    time++;
    if(time==90) {
      b2.color = "red";
    }
    for(let i = 0; i<b1.length;i++){
      b1[i].run();
      if(time>90&&Math.floor(Math.sqrt(Math.pow((b1[i].x-b2.x), 2)+Math.pow((b1[i].y-b2.y), 2)))<70){
        health--;
        time2 = 0;
        b1[i].color = "black";
        if(health<=0){
          b2.color = "black";
          b2.draw();
          for(let j = i;j<b1.length;j++){
            b1[j].draw();
          }
          alert("You Lost!");
          return;
        }
      }
      else b1[i].color = "blue";
    }
    time2++;
    if(time%300==0){
      newpos();
      b2.color = "white";
      b1.push(new Ball(randomx, randomy, Math.floor(10*(Math.random()-0.5)), Math.floor(10*(Math.random()-0.5)), 20, "blue"));
    }
    else if (time%300 == 5 && time>300) b2.color = "red";
    if (time2 > 2500/(Math.floor(time/300)+1) &&health<92){
      health+=10;
      time2 = 0;
      bonustime = 0;
    }
    if(bonustime<30&&time>200){
      context.fillText("Gain Health!", 10, 60);
    }
    bonustime++;
    followcursor();
    requestAnimationFrame(animate); // next cycle
}
function followcursor(){
  if(mousex>1250){
    b2.x = 1250;
  }
  else if (mousex<50) {
    b2.x = 50;
  }
  else b2.x = mousex;

  if(mousey>550){
    b2.y=550;
  }
  else if(mousey<50){
    b2.y=50;
  }
  else b2.y = mousey;
}

function newpos(){
  randomx = Math.floor(Math.random()*(canvas.width-40)+20);
  randomy = Math.floor(Math.random()*(canvas.height-40)+20);
  if(Math.abs(randomx-mousex)<75&&Math.abs(randomy-mousey)<75){
    newpos();
  }
}
function disp(){
  context.font = "20px Times New Roman";
  if(health>66) context.fillStyle = "green";
  else if (health>33) context.fillStyle = "yellow";
  else context.fillStyle = "red";
  context.fillRect(80, 4, (health-1)*12, 16);
  context.fillStyle = "black";
  context.textAlign = "left";
  context.fillText("Health: ", 10, 20);
  if(time<90) context.fillText("Get Ready...", 10, 40);
  else if (time<120) context.fillText("Dodge!", 10, 40);
  else context.fillText("Level "+ (Math.floor(time/300)+1), 10, 40);

}
