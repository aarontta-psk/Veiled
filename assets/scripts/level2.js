import Main from './main.js'

//escena de nivel 2
export default class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
    };

    create() {
        //cargamos el video del epílogo
        this.video = this.add.video(400, 300, 'ending');
        //lo iniciamos
        this.video.play();
        //establecemos que no se pare si la página se queda en segundo plano
        this.video.setPaused(false);

        //guardamos la tecla 'escape'
        this.endingKey = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC
        });
        //si se presiona escape, se vuelve al menu principal
        this.endingKey.esc.on('down', () => {
            this.returnToMenu();
        });
        //si se acaba el video, se vuelve al menú principal
        this.video.on('complete', () => {
            this.returnToMenu();
        })
    }

    // Volver al menu usando start nos daba un problema que no tuvimos tiempo de resolver.
    // La solución rápida y bruta es reiniciar el juego por completo. 
    returnToMenu() {
        const main = new Main();
        //metodo que destruye el juego y lo recarga
        //(Destruir el juego no es la forma mas correcta de reiniciar el nivel, somos conscientes de ello)
        main.restartGame(this);
    }
}