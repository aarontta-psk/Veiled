import EventHandler from './event_handler.js'

export default class Trigger extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, width, height, key){
        super(world, x, y, key);  
        this.setBody({
            type: 'rectangle',
            width: width,
            height: height        
        });

        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setVisible(false);
        this.setStatic(true);
        this.setSensor(true);
        
        this.info = [];
        this.newBounds = [];
    }
}

export class EventTrigger extends EventHandler {
    constructor(world, x, y, width, height, stimulus, events, key){
        super(world, x, y, key, events);
        
        this.setBody({
            type: 'rectangle',
            width: width,
            height: height        
        });

        this.stimulus = stimulus;

        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setVisible(false);
        this.setStatic(true);
        this.setSensor(true);
    }
}