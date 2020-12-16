
export default class Inventory{

    constructor(){
        this.MAX_SIZE = 6;
        this.objects = [];
    }

    addObject(object){
        if(this.objects.length < this.MAX_SIZE){
            this.objects.push(object);
            //hago que se vea encima de la casilla cuando se muestre en el inventario
            object.depth = 11;
        }
    }
}