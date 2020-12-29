export default class Stimulus extends Phaser.GameObjects.Particles.Particle{
    constructor(emitter){
        super (emitter)
        /*super(world, 2800, 4200,key);
        this.particles = this.scene.add.particles(key);

        this.particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 2.5 },
            //tint: { start: properties.startColour, end: properties.endColour },
            speed: 20,
            accelerationY: -300,
            angle: { min: -85, max: -95 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 1100 },
            blendMode: 'ADD',
            frequency: 110,
            maxParticles: 10,
            x: 2800,
            y: 4200
        });*/
        this.t = 0;
        this.i = 0;
    }
//     update (delta, step, processors)
//     {
//         var result = super.update(delta, step, processors);

//         this.t += delta;

//         if (this.t >= this.scene.player.anims.currentAnim.msPerFrame)
//         {
//             this.i++;

//             if (this.i > 9)
//             {
//                 this.i = 0;
//             }

//             this.frame = anim.frames[this.i].frame;

//             this.t -= anim.msPerFrame;
//         }

//         return result;
//     }
}