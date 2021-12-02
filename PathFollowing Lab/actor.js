// Actor class.  Each actor starts life at the beginning of a path
// and follows that path to the end where it dies.

class Actor {
    constructor(game){
        // start off the actor in the first cell of the path
        this.pathIndex = 0;
        this.currentCell = game.path[this.pathIndex];
        this.nextCell = game.path[this.pathIndex+1];   // next in the path of cells
        // where this actor should aim -- the center of the next cell in the path
        this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width/2, this.nextCell.loc.y + this.nextCell.height/2);
        this.lastCell = game.path[game.path.length-1];  // end of the path
        // position the actor initially in the center of the first cell
        this.loc = new JSVector(this.currentCell.loc.x + this.currentCell.width/2, this.currentCell.loc.y + this.currentCell.height/2);
        this.nextCellIndex = 1;
        this.vel = new JSVector(0,0);   // velocity
        this.alive = true;
        this.schpeed = Math.random()*3+3;
    }

    run() {
      if(this.alive){
        this.update();
        this.render();
      }
    }

    update(){
        // move this actor along the path until it reaches the end of
        // the path and dies
        // move this actor along the path until it reaches the end of
   // the path and dies
   this.nextCell = game.path[this.pathIndex+this.nextCellIndex];
   this.vel = JSVector.subGetNew(this.target,this.loc);
   if(this.pathIndex+this.nextCellIndex<game.path.length){
     if(this.vel.getMagnitude()<this.schpeed){
       if(this.pathIndex+this.nextCellIndex<game.path.length-1){
         this.nextCellIndex++;
         this.currentCell = this.nextCell;
         this.nextCell = game.path[this.pathIndex+this.nextCellIndex];
         this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width/2,this.nextCell.loc.y + this.nextCell.height/2);
         this.vel = JSVector.subGetNew(this.target,this.loc);
       }
       else{
         this.alive = false;
       }
     }
   }

   if(this.vel.getMagnitude()>0) this.vel.setMagnitude(this.schpeed);
   this.loc.add(this.vel);
 }


    render(){
        let ctx = game.ctx;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 6, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }
}
