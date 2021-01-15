import menuBasicScene from "./menu_basic_scene.js";

export default class mainMenuScene extends menuBasicScene{
    constructor(){
        super('mainMenuScene');
    }
    create(){
        this.scene.bringToTop();
        this.sound.play('menuSong',  {
            mute: false, volume: 0.2, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
        });
        this.add.image(0,0, 'mainMenu').setOrigin(0);
        //botones
        
        //imagen de fondo
        const test = this.playButton(this.cameras.main.centerX - this.cameras.main.width/4,
            this.cameras.main.centerY + (this.cameras.main.height/60), 1);
        const levels = this.levelsButton(this.cameras.main.centerX - this.cameras.main.width/4,
                this.cameras.main.centerY + (this.cameras.main.height/5), 1);
        const options = this.optionsButton(this.cameras.main.centerX - this.cameras.main.width/4,
            this.cameras.main.height - (this.cameras.main.height/9), 1);
        //callbacks de los botones:
        //pointerover
    }
}