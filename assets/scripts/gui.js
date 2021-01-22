//clase que muestra información al jugador (interfaz)
export default class GUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, player) {
        super(scene, x, y);

        //hacemos que todos los objetos contenidos sigan a la cámara
        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.depth = 10;

        //Keybinds
        this.addTooltip('keybindSpace', 'VENDA', 743, 30, 715, 50, 0.5);
        this.addTooltip('keybindQ', 'INVENTARIO', 773, 95, 650, 85, 0.6);
        this.addTooltip('keybindE', 'INTERACTUAR', 773, 135, 635, 125, 0.6);
        if (this.scene.scene.key !== 'level0') { //si estamos en nivel 1, cargamos los keybinds de la silueta
            this.silhouetteTooltip = this.addTooltip('ghostTooltip', '', 750, 500, 0, 0, 1.2);           
            this.addTooltip('keybindR', 'HABLA CON TU PADRE', 773, 175, 575, 165, 0.6);
        } //si no, cargamos los del preludio
        else this.preludeTooltips();

        //Inventario
        this.inventoryRef = player.inventory;
        this.backgroundInventory = this.scene.add.image(204, 560, 'invBack').setScrollFactor(0);
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

        //Fe maxima
        this.faithTop = 250;
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
        //dependiendo de si se cierra o si se abre, ejecutamos un efecto de sonido u otro
        if (this.isVisible) this.scene.sound.play('sfxOpenInventory');
        else this.scene.sound.play('sfxCloseInventory');
    }

    //mostrar brevemente la barra de fe
    viewFaith(faith) {
        this.faithBack.setVisible(true);
        this.faithBar.setVisible(true);
        this.faithBar.scaleX = faith / this.faithTop;
        //tras 'x' tiempo, ocultamos la barra de fe
        this.scene.time.delayedCall(4000, this.hideFaith, null, this);
    }

    //metodo para ocultar la barra de fe
    hideFaith() {
        this.faithBack.setVisible(false);
        this.faithBar.setVisible(false);
    }

    //adicion de un item añadido al inventario en la interfaz
    addItem(item) {
        //se coloca en la interfaz
        item.setPosition(35 + ((this.inventoryRef.objects.length - 1) * 42), 560).setScrollFactor(0);
        //se hace interactuable
        item.setInteractive();
        this.updateInventory();
    }

    //actualizacion (dinamica) de items en la interfaz
    updateInventory() {
        for (const item of this.inventoryRef.objects)
            item.setVisible(this.isVisible);
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

    //metodo generalizado para crear tooltips en la intefaz
    addTooltip(keybind, text, x, y, xText, yText, scale) {
        let key = this.scene.add.image(x, y, keybind).setScrollFactor(0).setScale(scale);
        let keyText = this.scene.add.text(xText, yText, text, {
            fontFamily: 'Neucha',
            color: '#ffffff'
        }).setResolution(2).setScale(1.3).setScrollFactor(0).setDepth(11);
        this.add(key);
        this.add(keyText);
        return key;
    }

    //metodo para activar tooltips en el tutorial
    preludeTooltips() {
        this.arrowTooltip = this.scene.add.image(35, 533, 'lmbTooltip').setScrollFactor(0).setDepth(11).setVisible(false);
        this.wasdTooltip = this.scene.add.image(80, 200, 'keybindWASD').setScrollFactor(0).setDepth(11).setVisible(true).setScale(0.5);
        this.spaceTooltip = this.scene.add.image(80, 200, 'keybindSpace').setScrollFactor(0).setDepth(11).setVisible(false).setScale(0.5);
        this.qTooltip = this.scene.add.image(50, 200, 'keybindQ').setScrollFactor(0).setDepth(11).setVisible(false).setScale(0.5);
    }
}