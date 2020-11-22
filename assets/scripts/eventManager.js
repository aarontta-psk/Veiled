import gameEvent from './gameEventModule.js';

export default class EventManager extends Phaser.Scene {
    //Esta es la escena que carga, presenta y oculta los eventos
    constructor() {
        super({ key: 'eventManager' });
    }

    preload() {
        //Load all backgrounds
        this.load.image('background2', 'assets/sprites/city.png');
    }

    create() {
        let background = this.add.image(0, 0, 'background2');
        background.setOrigin(0, 0);
        this.gameEvent = new gameEvent('This is an event', 2, this);

        this.gameEvent.interact().on('down', event => {
            console.log("esto tira?");
            this.scene.switch('gameScene');
        });
    }
}
