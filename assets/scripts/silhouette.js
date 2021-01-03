export default class Silhouette extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, eventList) {
        super(world, x, y, 'player');
        
        this.scene.add.existing(this); //lo añades en la escena
        this.setScrollFactor(0);
        this.setVisible(true);
        this.setDepth(11);

        this.events = eventList;
    }

    preUpdate(time, delta){
        super(time, delta);

        if (this.visible) this.scene.anims.play('idle_' + this.frame.texture.key, true);
    }
}