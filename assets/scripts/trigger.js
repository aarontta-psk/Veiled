export default class Trigger extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, width, height){
        super(world, x, y, 'player');  

        this.setBody({
            type: 'rectangle',
            width: width,
            height: height        
        });

        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setStatic(true);
        this.setSensor(true);
        this.setVisible(false);
    }
}