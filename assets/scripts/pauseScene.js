export default class pauseScene extends Phaser.Scene {
    init(data) {
        this.info = data;
    }

    constructor() {
        super({ key: 'pauseScene' });
    }

    create() {
        this.add.image(0, 0, 'pauseMenu').setOrigin(0);
        // this.add.text(this.cameras.main.centerX - 120, this.cameras.main.centerY - 150, 'MENU DE PAUSA').setScale(2).setOrigin(0);

        const resume = this.add.image(this.cameras.main.centerX - 250, this.cameras.main.centerY - 80, 'pauseMenuResume').setInteractive().setOrigin(0);
        const exit = this.add.image(this.cameras.main.centerX - 250, this.cameras.main.centerY + 80, 'pauseMenuToMainMenu').setInteractive().setOrigin(0);

        //callbacks de los botones:
        //pointerover
        resume.on('pointerover', event => { resume.setScale(1.2); });
        exit.on('pointerover', event => { exit.setScale(1.2); });
        //pointerout
        resume.on('pointerout', event => { resume.setScale(1); });
        exit.on('pointerout', event => { exit.setScale(1); });
        //pointerdown
        resume.on('pointerdown', event => {
            this.scene.stop();
            this.scene.run(this.info.prevScene.scene.key);
        });

        exit.on('pointerdown', event => {
            console.log("ir al menu principal, aun no existe");
        });
    }
}