export default class Npc extends Phaser.Physics.Matter.Sprite{
    constructor(key, world, x, y, myScene) {
        super(world, x, y, key); //llama a la constructora de Sprite

        this.scene.add.existing(this); //lo añades en la escena

        this.setBody({
            type: 'rectangle',
            width: 45,
            height:45         
        });
        this.scene.add.existing(this);
        this.scene.matter.add.sprite(this);
        this.setStatic(true);
        this.setSensor(true);
        //se guarda una referencia a la escena de evento de este Npc
        this.myScene = myScene;
    }
}
