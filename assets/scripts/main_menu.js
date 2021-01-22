import menuBasicScene from "./menu_basic_scene.js";

//clase de menú principal, en la que empieza el juego
//y da la opción de jugar, elegir nivel, o ver las opciones
export default class mainMenuScene extends menuBasicScene{
    constructor(){ //constructora de la clase menu básico
        super('mainMenuScene');
    }

    create(){
        //la ponemos en el frente de la pantalla
        this.scene.bringToTop();
        //iniciamos el 
        this.sound.play('menuSong',  {
            mute: false, volume: 0.2, rate: 1, detune: 0, seek: 0, loop: true, delay: 0
        });
        //imagen de fondo
        this.add.image(0,0, 'mainMenu').setOrigin(0);
        
        //BOTONES
        //botón play que te permite empezar directamente en el preludio
        const test = this.playButton(this.cameras.main.centerX - this.cameras.main.width/4,
            this.cameras.main.centerY + (this.cameras.main.height/60), 1);
        //botón levels que te permite cambiar a la escena de elegir nivel
        const levels = this.levelsButton(this.cameras.main.centerX - this.cameras.main.width/4,
                this.cameras.main.centerY + (this.cameras.main.height/5), 1);
        //botón options que te permite avanzar al menú de opciones
        const options = this.optionsButton(this.cameras.main.centerX - this.cameras.main.width/4,
            this.cameras.main.height - (this.cameras.main.height/9), 1, 'mainMenuScene');
    }
}