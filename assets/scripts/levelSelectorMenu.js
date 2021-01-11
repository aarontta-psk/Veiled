export default class levelSelector extends Phaser.Scene {
    init(data) {
        this.info = data;
    }

    constructor() {
        super({ key: 'levelSelectorScene' });
    }
    create() {

        this.scene.bringToTop();
        //imagen de fondo
        this.add.image(0, 0, 'mainMenu').setOrigin(0);

        //botones
        const level01 = this.add.image(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 60), 'mainMenuLevel01').setInteractive();
        const level02 = this.add.image(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 5), 'mainMenuLevel02').setInteractive();
        const level03 = this.add.image(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.height - (this.cameras.main.height / 9), 'mainMenuLevel03').setInteractive();
        const returnMenu = this.add.image(this.cameras.main.centerX + this.cameras.main.width / 5.5,
            this.cameras.main.centerY + (this.cameras.main.height / 2.5), 'back').setInteractive();

        //pointerover
        level01.on('pointerover', event => { level01.setScale(1.1); });
        level03.on('pointerover', event => { level03.setScale(1.1); });
        level02.on('pointerover', event => { level02.setScale(1.1); });
        returnMenu.on('pointerover', event => { returnMenu.setScale(1.1); });
        //pointerout
        level01.on('pointerout', event => { level01.setScale(1); });
        level03.on('pointerout', event => { level03.setScale(1); });
        level02.on('pointerout', event => { level02.setScale(1); });
        returnMenu.on('pointerout', event => { returnMenu.setScale(1); });
        //pointerdown
        level01.on('pointerdown', event => {
            this.sound.stopAll();
            //this.scene.start('gameScene');
        });
        level03.on('pointerdown', event => {
            this.scene.stop();
            //this.scene.run('level03Scene', {prevScene: this });
        });
        level02.on('pointerdown', event => {
            this.scene.stop();
            //this.scene.run('level02electorScene', {prevScene: this });
        });
        returnMenu.on('pointerdown', event => {
            this.scene.stop();            
            this.scene.run(this.info.prevScene.scene.key);
        });
    }
}