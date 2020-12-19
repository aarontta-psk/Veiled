
export default class Inventory {

    constructor(mainScene) {
        this.mainScene = mainScene;
        this.MAX_SIZE = 6;
        this.objects = [];
    }

    addObject(object) {
        if (this.objects.length < this.MAX_SIZE) {
            this.objects.push(object);
            //el objeto se mostrara encima de la casilla cuando se muestre en el inventario
            object.depth = 11;
            console.log('Object added: ' + object.name);
        }
    }

    removeObject(object) {
        //si se encuentra un objeto del mismo tipo, se borra
        this.objects.splice(this.objects.indexOf(object), 1);       
    }

    contains(name) {
        let i = 0;
        while(i < this.objects.length && this.objects[i].name != name) i++;

        return i != this.objects.length;
    }

    collect(name)
    {
        const items = this.mainScene.itemContainer;
        let i = 0;
        while(i < items.length && items[i].name != name) i++;
        this.addObject(items[i]);
    }
}