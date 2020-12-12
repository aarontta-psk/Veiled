export default class pauseScene extends Phaser.Scene{
    init(data) {
        this.info = data;
    }

    constructor() {
        super({ key: 'pauseScene' });
    }
    
    create(){
        const t = this.add.text(this.cameras.main.centerX,this.cameras.main.centerY, 'QUITAR PAUSA').setInteractive().setScale(2);
        console.log("AQUI", this.cameras.main.centerX, this.cameras.main.centerY);
        t.on('pointerdown', event => {
            this.scene.stop();
            this.scene.run(this.info.prevScene.scene.key);
        });
    }
}