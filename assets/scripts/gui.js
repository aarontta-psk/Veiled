export default class GUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, player) {
        super(scene, x, y);

        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.depth = 10;

        this.inventoryRef = player.inventory;
        this.backgroundInventory = this.scene.add.image(300, 560, 'invBack').setScale(0.8, 0.6).setScrollFactor(0);
        this.add(this.backgroundInventory);

        this.isVisible = false;
        this.backgroundInventory.setVisible(this.isVisible);
    }

    toggleInventory() {
        this.isVisible = !this.isVisible;
        this.backgroundInventory.setVisible(this.isVisible);
        let i = 0;
        // for (const item of this.inventoryRef.objects) {
        //     console.log(item);
        //     item.setPosition((20 + i * 75), 560).setVisible(this.isVisible);
        // }
    }

    updateInventory() {
        // let i = 0;
        // for (const item of this.inventoryRef.objects)
        //     item.setPosition((20 + i * 75), 560).setVisible(true);
    }
}