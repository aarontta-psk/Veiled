import Main from './main.js'

export default class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
    };

    create() {

        this.endingKey = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC
        });

        this.video = this.add.video(400, 300, 'ending');

        this.video.play();

        this.endingKey.esc.on('down', event => {
            this.returnToMenu();
        });
    }

    update() {
        if (!this.video.isPlaying()) {
            this.returnToMenu();
        }
    }


    // Volver al menu usando start nos daba un problema que no tuvimos tiempo de resolver. La solución rápida y bruta es reiniciar el juego por completo. 
    returnToMenu() {
        const main = new Main();
        main.restartGame(this);
    }
}