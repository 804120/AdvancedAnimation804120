# Ecosystem


Orbiters: Each has a random color and velocity, but no acceleration. Each frame, every orbiter grows a slight amount, but every time they touch a boid they shrink. If an orbiter shrinks down to nothing, it "respawns" at a random position with the original radius

Boids: Each boid has a random velocity and no initial acceleration. If a boid is within a certain distance from orbiters, the boid eats at the orbiter and grows. Each frame, though, the boid shrinks a miniscule amount. If a boid shrinks to nothing, it "respawns" with the original radius at a random position.
