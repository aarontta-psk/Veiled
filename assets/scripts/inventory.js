export default class Inventory{
    constructor(){
        this.objects = [];
    }

    addObject(object){
        this.objects.push(object);
    }
}