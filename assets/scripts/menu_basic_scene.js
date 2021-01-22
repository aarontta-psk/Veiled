import Main from './main.js'

//clase menu basico del que heredan el resto de menus del juego
export default class menuBasicScene extends Phaser.Scene{
    constructor(sceneKey){
        super({key: sceneKey}); //constructora de escena
    }

    //metodo que crea un boton. Es llamado por el resto de metodos de esta clase para crear distintos botones
    createButton(x, y, scale, imageKey, cb){
        //se añade la imagen y se hace interactiva para poder ser clicada
        const button = this.add.image(x, y, imageKey).setInteractive();
        //callbacks de los botones:
        //cursor encima del boton
        button.on('pointerover', event => {button.setScale(scale+0.1)});
        //cursor sale del boton
        button.on('pointerout', event => {button.setScale(scale)});
        //cursor pulsa el boton
        button.on('pointerdown', event => {
            this.sound.play('sfxClick');
            //se llama al callback de este boton
            cb(this, button);
        });

        return button;
    }

    //metodo que inicia el nivel 0
    playButton(x,y, scale){
        return this.createButton(x,y, scale, 'mainMenuPlay', () => {
            this.sound.stopAll();
            this.scene.start('level0');
        });
    }

    //metodo que inicia las opciones
    optionsButton(x, y, scale, menuToReturnKey){
        return this.createButton(x,y, scale, 'mainMenuSettings', () => {
            this.scene.stop();
            this.scene.start('optionsScene', {prevSceneKey: menuToReturnKey}); //se pasa la key de la escena a la que se tiene que volver
        });
    }

    //metodo que controla el volumen del juego
    volumeButton(x,y, scale, index){
        return this.createButton(x,y, scale, 'volume', (notUsedRef, button) => {
            if(index >= 3) index = 0;
            else index++;
            button.setFrame(index);
            this.sound.setVolume(index * 0.33);
        });
    }

    //metodo que inicia el selector de niveles
    levelsButton(x,y, scale){
        return this.createButton(x,y, scale, 'mainMenuLevels', () => {
            this.scene.stop();
            this.scene.start('levelSelectorScene');
        });
    }

    //metodo para volver a la escena anterior
    returnButton(x,y, scale, keyLastScene){
        return this.createButton(x,y, scale, 'back', () => {
            this.scene.stop();
            //para volver a la escena anterior uso la key de la escena anterior
            this.scene.run(keyLastScene);
        });
    }

    //metodo para volver al menu principal y reiniciar el juego
    //(Destruir el juego no es la forma mas correcta de reiniciar el nivel, somos conscientes de ello)
    returnToMenuButton(x,y, scale){
        return this.createButton(x,y, scale, 'pauseMenuToMainMenu', (ref) => {
            const main = new Main();
            main.restartGame(ref);
        });
    }
    
    //metodo para cambiar a la escena de la que se pasa una key
    goToSceneButton(x,y, scale, textureKey, nextSceneKey){
        return this.createButton(x,y, scale, textureKey, () => {
            this.sound.stopAll(); //se para la musica
            this.scene.start(nextSceneKey);
        });
    }
}