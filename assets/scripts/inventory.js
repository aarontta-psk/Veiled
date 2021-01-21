
export default class Inventory extends Phaser.GameObjects.GameObject{

    constructor(mainScene) {
        super(mainScene)
        this.mainScene = mainScene;
        this.MAX_SIZE = 9;
        this.objects = [];
    }

    addObject(object) {
        if (this.objects.length < this.MAX_SIZE) {
            this.objects.push(object);
            //el objeto se mostrara encima de la casilla cuando se muestre en el inventario
            object.setDepth(11);
            console.log('Object added: ' + object.name);
        }
    }

    removeObject(object) {
        //si se encuentra un objeto del mismo tipo, se borra
        this.objects.splice(this.objects.indexOf(object), 1);
        this.scene.gui.relocateInventory();
        //se destruye (y desaparece de GUI)
        object.destroy();
    }

    removeObjectByKey(keyName) {
        let i = 0;
        while(i < this.objects.length && this.objects[i].name !== keyName) i++;
        //si se encuentra un objeto del mismo tipo, se borra
        if(i !== this.objects.length) {
            let temporalItem = this.objects[i];
            this.objects.splice(i, 1);       
            this.scene.gui.relocateInventory();
            //se destruye (y desaparece de GUI)
            temporalItem.destroy();
        }
    }

    contains(name) {
        let i = 0;
        while(i < this.objects.length && this.objects[i].name != name) i++;

        return i != this.objects.length;
    }
}