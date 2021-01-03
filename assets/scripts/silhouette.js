export default class Silhouette extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, eventList) {
        super(world, x, y, 'player');
        
        this.scene.add.existing(this); //lo añades en la escena
        this.setScrollFactor(0);
        this.setVisible(true);
        this.setDepth(11);

        this.silEvents = eventList;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if (this.visible) this.anims.play('idle_' + this.frame.texture.key, true);
    }

    nextEvent() {
        let i = 0;
        while (i < this.silEvents.length && this.silEvents[i].completed == true) i++;

        if (i < this.silEvents.length)
            return this.silEvents[i];
        else
            return null;
    }
}