export default class GUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, player) {
        super(scene, x, y);

        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.depth = 10;

        //Keybinds
        this.addTooltip('keybindQ', 'INVENTORY', 773, 95, 665, 85, 0.6);
        this.addTooltip('keybindE', 'INTERACT', 773, 135, 675, 125, 0.6);
        this.addTooltip('keybindSpace', 'BLINDFOLD', 743, 30, 699, 50, 0.5);

        //Inventario
        this.inventoryRef = player.inventory;
        this.backgroundInventory = this.scene.add.image(140, 560, 'invBack').setScrollFactor(0);
        this.add(this.backgroundInventory);
        this.isVisible = false;
        this.backgroundInventory.setVisible(this.isVisible);

        //Texto del Item seleccionado
        this.itemText = this.scene.add.text(15, 505, '', {
            fontFamily: 'Neucha',
            color: '#ffffff',
        }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);

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

    //modificacion del texto del item seleccionado en GUI
    setInfoText(text) {
        this.itemText.setText(text);
    }    

    //activar/desactivar inventario
    toggleInventory() {
        this.isVisible = !this.isVisible;
        this.backgroundInventory.setVisible(this.isVisible);
        this.updateInventory();
        if(this.isVisible) this.scene.sound.play('sfxOpenInventory');
        else this.scene.sound.play('sfxCloseInventory');
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
        this.itemText.setText('');
    }

    //recolocacion dinamica de items (en caso de que se elimine uno)
    relocateInventory() {
        let i = 0;
        for (const item of this.inventoryRef.objects) {
            item.setPosition(35 + (i * 42), 560);
            i++;
        }
        this.itemText.setText('');
    }

    //metodo para actualizar la barra de cordura
    updateSanityBar(sanity) {
        this.sanityBar.scaleX = sanity / this.sanityTop;
    }
    
    //metodo para crear tooltips en la intefaz
    addTooltip(keybind, text, x, y, xText, yText, scale){
        let key = this.scene.add.image(x, y, keybind).setScrollFactor(0).setScale(scale);
        let keyText = this.scene.add.text(xText, yText, text, {
            fontFamily: 'Neucha',
            color: '#ffffff'
        }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);
        this.add(key);
        this.add(keyText);
    }

    //metodo para activar tooltips en el tutorial
    
}