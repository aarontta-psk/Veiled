export default class EventHandler extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, key, events) {
        super(world, x, y, key);

        //se guarda una referencia a cada escena de evento
        this.eventList = events;
    }

    nextEvent() {
        let i = 0;
        while (i < this.eventList.length && this.eventList[i].completed == true) i++;

        if (i < this.eventList.length)
            return this.eventList[i];
        else
            return null;
    }
}