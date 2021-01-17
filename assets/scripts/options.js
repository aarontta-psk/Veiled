import menuBasicScene from "./menu_basic_scene.js";

export default class options extends menuBasicScene{
    init(data){
        this.info = data;
    }

    constructor(){
        super('optionsScene');
    }
    create(){
        let i = Math.round(this.sound.volume / 0.33, 0);
        this.scene.bringToTop();
        //imagen de fondo
        this.add.image(0,0, 'settingsMenu').setOrigin(0);
        //botones
        this.volume = this.volumeButton(this.cameras.main.centerX + this.cameras.main.width/3.3,
            this.cameras.main.centerY - (this.cameras.main.height/8), 0.8, i)
        this.volume.setFrame(i);

        /*this.keybinds = this.add.image(this.cameras.main.centerX + this.cameras.main.width/4,
            this.cameras.main.centerY - (this.cameras.main.height/10), 'keybindsButton');
        this.keybindsImage = this.add.image(this.cameras.main.centerX + this.cameras.main.width/4,
            this.cameras.main.centerY + (this.cameras.main.height/3.5), 'keybinds').setScale(0.25);*/

            this.returnMenu = this.returnButton(this.cameras.main.centerX + this.cameras.main.width/3,
                this.cameras.main.centerY + (this.cameras.main.height/5), 0.5, this.info).setScale(0.5);
    }
}