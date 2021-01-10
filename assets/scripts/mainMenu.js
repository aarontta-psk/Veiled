export default class mainMenuScene extends Phaser.Scene{
    constructor(){
        super({ key: 'mainMenuScene' });
    }
    create(){
        this.scene.bringToTop();
        this.sound.play('menuSong',  {
            mute: false, volume: 0.2, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
        });
        //imagen de fondo
        this.add.image(0,0, 'mainMenu').setOrigin(0);
        //botones
        const play = this.add.image(this.cameras.main.centerX - this.cameras.main.width/4,
            this.cameras.main.centerY + (this.cameras.main.height/60), 'mainMenuPlay').setInteractive();
        const levels = this.add.image(this.cameras.main.centerX - this.cameras.main.width/4,
                this.cameras.main.centerY + (this.cameras.main.height/5), 'mainMenuLevels').setInteractive();
        const options = this.add.image(this.cameras.main.centerX - this.cameras.main.width/4,
            this.cameras.main.height - (this.cameras.main.height/9), 'mainMenuSettings').setInteractive();
        //callbacks de los botones:
        //pointerover
        play.on('pointerover', event => {play.setScale(1.1);});
        options.on('pointerover', event => {options.setScale(1.1);});
        levels.on('pointerover', event => {levels.setScale(1.1);});
        //pointerout
        play.on('pointerout', event => {play.setScale(1);});
        options.on('pointerout', event => {options.setScale(1);});
        levels.on('pointerout', event => {levels.setScale(1);});
        //pointerdown
        play.on('pointerdown', event => {
            this.sound.stopAll();
            this.scene.start('gameScene');
        });
        options.on('pointerdown', event => {
            this.scene.stop();
            this.scene.run('optionsScene', {prevScene: this });
        });
        levels.on('pointerdown', event => {
            this.scene.stop();
            this.scene.run('levelSelectorScene', {prevScene: this });
        });
    }
}