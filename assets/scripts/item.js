export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, frame, player, name) {
        super(world, x, y, 'items', frame);

        this.name = name;

        this.setBody({
            type: 'rectangle',
            width: 30,
            height: 30         
        });  

        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setStatic(true);
        this.setSensor(true);

        this.on('pointerdown', () => {
            this.doSomething(player);
        });
        this.on('pointerover', () => {
            console.log("hovering over item, ", name + ": " + this.description);
        });
    }

    // doSomething() {
    //     this.setScale(2.0, 2.0);
    // }

}

export class potionItem extends Item{
    constructor(world, x, y, frame, player, name){
        super(world, x, y, frame, player, name);
        this.description = "It recovers sanity"
    }

    doSomething(player) {
        player.sanity += 30;
        if(player.sanity > 100) player.sanity = 100;
        console.log("pocion usada", player.sanity);
    }
}