export default class mainMenu extends Phaser.Scene{
    
    constructor(){
        super({ key: 'mainMenuScene' });
    }
    create(){
        //imagen de fondo
        this.add.image(0,0, 'mainMenu').setOrigin(0);
        //botones
        const play = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'mainMenuPlay').setInteractive();
        const options = this.add.image(this.cameras.main.centerX, this.cameras.main.height - (this.cameras.main.height/4), 'mainMenuOptions').setInteractive();
        //callbacks de los botones:
        //pointerover
        play.on('pointerover', event => {play.setScale(1.2);});
        options.on('pointerover', event => {options.setScale(1.2);});
        //pointerout
        play.on('pointerout', event => {play.setScale(0.8);});
        options.on('pointerout', event => {options.setScale(0.8);});
        //pointerdown
        play.on('pointerdown', event => {this.scene.start('gameScene');});
        options.on('pointerdown', event => {console.log('Opciones pulsado. Hay que implementar las opciones')});
    }
}