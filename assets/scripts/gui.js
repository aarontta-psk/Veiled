export default class GUI extends Phaser.GameObjects.Container{
    constructor(scene, x, y, player){
        super(scene, x, y);

        this.setScrollFactor(0);
        this.inventoryRef = player.inventory;
        this.backgroundInventory = this.scene.add.sprite(400, 700, 'invBack');
        this.scene.add.existing(this);
        thi.add(this.backgroundInventory);
    }
}