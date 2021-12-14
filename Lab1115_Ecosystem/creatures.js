function Creature(){
    this.colors = ["green", "blue", "yellow", "orange", "brown", "red", "purple", "white", "pink"];
    this.flocksystems = [];
    this.orbiters = [];
    for(let i=0;i<3;i++){
      this.flocksystems.push(new FlockSystem(this.colors[Math.floor(Math.random()*this.colors.length)], 45));
    }
    for(let i=0;i<10;i++){
      this.orbiters.push(new Mover());
    }
    this.spitters = [];
    for(let i=0;i<3;i++){
      this.spitters.push(new Spitter(this.colors[Math.floor(Math.random()*this.colors.length)]));
    }
    this.squares = [];
    for(let i=0;i<10;i++){
      this.squares.push(new Square());
    }
    this.creatures = [this.flocksystems, this.orbiters, this.spitters, this.squares];

}
Creature.prototype.run = function(){
  for(let i=0;i<this.creatures.length;i++){
    for(let j=0;j<this.creatures[i].length;j++){
      this.creatures[i][j].run();
    }
  }
}
