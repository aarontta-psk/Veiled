export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y,frame) {
        super(world, x, y, 'items',frame)
        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);       
        this.setStatic(true);
    }
}