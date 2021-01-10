export default class options extends Phaser.Scene{
    init(data){
        this.info = data;
    }

    constructor(){
        super({ key: 'optionsScene' });
    }
    create(){
        let i = Math.round(this.sound.volume / 0.33, 0);
        this.scene.bringToTop();
        //imagen de fondo
        this.add.image(0,0, 'optionsMenu').setOrigin(0);
        //botones
        this.volume = this.add.image(this.cameras.main.centerX - this.cameras.main.width/4,
            this.cameras.main.centerY + (this.cameras.main.height/5), 'volume').setInteractive();
        this.volume.setFrame(i);
        //callbacks de los botones:
        //pointerover
        this.volume.on('pointerover', event => {this.volume.setScale(1.2);});
        //pointerout
        this.volume.on('pointerout', event => {this.volume.setScale(1);});
        //pointerdown
        this.volume.on('pointerdown', event => {
            if(i >= 3) i = 0;
            else i++;
            this.volume.setFrame(i);
            this.sound.setVolume(i * 0.33);
        });

        this.keybinds = this.add.image(this.cameras.main.centerX + this.cameras.main.width/4,
            this.cameras.main.centerY - (this.cameras.main.height/10), 'keybindsButton');
        this.keybindsImage = this.add.image(this.cameras.main.centerX + this.cameras.main.width/4,
            this.cameras.main.centerY + (this.cameras.main.height/3.5), 'keybinds').setScale(0.25);

            this.returnMenu = this.add.image(this.cameras.main.centerX - this.cameras.main.width/4,
                this.cameras.main.centerY - (this.cameras.main.height/5), 'back').setInteractive();
            //callbacks de los botones:
            //pointerover
            this.returnMenu.on('pointerover', event => {this.returnMenu.setScale(1.2);});
            //pointerout
            this.returnMenu.on('pointerout', event => {this.returnMenu.setScale(1);});
            //pointerdown
            this.returnMenu.on('pointerdown', event => {
                this.scene.stop();
                this.sound.stopAll();
                this.scene.run(this.info.prevScene.scene.key);
            });
    }
}