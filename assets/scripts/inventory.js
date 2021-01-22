//clase que guarda los items que el jugador ha obtenido en la partida (inventario)
export default class Inventory extends Phaser.GameObjects.GameObject{
    constructor(mainScene) {
        super(mainScene)
        this.mainScene = mainScene;
        //establecemos una capacidad máxima al inventario
        this.MAX_SIZE = 9;
        this.objects = [];
    }

    //metodo para añadir el item al inventario
    addObject(object) {
        //si no sobrepasa el limite
        if (this.objects.length < this.MAX_SIZE) {
            this.objects.push(object);
            //el objeto se mostrara encima de la casilla cuando se muestre en el inventario
            object.setDepth(11);
        }
    }

    //metodo para eliminar el objeto (cuando se usa durante el juego)
    removeObject(object) {
        //si se encuentra un objeto del mismo tipo, se borra
        this.objects.splice(this.objects.indexOf(object), 1);
        //actualizamos la GUI
        this.scene.gui.relocateInventory();
        //se destruye (y desaparece de GUI)
        object.destroy();
    }

    //metodo para eliminar objetos con respecto a su nombre (para poder hacerlo desde los eventos)
    removeObjectByKey(keyName) {
        let i = 0; //lo buscamos
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

    //metodo para comprobar si se tiene un item en inventario
    contains(name) {
        let i = 0; //lo buscamos
        while(i < this.objects.length && this.objects[i].name != name) i++;

        //devolvemos si lo hemos encontrado
        return i != this.objects.length;
    }
}