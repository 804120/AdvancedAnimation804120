
// JSVector -- a Javascript 2D vector class

// The class constructor
function JSVector(x = 0,y = 0){
    this.x = x;
    this.y = y;
    this.mag = Math.sqrt(this.x*this.x+this.y*this.y);
}


// Set the magnitude of the vector,
// retaining the angle (direction).
JSVector.prototype.setMagnitude = function(mag){
    this.x*=mag/this.mag;
    this.y*= mag/this.mag;
    this.mag = mag;
    return this;
}

// Get the magnitude of the vector using pythagorean theorem
JSVector.prototype.getMagnitude = function(){
    return this.mag;
}

// Set the angle (direction) of the vector,
// retaining the magnitude.
JSVector.prototype.setDirection = function(angle){
    this.x = this.mag * Math.cos(angle);
    this.y = this.mag * Math.sin(angle);
    return this;
}

// Get the direction (angle) of the vector
JSVector.prototype.getDirection = function(){
    return Math.atan2(this.y,this.x);
}

// Add another vector to this vector
JSVector.prototype.add = function(v2){
    this.x+= v2.x;
    this.y += v2.y;
    this.mag = Math.sqrt(this.x*this.x+this.y*this.y);
    return this;
}

// Subtract another vector from this vector
JSVector.prototype.sub = function(v2){
    this.y-=y;
    this.x-=x;
    this.mag = Math.sqrt(this.x*this.x+this.y*this.y);
    return this;
}

// Class method to return a new vector that is the sum of two vectors
JSVector.addGetNew = function(v1,v2){
    return new JSVector(v1.x+v2.x, v1.y+v2.y);
}

// Class method to return a new vector that is the difference of two vectors
JSVector.subGetNew = function(v1,v2){
    return new JSVector(v1.x-v2.x, v1.y-v2.y);
}

// Multiply this vector by a scalar
JSVector.prototype.multiply = function(scalar){
    this.x*=scalar;
    this.y*=scalar;
    this.mag*=scalar;
    return this;
}

// Divide this vector by a scalar
JSVector.prototype.divide = function(scalar){
  this.x/=scalar;
  this.y/=scalar;
  this.mag/=scalar;
  return this;
}

// Normalize this vector so that it has a magnitude of 1
JSVector.prototype.normalize = function(){
  this.x /= this.mag;
  this.y /= this.mag;
  this.mag = 1;
  return this;
}

// Limit the magnitude of this vector
JSVector.prototype.limit = function(lim){
  if(this.mag>lim){
    this.x*=(lim/this.mag);
    this.y*=(lim/this.mag);
    this.mag = lim;
  }
  return this;
}

// Get the distance between this vector and another one
JSVector.prototype.distance = function(v2){
  return Math.sqrt(Math.pow(v2.x-this.x, 2)+Math.pow(v2.y, this.y, 2));
}

// Get square of the distance between this vector and another one
JSVector.prototype.distanceSquared = function(v2){
  return Math.pow(v2.x-this.x, 2)+Math.pow(v2.y, this.y, 2);
}

// Rotate this vector by some number of radians
// using the rotation matrix |  cos   -sin  |
//                           |  sin   +cos  |
JSVector.prototype.rotate = function(angle) {
  this.x = Math.cos(angle)*this.x-Math.sin(angle)*this.y;
  this.y = Math.sin(angle)*this.y+Math.cos(angle)*this.y;
  return this;
}

// Get the angle between this vector and another one
JSVector.prototype.angleBetween = function(v2){
  return Math.abs(this.prototype.getDirection-v2.prototype.getDirection);
}

// Make a copy of this vector
JSVector.prototype.copy = function(){
  return new JSVector(this.x, this.y);
}

// Override inherited toString() to describe this instance
JSVector.prototype.toString = function() {
  return "x value: "+this.x+", y value: "+this.y+", magnitude: "+this.mag+", direction: "+this.getDirection();
}
