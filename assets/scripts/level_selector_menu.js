import menuBasicScene from "./menu_basic_scene.js";

export default class levelSelector extends menuBasicScene {
    init(data) {
        this.info = data;
    }

    constructor() {
        super('levelSelectorScene');
    }
    
    create() {

        this.scene.bringToTop();
        //imagen de fondo
        this.add.image(0, 0, 'mainMenu').setOrigin(0);

        //botones
        const level01 = this.goToSceneButton(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 60), 1, 'mainMenuLevel00', 'level0');

        const level02 = this.goToSceneButton(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 5), 1, 'mainMenuLevel01', 'level1');

        const level03 = this.goToSceneButton(this.cameras.main.centerX - this.cameras.main.width / 4,
            this.cameras.main.centerY + (this.cameras.main.height / 2.5), 1, 'mainMenuLevel02', 'level2');

    }
}