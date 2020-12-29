export default class Stimulus extends Phaser.GameObjects.Particles.ParticleEmitter{
    constructor(manager, position){
        super(manager);
        
    manager.createEmitter({
        x : position.x,
        y : position.y,
        alpha : { start: 1, end: 0 },
        scale : { start: 0.5, end: 6.5 },
        frame : 0,
        quantity : 1,
        frequency : 1500,
        angle : { min: 0, max: 0 },
        speed : 0,
        gravityY : 0,
        lifespan : { min: 1400, max: 1500 }
    });
    }
}