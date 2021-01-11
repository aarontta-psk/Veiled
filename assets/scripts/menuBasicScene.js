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
            cb(this);
        });

        return button;
    }

    playButton(x,y, scale){
        return this.createButton(x,y, scale, 'mainMenuPlay', function(ref){
            ref.sound.stopAll();
            ref.scene.start('gameScene');
        });
    }

    optionsButton(x,y, scale){
        return this.createButton(x,y, scale, 'mainMenuSettings', function(ref){
            ref.scene.stop();
            ref.scene.run('optionsScene', {prevScene: ref });
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
            ref.sound.stopAll();
            ref.scene.run(info.prevScene.scene.key);
        });
    }

    returnToMenuButton(x,y, scale, info){
        return this.createButton(x,y, scale, 'pauseMenuToMainMenu', function(ref){
            ref.sound.stopAll();
            ref.scene.start('mainMenuScene');
        });
    }
}