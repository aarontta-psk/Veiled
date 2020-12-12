export default class pauseScene extends Phaser.Scene{
    init(data) {
        this.info = data;
    }

    constructor() {
        super({ key: 'pauseScene' });
    }

    create(){
        this.add.image(0,0, 'pauseMenu').setOrigin(0);
        this.add.text(this.cameras.main.centerX - 120, this.cameras.main.centerY - 150, 'MENU DE PAUSA').setScale(2).setOrigin(0);
        const t = this.add.text(this.cameras.main.centerX - 120, this.cameras.main.centerY, 'QUITAR PAUSA').setInteractive().setScale(2).setOrigin(0);
        const exit = this.add.text(this.cameras.main.centerX - 180, this.cameras.main.centerY + 130, 'IR AL MENU PRINCIPAL').setInteractive().setScale(2).setOrigin(0);

        t.on('pointerdown', event => {
            this.scene.stop();
            this.scene.run(this.info.prevScene.scene.key);
        });

        exit.on('pointerdown', event => {
            console.log("ir al menu principal, aun no existe");
        });

    }
}