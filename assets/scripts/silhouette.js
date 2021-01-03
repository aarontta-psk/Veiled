import EventHandler from './eventHandler.js'

export default class Silhouette extends EventHandler {
    constructor(world, x, y, eventList) {
        super(world, x, y, 'player', eventList);
        
        this.scene.add.existing(this); //lo añades en la escena
        this.setScrollFactor(0);
        this.setVisible(true);
        this.setDepth(11);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if (this.visible) this.anims.play('idle_' + this.frame.texture.key, true);
    }
}