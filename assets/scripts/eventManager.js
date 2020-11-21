import gameEvent from './gameEventModule.js';
import mainScene from './gameScene.js';
export default class EventManager extends Phaser.Scene
{
    //Esta es la escena que carga, presenta y oculta los eventos
    constructor(){
        super({key:'eventManager'});
    }

    preload(){
        //Load all backgrounds
        this.load.image('background2', 'assets/sprites/city.png');
    }

    create(){
        let background = this.add.image(0, 0, 'background2');
        background.setOrigin(0, 0);
        this.gameEvent = new gameEvent('This is an event', 2, this);
    }
/*
    closeEvent()
        {
            this.scene.switch(this, mainScene);
        }*/

    update(time, delta){
        if (this.gameEvent.isInteracting())
        {
            //closeEvent();
            this.scene.start('gameScene');
        }
    }
}
