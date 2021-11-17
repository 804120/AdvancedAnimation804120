function Creature(){
    this.colors = ["green", "blue", "yellow", "orange", "red", "purple", "white", "pink"];
    this.flocksystems = [];
    this.orbiters = [];
    for(let i=0;i<3;i++){
      this.flocksystems.push(new FlockSystem(this.colors[Math.floor(Math.random()*this.colors.length)], 45));
    }
    for(let i=0;i<10;i++){
      this.orbiters.push(new Mover());
    }
}
Creature.prototype.run = function(){
  for(let i=0;i<this.flocksystems.length;i++){
    this.flocksystems[i].run();
  }
  for(let i=0;i<this.orbiters.length;i++){
    this.orbiters[i].run();
  }
}
