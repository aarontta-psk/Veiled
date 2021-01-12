export default class stimulus extends Phaser.GameObjects.Particles.ParticleEmitter{
    constructor(manager, position){
        super(manager);
        
        this.x = position.x;
        this.y = position.y;
        this.alphaStart = 1;
        this.alphaEnd = 0;
        this.scaleStart = 0.5;
        this.scaleEnd = 6.5;
        this.frame = 0;
        this.quantity = 1;
        this.frequency = 1500;
        this.minAngle = 0;
        this.maxAngle = 0;
        this.speed = 0;
        this.gravityY = 0;
        this.minLifespan = 1400;
        this.maxLifespan = 1500;
        this.emitzone = null;
        this.tint = null;
    }
    createEmitter(manager){
        this.emitter = manager.createEmitter({
            x:this.x,
            y:this.y,
            alpha: {start: this.alphaStart, end: this.alphaEnd},
            scale: {start: this.scaleStart, end: this.scaleEnd},
            frame: this.frame,
            quantity: this.quantity,
            frequency: this.frequency,
            angle: {min: this.minAngle, max: this.maxAngle},
            speed: this.speed,
            gravityY: this.gravityY,
            lifespan: {min: this.minLifespan, max: this.maxLifespan}
        });
    }
}

export class soundStimulus extends Phaser.GameObjects.Particles.ParticleEmitter{
    constructor(manager, position){
        super(manager, position);

    this.scaleStart = 0.1;
    this.scaleEnd = 1;
    this.frequency = 1000;
    this.minLifespan = 700;
    this.maxLifespan = 800;
    }
    
    /*constructor(manager, position){
        super(manager);
        
    this.emitter = manager.createEmitter({
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
    }*/
}

export class smell extends stimulus{
    constructor(manager, position){
        super(manager, position);

    this.emitZone = new Phaser.Geom.Circle(0, 0, 30);
    this.scaleStart = 0.05;
    this.scaleEnd = 0.1;
    this.frequency = 800;
    this.minLifespan = 2000;
    this.maxLifespan = 3000;
    this.minAngle = -45;
    this.maxAngle = 45;
    }
}

export class treeSmell extends smell{
    constructor(manager, position){
        super(manager, position);
        this.tint = 0xBDECB6;
        this.createEmitter(manager);
    }
}

export class footSteps extends soundStimulus{
    constructor(manager, position){
        super(manager, position);
        this.tint = 0x197CD3;
        this.createEmitter(manager);
    }
}