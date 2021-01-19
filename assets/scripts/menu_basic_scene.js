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
        return this.createButton(x,y, scale, 'mainMenuPlay', function(ref){
            ref.sound.stopAll();
            ref.scene.start('level0');
        });
    }

    optionsButton(x, y, scale){
        return this.createButton(x,y, scale, 'mainMenuSettings', function(ref){
            ref.scene.stop();
            ref.scene.run('optionsScene', {prevScene: ref });
        });
    }

    volumeButton(x,y, scale, index){
        return this.createButton(x,y, scale, 'volume', function(ref, button){
            if(index >= 3) index = 0;
            else index++;
            button.setFrame(index);
            ref.sound.setVolume(index * 0.33);
        });
    }

    levelsButton(x,y, scale){
        return this.createButton(x,y, scale, 'mainMenuLevels', function(ref){
            ref.scene.stop();
            ref.scene.run('levelSelectorScene', {prevScene: ref });
        });
    }

    returnButton(x,y, scale, info){
        return this.createButton(x,y, scale, 'back', function(ref){
            ref.scene.stop();
            ref.scene.run(info.prevScene.scene.key);
        });
    }

    returnToMenuButton(x,y, scale){
        return this.createButton(x,y, scale, 'pauseMenuToMainMenu', function(ref){
            const main = new Main();
            main.restartGame(ref);
        });
    }
    
    goToSceneButton(x,y, scale, textureKey, nextScene){
        return this.createButton(x,y, scale, textureKey, function(ref){
            ref.sound.stopAll();
            ref.scene.start(nextScene);
        });
    }

    //metodo para reiniciar el juego
    restartScenes(){
        //restartea la escena correcta?
        for(const scene of this.scene.systems.game.scene.scenes){
            if(scene !== this.scene.get('boot') && scene !== this.scene.get('pauseScene')) scene.scene.restart();
        }
    }
}