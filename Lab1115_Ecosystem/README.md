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

## Squares
Exhibit 4 behaviors: velocity with a random direction and magnitude 5, bouncing off of edges of the ecosystem and changing colors when this happens, radius changing proportional to the distance between the square and the nearest corner while staying between 10 and 50, repelling from the center of all the flocks.

# User interaction:

## Navigating
Use the arrow keys to move around the world, or click anywhere on canvas2 to move there. There's a buffer space beyond the world you can zoom to, but you can't go past that.

## Zooming
Press key 's' to zoom in and key 'a' to zoom out. The zoom is centered around the middle of canvas1, and the buffer space scales to
