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
        for (const item of this.inventoryRef.objects) {
            console.log(item);
            item.setVisible(this.isVisible);
        }
    }

    addItem(item){
        //se coloca en la interfaz
        item.setPosition(65 + (this.inventoryRef.objects.length * 90), 560).setVisible(false).setScrollFactor(0);
        //se hace interactuable
        item.setInteractive();
        console.log(this.inventoryRef.objects.length, "elems array");
        //se cierra el inventario para que se muestre correctamente
        this.isVisible = true;
        this.toggleInventory();
    }
}