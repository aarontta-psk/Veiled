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

export class soundStimulus extends Phaser.GameObjects.Particles.ParticleEmitter{
    constructor(manager, position){
        super(manager);
        
    manager.createEmitter({
        x : position.x,
        y : position.y,
        alpha : { start: 1, end: 0 },
        scale : { start: 0.1, end: 0.4 },
        frame : 0,
        quantity : 1,
        frequency : 2000,
        rotate: {start: 0, end: 180},
        speed : 0,
        gravityY : 0,
        lifespan : { min: 1400, max: 1500 }
    });
    }
}

export class smellStimulus extends Phaser.GameObjects.Particles.ParticleEmitter{
    constructor(manager, position, color){
        super(manager);

    let circ = new Phaser.Geom.Circle(0, 0, 30);
    manager.createEmitter({
        x : position.x,
        y : position.y,
        alpha : { start: 1, end: 0 },
        scale : 0.05,
        frame : 0,
        quantity : 1,
        frequency : 3000,
        speed : 5,
        gravityY : 0, 
        lifespan : { min: 2000, max: 3000 },
        emitZone: { type: 'random', source: circ },
        tint: color
    });
    }
}