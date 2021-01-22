import menuBasicScene from "./menu_basic_scene.js";

//clase menú de selección de nivel, en la que se podrá elegir el jugar
//a los distintos niveles del juego
export default class levelSelector extends menuBasicScene {
    constructor() { //constructora de la clase menu básico
        super('levelSelectorScene');
    }
    
    create() {
        //lo colocamos al frente
        this.scene.bringToTop();
        //imagen de fondo
        this.add.image(0, 0, 'mainMenu').setOrigin(0);

        //botones
        //nivel 0 (preludio)
        const level01 = this.goToSceneButton(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 60), 1, 'mainMenuLevel00', 'level0');
        //nivel 1 (Pueblo)
        const level02 = this.goToSceneButton(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 5), 1, 'mainMenuLevel01', 'level1');
        //nivel 2 (epílogo)
        const level03 = this.goToSceneButton(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 2.5), 1, 'mainMenuLevel02', 'level2');
    }
}