import event from './gameEventModule.js';

export default class EventManager extends Phaser.Scene
{
    //Esta es la escena que carga, presenta y oculta los eventos
    constructor(){
        super({key:'EventManager'});
    }

    preload(){
        //Load all backgrounds
        this.load.image('background2', 'assets/sprites/city.png');
    }

    create(){
        let background = this.add.image(0, 0, 'background2');
        background.setOrigin(0, 0);

        let title_text = this.add.text(100, 100, 'Event text');

        let events = [
            event1 = new event("This is an event.", 2, /*results*/ 2)
        ];
    }
}
