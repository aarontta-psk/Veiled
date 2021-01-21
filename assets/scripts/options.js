import menuBasicScene from "./menu_basic_scene.js";

//clase menu de opciones que hereda de la clase menu basico 
export default class options extends menuBasicScene{
    //se recibe informacion al cambiar a esta escena
    init(data){
        this.info = data;
    }

    constructor(){
        super('optionsScene'); //constructora del menu basico
    }
    create(){
        this.scene.bringToTop(); //se pone la escena la primera en el orden para ver las escenas
        //variable para controlar el frame del boton de volumen
        let i = Math.round(this.sound.volume / 0.33, 0);
        //imagen de fondo
        this.add.image(0,0, 'settingsMenu').setOrigin(0);
        //BOTONES DE LA ESCENA
        this.volume = this.volumeButton(this.cameras.main.centerX + this.cameras.main.width/3.3,
            this.cameras.main.centerY - (this.cameras.main.height/8), 0.8, i)
        this.volume.setFrame(i); //establecemos su frame con respecto a la variable i

        this.returnMenu = this.returnButton(this.cameras.main.centerX + this.cameras.main.width/3,
            this.cameras.main.centerY + (this.cameras.main.height/5), 0.5, this.info.prevSceneKey).setScale(0.5);
    }
}