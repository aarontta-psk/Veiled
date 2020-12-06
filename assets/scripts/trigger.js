export default class Trigger extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, width, height){
        super(world, x, y, '');  

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
    }
}