
export default class Inventory {

    constructor() {
        this.MAX_SIZE = 6;
        this.objects = [];
    }

    addObject(object) {
        if (this.objects.length < this.MAX_SIZE) {
            this.objects.push(object);
            //el objeto se mostrara encima de la casilla cuando se muestre en el inventario
            object.depth = 11;
        }
    }

    removeObject(object) {
        //si se encuentra un objeto del mismo tipo, se borra
        this.objects.splice(this.objects.indexOf(object), 1);       
    }
}