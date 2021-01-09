export default class GUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, player) {
        super(scene, x, y);

        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.depth = 10;

        //Keybinds
        this.keybindQ = this.scene.add.image(773, 95, 'keybindQ').setScrollFactor(0).setScale(0.6);
        this.keybindQText = this.scene.add.text(665, 85, 'INVENTORY', {
            fontFamily: 'Neucha',
            color: '#ffffff'
        }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);
        this.add(this.keybindQ);
        this.keybindE = this.scene.add.image(773, 135, 'keybindE').setScrollFactor(0).setScale(0.6);
        this.keybindEText = this.scene.add.text(675, 125, 'INTERACT', {
            fontFamily: 'Neucha',
            color: '#ffffff'
        }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);
        this.add(this.keybindE);
        this.keybindSpace = this.scene.add.image(743, 30, 'keybindSpace').setScrollFactor(0).setScale(0.5);
        this.keybindSpaceText = this.scene.add.text(699, 50, 'BLINDFOLD', {
            fontFamily: 'Neucha',
            color: '#ffffff'
        }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);
        this.add(this.keybindSpace);

        //Inventario
        this.inventoryRef = player.inventory;
        this.backgroundInventory = this.scene.add.image(140, 560, 'invBack').setScrollFactor(0);
        this.add(this.backgroundInventory);
        this.isVisible = false;
        this.backgroundInventory.setVisible(this.isVisible);

        //Texto del Item seleccionado
        this.text = this.scene.add.text(15, 505, '', {
            fontFamily: 'Neucha',
            color: '#ffffff',
        }).setResolution(2).setScale(1.3).setScrollFactor(0);
        this.text.depth = 11;

        //Barra cordura
        this.sanityBack = this.scene.add.image(150, 30, 'sanityBarBack').setScrollFactor(0);
        this.add(this.sanityBack);
        this.sanityBar = this.scene.add.image(150, 30, 'sanityBar').setScrollFactor(0);
        this.add(this.sanityBar);
        this.sanityTop = 100;

        //Barra fe
        this.faithBack = this.scene.add.image(150, 80, 'sanityBarBack').setScrollFactor(0);
        this.add(this.faithBack);
        this.faithBar = this.scene.add.image(150, 80, 'faithBar').setScrollFactor(0);
        this.add(this.faithBar);
        //Fe maxima = 80*nivel completado + 20*evento secundario (3 por nivel) = 240 + 180 = 420 (noice)
        this.faithTop = 420;
        this.hideFaith();
    }

    //activar/desactivar inventario
    toggleInventory() {
        this.isVisible = !this.isVisible;
        this.backgroundInventory.setVisible(this.isVisible);
        this.updateInventory();
    }

    //mostrar brevemente la barra de fe
    viewFaith(faith){
        this.faithBack.setVisible(true);
        this.faithBar.setVisible(true);
        this.faithBar.scaleX = faith / this.faithTop;
        this.scene.time.delayedCall(4000, this.hideFaith, null, this);
    }

    hideFaith(){
        this.faithBack.setVisible(false);
        this.faithBar.setVisible(false);
    }

    //agregacion de un item añadido al inventario
    addItem(item) {
        //se coloca en la interfaz
        item.setPosition(35 + ((this.inventoryRef.objects.length - 1) * 42), 560).setScrollFactor(0);
        //se hace interactuable
        item.setInteractive();
        console.log(this.inventoryRef.objects.length, "elems array");
        this.updateInventory();
    }

    //actualizacion (dinamica) de items en la interfaz
    updateInventory() {
        for (const item of this.inventoryRef.objects) {
            console.log(item);
            item.setVisible(this.isVisible);
        }
        this.text.setText('');
    }

    //recolocacion dinamica de items (en caso de que se elimine uno)
    relocateInventory() {
        let i = 0;
        for (const item of this.inventoryRef.objects) {
            item.setPosition(35 + (i * 42), 560);
            i++;
        }
        this.text.setText('');
    }

    updateSanityBar(sanity) {
        this.sanityBar.scaleX = sanity / this.sanityTop;
    }
}