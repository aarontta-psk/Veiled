export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, frame) {
        super(world, x, y, 'items', frame)

        this.setBody({
            type: 'rectangle',
            width: 45,
            height:45         
        });  

        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setStatic(true);
        this.setSensor(true);
    }

    doSomething() {
        this.setScale(2.0, 2.0);
    }
}