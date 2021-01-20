export default class EventHandler extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, key, events) {
        super(world, x, y, key);

        this.threshold = 15;
        this.tooltip = this.scene.add.sprite(x, y - this.threshold, 'npcTooltip').setDepth(11);
        //se guarda una referencia a cada escena de evento
        this.eventList = events;
    }

    //cambio de evento
    nextEvent() {
        let i = 0;
        while (i < this.eventList.length && this.eventList[i].completed) i++;

        if (i < this.eventList.length)
            return this.eventList[i];
        else
            return null;
    }

    //actualización de la posicion del tooltip
    updateTooltip(){
        if(!this.isStatic())
            this.tooltip.setPosition(this.x, this.y - this.threshold)
    }
}