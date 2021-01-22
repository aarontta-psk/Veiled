//clase padre de toda entidad de juego que maneje una lista
//de eventos con la que el jugador puede interactuar
export default class EventHandler extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, key, events) {
        super(world, x, y, key);

        this.threshold = 15; //posición del tooltip de interacción encima de cada event handler
        this.tooltip = this.scene.add.sprite(x, y - this.threshold, 'npcTooltip').setDepth(11);
        //se guarda una referencia a cada escena de evento
        this.eventList = events;
    }

    //cambio de evento
    nextEvent() {
        let i = 0; //buscamos el siguiente
        while (i < this.eventList.length && this.eventList[i].completed) i++;

        if (i < this.eventList.length) //si hay uno válido, lo devolvemos
            return this.eventList[i];
        else //si no, devolvemos null para las comproaciones
            return null;
    }

    //actualización de la posicion del tooltip
    updateTooltip(){
        //si el event handler no es estático,
        //actualizamos la posicion de su tooltip
        if(!this.isStatic()) 
            this.tooltip.setPosition(this.x, this.y - this.threshold)
    }
}