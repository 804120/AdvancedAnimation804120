# Ecosystem Creatures:

## Boids
Exhibit 4 behaviors: motion, cohesion, repulsion, overlapping to the opposite edge once they reach the edge of the screen. Overall, their behavior is flocking.

## Viruses (orbiters)
Exhibit 4 behaviors: motion, rotation, overlapping to the opposite edge once they reach the edge of the screen, changing colors when overlapping to the opposite edge.

## Spitters
While stationary, these are the most complex creatures. They take the form of a boid.

Exhibit 3 behaviors: Pointing to the nearest virus, emitting a particle system when the nearest virus is within a certain distance, and adjusting the particle system so that the acceleration is towards the virus and the particle system originates from the tip of the boid, not the center (this was the most challenging part).

## Particles
Exhibit 3 behaviors: initial position at the tip of the Spitter boid, a random initial velocity, and an acceleration of a constant magnitude towards the virus nearest the spitter. Also keep the same color as the spitter.
