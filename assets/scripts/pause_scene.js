import menuBasicScene from "./menu_basic_scene.js";

//clase menu de pausa que hereda de la clase menu basico 
export default class pauseScene extends menuBasicScene {
    //se recibe informacion al cambiar a esta escena
    init(data) {
        this.info = data;
    }

    constructor() {
        super('pauseScene'); //constructora del menu basico
    }

    create() {
        this.scene.bringToTop(); //se pone la escena la primera en el orden para ver las escenas
        //fondo de la escena
        let background = this.add.image(0, 0, 'pauseMenu').setOrigin(0);
        background.setPosition(this.cameras.main.centerX - background.width/2, this.cameras.main.centerY - background.height/2);

        //BOTONES DE LA ESCENA
        //el pausa no cierra la escena anterior asi que se puede acceder a su key
        const resume = this.returnButton(this.cameras.main.centerX, this.cameras.main.centerY -40, 0.5, this.info.prevSceneKey).setScale(0.5); 
        const exit = this.returnToMenuButton(this.cameras.main.centerX, this.cameras.main.centerY + 30, 0.5).setScale(0.5);
        const options = this.optionsButton(this.cameras.main.centerX, this.cameras.main.centerY + 100, 0.5, 'pauseScene').setScale(0.5);
    }
}