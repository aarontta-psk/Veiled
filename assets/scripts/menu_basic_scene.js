import Main from './main.js'


export default class menuBasicScene extends Phaser.Scene{
    constructor(sceneKey){
        super({key: sceneKey});
    }

    createButton(x, y, scale, imageKey, cb){
        const button = this.add.image(x, y, imageKey).setInteractive();
        //callbacks de los botones:
        //pointerover
        button.on('pointerover', event => {button.setScale(scale+0.1)});
        //pointerout
        button.on('pointerout', event => {button.setScale(scale)});
        //pointerdown
        button.on('pointerdown', event => {
            this.sound.play('sfxClick');
            cb(this, button);
        });

        return button;
    }

    playButton(x,y, scale){
        return this.createButton(x,y, scale, 'mainMenuPlay', () => {
            this.sound.stopAll();
            this.scene.start('level0');
        });
    }

    optionsButton(x, y, scale, menuToReturnKey){
        return this.createButton(x,y, scale, 'mainMenuSettings', () => {
            this.scene.stop();
            this.scene.start('optionsScene', {prevSceneKey: menuToReturnKey});
        });
    }

    volumeButton(x,y, scale, index){
        return this.createButton(x,y, scale, 'volume', (notUsedRef, button) => {
            if(index >= 3) index = 0;
            else index++;
            button.setFrame(index);
            this.sound.setVolume(index * 0.33);
        });
    }

    levelsButton(x,y, scale){
        return this.createButton(x,y, scale, 'mainMenuLevels', () => {
            this.scene.stop();
            this.scene.start('levelSelectorScene');
        });
    }

    //metodo solo usado para volver a la escena de juego
    returnButton(x,y, scale, keyLastScene){
        return this.createButton(x,y, scale, 'back', () => {
            this.scene.stop();
            //para volver a la escena anterior uso la key de la escena anterior
            this.scene.run(keyLastScene);
        });
    }

    returnToMenuButton(x,y, scale){
        return this.createButton(x,y, scale, 'pauseMenuToMainMenu', (ref) => {
            const main = new Main();
            main.restartGame(ref);
        });
    }
    
    goToSceneButton(x,y, scale, textureKey, nextSceneKey){
        return this.createButton(x,y, scale, textureKey, () => {
            this.sound.stopAll();
            this.scene.start(nextSceneKey);
        });
    }
}